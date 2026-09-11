from mangum import Mangum
from app.main import app

# Mangum adapts FastAPI's ASGI interface to AWS Lambda's event format.
# API Gateway HTTP API sends events here; Mangum translates them into
# standard ASGI requests that FastAPI handles normally.
#
# lifespan="auto" ensures the FastAPI startup event fires (which runs
# Base.metadata.create_all to create the contact_messages table on
# first cold start if it doesn't already exist in Supabase).
handler = Mangum(app, lifespan="auto")
