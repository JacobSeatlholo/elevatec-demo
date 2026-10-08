#!/usr/bin/env python3
"""Optimize Elevate brand images for web (resize + compress)."""
import os
from PIL import Image

PUB = "/home/z/my-project/public"

JOBS = [
    # (src, dst, max_width, quality)
    ("brand/hero-image.jpg", "brand/hero-image.jpg", 2000, 78),
    ("projects/workplace-hq.png", "projects/workplace-hq.jpg", 1600, 80),
    ("projects/allied-health-sunshine.jpg", "projects/allied-health-sunshine.jpg", 1600, 78),
    ("projects/ingenia-lakeside.jpg", "projects/ingenia-lakeside.jpg", 1600, 78),
    ("projects/social-housing.jpg", "projects/social-housing.jpg", 1600, 78),
    ("projects/capital-works.jpg", "projects/capital-works.jpg", 1600, 78),
    ("projects/salv-house.jpg", "projects/salv-house.jpg", 1400, 76),
    ("projects/plc-gate.jpg", "projects/plc-gate.jpg", 1400, 76),
]

for src, dst, maxw, q in JOBS:
    sp = os.path.join(PUB, src)
    dp = os.path.join(PUB, dst)
    img = Image.open(sp).convert("RGB")
    w, h = img.size
    if w > maxw:
        img = img.resize((maxw, int(h * maxw / w)), Image.LANCZOS)
    img.save(dp, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"{src}: {os.path.getsize(sp)//1024}KB -> {dst}: {os.path.getsize(dp)//1024}KB ({img.size[0]}x{img.size[1]})")

# remove the big originals that were replaced
for old in ["projects/workplace-hq.png"]:
    p = os.path.join(PUB, old)
    if os.path.exists(p):
        os.remove(p)
        print("removed", old)
