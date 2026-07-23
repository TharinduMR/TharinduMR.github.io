
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    
    # Catch console logs
    page.on('console', lambda msg: print(f'CONSOLE: {msg.text}'))
    page.on('pageerror', lambda err: print(f'JS_ERROR: {err}'))
    
    page.goto('http://localhost:8000')
    page.wait_for_timeout(2000)
    
    # Check cursor in DOM
    cursor_el = page.locator('.cb-cursor')
    if cursor_el.count() > 0:
        box = cursor_el.bounding_box()
        print('Cursor Bounding Box:', box)
        print('Cursor Classes:', cursor_el.get_attribute('class'))
        print('Cursor HTML:', cursor_el.evaluate('el => el.outerHTML'))
    else:
        print('NO CURSOR IN DOM!')
        
    browser.close()
