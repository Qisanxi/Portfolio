from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings

# Connect args for asyncpg — required when using Supabase's transaction-mode
# pooler (port 6543, PgBouncer in transaction mode). Without statement_cache_size=0,
# asyncpg tries to use prepared statements which PgBouncer doesn't support in
# transaction mode, causing DuplicatePreparedStatement errors on the second request.
#
# We only apply these for postgres URLs — for SQLite (used in tests) the same
# kwargs would crash because aiosqlite doesn't understand them.
connect_args = {}
if settings.DATABASE_URL.startswith('postgres'):
    connect_args = {
        'statement_cache_size': 0,           # disable asyncpg prepared statements
        'prepared_statement_cache_size': 0,  # belt and suspenders — older asyncpg versions use this name
    }

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,    # only logs in development
    connect_args=connect_args,
)

AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session