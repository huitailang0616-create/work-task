# LumeFlow — UGC Ads page recon

Target: https://www.lumeflow.ai/app/ugc-ads/ (Nuxt SSR app under `/app/_nuxt/`)
Method: curl/python only, no live browser. Sources used:

- Served HTML (103,304 bytes): `/tmp/recon/orig/lume.html` — SSR markup + `__NUXT_DATA__` payload + JSON-LD
- CSS: 19 files downloaded to `/tmp/recon/lume-css/` (683,277 bytes total; `entry.UGGJoCbW.css` alone is 595,560)
- JS: all 32 chunks referenced by the HTML downloaded to `/tmp/recon/lume-js/` (1.83 MB), plus the lazy English locale chunk `BKeUWNV7.js` (130 KB, referenced from `DfvbCmsZ.js` as `locale_en_46json_4d25c2b8`)
- Live API (public, no auth needed for this endpoint): `https://lac-api.imyfone.com/api/lumeflow/ugc-inspiration-list` (`apiBaseUrl` taken verbatim from the HTML runtime config)

Key chunks for this page:

| Chunk | Role |
|---|---|
| `Ed8kKwCA.js` (9.6 KB) | The `/app/ugc-ads/` page component itself (`genrateType: 13`, page type `AI_COMMERCIAL_UGC_ADS`) |
| `Dp1JCQ0d.js` (60 KB) | Model classes: option sets, defaults, pricing tables, `LanguageSelect` component |
| `BUKaSRqx.js` (341 KB) | Shared video-generator library: model lists per page, `AudioSwitch`, history item actions |
| `B8Kmvq6N.js` (57 KB) | Marketing Studio: `ProductAvatarUpload`, Product/Avatar modals, Inspiration/History containers |
| `BKeUWNV7.js` (130 KB) | English i18n strings (compiled format; quoted below as `s:"…"`) |

---

## 1. Theme, palette, fonts

### Theme: DARK

Evidence:

- `entry.UGGJoCbW.css`: `html{background-color:var(--color-dark)}` with `:root{--color-dark:#050505; --color-light:#fff; …}` and `body{color:var(--color-light)}`.
- Header SSR classes: `bg-[#040304] border-b border-[#28282e]`.
- All form controls sit on `#1b1b1d` panels (see below).

Note: the bundled Element-style libraries declare `color-scheme:light` in their own `:root` blocks — that is library boilerplate, not the page theme. The app itself is unambiguously dark.

### Palette (counts = occurrences across all 19 downloaded CSS files)

| Color | Count | Role (verified from rules) |
|---|---|---|
| `#fff` / `#ffffff` | 141 / 20 | Primary text (`--color-light:#fff`) |
| `#050505` | 7 (+ var) | **Page background** — `--color-dark:#050505`; also `.btn-wrapper{background-color:#050505}` (sticky Create bar) and Tailwind `--color-black:#050505` |
| `#040304` | 14 | Header background (SSR `bg-[#040304]`); also inspiration-card bottom gradient `#040304c4` |
| `#1b1b1d` | 24 | **Panel / control background** — `.model-select{background:#1b1b1d}`, upload boxes `bg-[#1B1B1D]`, language select `bg-[#1B1B1D]`, empty-state placeholder |
| `#1f1f25` | 12 | Model dropdown panel `background:#1f1f25`; header language pill `bg-[#1f1f25]` |
| `#28282e` | 18 | Border colour — header `border-[#28282e]`, form column `border-r border-[#28282e]` |
| `#2f2f37` | 11 | Model-list hover/active row `background-color:#2f2f37` |
| `#2a2a2a` | 14 | Disabled Create button `background-color:#2a2a2a`; skeleton base |
| `#3c3c3c` / `#3d3d3d` | — | Slider value/stepper box `background-color:#3c3c3c` |
| `#8846ff` | 53 | **Accent violet** — gradient end, slider button `background-color:#8846ff`, loading spinner |
| `#f66cff` | 45 | **Accent magenta-pink** — gradient middle, `--color-primary-hover:#f66cff` |
| `#df41ff` | 46 | Bright magenta — header credits/upgrade pill (text `#df41ff`, bg `#df41ff29`, border `#df41ffc2`), notice-bar button |
| `#ffad3a` | 28 | **Accent orange** — gradient start |
| `#a04efe` | (var) | `--color-primary:#a04efe` and `--memevid-color-primary:#a04efe` (RGB 160,78,254) |
| `#975dff` | 24 | Switch ON colour (`.model-switch.is-checked … background-color:#975dff`; also `#975DFF` avatar radio) |
| `#5258f6` | 11 | Secondary indigo accent (library/secondary UI) |
| `#ff5272` / `#f2ab29` | 7 / 7 | Gradient pair for promo/HOT elements (`linear-gradient(270deg,#f2ab29,#ff5272)`) |
| `#ffb733` | (var) | `--color-yellow:#ffb733` (Pixverse credits text in this page is `#FFB731`) |
| `#b8b8b8` | 20 | Secondary text / slider runway (`#b8b8b8` at various alpha: `#b8b8b880`, `#b8b8b81a`) |
| `#cbcbcb` | 10 | Muted text — empty-state description `color:#cbcbcb`, upload hint text `#CBCBCB` |
| `#999` / `#939393` | 16 / — | Placeholder/tertiary text; slider tick labels `color:#939393` |
| `#d6e320` | 15 | Lime accent used by bundled library components (not prominent on this page) |

Signature gradient (Create button, slider bar, inspiration "try" button):

```css
/* Create button / slider bar */
background: linear-gradient(270deg, #ffad3a, #f66cff 43.75%, #8846ff 87.98%); /* --background-primary */
/* slider bar variant */
background: linear-gradient(90deg, #ffad3a, #f66cff 43.75%, #8846ff 87.98%);
/* inspiration card button */
background: linear-gradient(90deg, #8846ff, #f66cff 25%, #ffad3a 51%, #f66cff 75%, #8846ff) 0 0/200% 100%;
```

Other structural values: `--pc-base-width:1400px`, `--app-header-h:60px`, `--aside-w:77px`, `--notice-bar-h:0px` (notice bar hidden by default), control radius 12px, page text sizes 14/16px.

### Fonts

- Page: `html{font-family:'Albert Sans',Helvetica,Arial,sans-serif!important}` — **Albert Sans** is the brand font. `@font-face` (21 faces in `entry…css`) loads it as a variable font (weight 100–900, normal + italic) from
  `https://images.lumeflow.ai/lumeflowen/assets/common/fonts/AlbertSans-VariableFont_wght.ttf` (128,420 B) and `AlbertSans-Italic-VariableFont_wght.ttf` (141,380 B), plus static weights (Regular/Medium/SemiBold/Bold… ≈47–53 KB each).
- `:root{--font-stack:'Open Sans',Helvetica,Arial,sans-serif}` (legacy var, not the html font).
- Utility classes present in Tailwind bundle: `Dela Gothic One`, `Figtree`, `SF Pro Text` (display headings elsewhere on the site).
- UI-library stacks (Element-derived "memevid"/"el"): `"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`.
- Tailwind defaults also present: `--font-sans:ui-sans-serif,system-ui,…`, mono `ui-monospace,SFMono-Regular,Menlo,…`.

---

## 2. Page structure (layout order, from SSR HTML)

```
<body>
├─ notice-bar (fixed, h 50px / md 56px, inline style display:none — hidden by default)
│    "GPT Image 2.5 | Nano Banana 2.1 — Unlock up to 365 days of unlimited generations with Ultra plans. [Try Now]"
├─ <div flex>
│  ├─ LEFT RAIL  aside.aside-container (width var --aside-w:77px)  nav.base-nav
│  │    logo (top, /app/home) · nav items · bottom: socials + Contact US + Upgrade Now
│  └─ <div flex-1 flex-col>
│     ├─ HEADER (fixed, h 60px, left offset 77px, bg #040304, border-b #28282e)
│     │    [mobile: logo + menu btn] · page switcher: UGC Video | Ad Video | AI Commercial
│     │    · credits pill (diamond icon, balance "0", "upgrade") · language dropdown "English"
│     │    · [Login] · user menu: Join Our Community / Member Center / Support Center / Logout
│     └─ MAIN  #app-main.layout-wrapper (padding-top 60px) > .base-container (padding 0 24px)
│        └─ .video-editor (flex, pr-4)
│           ├─ LEFT FORM COLUMN  w-115 (=460px), mr-10, own scroll area:
│           │    border-r #28282e, padding 30px 24px 120px 0  — see §3 for the controls in order
│           │    └─ sticky bottom bar (.btn-wrapper, absolute, h 110px, bg #050505):
│           │         "Credits Required：" + value, full-width [Create] button (h 50px, radius 12px, gradient; disabled bg #2a2a2a)
│           └─ RIGHT AREA (flex-1)
│                ├─ TabSelect tabs: [History] [Inspiration]  (pill indicator, bg #ffffff26)
│                ├─ History view: list of generation items (empty → empty-state, see §4)
│                └─ Inspiration view: scrollable card grid (height calc(100dvh - 150px)), see §5
└─ modals/teleports (Product source modal, Avatar select modal, pricing, Discord dialog…)
```

Mobile (≤750px, from the page CSS + `Ed8kKwCA.js` mobile branch): form column stacks full-width on top,
right area below; the Create bar becomes `.btn-wrapper-mobile` (sticky bottom) showing a credits row and
either a full-width gradient Create button or, in history view, a bordered "to history" button.

Left-rail nav items (label → href, from SSR):

Home `/app/home/` · Inspiration `/app/inspiration/` · My Creations `/app/mycreations/` ·
section "AI Creation": Video Generate `/app/image-to-video/`, Image Generate `/app/image-to-image/`,
Marketing Studio **[New]** `/app/ai-ad-generator/` · section "AI Effects": Video Effects **[Hot]**
`/app/ai-video-effects/`, Image Effects `/app/ai-image-effects/` · section "AI Tools":
Extend Video `/app/video-extend/`, Edit Video `/app/ai-video-editor/`, AI Enhance `/app/ai-enhance/`,
Mimic `/app/mimic-motion/`, Lip Sync `/app/lip-sync/`, AI Story `/app/ai-story-generator/` ·
bottom: Contact US `/support/contact-us/`, Upgrade Now, socials (Discord `discord.gg/VQUfcJpgMg`,
YouTube `@LumeFlowAI`, TikTok `@lumeflowaiofficial`, X `@LumeFlowAI`, Product Hunt).

Header page switcher (this page highlighted): **UGC Video** `/app/ugc-ads/` · Ad Video `/app/product-video/` · AI Commercial `/app/ai-commercial/`.

Header language dropdown = site locales (16): English, 日本語， 繁體中文， 한국어, Deutsch, Español,
Français, Italiano, العربية, Bahasa Indonesia, Русский, Português, हिन्दी, বাংলা, Tiếng Việt, ไทย.

---

## 3. UGC Ads generator — REAL control option sets (with evidence)

Form order in the panel (SSR text order, verbatim):
**Model → Product → Avatar (optional) → Prompt → Language → Resolution → Duration → Aspect Ratio → Generate Audio → Outputs → Credits Required + Create**

SSR `__NUXT_DATA__` payload confirms the live default state object (indices into the payload):

```js
allData = { product_id: 0, image: "", image_tail: "", prompt: "",
            resolution: "480P", duration: 5, ratio: "auto",
            language: "English", outputs: 1, is_switch_audio: 1 }
activeId = 110   // = AI_AD_SEEDANCE_2_0
```

### 3.1 Model

Model list for this page (`BUKaSRqx.js`, export used as `Xt.UGC_ADS` list `xo`):

```js
[{ key: AI_AD_SEEDANCE_2_0 (110), value:"seedance", label:"Seedance 2.0",
   desc:"marketingStudio.ugcDescription", isHot:false, isAudioSupport:true, videoDuration:["4s-15s"] },
 { key: AI_AD_PIXVERSE_V6 (114), value:"pixverse", version:"V1.6", label:"Pixverse V6",
   desc:"marketingStudio.adDescription", isHot:false, isAudioSupport:true, videoDuration:["4s-15s"] }]
```

- **Default selected: Seedance 2.0** — page chunk `Ed8kKwCA.js`: default `p.AI_AD_SEEDANCE_2_0`; SSR payload `activeId:110`.
- Seedance 2.0 description (i18n `marketingStudio.ugcDescription`, also SSR-rendered):
  **"Create cinematic ad videos with smooth motion and realistic visuals."**
- Pixverse V6 description (`marketingStudio.adDescription`):
  "Generate engaging marketing videos with dynamic effects and fast results."
- Selector UI (`ModelSelect.C0E14p_x.css`): 60px-high row, bg `#1b1b1d`, radius 12px; dropdown panel
  `#1f1f25`, rows hover/active `#2f2f37`; each row shows name, description, a `4s-15s` duration chip,
  and an "audio support" badge (gradient `linear-gradient(90deg,#6251ff,#8d54ff)`).
- Model icons: Seedance = inline `data:image/png;base64,…` 36×36 PNG in `BUKaSRqx.js` (decoded and saved, see assets doc); Pixverse = `/app/_nuxt/pix-verse.BXMQhTqp.svg`.

### 3.2 Product upload & Avatar upload

Component `ProductAvatarUpload` (`B8Kmvq6N.js`), rendered **above** the generated form controls (`class="mb-7.5"`).
Two side-by-side slots, each 205px wide (½ width on mobile), 163px tall; upload box 133px high, bg `#1B1B1D`, radius 12px:

| Slot | Form field | Label (SSR) | Hint text | Required? |
|---|---|---|---|---|
| Product | `image` (+ `product_id`, `poster`) | `Product` | "Click to upload an image" | **Yes** — Create is disabled without it |
| Avatar | `image_tail` | `Avatar (optional)` | "Click to upload an image" (+ stacked preview circles of avatar-01…04.png when empty) | No |

Evidence: i18n `marketingStudio.product`="Product", `marketingStudio.avatar`="Avatar",
`marketingStudio.optional`="optional", `textToVideo.components.uploadPhotoLabel`="Click to upload an image".
Create-disable logic (`B8Kmvq6N.js`, `useAICommercial`): for genrateType 13/15 the button is disabled when
`!allData.image || !allData.prompt?.trim()` — i.e. **product image + non-empty prompt are both required; avatar is not**.

What the slots open:

- **Product → ProductSourceModal / CreateProductModal**: "Add your product — Add a link or upload images to use
  your product across generations." Link input (placeholder `www.yourproduct.com`, "Supported Links" platform
  icons = the `creatify-supports-*.svg` set), or "or" → "Create manually" (upload images + `Product name *` +
  Description → "Confirm and use product"). Upload input in the modal:
  `accept="image/png,image/webp,image/jpeg,image/jpg" multiple`; constants in the modal code:
  max file size `20*1024*1024` (**20 MB**), min dimension **300** (`Ne=300`), max images **10** (`qe=10`),
  images are OSS-processed to max 3999×3999, q90.
- **Avatar → AvatarSelectModal**: title "Select Avatar", search box (placeholder "Search..."),
  sidebar filters "My avatars" + "Category" (categories from API; i18n has Male/Female), "Create avatar"
  flow (`CreateAvatarModal`: "Upload photo to create avatar", "Upload from device", name field,
  "Create Avatar" button; input `accept="image/png,image/jpeg,image/webp"`, max size **20 MB**,
  min dimension **300**, pad-to-ratio processing with ratio range 0.4–2.5, max 3999px).
  Default preview faces: `…/assets/ai-commercial/avatar-01.png` … `avatar-04.png`.

Note: the plain in-form image-upload rules used elsewhere in the app (min 300×300 etc.) do **not** apply here —
this page's uploads go through the two modals above, so 20 MB / ≥300px / PNG·WEBP·JPEG·JPG are the operative limits found in source.

### 3.3 Prompt

- Label `Prompt`; placeholder (`marketingStudio.promptPlaceholder`):
  **"Describe the scene, selling points, and what happens in the video..."**
- **Max length 5000** — form config (`Dp1JCQ0d.js`, both ad model classes):
  `S({label:"marketingStudio.prompt", props:{limit:5e3, placeholder:"marketingStudio.promptPlaceholder", hideOptimize:true}})`
  SSR counter renders `0/5000`. Prompt-optimise button is hidden for this page (`hideOptimize:true` in config,
  although the page still wires an `onPromptOptimize` handler).

### 3.4 Language

Component `AiFormLanguageSelect` (`Dp1JCQ0d.js`, `LanguageSelect`): a 56px-high select row, bg `#1B1B1D`,
with the `language.svg` icon. Default **English** (`language:"English"` in defaults + SSR).

The option list is built as `[...baseLocales, ...extras not already in base]` where
baseLocales (from `DfvbCmsZ.js`) = `[{en English},{jp 日本語},{tw 繁體中文}]` and the hardcoded extras are
`ko,de,es,fr,it,ar,id,ru,pt,hi,bn,vi,th`. Full list in display order (16):

1. English 2. 日本語 3. 繁體中文 4. 한국어 5. Deutsch 6. Español 7. Français 8. Italiano
9. العربية 10. Bahasa Indonesia 11. Русский 12. Português 13. हिन्दी 14. বাংলা 15. Tiếng Việt 16. ไทย

(The selected value is stored as the language **name**, e.g. `"English"`.)

### 3.5 Resolution

Tabs component (`AiFormControlTabs`, formKey `resolution`). For Seedance 2.0 / UGC:

```js
resolutions: ["480P","720P","1080P"]   // Dp1JCQ0d.js, VERSION_DATA[`${AI_AD_SEEDANCE_2_0}_${AI_COMMERCIAL_UGC_ADS}`]
```

Default **480P**. (Pixverse V6 on this page instead offers `["360P","540P","720P","1080P"]`, default 360P.)

### 3.6 Duration — exact tiers (do not guess; from source)

Control = `AiFormControlSlider` — a **slider + numeric stepper box** (CSS `.duration-slider` / `.duration-num`
in `useAIBase.CN7fetWn.css`; bar uses the signature gradient, thumb `#8846ff` with white border).
The slider steps through the model's `durations` list:

```js
// Seedance 2.0, UGC_ADS (Dp1JCQ0d.js):
durations: ["4","5","6","7","8","9","10","11","12","13","14","15"]
```

**→ 4s, 5s, 6s, 7s, 8s, 9s, 10s, 11s, 12s, 13s, 14s, 15s (every whole second, 12 tiers). Default 5s.**
Model-select chip summarises this as `4s-15s`. Pixverse V6 / UGC has the identical list `["4"…"15"]`.

### 3.7 Aspect Ratio

Component `AiFormControlSize` (formKey `ratio`), Seedance 2.0 / UGC `size` array (label shown as value;
"auto" is rendered "Auto"):

| Value | Icon w×h in config |
|---|---|
| `auto` (default) | 28×16 |
| `16:9` | 28×16 |
| `4:3` | 28×16 |
| `1:1` | 24×24 |
| `3:4` | 16×28 |
| `9:16` | 16×28 |
| `21:9` | 28×12 |

SSR confirms exactly: Auto, 16:9, 4:3, 1:1, 3:4, 9:16, 21:9.
(Pixverse V6 / UGC: same minus `auto`, plus `3:2` and `2:3`; default `9:16`.)

### 3.8 Generate Audio

- Row component `AiFormAudioSwitch`: 56px-high row, bg `#1B1B1D`, label **"Generate Audio"**
  (`marketingStudio.generateAudio`), switch on the right (ON colour `#975dff` in this component family).
- **Default ON**: `is_switch_audio: 1` in the model defaults and in the SSR payload; the switch getter is `formValue ?? 1`, active-value 1 / inactive-value 0.
- The switch's tooltip string (present in the SSR DOM under the row) is
  `textToVideo.modelLabels.soundTips` = **"This model does not support disabling sound effects."**
  In `AudioSwitch` that popover is shown when a *disabled* switch is clicked; this model's form config
  (`f("is_switch_audio",{label:"",props:{label:"marketingStudio.generateAudio"}})`) does not pass a
  `disabled` flag, so treat the clone behaviour as: switch visible, default on, with that sound tip attached.

### 3.9 Outputs

Tabs (`AiFormControlTabs`, formKey `outputs`), list hardcoded in the component factory (`Dp1JCQ0d.js`):
`props:{list:["1","2","3","4"].map(...)}` → **1, 2, 3, 4**. Default **1**.
(The shared pricing class `j` defines `OUTPUTS_DISCOUNT = {1:1, 2:.95, 3:.9, 4:.85}`; the ad-model
`getCoins()` path multiplies coin × outputs without that discount flag — see §3.10 caveat.)

### 3.10 Credits / price

- Sticky bar label: `Credits Required：` (SSR uses the full-width colon) + value; button label: **Create**
  (not "Generate"). SSR renders the value as **0** — that is the pre-hydration placeholder.
- Real cost table for Seedance 2.0 ads (`Dp1JCQ0d.js`, array `Ci`, `version: AI_AD_SEEDANCE_2_0`),
  coins per single output, by resolution × duration (perfectly linear per second):

| Resolution | per second | 4s | 5s (default combo) | 10s | 15s |
|---|---|---|---|---|---|
| 480P | 12 | 48 | **60** | 120 | 180 |
| 720P | 28 | 112 | 140 | 280 | 420 |
| 1080P | 78 | 312 | 390 | 780 | 1170 |

  Full table in source: 480P 48,60,72,84,96,108,120,132,144,156,168,180 · 720P 112,140,168,196,224,252,280,308,336,364,392,420 · 1080P 312,390,468,546,624,702,780,858,936,1014,1092,1170 (for 4s→15s).
  `getCoins()` = table coin × outputs. So the hydrated default state (480P · 5s · 1 output) should read **60 credits**, not 0.
- Pixverse V6 pricing uses a separate strategy class with an outputs-discount; its table (`qi` in `Dp1JCQ0d.js`)
  was not fully transcribed — if the clone needs Pixverse pricing, re-extract array `qi` from that chunk.
- JSON-LD offer for the page (see §6): `"price": 14.99, "priceCurrency": "USD"` (site-level offer, not per-generation).

### 3.11 History / Inspiration tabs

- Tab labels (SSR + i18n `BaseNav.history` / `BaseNav.ins`): **History** and **Inspiration**
  (TabSelect component, icons `video-to-video:history` / `menu:inspiration`).
- Initial tab logic (`Ed8kKwCA.js`): starts as History on desktop / Inspiration on mobile;
  after the SSR history fetch resolves, if the list is non-empty → History, otherwise → Inspiration.
  The SSR history fetch itself returns `"Token not empty!"` for anonymous visitors (list requires login), so
  a logged-out visitor effectively lands on Inspiration.
- History item actions (`successButton` in page chunk): **Reprompt, Regenerate, Download, Enhance, Delete**
  (Download splits into "Download with watermark" / "Download without watermark" in the shared item component).
- History empty state (also the Inspiration-tab fallback hero, from `useAICommercial.CNo0nsBD.css` `.empty-warpper`):
  - Title (`marketingStudio.ugcCreatorTitle`): **"AI UGC Creator — Turn Products into Authentic Creator Content"** (32px/700, centred)
  - Description (`marketingStudio.ugcCreatorIntro`): **"Create engaging creator-style videos that build trust and drive conversions."** (16px, `#cbcbcb`)
  - Below: a 860×490-max placeholder/video area (`#1b1b1d` placeholder with poster + caption).

---

## 4. All visible copy recovered (SSR, in order)

```
[notice bar] GPT Image 2.5 · Nano Banana 2.1 · Unlock up to 365 days of unlimited generations with Ultra plans. · Try Now
[rail] Home · Inspiration · My Creations · AI Creation · Video Generate · Image Generate ·
       Marketing Studio (New) · AI Effects · Video Effects (Hot) · Image Effects · AI Tools ·
       Extend Video · Edit Video · AI Enhance · Mimic · Lip Sync · AI Story · Contact US · Upgrade Now
[header] UGC Video · Ad Video · AI Commercial · 0 · upgrade · English · Login ·
         Join Our Community / Get support & updates · Member Center · Support Center · Logout
[form] Model · Seedance 2.0 · Create cinematic ad videos with smooth motion and realistic visuals. ·
       Product · Click to upload an image · Avatar · (optional) · Click to upload an image ·
       Prompt · 0/5000 · Language · English · Resolution · 480P · 720P · 1080P · Duration · 5s ·
       Aspect Ratio · Auto · 16:9 · 4:3 · 1:1 · 3:4 · 9:16 · 21:9 ·
       Generate Audio · This model does not support disabling sound effects. ·
       Outputs · 1 · 2 · 3 · 4 · Credits Required： · 0 · Create · History · Inspiration
```

Additional copy from i18n (en chunk) used by this page's modals/controls:

- Prompt placeholder: "Describe the scene, selling points, and what happens in the video..."
- Product modal: "Add your product" / "Add a link or upload images to use your product across generations." /
  "Supported Links" / placeholder "www.yourproduct.com" / "or" / "Create manually" /
  "Product name *" / "Enter product name" / "Description" / "Describe your product" /
  "Selected main image" / "Confirm and use product" / "No product added yet" /
  "Paste a link or upload images to get started."
- Avatar modal: "Select Avatar" / "Search..." / "My avatars" / "Category" / "Create avatar" /
  "New avatar" / "Name Avatar" / "Avatar name" / "Upload from device" / "Upload photo to create avatar" /
  "Create Avatar" / "Avatar preview"
- Inspiration card button: "try this" (`marketingStudio.tryThis`); card shows video name + a hot-count badge (flame icon + `hot_value`).
- Marketing Studio umbrella copy (header/sibling pages): subtitle "Turn products into UGC creator videos,
  polished product ads, and TV-style commercials."

---

## 5. Inspiration items (recovered from the live API)

The Inspiration tab is **not** in the HTML/JS — it is fetched client-side from
`GET https://lac-api.imyfone.com/api/lumeflow/ugc-inspiration-list` (page_size 10, **23 items, 3 pages**;
all 720×1280, category_id 56, type 11). Each item carries a preset prompt, a preset product image
(`origin_image`), a preset avatar/product image (`presets_image`), a thumbnail, an MP4, and a `hot_value`.
Clicking one applies its presets to the form (page chunk: `image ← origin_image`, `image_tail ← presets_image`, `prompt ← presets_prompt`).

| id | Name (internal_name) | hot_value | Downloaded thumbnail |
|---|---|---|---|
| 1845 | Pet Try On | 5789 | inspiration-pet-try-on.jpg |
| 1847 | Ramen Review | 6999 | inspiration-ramen-review.jpg |
| 1857 | Whiteboard Headphone Review | 5637 | inspiration-whiteboard-headphone-review.jpg |
| 1844 | Outfit Try On | 6558 | inspiration-outfit-try-on.jpg |
| 1846 | Press On Nails Try On | 6589 | inspiration-press-on-nails-try-on.jpg |
| 1839 | Cookie Ad | 9999 | inspiration-cookie-ad.jpg |
| 1840 | Gym Ad | 3596 | inspiration-gym-ad.jpg |
| 1842 | Lash Comparison | 5641 | inspiration-lash-comparison.jpg |
| 1838 | Blush Transformation | 3658 | inspiration-blush-transformation.jpg |
| 1841 | Hat Try On | 2365 | inspiration-hat-try-on.jpg |
| 1843 | Leopard Bag Showcase | 2566 | inspiration-leopard-bag-showcase.jpg |
| 1849 | Streetwear Try On | 100 | inspiration-streetwear-try-on.jpg |
| 1827 | ASMR Unboxing | 3669 | inspiration-asmr-unboxing.jpg |
| 1750 | 30Sec Glow Up | 2999 | inspiration-30sec-glow-up.jpg |
| 1771 | Quiet Blend | 4592 | inspiration-quiet-blend.jpg |
| 1772 | Party Crash Munch | 3666 | inspiration-party-crash-munch.jpg |
| 1773 | Mirror Fit Flex | 3666 | inspiration-mirror-fit-flex.jpg |
| 1774 | Beard ASMR Fix | 2698 | inspiration-beard-asmr-fix.jpg |
| 1775 | Hunt Panic Fix | 3669 | inspiration-hunt-panic-fix.jpg |
| 1776 | Unbox Glow Moment | 5996 | inspiration-unbox-glow-moment.jpg |
| 1777 | Sky Sip Stunt | 3669 | inspiration-sky-sip-stunt.jpg |
| 1778 | GymPre Vibe | 3669 | inspiration-gympre-vibe.jpg |
| 1779 | Gummy Glow Routine | 3699 | inspiration-gummy-glow-routine.jpg |

Note: the API's display `name` field is empty for all 23 items; `internal_name` (above) is the only name in the
payload. The full preset prompt of item 1845 runs ~1,900 characters (a complete 12–15s UGC shot script) —
all 23 preset prompts are in the API response, saved during recon at `/tmp/recon/inspiration*.json`
(ephemeral; re-fetch from the API URL above if needed).

Example (item 1845 "Pet Try On", preset prompt, first line):
"VIDEO — 12–15s vertical (9:16) authentic UGC-style pet clothing try-on video, bright home environment with
soft natural daylight (living room or near a window)…" (continues with timed 0–3s / 3–6s / 6–9s / 9–12s / 12–15s beats and voice lines).

---

## 6. SEO / FAQ (from the HTML head + CMS payload)

- Title: **AI UGC Ads Generator | Create UGC Videos with LumeFlow AI**
- Meta description: "Create AI UGC ads with LumeFlow AI. Generate authentic-looking UGC videos, product demos, and creator-style ads for e-commerce, TikTok, and social media campaigns."
- Keywords: "ai ugc ads, ai ugc video generator, ugc ads generator, tiktok ugc ads generator, instagram ugc ads"
- Canonical: https://www.lumeflow.ai/app/ugc-ads/ · CMS page_title "UGC Ads", updated_at 2026-06-24 18:43:31, `page_content` is `{}` and `serp_faqs` is `[]` — **there are no on-page SEO/FAQ sections in the served page**; the only FAQ content is the JSON-LD `FAQPage` in the structured data:

**Q: What is an AI UGC ads generator?**
A: "An AI UGC ads generator uses artificial intelligence to create creator-style advertising videos that look like user-generated content. It helps brands produce product demos, testimonials, and social media ads faster."

**Q: Can LumeFlow AI create UGC videos for products?**
A: "Yes. LumeFlow AI can transform product images, concepts, or text prompts into engaging UGC-style videos designed for e-commerce, TikTok, and social media marketing."

**Q: Can AI-generated UGC ads be used for social media campaigns?**
A: "Yes. AI-generated UGC ads can be used as creative assets for social media platforms, helping brands create more variations of promotional videos and product content."

JSON-LD also contains a BreadcrumbList and a Product/Offer with `"price": 14.99, "priceCurrency": "USD"`.

---

## 7. What could NOT be recovered from source

- **Inspiration list rendering details beyond the API payload** — items are client-fetched (recovered via the
  API itself, §5), but exact card title text on the live page (API `name` is empty; the UI may fall back to
  `internal_name` or show no title) can't be confirmed without a live browser.
- **Avatar categories / avatar library items** — loaded from authenticated/API-driven endpoints inside the
  Avatar modal; only the filter scaffolding ("My avatars", "Category", Male/Female strings) is in source.
- **History list content** — requires login; SSR attempt returns "Token not empty!". Item layout/actions were
  recovered from the shared components instead.
- **Pixverse V6 credit table** — pricing strategy differs (outputs-discount class); the raw table array exists
  in `Dp1JCQ0d.js` but was not transcribed here.
- **Exact hydrated Credits value** — SSR shows 0; the JS pricing table implies 60 for the default combo (§3.10),
  but a live session could apply discounts/badges (`isNeedShowDiscount:true` on the Outputs component) that
  source alone can't settle.
- **Icon glyphs** — most UI icons are an SVG sprite (`<use xlink:href="#…">`, e.g. `#menu:…`, `#icon:common-arrow`)
  inlined by the icon plugin; individual icon files don't exist as separate URLs.
- Whether the Generate Audio switch is *effectively* disabled for Seedance 2.0 in the live UI (see §3.8) —
  the config passes no `disabled` flag, yet the "does not support disabling" tip ships with the component.
