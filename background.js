browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "textSelected") {
    console.log("Received Text:", message.text); // Debug
    browser.storage.local.set({ selectedText: message.text });
    browser.action.setPopup({ popup: "popup.html" });
  }
});

