#!/usr/bin/env python3
"""Extract readable text content from fetched Elevate pages."""
import re, html as htmllib, glob, os

def html_to_text(raw):
    # remove scripts/styles
    raw = re.sub(r'<script[^>]*>[\s\S]*?</script>', ' ', raw, flags=re.I)
    raw = re.sub(r'<style[^>]*>[\s\S]*?</style>', ' ', raw, flags=re.I)
    raw = re.sub(r'<!--[\s\S]*?-->', ' ', raw)
    # keep img alts
    raw = re.sub(r'<img[^>]+alt=["\']([^"\']*)["\'][^>]*>', r' [IMG: \1] ', raw)
    # headings markers
    raw = re.sub(r'<h([1-6])[^>]*>', lambda m: f'\n\n[H{m.group(1)}] ', raw)
    raw = re.sub(r'</h[1-6]>', '\n', raw)
    raw = re.sub(r'<(p|div|li|br|section)[^>]*>', '\n', raw)
    raw = re.sub(r'<[^>]+>', ' ', raw)
    raw = htmllib.unescape(raw)
    # collapse whitespace
    lines = [re.sub(r'\s+', ' ', l).strip() for l in raw.split('\n')]
    out, prev = [], None
    for l in lines:
        if l and l != prev:
            out.append(l)
        prev = l
    return '\n'.join(out)

os.makedirs('/home/z/my-project/research/text', exist_ok=True)
for f in sorted(glob.glob('/home/z/my-project/research/page_*.html')):
    name = os.path.basename(f).replace('page_', '').replace('.html', '')
    with open(f, encoding='utf-8', errors='ignore') as fh:
        raw = fh.read()
    text = html_to_text(raw)
    # skip header/nav boilerplate: find start after 'Skip to content'
    idx = text.find('Skip to content')
    if idx >= 0:
        text = text[idx:]
    with open(f'/home/z/my-project/research/text/{name}.txt', 'w') as fh:
        fh.write(text)
    print(f'{name}: {len(text)} chars')
