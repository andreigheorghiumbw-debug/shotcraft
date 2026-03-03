const result = JSON.parse(localStorage.getItem('shotcraft_result'));

if (result) {
    const img = document.getElementById('screenshot-img');
    const container = document.getElementById('canvas-container');
    const chromeBar = document.getElementById('browser-chrome');
    
    img.src = result.dataUrl;
    container.style.background = result.gradient;
    
    // Default Style
    let mockupStyle = "border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);";
    
    if (result.mockup === 'browser') {
        chromeBar.style.display = 'flex';
        mockupStyle = "border-radius: 0 0 12px 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid #dadce0; border-top: none; width: 800px; height: auto;";
        chromeBar.style.cssText = "background: #f1f3f4; border-radius: 12px 12px 0 0; padding: 10px 15px; border: 1px solid #dadce0; border-bottom: none; display: flex; gap: 8px; align-items: center; width: 770px;";
    } else if (result.mockup === 'iphone') {
        // iPhone "Perfect Fit" for Mobile Simulation
        container.style.padding = "80px 40px";
        mockupStyle = "border-radius: 40px; border: 14px solid #1a1a1a; box-shadow: 0 30px 60px rgba(0,0,0,0.5); width: 320px; height: auto; display: block; background: #000;";
        chromeBar.style.display = 'none';
    } else {
        chromeBar.style.display = 'none';
        mockupStyle += " width: 800px; height: auto;";
    }
    
    img.style.cssText = mockupStyle;
}

document.getElementById('downloadBtn').addEventListener('click', () => {
    window.print();
});

document.getElementById('closeBtn').addEventListener('click', () => {
    window.close();
});