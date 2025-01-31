let abbreviationDictionary = {};

// Load abbreviations from JSON file
fetch(chrome.runtime.getURL('abbrevations.json'))
  .then(response => response.json())
  .then(data => {
    abbreviationDictionary = data;
    initTooltip();
  })
  .catch(error => console.error('Error loading abbreviations:', error));

function initTooltip() {
  const tooltip = document.createElement('div');
  Object.assign(tooltip.style, {
    position: 'absolute',
    display: 'none',
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    border: '2px solid #3498db',
    borderRadius: '4px',
    padding: '8px 12px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    zIndex: '999999',
    maxWidth: '300px',
    lineHeight: '1.4'
  });
  document.body.appendChild(tooltip);

  document.addEventListener('mouseup', handleTextSelection);

  function handleTextSelection(event) {
    const selection = window.getSelection().toString().trim().toUpperCase();
    if (selection && abbreviationDictionary[selection]) {
      showTooltip(event, abbreviationDictionary[selection]);
    }
  }

  function showTooltip(event, meaning) {
    tooltip.textContent = meaning;
    tooltip.style.display = 'block';
    tooltip.style.left = `${event.pageX + 15}px`;
    tooltip.style.top = `${event.pageY + 15}px`;

    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 3000);
  }
}
