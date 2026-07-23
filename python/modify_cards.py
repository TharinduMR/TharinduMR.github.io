import re
import sys

def modify_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find all project cards and their modal IDs
    # The structure has <div class="project-card glass-card"> ... <h3>TITLE</h3> ... <button ... onclick="openModal('ID')">More Info</button>
    
    # We will use regex to find each card
    pattern = r'(<div class="project-header">\s*<div class="project-icon">.*?</div>\s*<h3>.*?</h3>\s*</div>)(.*?)(<button class="btn secondary"[^>]*onclick="openModal\(\'(.*?)\'\)"[^>]*>More Info</button>)'
    
    def replacer(match):
        header_block = match.group(1)
        middle_content = match.group(2)
        button_block = match.group(3)
        modal_id = match.group(4)
        
        # Inject the icon link into the header block right before the closing </div> of project-header
        new_icon = f'\n                          <a href="javascript:void(0)" onclick="openModal(\'{modal_id}\')" class="card-link-icon"><i class="fa-solid fa-arrow-right"></i></a>'
        new_header = header_block.replace('</h3>\n                      </div>', f'</h3>{new_icon}\n                      </div>')
        
        return new_header + middle_content
        
    new_html = re.sub(pattern, replacer, html, flags=re.DOTALL)
    
    # Now add the swiper navigation arrows after the swiper-wrapper
    nav_html = '''            </div><!-- end swiper-wrapper -->
            <div class="project-swiper-nav">
                <div class="swiper-button-prev project-nav-btn"></div>
                <div class="swiper-button-next project-nav-btn"></div>
            </div>'''
            
    new_html = new_html.replace('            </div><!-- end swiper-wrapper -->', nav_html)
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
        
    print("HTML modified successfully.")

if __name__ == '__main__':
    modify_html()
