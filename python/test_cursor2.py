from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:8000')
    page.wait_for_timeout(1000)
    
    # Move mouse to trigger update() and show()
    page.mouse.move(500, 500)
    page.wait_for_timeout(500)
    
    cursor_el = page.locator('.cb-cursor')
    if cursor_el.count() > 0:
        box = cursor_el.bounding_box()
        print('Cursor Bounding Box:', box)
        print('Cursor Classes:', cursor_el.get_attribute('class'))
        print('Cursor HTML:', cursor_el.evaluate('el => el.outerHTML'))
    else:
        print('NO CURSOR IN DOM!')
        
    browser.close()
