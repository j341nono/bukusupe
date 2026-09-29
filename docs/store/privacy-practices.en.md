# Privacy practices (dashboard "Privacy" tab), English

For version 0.9.0, 2026-09-28. The English version of [privacy-practices.md](privacy-practices.md) (which has the same answers with Japanese notes and
the official sources). Enter these texts in the dashboard. `scripts/check-store.mjs` checks that the permission table matches the distributed manifest
one-to-one and that the install warnings below match what Chrome shows.

---

## 1. Single purpose description

> Bukusupe shows the user's Chrome bookmarks as a map of stars arranged by meaning, so the user can browse, search, and revisit their own bookmarks,
> group chosen bookmarks into saved "constellations", and open a bookmark from the map. All processing happens locally in the browser.

---

## 2. Permission justification

The distributed manifest (`dist/manifest.json`) requests three permissions: `bookmarks`, `unlimitedStorage`, and `favicon`. There are no `host_permissions`.

<!-- permissions:start -->
| Permission | Justification |
|---|---|
| `bookmarks` | Reads the user's bookmarks (title, URL, folder, date added, date last used) to draw them as stars on the map and to search them. The extension only reads bookmarks and listens for bookmark changes to keep the map up to date; it never creates, edits, moves, or deletes bookmarks. |
| `unlimitedStorage` | Stores, inside the browser, the computed meaning vectors (embeddings) for each bookmark, the map layout, the user's constellations, and the downloaded language model data (about 135 MB), which can exceed the default storage quota. The model version is pinned to a commit and every model file is verified against a recorded SHA-256 hash before use, including cached files. Bookmark data stays on the device. |
| `favicon` | Shows each site's icon in flight mode using the icons Chrome already has on the device (the `_favicon` URL). The extension never fetches icons from the network. |
<!-- permissions:end -->

---

## 3. Install warnings

The warnings Chrome shows when installing (English Chrome), derived from the distributed manifest with `chrome.management.getPermissionWarningsByManifest`.

<!-- warnings:start -->
- "Read and change your bookmarks": from the `bookmarks` permission. Chrome words it as "read and change", but Bukusupe only reads bookmarks and never changes or deletes them (same explanation in the table above, the README, and the privacy policy).
- "Read the icons of the websites you visit": from the `favicon` permission. Bukusupe only shows icons Chrome already has on the device and never fetches them from the network.
<!-- warnings:end -->

`unlimitedStorage` shows no warning. Because there are no `host_permissions`, "Read and change all your data on all websites" is not shown.

---

## 4. Remote code

Choose: **No, I am not using remote code**.

> All JavaScript and WebAssembly (including the ONNX Runtime used to run the language model) are bundled in the extension package; nothing
> executable is loaded from the network, and there is no eval or dynamic script loading. The only network access is a one-time download of the data
> files of a fixed, publicly available text-embedding model (Xenova/multilingual-e5-small: weights, tokenizer and configuration) from Hugging Face.
> The model is pinned to a specific commit, and each file's SHA-256 hash is checked before use, including cached copies. These files are data
> (JSON and model weights) consumed by the bundled runtime; they do not change the extension's logic.

---

## 5. Data usage

Bookmarks have titles, URLs, and last-used dates, which fall under "web browsing activity" in the user data FAQ. Disclosure is required even when data
is only processed and stored on the device (user data FAQ, question 3).

| Data type | Check | Reason |
|---|---|---|
| Web history | **Yes** | Reads bookmark URLs, titles, and last-used dates and processes and stores them on the device |
| Personally identifiable information | No | Not handled |
| Health / Financial and payment / Authentication information | No | Not handled |
| Personal communications | No | Not handled |
| Location | No | Not handled (Hugging Face sees the IP address when the model is downloaded, but Bukusupe receives nothing) |
| User activity | No | Clicks and typing are not recorded or sent |
| Website content | No | The content of bookmarked pages is not read |

Certifications (check all three):

- I do not sell or transfer user data to third parties, outside of the approved use cases.
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
- I do not use or transfer user data to determine creditworthiness or for lending purposes.

Limited Use statement: the privacy policy page (English and Japanese) states *"The use of information received from Google APIs will adhere to the
Chrome Web Store User Data Policy, including the Limited Use requirements."*

Privacy policy URL: https://j341nono.github.io/bukusupe/privacy-policy.html

---

## 6. Disclosure and consent

On first open, Bukusupe explains that bookmarks are processed only on the device and never sent out, that about 135 MB of model data is downloaded from
Hugging Face, and links to the privacy policy. Nothing is downloaded or processed until the user presses "Start"; the consent is stored on the device.
The first-run screen and the rest of the interface are available in English and Japanese (a language menu is on the first-run screen and in the ⓘ panel).
