# LumeFlow UGC Ads — asset inventory

Method: every image/icon URL referenced by the served HTML, the 19 CSS files, and the page-relevant JS chunks
(`B8Kmvq6N.js`, `Dp1JCQ0d.js`, `Ed8kKwCA.js`, `BUKaSRqx.js`) was extracted, then sized with `curl -sI`.
All URLs below returned HTTP 200 unless noted. Sizes are the `Content-Length` from the HEAD response
(downloaded files were verified against them).

Downloaded subset lives in `~/workspace/web-clone-test-v2/public/assets/img/lume/` —
**44 files, 1,750,997 bytes total (≈1.71 MB)**, every file < 800 KB, total < 3 MB as required.

## Downloaded (44 files)

### Brand / chrome

| URL | Type | Size (B) | Downloaded as |
|---|---|---|---|
| https://images.lumeflow.ai/lumeflowen/assets/common/LumeFlow.svg | image/svg+xml | 3,410 | logo-lumeflow.svg |
| https://images.lumeflow.ai/lumeflowen/assets/common/lumeflow-official-logo.svg | image/svg+xml | 32,534 | logo-lumeflow-official.svg |
| https://www.lumeflow.ai/app/favicon.ico | image/vnd.microsoft.icon | 15,406 | favicon.ico |
| https://images.lumeflow.ai/lumeflowen/assets/common/empty-image.png | image/png | 21,339 | empty-image.png |

### UGC form / model icons

| URL | Type | Size (B) | Downloaded as |
|---|---|---|---|
| (inline `data:image/png;base64,…` in `BUKaSRqx.js` — the Seedance model icon, 36×36 PNG, base64-decoded) | image/png | 967 | model-icon-seedance.png |
| https://www.lumeflow.ai/app/_nuxt/pix-verse.BXMQhTqp.svg | image/svg+xml | 91,524 | model-icon-pixverse.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/language.svg | image/svg+xml | 2,425 | language-icon.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/product-cover.webp | image/webp | 17,494 | product-cover.webp |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/avatar-01.png | image/png | 3,219 | avatar-preview-01.png |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/avatar-02.png | image/png | 3,481 | avatar-preview-02.png |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/avatar-03.png | image/png | 3,092 | avatar-preview-03.png |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/avatar-04.png | image/png | 557 | avatar-preview-04.png |

### Product-link platform icons (Product modal "Supported Links", `creatify-supports-*`)

| URL | Type | Size (B) | Downloaded as |
|---|---|---|---|
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/creatify-supports-01.svg | image/svg+xml | 8,052 | supported-link-01.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/creatify-supports-02.svg | image/svg+xml | 4,298 | supported-link-02.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/creatify-supports-03.svg | image/svg+xml | 3,607 | supported-link-03.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/creatify-supports-04.svg | image/svg+xml | 2,373 | supported-link-04.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/creatify-supports-06.svg | image/svg+xml | 3,120 | supported-link-06.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/creatify-supports-07.svg | image/svg+xml | 8,218 | supported-link-07.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/creatify-supports-08.svg | image/svg+xml | 1,746 | supported-link-08.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/creatify-supports-09.svg | image/svg+xml | 802 | supported-link-09.svg |
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/creatify-supports-more.svg | image/svg+xml | 315 | supported-link-more.svg |

(Note: there is no `creatify-supports-05.svg` in the source array — numbering jumps 04 → 06 in `B8Kmvq6N.js`.)

### Inspiration thumbnails (all 23, from the ugc-inspiration-list API; 720×1280 JPEG)

| URL | Type | Size (B) | Downloaded as |
|---|---|---|---|
| https://ssr.iappsign.com/lume_flow/admin/652b7ffdfd151545f1f07c0be00e3e17.jpg | image/jpeg | 50,596 | inspiration-pet-try-on.jpg |
| https://ssr.iappsign.com/lume_flow/admin/d962662cd880b1128b3dcc6ff3790340.jpg | image/jpeg | 68,616 | inspiration-ramen-review.jpg |
| https://ssr.iappsign.com/lume_flow/admin/c5d6f47efa10560dd615a89f39149dfd.jpg | image/jpeg | 67,872 | inspiration-whiteboard-headphone-review.jpg |
| https://ssr.iappsign.com/lume_flow/admin/9b92493162c1da409f6f0bc096bf366a.jpg | image/jpeg | 56,423 | inspiration-outfit-try-on.jpg |
| https://ssr.iappsign.com/lume_flow/admin/a4d3eb32942b83cfc110f1c646bb8bbd.jpg | image/jpeg | 74,031 | inspiration-press-on-nails-try-on.jpg |
| https://ssr.iappsign.com/lume_flow/admin/0e7a017212006338ad936ee0533a9fe9.jpg | image/jpeg | 78,380 | inspiration-cookie-ad.jpg |
| https://ssr.iappsign.com/lume_flow/admin/a6f7c07f7bc7c6b7c7855a12d2be6ca4.jpg | image/jpeg | 52,434 | inspiration-gym-ad.jpg |
| https://ssr.iappsign.com/lume_flow/admin/e3574a0fe98e55b7ceae2bb33dc69a19.jpg | image/jpeg | 86,626 | inspiration-lash-comparison.jpg |
| https://ssr.iappsign.com/lume_flow/admin/a95a7506dd67a70a6a023603fc15f8d6.jpg | image/jpeg | 56,612 | inspiration-blush-transformation.jpg |
| https://ssr.iappsign.com/lume_flow/admin/d87ea4cb405a237dd885515b70a033ae.jpg | image/jpeg | 55,172 | inspiration-hat-try-on.jpg |
| https://ssr.iappsign.com/lume_flow/admin/b28bf5ba2875af2916ad55925172028e.jpg | image/jpeg | 89,411 | inspiration-leopard-bag-showcase.jpg |
| https://ssr.iappsign.com/lume_flow/admin/0d92bc9161e3a568572d32476d39aef3.jpg | image/jpeg | 62,033 | inspiration-streetwear-try-on.jpg |
| https://ssr.iappsign.com/lume_flow/admin/20d141de48e3489af187c6f1321ac4e2.jpg | image/jpeg | 78,547 | inspiration-asmr-unboxing.jpg |
| https://ssr.iappsign.com/lume_flow/admin/ca26e6f9417725d88b72763a8908c86b.jpg | image/jpeg | 50,773 | inspiration-30sec-glow-up.jpg |
| https://ssr.iappsign.com/lume_flow/admin/434ab61515dda52717476af8ff24c83e.jpg | image/jpeg | 61,383 | inspiration-quiet-blend.jpg |
| https://ssr.iappsign.com/lume_flow/admin/2ff0c4f5ff058172970b197b5d981f18.jpg | image/jpeg | 81,873 | inspiration-party-crash-munch.jpg |
| https://ssr.iappsign.com/lume_flow/admin/3f89af39afbb5db70af916eeaa33f1d1.jpg | image/jpeg | 53,278 | inspiration-mirror-fit-flex.jpg |
| https://ssr.iappsign.com/lume_flow/admin/bc1acfe245992e24982a807216eed6e4.jpg | image/jpeg | 55,581 | inspiration-beard-asmr-fix.jpg |
| https://ssr.iappsign.com/lume_flow/admin/af99c37a472e96f9bf5a55cb613a9697.jpg | image/jpeg | 60,419 | inspiration-hunt-panic-fix.jpg |
| https://ssr.iappsign.com/lume_flow/admin/58eeb0904fcd1cb25dfce6fb0a1a23f5.jpg | image/jpeg | 68,493 | inspiration-unbox-glow-moment.jpg |
| https://ssr.iappsign.com/lume_flow/admin/42a86aa3afc30eb0e271fed1ba0bf65a.jpg | image/jpeg | 79,003 | inspiration-sky-sip-stunt.jpg |
| https://ssr.iappsign.com/lume_flow/admin/c16776099251ac2dbb875e887b230253.jpg | image/jpeg | 64,278 | inspiration-gympre-vibe.jpg |
| https://ssr.iappsign.com/lume_flow/admin/afb93b5c304171be80a09fecdded215c.jpg | image/jpeg | 71,184 | inspiration-gummy-glow-routine.jpg |

## Inventoried but skipped

| URL | Type | Size (B) | Reason skipped |
|---|---|---|---|
| https://images.lumeflow.ai/lumeflowen/assets/ai-commercial/product-cover.png | image/png | 50,231 | PNG twin of the downloaded product-cover.webp |
| https://images.lumeflow.ai/lumeflowen/assets/common/fonts/AlbertSans-VariableFont_wght.ttf | font (octet-stream) | 128,420 | Font, not an image; URL recorded in lume-recon.md §1 if the clone wants the real font |
| https://images.lumeflow.ai/lumeflowen/assets/common/fonts/AlbertSans-Italic-VariableFont_wght.ttf | font | 141,380 | Same as above |
| https://images.lumeflow.ai/lumeflowen/assets/common/fonts/AlbertSans-{Thin,ExtraLight,Light,Regular,Medium,SemiBold,Bold,ExtraBold,Black}{,Italic}.ttf (18 files) | font | 47,428–53,048 each | Static weights; variable font above supersedes them |
| https://images.lumeflow.ai/lumeflowen/assets/mycreations/diamond.svg | image/svg+xml | 285,265 | Header credits diamond icon — very large for an icon (embedded raster); clone can use a small substitute |
| https://images.lumeflow.ai/lumeflowen/model-icon/svg/hailuo.svg | image/svg+xml | 441,948 | Other-model icon, not used on this page; also near size cap |
| https://www.lumeflow.ai/app/_nuxt/kling.CzM528ev.svg | image/svg+xml | 11,686 | Other-model icon (Kling), not in this page's model list |
| https://www.lumeflow.ai/app/_nuxt/veo.Cm9sboSC.svg | image/svg+xml | 24,853 | Other-model icon (Veo), not used here |
| https://www.lumeflow.ai/app/_nuxt/venus.C5gi8FOC.svg | image/svg+xml | 59,242 | Other-model icon, not used here |
| https://www.lumeflow.ai/app/_nuxt/videu.02MWBULS.svg | image/svg+xml | 5,837 | Other-model icon, not used here |
| https://www.lumeflow.ai/app/_nuxt/create-a-meme-with-lumeflow-ai.CulE9RIU.svg | image/svg+xml | 8,128 | Other-tool icon, not used here |
| https://images.lumeflow.ai/lumeflowen/model-icon/svg/nanobanana.png | image/png | 1,373 | Notice-bar promo icon only (bar is hidden by default) |
| https://images.lumeflow.ai/lumeflowen/assets/common/gpt-image2-logo.png | image/png | 531 | Notice-bar promo only |
| https://images.lumeflow.ai/lumeflowen/assets/common/notice-gpt-logo.webp | image/webp | 6,824 | Notice-bar promo only |
| https://images.lumeflow.ai/lumeflowen/assets/common/gpt-image-tag-2.5.png / .webp | png/webp | 2,336 / 1,094 | Notice-bar / other-page promo tag |
| https://images.lumeflow.ai/lumeflowen/assets/common/seedance2.5-tag.png / .webp | png/webp | 7,330 / 2,578 | Promo tag for a different model, not this page's form |
| https://images.lumeflow.ai/lumeflowen/images/homepage/chatgpt-text.webp | image/webp | 2,290 | Notice-bar background art (homepage promo) |
| https://images.lumeflow.ai/lumeflowen/images/homepage/nano-banana-noticebar.webp | image/webp | 5,254 | Notice-bar background art |
| https://images.lumeflow.ai/lumeflowen/images/homepage/nono-banana-noticebar-01.png / .webp | png/webp | 7,257 / 5,158 | Notice-bar background art |
| https://images.lumeflow.ai/lumeflowen/assets/common/beta.png | image/png | 907 | Generic site badge, not visible in this page's form |
| https://images.lumeflow.ai/lumeflowen/assets/common/vip-crown.png | image/png | 4,417 | Pricing/history VIP badge; not part of the UGC form |
| https://images.lumeflow.ai/lumeflowen/assets/index/default-avatar.svg | image/svg+xml | 618 | Logged-out user-menu placeholder; trivial to substitute |
| https://images.lumeflow.ai/lumeflowen/assets/index/logo-transparent.png | application/xml (!) | 423 | **Broken on origin** — HEAD returns `application/xml`, 423 B (an XML error body, not a PNG) |
| https://images.lumeflow.ai/lumeflowen/assets/overview/textToVideo/style-{auto,anime,3d-animation,clay,comic,cyberpunk}.png (6 files) | image/png | 10,850–25,801 | Style-picker thumbnails for text-to-video models; this page has no style control |
| https://images.lumeflow.ai/lumeflowen/images/image-to-video/economy.svg | image/svg+xml | 7,708 | Video-gen channel badge, not used on this page |
| https://images.lumeflow.ai/lumeflowen/images/image-to-video/offical.svg | image/svg+xml | 9,612 | Same (note: filename really is spelled "offical" on origin) |
| https://images.lumeflow.ai/lumeflowen/images/image-to-video/official-channel.png | image/png | 3,101 | Same |
| https://images.lumeflow.ai/lumeflowen/assets/purchase/pricing-memevid-dialog-bg.png | image/png | 178,910 | Pricing-dialog background (modal not part of the UGC page body) |
| https://images.lumeflow.ai/lumeflowen/assets/purchase/pricing-btn-bg.png / pricing-btn-bg-hover.png / price-memevid-dialog-discount.png | image/png | 8,205 / 7,468 / 2,209 | Pricing-dialog chrome |
| https://images.lumeflow.ai/lumeflowen/images/invite/invite-landing-bg.png | image/png | 360,661 | Invite landing background, unrelated page |
| https://images.lumeflow.ai/lumeflowen/images/invite/invite-landing-bg.webp | image/webp | 23,474 | Same, WebP twin |
| https://images.lumeflow.ai/lumeflowen/images/invite/invite-register-dialog-bg.png | image/png | 11,698 | Invite dialog, unrelated |
| https://images.lumeflow.ai/lumeflowen/images/invite/invite-usermenu-bg.webp | image/webp | 22,206 | Invite user-menu background, unrelated |

## Not separate files (no URL exists)

- **Inspiration videos**: each API item also has an MP4 (`https://ssr.iappsign.com/<id>.mp4`, e.g.
  `1783683423408iuvezt4uv.mp4` for Pet Try On) plus an `origin_image` and `presets_image` JPEG on the same
  host. Not downloaded — videos would blow the size budget and the thumbnails above are what the grid shows
  first; URLs are recoverable per-item from the API response (see lume-recon.md §5).
- **UI icons** (arrows, upload, delete, flame/hot, history, social logos…): an inlined SVG sprite referenced as
  `<use xlink:href="#…">` (e.g. `#icon:common-arrow`, `#menu:inspiration`, `#ai-commercial:upload-image` is a
  sprite symbol too). There are no per-icon file URLs to download.
- **CSS background images**: the page-specific CSS files (`index`, `lume-flow`, `ModelSelect`, `TabSelect`,
  `UploadAreaPage`, `useAI*`, `VideoDetail`…) contain **no** `url(…)` image references — all imagery comes
  from the HTML/JS URLs above. (The big `entry…css` `url()`s are the Albert Sans fonts and the
  purchase/invite backgrounds listed in the skipped table.)
