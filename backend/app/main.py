from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import chat, contact

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG
)

# CORS — allows React dev server to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(chat.router, prefix="/api")
app.include_router(contact.router, prefix="/api")

@app.get("/")
async def root():
    return {"status": "Portfolio API is running"}