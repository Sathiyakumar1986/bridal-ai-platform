from models.user_models import StyleRecommendation


async def get_style_recommendations(
    style: str = "bridal", skin_tone: str = "medium"
) -> StyleRecommendation:
    recommendations = {
        "bridal": StyleRecommendation(
            makeup=[
                "Soft glam with nude lip and smoky eye",
                "Classic red lip with winged eyeliner",
                "Dewy skin with rose-gold highlights",
            ],
            hairstyle=[
                "Elegant low bun with floral accessories",
                "Loose curls with a side-swept look",
                "Braided updo with pearl pins",
            ],
            costume=[
                "Traditional red lehenga with gold embroidery",
                "Ivory silk saree with zari border",
                "Pastel pink anarkali with sequin work",
            ],
            jewelry=[
                "Kundan necklace set with maang tikka",
                "Diamond choker with matching earrings",
                "Pearl and emerald layered necklace",
            ],
        ),
        "groom": StyleRecommendation(
            makeup=[
                "Natural skin finish with concealer touch-up",
                "Matte foundation with groomed eyebrows",
                "Light bronzer for a sun-kissed look",
            ],
            hairstyle=[
                "Classic side-parted pompadour",
                "Textured quiff with clean fade",
                "Slicked-back look with natural shine",
            ],
            costume=[
                "Royal blue sherwani with gold buttons",
                "Ivory silk kurta with churidar",
                "Black tuxedo with satin lapels",
            ],
            jewelry=[
                "Gold kalgi for turban",
                "Diamond cufflinks and brooch set",
                "Pearl and gold layered necklace",
            ],
        ),
    }

    return recommendations.get(
        style,
        recommendations["bridal"],
    )
