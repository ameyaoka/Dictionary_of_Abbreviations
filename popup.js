document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Retrieve the selected text from storage
    const data = await browser.storage.local.get("selectedText");
    const selectedText = (data.selectedText || "No text selected.").toLowerCase(); // Convert to lowercase for case-insensitive matching
    console.log("Popup Text:", selectedText); // Debug

    // Fetch the words.txt file
    const response = await fetch(browser.runtime.getURL("words.txt"));
    if (!response.ok) throw new Error("Failed to fetch words.txt");

    // Parse the file contents into a key-value map
    const text = await response.text();
    const wordMap = text.split("\n").reduce((map, line) => {
      const [key, value] = line.split(":").map((s) => s.trim());
      if (key && value) map[key.toLowerCase()] = value; // Store keys as lowercase
      return map;
    }, {});

    // Look up the selected text
    const displayText = wordMap[selectedText] || "Unknown";
    document.getElementById("content").textContent = displayText;
  } catch (error) {
    console.error("Error in popup.js:", error);
    document.getElementById("content").textContent = "Error loading data.";
  }
});

