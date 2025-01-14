// popup.js
function loadWordsFromFile(callback) {
  fetch(browser.runtime.getURL("words.txt"))
    .then(response => response.text())
    .then(text => {
      const definitions = {};
      const lines = text.split("\n");
      for (const line of lines) {
        const parts = line.split(":");
        if (parts.length === 2) {
          const word = parts[0].trim().toLowerCase();
          const definition = parts[1].trim();
          definitions[word] = definition;
        }
      }
      callback(definitions);
    })
    .catch(error => {
      console.error("Error loading words.txt:", error);
      callback({});
    });
}

const wordList = document.getElementById("word-list");
let definitions = {};
let isFromContentScript = false; // Flag to track origin

loadWordsFromFile(loadedDefinitions => {
  definitions = loadedDefinitions;
  displayWords(); // Display words when popup is opened directly
});

function displayWords() {
  wordList.innerHTML = ''; // Clear previous content
  for (const key in definitions) {
    const wordDiv = document.createElement("div");
    wordDiv.classList.add("word-key");
    wordDiv.textContent = key;

    const valueDiv = document.createElement("div");
    valueDiv.classList.add("word-value");
    valueDiv.textContent = definitions[key];
    valueDiv.style.display = 'none'; // Initially hide values

    wordDiv.addEventListener("click", () => {
      valueDiv.style.display = valueDiv.style.display === "block" ? "none" : "block";
    });

    wordList.appendChild(wordDiv);
    wordList.appendChild(valueDiv);
  }
}

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.selectedText) {
    isFromContentScript = true;
    const selectedWord = request.selectedText.trim().toLowerCase();
    wordList.innerHTML = '';

    if (definitions.hasOwnProperty(selectedWord)) {
      const wordDiv = document.createElement("div");
      wordDiv.classList.add("word-key");
      wordDiv.textContent = selectedWord;

      const valueDiv = document.createElement("div");
      valueDiv.classList.add("word-value");
      valueDiv.textContent = definitions[selectedWord];
      valueDiv.style.display = 'block';

      wordList.appendChild(wordDiv);
      wordList.appendChild(valueDiv);
    } else {
      const notFoundDiv = document.createElement("div");
      notFoundDiv.id = "not-found";
      notFoundDiv.textContent = "Definition not found for: " + selectedWord;
      wordList.appendChild(notFoundDiv);
    }
  }
});
browser.runtime.onConnect.addListener((port) => {
    port.onDisconnect.addListener(() => {
        isFromContentScript = false;
    });
});
