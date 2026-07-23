import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace existing -exclusion on name
html = html.replace('data-cursor="-exclusion"', 'data-cursor="-opaque"')

# Add to h2
def repl_h2(m):
    tag = m.group(0)
    if 'data-cursor' not in tag:
        return tag[:-1] + ' data-cursor="-opaque">'
    return tag

# Add to h3
def repl_h3(m):
    tag = m.group(0)
    if 'data-cursor' not in tag:
        return tag[:-1] + ' data-cursor="-opaque">'
    return tag

html = re.sub(r'<h2[^>]*>', repl_h2, html)
html = re.sub(r'<h3[^>]*>', repl_h3, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated index.html')
