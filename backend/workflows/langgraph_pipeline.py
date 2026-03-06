from typing import TypedDict

from services.face_detection import detect_faces
from services.makeup_transfer import apply_makeup_transfer
from services.ai_recommendation import get_style_recommendations


class PipelineState(TypedDict):
    image_path: str
    template_id: str
    style: str
    face_detected: bool
    face_count: int
    generated_image: str
    recommendations: dict
    error: str


async def face_detection_node(state: PipelineState) -> PipelineState:
    result = await detect_faces(state["image_path"])
    state["face_detected"] = result.face_detected
    state["face_count"] = result.face_count
    return state


async def makeup_transfer_node(state: PipelineState) -> PipelineState:
    if not state.get("face_detected"):
        state["error"] = "No face detected in the uploaded image."
        return state

    result = await apply_makeup_transfer(
        state["image_path"], state["template_id"], state.get("style", "bridal")
    )
    if result.success and result.output_image_path:
        state["generated_image"] = result.output_image_path
    else:
        state["error"] = result.message
    return state


async def recommendation_node(state: PipelineState) -> PipelineState:
    result = await get_style_recommendations(state.get("style", "bridal"))
    state["recommendations"] = result.model_dump()
    return state


async def run_makeup_pipeline(
    image_path: str, template_id: str, style: str = "bridal"
) -> PipelineState:
    state: PipelineState = {
        "image_path": image_path,
        "template_id": template_id,
        "style": style,
        "face_detected": False,
        "face_count": 0,
        "generated_image": "",
        "recommendations": {},
        "error": "",
    }

    state = await face_detection_node(state)

    if state.get("error"):
        return state

    state = await makeup_transfer_node(state)

    if state.get("error"):
        return state

    state = await recommendation_node(state)

    return state
