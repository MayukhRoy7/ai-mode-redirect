/**
 * AI Mode Redirect – options page script
 *
 * Loads saved settings from chrome.storage.sync on page load and saves
 * the user's selections back to storage when "Save Settings" is clicked.
 */

const DEFAULTS = { searchEngine: "brave", aiMode: "brave" };

function getRadioValue(name) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : null;
}

function setRadioValue(name, value) {
  const el = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (el) el.checked = true;
}

// Load saved settings
chrome.storage.sync.get(DEFAULTS, ({ searchEngine, aiMode }) => {
  setRadioValue("searchEngine", searchEngine);
  setRadioValue("aiMode", aiMode);
});

// Save settings on button click
document.getElementById("save-btn").addEventListener("click", () => {
  const searchEngine = getRadioValue("searchEngine");
  const aiMode = getRadioValue("aiMode");

  if (!searchEngine || !aiMode) return;

  chrome.storage.sync.set({ searchEngine, aiMode }, () => {
    const status = document.getElementById("status");
    status.classList.add("visible");
    setTimeout(() => status.classList.remove("visible"), 2000);
  });
});
