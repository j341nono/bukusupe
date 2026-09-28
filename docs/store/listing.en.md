# Store listing (English, primary)

Text for the "Store listing" page of the Chrome Web Store developer dashboard (docs/RELEASE.md, stage 3 and the English support moved before 0.9.0).
For version 0.9.1, 2026-09-29. **English is the primary listing** (the manifest's `default_locale` is `en`); the Japanese listing is
[listing.ja.md](listing.ja.md). `scripts/check-store.mjs` checks the lengths and that the name and summary match `public/_locales/en/messages.json`.

Official guidance used:
- Listing fields (name, summary, description, category, language, images): https://developer.chrome.com/docs/webstore/cws-dashboard-listing
- Best practices (summary up to 132 characters, say what it does first, avoid superlatives and mentions of other extensions): https://developer.chrome.com/docs/webstore/best-listing
- Localizing the listing (`_locales` and `default_locale`): https://developer.chrome.com/docs/webstore/i18n

## Name (75 characters or less)

<!-- name:start -->
Bukusupe — Bookmark Space
<!-- name:end -->

Same as `extName` in `public/_locales/en/messages.json` (25 characters). "Bukusupe" is the Japanese nickname of the app (ブクスペ, short for "bookmark space").

## Summary (132 characters or less)

<!-- summary:start -->
Turn your bookmarks into a galaxy of stars and find pages by meaning. Link them into constellations and fly among them.
<!-- summary:end -->

Same as `extDescription` in `public/_locales/en/messages.json` (119 characters; it says what the tool does in the first words and leaves some room under the limit). The store uses the manifest's value, so change `_locales` first.

## Description

<!-- description:start -->
Can't find that page you bookmarked? Bukusupe turns your Chrome bookmarks into a night sky arranged by meaning, so you can find pages even when you don't remember their titles, and rediscover what you saved along the way.

■ A star map arranged by meaning
Bukusupe reads the meaning of each bookmark's title and folder and places related pages near each other. A star's brightness shows when you last touched it: pages you opened recently shine brighter and bluer. Drag to move and scroll to zoom. Click a cluster name to fly to it.

■ Black hole search
Type in the search box and matching stars are pulled into orbit around a black hole. Bukusupe searches by meaning, so pages surface even when the words don't match exactly (it falls back to keyword search while the language model is loading). Press Enter to open the page, and use the browser's Back button to return where you were.

■ Constellations and selection mode
Pick stars, link them with lines, and save them as a named "constellation". In selection mode you can click stars anywhere on the map, or hold Shift and drag to select an area. A constellation keeps exactly the stars you saved; when a bookmark added later matches the constellation's search words, it is shown as a "new star" you can add or dismiss.

■ 3D flight mode
Press F to enter a 3D universe where the stars rise up. Fly a spaceship between clusters; stars you approach open a small window with the site's icon and title. Fly into a star's core to open that page.

■ Privacy
Your bookmarks never leave your browser. Computing meanings, laying out the map, searching, and saving constellations all happen on your computer. The only network access is a one-time download of the language model data from Hugging Face. No analytics, no ads, and nothing is shared with third parties. Bukusupe only reads your bookmarks; it never changes or deletes them.

■ Language
The interface is available in English and Japanese. It follows your browser's language by default, and you can switch it anytime from the ⓘ panel. The model understands both English and Japanese, so you can search in either language.

■ How to use
1. Click the toolbar icon to open the star map in its own tab. Read the first-run note and press "Start" to download the model and compute the map (this takes from tens of seconds to a few minutes).
2. Press / to search, C for selection mode, and F for flight mode. All controls are listed under ⓘ at the top left.
3. If you have only a few bookmarks, you can try a sample universe with 156 stars from the ⓘ panel.

Privacy policy: https://j341nono.github.io/bukusupe/privacy/
Bugs and requests: https://github.com/j341nono/bukusupe/issues
<!-- description:end -->

## Category

- **Productivity > Tools**. A tool for organizing and finding your bookmarks. Check the exact label in the dashboard when entering it.

## Language

- **English (primary)** and Japanese. The interface (`src/i18n/`) and the extension name and summary (`public/_locales/`) come in both languages.
  Add the Japanese listing ([listing.ja.md](listing.ja.md)) as a localized listing in the dashboard.

## Images

`docs/store/assets/` (regenerate with `npm run store:assets`). Screenshots are in English (`en/`) for the primary listing and in Japanese (`ja/`)
for the Japanese listing. Each set's sample universe is shot in the matching language (English or Japanese).
The promotional images cannot differ by language, so they use English text only.

| File | Size | Content |
|---|---|---|
| `en/screenshot-1-map.png` | 1280×800 | The star map (sample universe) |
| `en/screenshot-2-search.png` | 1280×800 | Black hole search |
| `en/screenshot-3-constellation.png` | 1280×800 | A constellation |
| `en/screenshot-4-selection.png` | 1280×800 | Selection mode |
| `en/screenshot-5-flight.png` | 1280×800 | 3D flight mode |
| `promo-small-440x280.png` | 440×280 | Small promo tile (English text only) |
| `promo-marquee-1400x560.png` | 1400×560 | Marquee promo tile (optional, English text only) |
| `icon-128.png` | 128×128 | Store icon (16px transparent margin on each side; the manifest icons are unchanged) |
