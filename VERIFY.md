# Verification — web-clone-test-v2 (2026-11-05)

All checks run locally against the built files; no live browser was available
in this environment, so no screenshot/console verification was performed
(recorded as a gap in README.md).

## JS syntax
- `node --check public/assets/topview.js` — OK
- `node --check public/assets/ugc.js` — OK
- `node --check public/assets/inspiration-data.js` — OK

## HTML tag balance (parser walk, void elements excluded)
- `public/index.html` — no errors, nothing unclosed
- `public/ugc-ads/index.html` — no errors, nothing unclosed

## HTTP smoke test
`python3 -m http.server 8791 --directory public`, then requested:
- `/` and `/ugc-ads/`
- every `/assets/...` URL referenced by either HTML file (src/href)
- every thumbnail URL inside `inspiration-data.js`
- every font URL referenced by the two CSS files

Result: **60 URLs checked, all returned 200, zero failures.**

## Bundle
- `public/` total: 5,549,840 bytes (~5.3 MB), 75 files — under the ~15 MB cap.
- Largest items: 3 pillar MP4s (1,115,361 / 963,426 / 885,594 B), LumeFlow
  inspiration thumbnails (23 JPGs), Albert Sans variable font (128,420 B).

## Recon artefacts checked in
- `RECON/topview-recon.md`, `RECON/topview-assets.md`
- `RECON/lume-recon.md`, `RECON/lume-assets.md`
- `RECON/served/topview.html` (456,319 B), `RECON/served/lume.html` (103,389 B)
