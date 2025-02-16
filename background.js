
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed!');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openPopup") {
      chrome.windows.create({
          url: chrome.runtime.getURL("popup.html"),
          type: "popup",
          width: 320,
          height: 230
      });
  }
});

// Predefined list of negative keywords
const negativeKeywords = ["fat", "ugly", "stupid", "dumb", "hate", "loser", "pathetic", "kill", "brat", "crybaby", "jerk", "idiot", 
    "lame", "dork", "nerd", "geek", "weirdo", "freak", "creep", "psycho", "mad", "annoying", "unloved", "unwanted", "unworthy"];

// Listen for when the active tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active && tab.url) {
      if (tab.url.startsWith('http') || tab.url.startsWith('https')) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: checkNegativeKeywords,
          args: [negativeKeywords]
        });
      }
    }
  });

function checkNegativeKeywords(keywords) {
  const bodyText = document.body.innerText.toLowerCase();
  let found = [];

  keywords.forEach(keyword => {
    let regex = new RegExp(`\\b${keyword}\\b`, 'gi'); // Use word boundaries
    if (regex.test(bodyText)) {
      found.push(keyword);
    }
  });

  if (found.length > 0) {
    function showPopup() {

        chrome.runtime.sendMessage({ action: "openPopup" });
    
        let popup = document.createElement("div");
        popup.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ffcc00;
                padding: 15px;
                border-radius: 10px;
                font-size: 16px;
                font-weight: bold;
                box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
                z-index: 10000;
            ">
                🚨 This page has negative language, please be careful!
            </div>
        `;
    
        document.body.appendChild(popup);
    
        setTimeout(() => popup.remove(), 5000); // Auto-remove after 5 seconds
    }

    showPopup();
  }
}
