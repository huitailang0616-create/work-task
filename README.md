# Web Clone Test — v2 (high-fidelity rebuild)

Rebuild of the v1 lookalike (`~/workspace/web-clone-test/`, untouched) following
the **web-clone skill** methodology. v1 was written from page text alone with a
self-invented palette and placeholder art; v2 is built from the originals'
served source.

## Method (per the skill)

- **Skill used:** `Jane-xiaoer/claude-skill-web-clone` (MIT), cloned to
  `~/workspace/custom-skills/web-clone-src/` and installed, adapted, as
  `~/workspace/custom-skills/web-clone/`. Its recon scripts require a live
  Playwright browser and hardcode the author's macOS paths, so recon here was
  done manually in the skill's spirit: served-source first, no guessing.
- **Step 1 — get the real source:** fetched the served HTML of both pages with
  curl (Topview: 456 KB Next.js SSR; LumeFlow: 103 KB Nuxt SSR) plus every CSS
  bundle (Topview 4 files; LumeFlow 19 files) and, for LumeFlow, all 32 JS
  chunks and the lazy English locale chunk. Snapshots of the two HTML files are
  kept in `RECON/served/`.
- **Step 2 — recon:** palette/font/layout tokens extracted from the CSS;
  section order and copy extracted from the SSR HTML, JSON-LD and RSC/Nuxt
  payloads; LumeFlow's real option sets, defaults and credit table extracted
  from its JS bundles; the inspiration grid was recovered from the original's
  public inspiration API (23 items, full preset prompts). Full notes:
  `RECON/topview-recon.md`, `RECON/lume-recon.md`; asset inventories:
  `RECON/topview-assets.md`, `RECON/lume-assets.md`.
- **Step 3 — rebuild:** hand-rebuilt static pages using the originals' real
  palette, typography (self-hosted Outfit / Darker Grotesque / Instrument Sans
  for Topview; Albert Sans for LumeFlow), section order, copy and publicly
  served media (downloaded locally — no hotlinking). Tracking scripts were not
  carried over. Generation actions remain front-end simulations.
- Complexity per the skill's scale: Topview L3/L4 (Next content frontend with
  heavy motion), LumeFlow page L3 front end over an L6 SaaS (login/credits/API
  not cloned; display layer + simulated generation only).

## Structure

```
web-clone-test-v2/
├── README.md / VERIFY.md
├── wrangler.toml            # copied from v1 — name stays "work-task"
├── RECON/                   # recon notes, asset manifests, served HTML snapshots
└── public/                  # 5.3 MB, 75 files
    ├── index.html           # /          → Topview homepage
    ├── ugc-ads/index.html   # /ugc-ads/  → LumeFlow UGC Ads
    └── assets/
        ├── topview.css / topview.js
        ├── lume.css / ugc.js / inspiration-data.js  (23 real inspiration presets)
        ├── fonts/           # Outfit, Darker Grotesque, Instrument Sans, Albert Sans
        ├── img/topview/     # real logo, model-brand SVGs, plugin slides, pillar posters
        ├── img/lume/        # real logo, model icons, avatar previews, 23 inspiration thumbs
        └── video/topview/   # Canvas / Drama Studio / Board pillar MP4s (~1 MB each)
```

Deploy shape is identical to v1: point the existing `work-task` Worker at
`public/` (wrangler.toml already in place). The parent agent handles the
GitHub push and Cloudflare redeploy; the access URL does not change.

## Interactions

### `/` — Topview
- Sticky glass header (blur, original gradient) with 4 working nav dropdowns
  (Use Cases / AI Tools / Resources / Models), mobile hamburger menu.
- Composer: 4 mode tabs (Video Agent / Drama Studio / AI Video / AI Image)
  that swap placeholders; rotating example placeholder (6 real prompts, pauses
  on focus/typing); `+` file picker that references the chosen file; model and
  agent pills cycling the original's named options (Seedance 2.5/2.0, Topview
  T1, Wan 3.0, MiniMax H3; GPT-6 Luna/Astra); send button runs a labelled
  4-step simulated agent plan.
- Skill-chip marquee (CSS loop, pause on hover) + "More Skills" pill.
- Model cards with the real brand SVGs and gold UNLIMITED badges; plugin
  wordmark + 5 real slide images in a slow marquee.
- Community: 5 category tabs switching the original's 15 example prompts;
  clicking a prompt loads it into the composer.
- Product pillars with the originals' actual MP4s (autoplay/muted/loop) for
  Canvas, Drama Studio and Board; poster-only for 3D Shot Composer.
- Comparison table (real 7-row content), model-orchestration rows, tools
  cloud with Hot badges, stats band, case study, two-row testimonial marquee
  (10 real reviews recovered from the page payload), FAQ accordion with the
  10 real Q&As (from the page's JSON-LD), 9-column footer with the real
  addresses. Scroll-reveal throughout.

### `/ugc-ads/` — LumeFlow UGC Ads
- App shell: 77px left rail with the original's nav sections (New/Hot tags),
  60px header with UGC Video / Ad Video / AI Commercial switcher, credits pill
  (magenta, balance 0), 16-language menu, Login button.
- Model selector with dropdown: Seedance 2.0 (default) and Pixverse V6, each
  switching its real option sets — Seedance resolutions 480P/720P/1080P,
  Pixverse 360P/540P/720P/1080P; ratio sets differ per model too.
- Product (required) and Avatar (optional) upload slots, 20 MB / ≥300px /
  PNG·WEBP·JPEG rules, local preview + remove; avatar slot shows the original's
  4 stacked preview faces when empty.
- Prompt with 0/5000 counter and the original placeholder; Language select
  with the real 16 options; **Duration is the original's 4s–15s slider**
  (every whole second) with stepper box; Aspect Ratio buttons with
  ratio-shaped icons (Auto default on Seedance, 9:16 on Pixverse);
  Generate Audio switch (default on, original tip text); Outputs 1–4.
- Sticky Create bar: **Credits Required computed from the original's Seedance
  price table** (per-second 12/28/78 coins × duration × outputs; default combo
  = 60). Create stays disabled until product + prompt exist — the original's
  rule. Clicking Create runs a staged simulation and adds History items with
  Reprompt / Regenerate / Download / Enhance / Delete actions.
- History / Inspiration tabs. Inspiration shows the 23 real presets (real
  thumbnails, names, hot values); "try this" applies the item's full preset
  prompt and artwork to the form, like the original. History's empty state
  uses the original hero copy and artwork. The page's 3 FAQs live in JSON-LD
  in the head, exactly as the original serves them (it has no on-page FAQ
  section — v1 invented one; removed).

## Honest fidelity gaps

- **No live-browser visual diff** was possible in this environment, so pixel
  spacing is matched to CSS tokens and structure, not screenshot-verified.
- **Topview nav dropdown contents** are not in the served HTML (client-side);
  the clone's panels are assembled from the page's own footer/tool link sets.
- **Topview "quick starts" and "feature cases" sections are empty in SSR** —
  omitted rather than invented. Community-case imagery does not exist in the
  served source; the prompt cards are text-only.
- **3D Shot Composer** uses its poster image; its 2.5 MB MP4 was skipped to
  keep the bundle lean. Testimonial avatars (client-side paths) are omitted.
- **LumeFlow modals** (Product source modal with link import, Avatar library
  modal) are represented by direct in-slot upload; the avatar library and
  product-link import need the original's authenticated APIs.
- **Pixverse V6 credits** are shown as "–": its pricing uses a different
  strategy class in source and was not transcribed; Seedance pricing is exact.
- Rotating composer placeholders beyond the first are the site's own community
  prompts (the original's rotation list is client-side).
- Both pages' real generation, accounts, credits and history persistence are
  back-end features; the clone simulates them in the front end only.
