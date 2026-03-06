from models.user_models import FaceDetectionResult


async def detect_faces(image_path: str) -> FaceDetectionResult:
    return FaceDetectionResult(
        face_detected=True,
        face_count=1,
        face_landmarks={
            "left_eye": [120, 150],
            "right_eye": [200, 150],
            "nose": [160, 200],
            "mouth_left": [130, 240],
            "mouth_right": [190, 240],
        },
        bounding_boxes=[[80, 60, 250, 300]],
    )
