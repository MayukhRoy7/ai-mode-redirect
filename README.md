# AI Mode Redirect

A Chromium extension (Manifest V3) for **Brave**, **Chrome**, **Edge**, and any other Chromium-based browser that sends you straight to **Google AI Mode** with a single click of the pinned toolbar icon.

## Behaviour

| Where you are | What happens |
|---|---|
| Any page that is **not** a Google Search results page | Opens **Google AI Mode** (`google.com/search?udm=50`) in the current tab |
| A **Google Search** results page (`google.com/search?q=<term>…`) | Extracts your search term and re-opens it in **Google AI Mode** (`google.com/search?q=<term>&udm=50`) in the current tab |

### Example

You search for **oxidized** on Google:
```
https://www.google.com/search?q=oxidized
```
Clicking the icon takes you to:
```
https://www.google.com/search?q=oxidized&udm=50
```

---

## Installation (unpacked extension)

1. Download or clone this repository.
2. Open Brave (or Chrome/Edge) and navigate to `brave://extensions` (or `chrome://extensions`).
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the root folder of this repository (the folder that contains `manifest.json`).
5. The **AI** icon will appear in your toolbar — pin it for quick access.

---

## File structure

```
ai-mode-redirect/
├── manifest.json   # Extension manifest (Manifest V3)
├── background.js   # Service worker – handles icon click logic
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