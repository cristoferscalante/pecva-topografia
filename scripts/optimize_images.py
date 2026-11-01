#!/usr/bin/env python3
"""
PECVA Topografía - Script de Optimización Automática de Imágenes WebP
====================================================================
Este script optimiza automáticamente todas las imágenes de blog en `public/images/blog/`:
1. Convierte imágenes (.png, .jpg, .jpeg) a formato WebP de última generación.
2. Asegura dimensiones exactas 16:9 (1200x675 px) con muestreo Lanczos de alta calidad.
3. Ajusta la calidad adaptativamente para garantizar peso < 185 KB (habitualmente 100-160 KB).
4. Actualiza automáticamente las referencias de frontmatter `image: "/images/blog/..."` en `content/blog/*.md` a `.webp`.
5. Opcionalmente elimina los archivos .png antiguos para liberar espacio en disco y agilizar el despliegue.

Uso:
  python scripts/optimize_images.py [--clean-originals] [--no-markdown-update]
"""

import os
import sys
import argparse
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
BLOG_IMAGES_DIR = BASE_DIR / "public" / "images" / "blog"
CONTENT_BLOG_DIR = BASE_DIR / "content" / "blog"

TARGET_WIDTH = 1200
TARGET_HEIGHT = 675
MAX_SIZE_KB = 190
DEFAULT_QUALITY = 80

def resize_and_crop(img: Image.Image, target_width: int, target_height: int) -> Image.Image:
    """Ajusta la imagen a 1200x675 manteniendo la proporción central sin deformar."""
    img = img.convert("RGB")
    src_w, src_h = img.size
    target_ratio = target_width / target_height
    src_ratio = src_w / src_h

    if abs(src_ratio - target_ratio) > 0.01:
        if src_ratio > target_ratio:
            # Más ancha -> recortar laterales
            new_w = int(src_h * target_ratio)
            left = (src_w - new_w) // 2
            img = img.crop((left, 0, left + new_w, src_h))
        else:
            # Más alta -> recortar arriba/abajo
            new_h = int(src_w / target_ratio)
            top = (src_h - new_h) // 2
            img = img.crop((0, top, src_w, top + new_h))

    return img.resize((target_width, target_height), Image.Resampling.LANCZOS)

def compress_to_webp(img: Image.Image, output_path: Path, max_kb: int = MAX_SIZE_KB) -> int:
    """Comprime a WebP adaptando la calidad para no superar max_kb."""
    quality = DEFAULT_QUALITY
    min_quality = 60
    step = 5

    while quality >= min_quality:
        img.save(output_path, "WEBP", quality=quality, method=6)
        size_kb = output_path.stat().st_size / 1024
        if size_kb <= max_kb or quality <= min_quality:
            return int(size_kb)
        quality -= step

    return int(output_path.stat().st_size / 1024)

def update_markdown_references(mapping: dict):
    """Actualiza las rutas de imagen en los archivos .md del blog."""
    if not CONTENT_BLOG_DIR.exists():
        print(f"[WARN] Directorio {CONTENT_BLOG_DIR} no encontrado.")
        return

    updated_count = 0
    for md_file in CONTENT_BLOG_DIR.glob("*.md"):
        content = md_file.read_text(encoding="utf-8")
        original_content = content
        for old_img, new_img in mapping.items():
            if old_img in content:
                content = content.replace(old_img, new_img)
        if content != original_content:
            md_file.write_text(content, encoding="utf-8")
            updated_count += 1

    print(f"[MD] {updated_count} articulos markdown actualizados con referencias .webp.")

def process_directory(directory: Path, clean_originals: bool, max_kb: int = MAX_SIZE_KB, target_w: int = TARGET_WIDTH, target_h: int = TARGET_HEIGHT):
    print(f"[INICIO] Escaneando {directory}...")
    image_files = [f for f in directory.iterdir() if f.is_file() and f.suffix.lower() in [".png", ".jpg", ".jpeg", ".webp"]]

    converted = 0
    skipped = 0
    mapping = {}
    saved_bytes = 0

    for file_path in image_files:
        is_already_webp = file_path.suffix.lower() == ".webp"
        target_webp = file_path.with_suffix(".webp")

        orig_size = file_path.stat().st_size

        if is_already_webp and orig_size / 1024 <= max_kb:
            skipped += 1
            continue

        try:
            with Image.open(file_path) as img:
                optimized_img = resize_and_crop(img, target_w, target_h)
                temp_webp = target_webp.with_suffix(".tmp.webp")
                final_kb = compress_to_webp(optimized_img, temp_webp, max_kb)

                if temp_webp.exists():
                    if target_webp.exists() and target_webp != file_path:
                        target_webp.unlink()
                    temp_webp.replace(target_webp)

                new_size = target_webp.stat().st_size
                diff = orig_size - new_size
                saved_bytes += max(0, diff)
                converted += 1

                rel_dir = directory.name
                old_ref = f"/images/{rel_dir}/{file_path.name}"
                new_ref = f"/images/{rel_dir}/{target_webp.name}"
                if not is_already_webp:
                    mapping[old_ref] = new_ref

                if clean_originals and not is_already_webp and file_path.exists():
                    file_path.unlink()

        except Exception as e:
            print(f"[ERROR] Procesando {file_path.name}: {e}")

    print(f"- Analizadas en {directory.name}: {len(image_files)} (Optimizadas: {converted}, Ya listas: {skipped})")
    print(f"- Espacio liberado: {saved_bytes / (1024*1024):.2f} MB")
    return mapping

def main():
    parser = argparse.ArgumentParser(description="Optimizar imagenes de blog y servicios PECVA a WebP.")
    parser.add_argument("--clean-originals", action="store_true", help="Eliminar archivos originales .png/.jpg convertidos")
    parser.add_argument("--no-markdown-update", action="store_true", help="No actualizar frontmatter de articulos markdown")
    args = parser.parse_args()

    all_mappings = {}

    if BLOG_IMAGES_DIR.exists():
        blog_mapping = process_directory(BLOG_IMAGES_DIR, args.clean_originals, MAX_SIZE_KB, TARGET_WIDTH, TARGET_HEIGHT)
        all_mappings.update(blog_mapping)

    SERVICES_IMAGES_DIR = BASE_DIR / "public" / "images" / "services"
    if SERVICES_IMAGES_DIR.exists():
        services_mapping = process_directory(SERVICES_IMAGES_DIR, args.clean_originals, MAX_SIZE_KB, TARGET_WIDTH, TARGET_HEIGHT)
        all_mappings.update(services_mapping)

    if all_mappings and not args.no_markdown_update:
        update_markdown_references(all_mappings)

    print("\n[LISTO] Optimización global completada exitosamente.\n")

if __name__ == "__main__":
    main()
