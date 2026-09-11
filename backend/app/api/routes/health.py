from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/health")
async def health(request: Request):
    """Lightweight health-check endpoint.

    Used by the frontend on page load to silently wake the Render backend
    (which sleeps after 15 min of inactivity on the free tier). Returns
    minimal JSON so the request is fast.

    No rate limiting — this is hit on every page load, the limit would
    need to be very high to be useful and would just add noise to logs.
    """
    return {"status": "ok"}
