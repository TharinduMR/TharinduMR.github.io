import re

def fix():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    mapping = {
        'Low Velocity Wind Energy Harvesting': 'wind',
        'Design and CFD Analysis of Air &amp; Dirt Separator': 'cfd',
        'Design and CFD Analysis of Air & Dirt Separator': 'cfd',
        'Measuring ECG via Defibrillator': 'ecg',
        'Footstep Power Generation': 'foot',
        'Designing Double wishbone suspension system': 'wish',
        'Design and Fabrication of Motorized Trash Compactor': 'trash'
    }

    for title, modal_id in mapping.items():
        # Avoid double replacing if it's already there
        if f"openModal('{modal_id}')" in html and 'card-link-icon' in html.split(title)[-1][:200]:
            continue
            
        pattern = f'<h3>{title}</h3>\s*</div>'
        replacement = f'<h3>{title}</h3>\n                        <a href="javascript:void(0)" onclick="openModal(\'{modal_id}\')" class="card-link-icon"><i class="fa-solid fa-arrow-right"></i></a>\n                    </div>'
        html = re.sub(pattern, replacement, html)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

fix()
