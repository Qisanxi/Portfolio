from fastapi import APIRouter

router = APIRouter()

@router.post("/contact")
async def contact():
    return {"message": "contact endpoint ready"}