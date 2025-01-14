const shortformMap = {
  "btw": "by the way",
  "idk": "I don't know",
  "asap": "as soon as possible"
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "textSelected") {
    const expanded = shortformMap[message.text.toLowerCase()] || "No expansion found.";
    browser.action.setPopup({
      popup: `popup.html?text=${encodeURIComponent(expanded)}`
    });
  }
});

