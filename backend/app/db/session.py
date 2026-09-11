from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy.pool import NullPool
from app.core.config import settings

# NullPool disables SQLAlchemy's connection pooling.
# This is required for AWS Lambda: Lambda does not hold persistent
# processes between invocations, so pooled connections are stale
# by the time the next invocation reuses them — causing crashes.
# NullPool opens a fresh connection per request and closes it
# immediately after, which is the correct pattern for serverless.
# It has negligible overhead because Supabase's pgBouncer already
# handles pooling at the database side (use port 6543, not 5432).
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    poolclass=NullPool,
)

AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
