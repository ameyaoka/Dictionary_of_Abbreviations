document.addEventListener('mouseup', function(event) {
  const selectedText = window.getSelection().toString();
  if (selectedText.trim() !== '') {
    browser.runtime.sendMessage({ selectedText: selectedText });
  }
});
