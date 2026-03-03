document.getElementById('captureTab').addEventListener('click', async () => {
  const gradient = document.getElementById('gradientSelect').value;
  const mockup = document.getElementById('mockupSelect').value;
  
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (mockup === 'iphone') {
    // 1. Create a "Mobile Simulator" Window
    // Using a standard window with specific mobile dimensions
    chrome.windows.create({
      url: tab.url,
      width: 400,
      height: 850,
      type: 'popup',
      focused: true
    }, (mobileWindow) => {
      const newTabId = mobileWindow.tabs[0].id;

      // 2. Wait for it to load, then capture
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === newTabId && info.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          
          // 3. Wait for the mobile layout to settle (2s)
          setTimeout(() => {
            // We use the windowId to specifically capture the ghost window
            chrome.tabs.captureVisibleTab(mobileWindow.id, {format: 'png'}, (dataUrl) => {
              if (chrome.runtime.lastError || !dataUrl) {
                console.error("Capture failed:", chrome.runtime.lastError);
                alert("Capture failed. Please ensure the extension has permission to access all sites in chrome://extensions.");
                chrome.windows.remove(mobileWindow.id);
              } else {
                saveAndPreview(dataUrl, gradient, mockup);
                chrome.windows.remove(mobileWindow.id);
              }
            });
          }, 2000);
        }
      });
    });
  } else {
    // Standard capture for Browser/None
    chrome.tabs.captureVisibleTab(null, {format: 'png'}, (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        alert("Permission error. Please reload the extension.");
        return;
      }
      saveAndPreview(dataUrl, gradient, mockup);
    });
  }
});

function saveAndPreview(dataUrl, gradient, mockup) {
  const resultData = { dataUrl, gradient, mockup };
  localStorage.setItem('shotcraft_result', JSON.stringify(resultData));
  chrome.tabs.create({ url: chrome.runtime.getURL('preview.html') });
}

document.getElementById('bentoBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('bento.html') });
});