import os
import uuid

from fastapi import APIRouter, File, UploadFile, HTTPException

from models.user_models import UploadResponse

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-image", response_model=UploadResponse)
async def upload_image(file: UploadFile = File(...)):
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"File type '{file.content_type}' not allowed. Use JPEG, PNG, or WebP.",
        )

    ext = os.path.splitext(file.filename or "image.jpg")[1]
    unique_filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    return UploadResponse(
        filename=unique_filename,
        file_path=file_path,
        message="Image uploaded successfully.",
    )
