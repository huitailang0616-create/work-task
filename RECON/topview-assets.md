# Topview Homepage — Asset Inventory

Source: served HTML at https://www.topview.ai/ (SSR) + its 4 CSS files + JSON-LD/RSC payloads embedded in the HTML. Sizes are `curl -sI` Content-Length; for every downloaded file the HEAD size matched the downloaded (GET) size exactly, verified after download. (An earlier HEAD pass through the proxy returned inconsistent values for some URLs; the figures below are from the verified re-run.)

Downloaded files live in `~/workspace/web-clone-test-v2/public/assets/img/topview/` — **17 files, 450,007 bytes total (~439 KB)**, all < 1.5 MB each, well under the 6 MB budget.

## Downloaded

| # | Original URL | Type / role | HEAD size | Downloaded as | Actual size |
|---|---|---|---|---|---|
| 1 | https://topview-frontend.topviewai.app/official-website/public/logos/dark-v2.webp | Logo (og:image, full) | 17,982 | `logo-full.webp` | 17,982 |
| 2 | https://topview-frontend.topviewai.app/official-website/public/logos/dark-v2.webp?x-process=image%2Fresize%2Cw_292%2Fformat%2Cwebp | Logo as rendered in header/footer (146×33, served 292×65) | 3,456 | `logo.png` | 3,456 (served as `image/png` despite the .webp URL — renamed to keep the extension honest; verified 292×65 PNG) |
| 3 | https://topview-frontend.topviewai.app/official-website/public/logos/light-icon-v3-renew.webp | Favicon / app icon (`rel=icon`) | 5,642 | `logo-icon.webp` | 5,642 |
| 4 | https://topview-frontend.topviewai.app/media/images/KgHl27-LpNNkWNrp.webp | Poster — Canvas pillar video (JSON-LD thumbnail) | 60,336 | `showcase-canvas-poster.webp` | 60,336 |
| 5 | https://topview-frontend.topviewai.app/media/images/H3QeiZWlM6hUX5QI.webp | Poster — Drama Studio pillar video | 42,582 | `showcase-drama-poster.webp` | 42,582 |
| 6 | https://topview-frontend.topviewai.app/media/images/NHFSq3qJYcc2Hqtp.webp | Poster — Board pillar video | 59,098 | `showcase-board-poster.webp` | 59,098 |
| 7 | https://topview-frontend.topviewai.app/media/images/3dshot_multi_angle_poster_q7w3e5r9.webp | Poster — 3D Shot Composer video (1280×720) | 23,718 | `showcase-3d-poster.webp` | 23,718 |
| 8 | https://topview-frontend.topviewai.app/media/images/6ZPeIRBK4cOkKy8T.webp | Plugin banner wordmark strip "GPT-6 Astra" (842×202, preloaded) | 111,476 | `plugin-wordmark.webp` | 111,476 |
| 9 | https://topview-frontend.topviewai.app/media/images/5qY0LwrJof05SiwB.jpeg | Plugin slide 1 (854×480, preloaded) | 44,681 | `plugin-slide-1.jpeg` | 44,681 |
| 10 | https://topview-frontend.topviewai.app/media/images/og8BvocX5QtHIh1N.webp | Plugin slide 2 (preloaded) | 26,838 | `plugin-slide-2.webp` | 26,838 |
| 11 | https://topview-frontend.topviewai.app/media/images/VhTwqMze3zl-mqon.webp | Plugin slide 3 | 8,664 | `plugin-slide-3.webp` | 8,664 |
| 12 | https://topview-frontend.topviewai.app/media/images/DLYqaMsd2X-xi7Bt.webp | Plugin slide 4 (854×480) | 28,930 | `plugin-slide-4.webp` | 28,930 |
| 13 | https://topview-frontend.topviewai.app/media/images/18PKzrKGV5X0ATUX.webp | Plugin slide 5 (854×480) | 14,198 | `plugin-slide-5.webp` | 14,198 |
| 14 | /images/model-logo/bytedance-white.svg (via https://lp.topview.ai) | Model-card logo — Seedance/ByteDance (24×24) | 351 | `model-bytedance.svg` | 351 |
| 15 | /images/model-logo/topview-symbol-black.svg (via https://lp.topview.ai) | Model-card logo — Topview T1 symbol (rendered inverted) | 973 | `model-topview-symbol.svg` | 973 |
| 16 | /images/model-logo/wan-white.svg (via https://lp.topview.ai) | Model-card logo — Wan (24×24) | 340 | `model-wan.svg` | 340 |
| 17 | /images/model-logo/minimax-white.svg (via https://lp.topview.ai) | Model-card logo — MiniMax (24×24) | 742 | `model-minimax.svg` | 742 |

All four SVGs verified as real SVG markup. Note: fetching the Topview symbol from www.topview.ai returned an HTML fallback page, so that file (and, for consistency, the other three model logos) was taken from the lp.topview.ai origin, whose HEAD sizes match the downloads exactly.

## Skipped — videos (poster downloaded instead where one exists)

| URL | Type / role | Size (HEAD) | Reason |
|---|---|---|---|
| https://topview-frontend.topviewai.app/media/videos/Eo77Cl7euqCTiTYE.mp4 | Canvas pillar video (JSON-LD `contentUrl`) | 1,115,361 (~1.1 MB) | Video — outside the curated image subset; poster downloaded instead = `showcase-canvas-poster.webp` |
| https://topview-frontend.topviewai.app/media/videos/W9xwa7iSaZ8V5T9O.mp4 | Drama Studio pillar video | 885,594 (~0.9 MB) | Video — outside the curated image subset; poster downloaded instead = `showcase-drama-poster.webp` |
| https://topview-frontend.topviewai.app/media/videos/yXmn4aUepv5972gu.mp4 | Board pillar video | 963,426 (~1.0 MB) | Video — outside the curated image subset; poster downloaded instead = `showcase-board-poster.webp` |
| https://topview-frontend.topviewai.app/seo-videos/572dcbde222c4e2784bf7adb6d4ba2e7/8e7-95ec728a8a31.mp4 | 3D Shot Composer video | 2,455,712 (~2.5 MB) | Video > 1.5 MB — skipped; poster downloaded instead = `showcase-3d-poster.webp` |

Note: no `<video>` tags exist in the SSR HTML at all — these 4 MP4s and their posters are referenced only in the JSON-LD `VideoObject` schema; the player mounts client-side.

## Not downloaded — fonts (recorded, not image assets)

| URL | Family | HEAD size |
|---|---|---|
| https://lp.topview.ai/_next/static/media/198f51926e9fc6dc-s.p.woff2 | Darker Grotesque (latin, preloaded) | 24,016 |
| https://lp.topview.ai/_next/static/media/26d0ba92e140f0dc-s.p.woff2 | Instrument Sans (latin, preloaded) | 29,904 |
| https://lp.topview.ai/_next/static/media/7b0b24f36b1a6d0b-s.p.woff2 | Outfit (latin, preloaded) | 32,228 |
| https://lp.topview.ai/_next/static/media/98848575513c9742-s.woff2 | Outfit (latin-ext, @font-face only) | not sized |
| https://lp.topview.ai/_next/static/media/4fcf11d1ef75d758-s.woff2 | Darker Grotesque (vietnamese subset) | not sized |
| https://lp.topview.ai/_next/static/media/1240183dc2a04bc0-s.woff2 | Darker Grotesque (latin-ext subset) | not sized |
| https://lp.topview.ai/_next/static/media/adb45196eddef626-s.woff2 | Instrument Sans (latin-ext, @font-face only) | not sized |

## Not downloaded — other referenced URLs

| URL / path | Context | Note |
|---|---|---|
| /avatar/trustpilot-minh.webp, /avatar/trustpilot-nuna-business.webp, /avatar/trustpilot-rune-trasop.webp, /avatar/trustpilot-j-robert-ormond.webp, /avatar/trustpilot-alperen-hayder-karamus.webp, /avatar/trustpilot-taskophilus-tanner.webp | Testimonial avatars, referenced only as relative paths in the RSC payload (base origin ambiguous — lp.topview.ai / www.topview.ai) | Small reviewer avatars; skipped to keep the set curated (logo + hero/plugin + showcase only) |
| CSS `url(...)` references | The 4 CSS files contain **no image backgrounds** — every `url()` in CSS is one of the 7 woff2 fonts above | — |
| Inline-style / Tailwind backgrounds | All section/card backgrounds are CSS gradients (documented in topview-recon.md), no background-image files | — |

## Coverage caveats

- The SSR HTML contains only **12 `<img>` elements** (logo ×2, 4 model logos, plugin wordmark + 5 plugin slides). Everything else visual — quick-start cards (`#home-agent-quick-starts`), feature cases (`#home-feature-cases`), testimonial carousel media, pillar `<video>` elements — is client-fetched and has **no URLs anywhere in the served HTML, CSS, JSON-LD, or RSC payload**, so it cannot be inventoried without executing JS in a live browser.
- `srcset` is not used anywhere on the page (single `src` per image); there are no `poster` attributes in SSR (posters exist only as JSON-LD `thumbnailUrl`).
