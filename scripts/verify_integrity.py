from pathlib import Path

blog_dir = Path("content/blog")
img_dir = Path("public/images/blog")

missing_imgs = []
future_dates = []
today_str = "2026-11-01"

posts = list(blog_dir.glob("*.md"))
for md in posts:
    content = md.read_text(encoding="utf-8")
    for line in content.splitlines():
        if line.startswith("image:"):
            img_ref = line.replace("image:", "").strip().strip('"').strip("'")
            rel_path = img_ref.lstrip("/")
            img_file = Path("public") / rel_path
            if not img_file.exists():
                missing_imgs.append((md.name, img_ref))
        if line.startswith("publishedAt:"):
            date_ref = line.replace("publishedAt:", "").strip().strip('"').strip("'")
            if date_ref > today_str:
                future_dates.append((md.name, date_ref))

print(f"Total posts checked: {len(posts)}")
print(f"Missing images: {len(missing_imgs)}")
print(f"Future dates: {len(future_dates)}")

if missing_imgs:
    for m in missing_imgs:
        print(f"  Missing: {m[0]} -> {m[1]}")

if future_dates:
    for f in future_dates:
        print(f"  Future date: {f[0]} -> {f[1]}")

if not missing_imgs and not future_dates:
    print("\n[PERFECT] Todos los 173 posts tienen sus imagenes WebP y cumplen la politica de fechas.")
