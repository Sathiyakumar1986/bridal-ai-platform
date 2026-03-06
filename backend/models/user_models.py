from pydantic import BaseModel
from typing import Optional


class UploadResponse(BaseModel):
    filename: str
    file_path: str
    message: str


class GenerateMakeupRequest(BaseModel):
    image_path: str
    template_id: str
    style: Optional[str] = "bridal"


class GenerateMakeupResponse(BaseModel):
    original_image: str
    generated_image: str
    template_id: str
    message: str


class StyleRecommendation(BaseModel):
    makeup: list[str]
    hairstyle: list[str]
    costume: list[str]
    jewelry: list[str]


class RecommendationResponse(BaseModel):
    recommendations: StyleRecommendation
    message: str


class FaceDetectionResult(BaseModel):
    face_detected: bool
    face_count: int
    face_landmarks: Optional[dict] = None
    bounding_boxes: Optional[list] = None


class MakeupTransferResult(BaseModel):
    success: bool
    output_image_path: Optional[str] = None
    message: str
