document.addEventListener('DOMContentLoaded', () => {
  const abbreviationList = document.getElementById('abbreviation-list');
  
  fetch(chrome.runtime.getURL('abbreviations.json'))
    .then(response => response.json())
    .then(data => populateList(data))
    .catch(error => console.error('Error loading abbreviations:', error));

  function populateList(abbreviationData) {
    abbreviationList.innerHTML = '';
    Object.entries(abbreviationData).forEach(([abbreviation, meaning]) => {
      const listItem = document.createElement('div');
      listItem.className = 'abbreviation-item';
      listItem.innerHTML = `
        <span class="abbreviation">${abbreviation}</span>
        <span class="meaning">${meaning}</span>
      `;
      abbreviationList.appendChild(listItem);
    });
  }
});
