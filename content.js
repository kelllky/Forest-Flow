function showPopup() {

    chrome.runtime.sendMessage({ action: "openPopup" });
}

// Show the pop-up immediately when the page loads
showPopup();
