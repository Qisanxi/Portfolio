from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field
from app.services.ai_service import get_ai_response
from app.core.ratelimit import limiter

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    history: list[Message] = []
    identity: str = Field(default='', max_length=20)  # recruiter | student | friend

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
@limiter.limit("10/5minute")
async def chat(request: Request, body: ChatRequest):
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    if len(body.history) > 6:
        body.history = body.history[-6:]

    response = await get_ai_response(
        message=body.message,
        history=[msg.model_dump() for msg in body.history],
        identity=body.identity,
    )

    return ChatResponse(response=response)
