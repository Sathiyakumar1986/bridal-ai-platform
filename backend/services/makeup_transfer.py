import os
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

from models.user_models import MakeupTransferResult


UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")

STYLE_EFFECTS = {
    "bridal-classic": {
        "warmth": 1.15,
        "saturation": 1.3,
        "brightness": 1.08,
        "contrast": 1.1,
        "tint": (255, 200, 200, 25),
        "smoothing": 1,
    },
    "bridal-modern": {
        "warmth": 1.05,
        "saturation": 1.4,
        "brightness": 1.1,
        "contrast": 1.15,
        "tint": (255, 180, 220, 30),
        "smoothing": 2,
    },
    "bridal-natural": {
        "warmth": 1.1,
        "saturation": 1.15,
        "brightness": 1.12,
        "contrast": 1.05,
        "tint": (255, 230, 210, 18),
        "smoothing": 1,
    },
    "bridal-bold": {
        "warmth": 1.08,
        "saturation": 1.5,
        "brightness": 1.05,
        "contrast": 1.2,
        "tint": (255, 150, 180, 35),
        "smoothing": 1,
    },
    "bridal-south-asian": {
        "warmth": 1.2,
        "saturation": 1.45,
        "brightness": 1.06,
        "contrast": 1.12,
        "tint": (255, 180, 150, 28),
        "smoothing": 1,
    },
    "groom-classic": {
        "warmth": 1.0,
        "saturation": 1.1,
        "brightness": 1.06,
        "contrast": 1.15,
        "tint": (200, 210, 230, 15),
        "smoothing": 1,
    },
    "groom-modern": {
        "warmth": 0.95,
        "saturation": 1.15,
        "brightness": 1.08,
        "contrast": 1.2,
        "tint": (210, 220, 240, 18),
        "smoothing": 1,
    },
    "groom-traditional": {
        "warmth": 1.15,
        "saturation": 1.2,
        "brightness": 1.05,
        "contrast": 1.1,
        "tint": (230, 210, 180, 20),
        "smoothing": 1,
    },
}

DEFAULT_EFFECT = {
    "warmth": 1.1,
    "saturation": 1.25,
    "brightness": 1.08,
    "contrast": 1.1,
    "tint": (255, 200, 200, 22),
    "smoothing": 1,
}


def apply_warmth(image: Image.Image, factor: float) -> Image.Image:
    if factor == 1.0:
        return image
    r, g, b = image.split()[:3]
    if factor > 1.0:
        r = r.point(lambda x: min(255, int(x * factor)))
        b = b.point(lambda x: max(0, int(x / factor)))
    else:
        r = r.point(lambda x: max(0, int(x * factor)))
        b = b.point(lambda x: min(255, int(x / factor)))
    if image.mode == "RGBA":
        a = image.split()[3]
        return Image.merge("RGBA", (r, g, b, a))
    return Image.merge("RGB", (r, g, b))


def apply_effects(image: Image.Image, effects: dict) -> Image.Image:
    img = image.convert("RGBA") if image.mode != "RGBA" else image.copy()

    rgb = img.convert("RGB")

    rgb = apply_warmth(rgb, effects.get("warmth", 1.0))

    enhancer = ImageEnhance.Color(rgb)
    rgb = enhancer.enhance(effects.get("saturation", 1.0))

    enhancer = ImageEnhance.Brightness(rgb)
    rgb = enhancer.enhance(effects.get("brightness", 1.0))

    enhancer = ImageEnhance.Contrast(rgb)
    rgb = enhancer.enhance(effects.get("contrast", 1.0))

    smoothing = effects.get("smoothing", 0)
    for _ in range(smoothing):
        rgb = rgb.filter(ImageFilter.SMOOTH)

    enhancer = ImageEnhance.Sharpness(rgb)
    rgb = enhancer.enhance(1.2)

    tint = effects.get("tint")
    if tint:
        overlay = Image.new("RGBA", rgb.size, tint)
        rgb = rgb.convert("RGBA")
        rgb = Image.alpha_composite(rgb, overlay)

    return rgb.convert("RGB")


async def apply_makeup_transfer(
    image_path: str, template_id: str, style: str = "bridal"
) -> MakeupTransferResult:
    if not os.path.exists(image_path):
        return MakeupTransferResult(
            success=False,
            output_image_path=None,
            message=f"Source image not found at '{image_path}'.",
        )

    try:
        img = Image.open(image_path)
        img = img.convert("RGB")

        effects = STYLE_EFFECTS.get(template_id, DEFAULT_EFFECT)
        processed = apply_effects(img, effects)

        base, ext = os.path.splitext(os.path.basename(image_path))
        output_filename = f"{base}_makeup_{template_id}.jpg"
        output_path = os.path.join(UPLOAD_DIR, output_filename)

        processed.save(output_path, "JPEG", quality=92)

        return MakeupTransferResult(
            success=True,
            output_image_path=output_filename,
            message=f"Makeup style '{style}' with template '{template_id}' applied successfully.",
        )
    except Exception as e:
        return MakeupTransferResult(
            success=False,
            output_image_path=None,
            message=f"Failed to process image: {str(e)}",
        )
