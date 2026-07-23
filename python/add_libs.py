with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Insert CSS
css_insert = '<link rel="stylesheet" href="css/animate.css">'
html = html.replace('</head>', css_insert + '\n</head>')

# Insert JS
js_insert = '<script src="js/wow.min.js"></script>\n    <script src="js/SmoothScroll.js"></script>'
html = html.replace('<!-- Custom Script -->', js_insert + '\n    <!-- Custom Script -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Added WOW and SmoothScroll to index.html')
