"""
Pytest configuration — sets up an isolated test environment for the FastAPI app.

Uses SQLite in-memory DB instead of Postgres so tests run without infrastructure.
Mocks the Gemini client so /api/chat tests don't hit external APIs.
"""
import os
import sys
from pathlib import Path

# Make backend/ importable as `import app...`
BACKEND_DIR = Path(__file__).parent.parent
sys.path.insert(0, str(BACKEND_DIR))

# Set test env vars BEFORE importing the app — pydantic-settings reads on import.
# Use direct assignment (not setdefault) so we always override any pre-existing
# DATABASE_URL the test runner might have inherited from the host environment.
os.environ['DATABASE_URL'] = 'sqlite+aiosqlite:///:memory:'
os.environ['GEMINI_API_KEY'] = 'test-gemini-key'
os.environ['FRONTEND_URL'] = 'http://localhost:5173'
os.environ['DEBUG'] = 'True'

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.db.session import Base, get_db
from app.db import models  # noqa: F401  — ensure all models are imported so create_all picks them up
from app.main import app


@pytest_asyncio.fixture
async def db_engine():
    """Fresh SQLite in-memory engine per test — full isolation."""
    # Use aiosqlite driver for async SQLite support
    engine = create_async_engine('sqlite+aiosqlite:///:memory:', echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    await engine.dispose()


@pytest_asyncio.fixture
async def db_session(db_engine):
    """Async DB session bound to the test engine."""
    Session = async_sessionmaker(db_engine, class_=AsyncSession, expire_on_commit=False)
    async with Session() as session:
        yield session


@pytest_asyncio.fixture
async def client(db_engine):
    """Async HTTP client wired to use the test DB instead of the prod one."""
    Session = async_sessionmaker(db_engine, class_=AsyncSession, expire_on_commit=False)

    async def override_get_db():
        async with Session() as session:
            yield session

    app.dependency_overrides[get_db] = override_get_db

    # Trigger lifespan to create tables (in case override skipped it)
    async with app.router.lifespan_context(app):
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url='http://test') as ac:
            yield ac

    app.dependency_overrides.clear()


@pytest.fixture
def mock_gemini(monkeypatch):
    """Replace ai_service.get_ai_response with a deterministic stub so /api/chat
    tests can assert on the response without depending on network or quota.

    NOTE: chat.py imports get_ai_response as `from app.services.ai_service import
    get_ai_response` — so the reference lives in chat module's namespace. We
    patch BOTH the source module AND the chat module's local reference, since
    either could be the one that resolves at call time depending on import order.
    """
    from app.services import ai_service
    from app.api.routes import chat as chat_route

    async def fake_get_ai_response(message, history, identity=''):
        return f"[mock] You said: {message} (identity={identity})"

    # Patch the source module (in case anything else imports it directly)
    monkeypatch.setattr(ai_service, 'get_ai_response', fake_get_ai_response)
    # Patch the chat route module's local reference (this is what's actually called)
    monkeypatch.setattr(chat_route, 'get_ai_response', fake_get_ai_response)
    return fake_get_ai_response
