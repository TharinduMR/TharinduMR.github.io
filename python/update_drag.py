import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace <div class="swiper-slide"> with <div class="swiper-slide" data-cursor-text="Drag">
html = html.replace('<div class="swiper-slide">', '<div class="swiper-slide" data-cursor-text="Drag">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated index.html for drag cursor')
