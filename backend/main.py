from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from api.upload import router as upload_router
from api.generate_makeup import router as generate_makeup_router
from api.recommendation import router as recommendation_router

app = FastAPI(
    title="Virtual Bridal & Groom Makeup Studio API",
    description="AI-powered bridal and groom makeup generation and style recommendation platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

upload_dir = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(upload_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=upload_dir), name="uploads")

app.include_router(upload_router, prefix="/api", tags=["Upload"])
app.include_router(generate_makeup_router, prefix="/api", tags=["Makeup Generation"])
app.include_router(recommendation_router, prefix="/api", tags=["Recommendations"])


@app.get("/")
async def root():
    return {
        "message": "Virtual Bridal & Groom Makeup Studio API",
        "docs": "/docs",
        "endpoints": {
            "upload": "/api/upload-image",
            "generate": "/api/generate-makeup",
            "recommend": "/api/recommend-style",
        },
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
