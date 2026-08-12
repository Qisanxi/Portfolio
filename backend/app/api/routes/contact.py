from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert
from app.db.session import get_db
from app.db.models import ContactMessage
from app.core.ratelimit import limiter

router = APIRouter()

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

@router.post("/contact", response_model=ContactResponse)
@limiter.limit("3/hour")
async def contact(request: Request, body: ContactRequest, db: AsyncSession = Depends(get_db)):
    if not body.name.strip():
        raise HTTPException(status_code=400, detail="Name cannot be empty")

    if not body.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    stmt = insert(ContactMessage).values(
        name=body.name,
        email=body.email,
        message=body.message
    )
    await db.execute(stmt)
    await db.commit()

    return ContactResponse(
        success=True,
        message="Message received! Sandeep will get back to you soon."
    )