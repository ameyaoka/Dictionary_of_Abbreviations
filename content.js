document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    console.log("Selected Text:", selectedText); // Debug
    browser.storage.local.set({ selectedText });
  }
});

