from fastapi import APIRouter, HTTPException

from models.user_models import GenerateMakeupRequest, GenerateMakeupResponse
from workflows.langgraph_pipeline import run_makeup_pipeline

router = APIRouter()


@router.post("/generate-makeup", response_model=GenerateMakeupResponse)
async def generate_makeup(request: GenerateMakeupRequest):
    result = await run_makeup_pipeline(
        image_path=request.image_path,
        template_id=request.template_id,
        style=request.style or "bridal",
    )

    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"])

    generated_filename = result.get("generated_image", "")
    generated_url = f"/uploads/{generated_filename}" if generated_filename else ""

    return GenerateMakeupResponse(
        original_image=request.image_path,
        generated_image=generated_url,
        template_id=request.template_id,
        message="Makeup generation completed successfully (placeholder).",
    )
