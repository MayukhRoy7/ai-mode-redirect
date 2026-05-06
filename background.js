/**
 * AI Mode Redirect – background service worker
 *
 * Behaviour when the toolbar icon is clicked:
 *  • If the active tab is a Brave Search results page
 *    (https://search.brave.com/search?q=<term>…), the search term is
 *    extracted and the tab is navigated to Google AI Mode with that query.
 *  • On any other page, the tab is navigated to the bare Google AI Mode URL.
 */

const GOOGLE_AI_MODE_BASE = "https://www.google.com/search?udm=50";

chrome.action.onClicked.addListener((tab) => {
  const rawUrl = tab.url || "";

  let targetUrl = GOOGLE_AI_MODE_BASE;

  try {
    const url = new URL(rawUrl);

    // Detect Brave Search results page
    if (
      url.hostname === "search.brave.com" &&
      url.pathname === "/search"
    ) {
      const query = url.searchParams.get("q");
      if (query && query.trim() !== "") {
        targetUrl =
          "https://www.google.com/search?q=" +
          encodeURIComponent(query.trim()) +
          "&udm=50";
      }
    }
  } catch (_) {
    // new URL() throws for non-HTTP tabs (e.g. chrome://, about:blank).
    // In those cases we fall through and open the bare AI Mode URL.
  }

  chrome.tabs.update(tab.id, { url: targetUrl });
});
