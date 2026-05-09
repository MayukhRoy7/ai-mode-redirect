# AI Mode Redirect

A Chromium extension (Manifest V3) for **Brave** (and any Chromium-based browser) that redirects you to your preferred **AI mode** with a single click of the pinned toolbar icon.

Both the **search engine** and the **AI mode provider** are configurable via the built-in options/settings page.

---

## Features

- **Configurable search engine** – Brave Search or Google Search (only one active at a time)
- **Configurable AI mode provider** – Brave AI Mode or Google AI Mode (only one active at a time)
- **Smart query forwarding** – when you click the icon on a results page of your *selected* search engine, the current search term is automatically forwarded to the selected AI mode
- **Universal fallback** – clicking the icon on any other page (including the non-selected search engine) opens the selected AI mode without a query

---

## Behaviour

| Where you are | What happens |
|---|---|
| Results page of the **selected search engine** | Extracts your query and opens it in the **selected AI mode** |
| Any **other** page (non-selected engine, blank tab, etc.) | Opens the **selected AI mode** without a pre-filled query |

### Examples

**Config: Brave Search + Brave AI Mode**

You search for *oxidized* on Brave Search:
```
https://search.brave.com/search?q=oxidized&source=desktop
```
Clicking the icon takes you to:
```
https://search.brave.com/ask?q=oxidized
```

**Config: Google Search + Google AI Mode**

You search for *oxidized* on Google:
```
https://www.google.com/search?q=oxidized
```
Clicking the icon takes you to:
```
https://www.google.com/search?q=oxidized&udm=50
```

**Config: Brave Search + Google AI Mode** (mixed)

You search for *oxidized* on Brave Search:
```
https://search.brave.com/search?q=oxidized
```
Clicking the icon takes you to:
```
https://www.google.com/search?q=oxidized&udm=50
```

---

## Settings / Options Page

Right-click the toolbar icon and choose **Options** (or go to `brave://extensions` → AI Mode Redirect → **Details** → **Extension options**) to open the settings page.

### Search Engine

| Option | Detects queries on |
|---|---|
| **Brave Search** *(default)* | `search.brave.com/search?q=…` |
| **Google Search** | `google.com/search?q=…` |

Only one search engine can be active at a time.

### AI Mode Provider

| Option | Redirects to |
|---|---|
| **Brave AI Mode** *(default)* | `https://search.brave.com/ask?q=…` |
| **Google AI Mode** | `https://www.google.com/search?q=…&udm=50` |

Only one AI mode provider can be active at a time.

Settings are synced across devices via your browser account.

---

## Installation (unpacked extension)

1. Download or clone this repository.
2. Open Brave (or Chrome/Edge) and navigate to `brave://extensions` (or `chrome://extensions`).
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the root folder of this repository (the folder that contains `manifest.json`).
5. The icon will appear in your toolbar — pin it for quick access.
6. *(Optional)* Right-click the icon → **Options** to configure your preferred search engine and AI mode provider.

---

## File structure

```
ai-mode-redirect/
├── manifest.json   # Extension manifest (Manifest V3)
├── background.js   # Service worker – handles icon click logic
├── options.html    # Settings/config page
├── options.js      # Settings page logic (save & load preferences)
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Permissions used

| Permission | Reason |
|---|---|
| `activeTab` | Read the URL of the currently active tab when the icon is clicked |
| `tabs` | Navigate the current tab to the target URL |
| `storage` | Persist and sync the user's chosen search engine and AI mode provider |
