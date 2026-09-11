from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel, EmailStr, Field
from typing import Literal, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select
from app.db.session import get_db
from app.db.models import SubscribedVisitor
from app.core.ratelimit import limiter

router = APIRouter()


class VisitorCreate(BaseModel):
    """Body for POST /api/visitors.

    identity is required (the visitor picked one of the 3 onboarding options).
    name and email are both optional — the visitor can skip them.
    """
    identity: Literal['recruiter', 'student', 'friend']
    name: Optional[str] = Field(default=None, max_length=100)
    email: Optional[EmailStr] = None


class VisitorResponse(BaseModel):
    success: bool
    message: str


@router.post("/visitors", response_model=VisitorResponse)
@limiter.limit("5/hour")
async def create_visitor(request: Request, body: VisitorCreate, db: AsyncSession = Depends(get_db)):
    """Record a visitor who completed chat onboarding.

    The frontend fires this when the visitor picks an identity and (optionally)
    enters name/email. Used for two purposes:
    1. Visitor analytics — total counts by identity
    2. Email notifications when Sandeep adds a new project/cert/milestone

    If the same email is submitted twice, we don't error — we just no-op
    (return success). This is a portfolio, not a SaaS; we don't need strict
    uniqueness constraints.
    """
    # If email provided, check if already exists — no-op if so
    if body.email:
        existing = await db.execute(
            select(SubscribedVisitor).where(SubscribedVisitor.email == body.email)
        )
        if existing.scalar_one_or_none():
            return VisitorResponse(
                success=True,
                message="Welcome back! Good to see you again."
            )

    # Trim name if provided
    name = body.name.strip() if body.name else None

    stmt = insert(SubscribedVisitor).values(
        identity=body.identity,
        name=name,
        email=body.email,
        subscribed=True,
    )
    await db.execute(stmt)
    await db.commit()

    return VisitorResponse(
        success=True,
        message="Thanks! Sandeep will personally notify you when he ships something new."
    )
