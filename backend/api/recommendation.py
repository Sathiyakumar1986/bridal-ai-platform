from fastapi import APIRouter, Query

from models.user_models import RecommendationResponse
from services.ai_recommendation import get_style_recommendations

router = APIRouter()


@router.get("/recommend-style", response_model=RecommendationResponse)
async def recommend_style(
    style: str = Query("bridal", description="Style type: bridal or groom"),
    skin_tone: str = Query("medium", description="Skin tone: fair, medium, dark"),
):
    recommendations = await get_style_recommendations(style=style, skin_tone=skin_tone)

    return RecommendationResponse(
        recommendations=recommendations,
        message=f"Style recommendations for '{style}' generated successfully.",
    )
