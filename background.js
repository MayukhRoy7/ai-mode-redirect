/**
 * AI Mode Redirect – background service worker (v2)
 *
 * Reads the user's chosen search engine and AI mode provider from
 * chrome.storage.sync, then on toolbar-icon click:
 *
 *  • If the active tab is a results page of the SELECTED search engine,
 *    extracts the search query and opens it in the SELECTED AI mode.
 *  • On any other page (including the non-selected search engine),
 *    opens the SELECTED AI mode without a query.
 *
 * Supported search engines: "brave" | "google"
 * Supported AI mode providers: "brave" | "google"
 *
 * Defaults (if not yet configured): searchEngine="brave", aiMode="brave"
 */

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

const SEARCH_ENGINE_HOSTS = {
  brave: "search.brave.com",
  google: "www.google.com",
};

function isSelectedSearchEngine(url, engine) {
  try {
    const parsed = new URL(url);
    if (engine === "brave") {
      return (
        parsed.hostname === SEARCH_ENGINE_HOSTS.brave &&
        parsed.pathname === "/search"
      );
    }
    if (engine === "google") {
      return (
        parsed.hostname === SEARCH_ENGINE_HOSTS.google &&
        parsed.pathname === "/search"
      );
    }
  } catch (_) {
    // non-HTTP tabs (chrome://, about:blank, …)
  }
  return false;
}

function extractQuery(url) {
  try {
    const parsed = new URL(url);
    const q = parsed.searchParams.get("q");
    return q && q.trim() !== "" ? q.trim() : null;
  } catch (_) {
    return null;
  }
}

function buildAiModeUrl(aiMode, query) {
  if (aiMode === "brave") {
    const base = "https://search.brave.com/ask";
    return query
      ? base + "?q=" + encodeURIComponent(query)
      : base;
  }
  // google
  const base = "https://www.google.com/search?udm=50";
  return query
    ? "https://www.google.com/search?q=" +
        encodeURIComponent(query) +
        "&udm=50"
    : base;
}

// ---------------------------------------------------------------------------
// Main click handler
// ---------------------------------------------------------------------------

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get(
    { searchEngine: "brave", aiMode: "brave" },
    ({ searchEngine, aiMode }) => {
      const rawUrl = tab.url || "";
      let query = null;

      if (isSelectedSearchEngine(rawUrl, searchEngine)) {
        query = extractQuery(rawUrl);
      }

      const targetUrl = buildAiModeUrl(aiMode, query);
      chrome.tabs.update(tab.id, { url: targetUrl });
    }
  );
});
