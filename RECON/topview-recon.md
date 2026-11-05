# Topview Homepage — Recon Notes

- **Target:** https://www.topview.ai/ (Next.js App Router, SSR HTML 456 KB, `<html lang="en" class="dark">`)
- **Assets host:** page shell/CSS/JS from `https://lp.topview.ai`, media from `https://topview-frontend.topviewai.app`
- **Page title:** `AI Video Agent for Short Films & Marketing Videos | Topview`
- **Meta description / og:description:** "Create short films, marketing videos, and ads from scripts, references, or product URLs. Topview's AI Video Agent plans and creates every scene on one canvas."
- **og:image:** `https://topview-frontend.topviewai.app/official-website/public/logos/dark-v2.webp` (1200×630 declared)
- **Recon date / method:** 2026-11-05, curl + Python parsing of the served HTML and its 4 CSS files only (no live browser). CSS files analysed: `0a8a95d42ad2ca94.css` (15.7 KB), `32d86e470f99d2c7.css` (168.6 KB, Tailwind utilities), `749619b29f697f8b.css` (9.8 KB), `8279bf7132ba42b1.css` (51 KB).

---

## 1. Colour palette

Dark theme throughout. Page root: `bg-[#101010]`, white text. Section cards sit on near-black `#090a0a`.

### Design tokens (authoritative, from `:root` in CSS)

| Token | Value | Role |
|---|---|---|
| `--tvl-color-accent` / `--tvl-color-bg-cta` | `#731dfb` | **Brand / primary CTA purple** |
| `--tvl-color-accent-hover` / `--tvl-color-bg-cta-hover` | `#8547fc` | CTA hover |
| `--tvl-color-accent-active` / `--tvl-color-bg-cta-active` | `#6218e0` | CTA active |
| `--tvl-color-text-primary` | `#ffffff` | Headings / primary text |
| `--tvl-color-text-secondary` | `#b3b3b3` | Body / secondary text |
| `--tvl-color-text-muted` | `#808080` | Muted text |
| `--tvl-color-bg-footer` | `#000` | Footer background |
| `--tvl-color-bg-dropdown` / `--tvl-color-bg-mobile-menu` | `#1a1a1a` | Dropdown / mobile menu panels |
| `--tvl-color-bg-dropdown-border` / `--tvl-color-bg-active-button` | `#2d2d2d` | Panel borders, active pill |
| `--tvl-color-bg-mobile-accordion` | `#0f0f0f` | Mobile accordion |
| `--tvl-color-bg-hover` | `rgba(255,255,255,0.16)` | Hover wash |
| `--tvl-color-text-footer-heading` | `rgb(131,139,163)` (= `#838ba3`) | Footer column headings |
| `--tvl-color-text-footer-copyright` | `#838ba3` | Footer legal line |
| `--tvl-color-icon-social` | `#c4c4c4` | Social icons |
| `--tvl-color-focus-ring` | `rgba(255,255,255,0.48)` | Focus ring |
| Nav background | `linear-gradient(180deg, rgba(23,23,23,.94), rgba(17,17,17,.88))` + radial white glow + repeating 135° hairline stripes; blur 18px, saturate 1.08 | Sticky glass header |

### shadcn-style HSL tokens (`:root` / `.dark`, identical)

`--background: 0 0% 0%` (pure black), `--foreground: 0 0% 100%`, `--card: 0 0% 8%`, `--primary: 263 70% 58%` (≈ `#7c3aed`-family violet), `--secondary / --muted: 220 14% 16%`, `--muted-foreground: 215 15% 65%`, `--accent: 190 95% 50%` (cyan, used in gradients), `--border / --input: 220 14% 20%`, `--ring: 263 70% 58%`, `--radius: 0.75rem`.

Gradients:
- `--gradient-primary: linear-gradient(90deg, hsl(340,82%,65%), hsl(263,70%,58%) 50%, hsl(190,95%,50%))` — pink → violet → cyan (gradient borders / accents)
- `--gradient-button: linear-gradient(135deg, hsl(263,70%,50%), hsl(280,80%,55%))`
- `--gradient-card: linear-gradient(180deg, hsl(220,14%,12%), hsl(220,14%,8%))`
- Hero H1 `.home-hero-title-gradient`: silver-white text gradient `linear-gradient(90deg, rgba(186,186,186,.96), rgba(226,226,226,.98) 18%, #fff 42%, #fff 58%, rgba(226,226,226,.98) 82%, rgba(186,186,186,.96))` with `background-clip:text`.

### Most frequent colours — CSS files (hex, count)

| Colour | Count | Where it shows up |
|---|---|---|
| `#0000` (transparent black, Tailwind internals) | 218 | utility plumbing — ignore |
| `#000` / `#000000` | 21 | footer bg, deepest surfaces |
| `#2d2d2d` | 15 | borders, dropdown border, active button |
| `#ffffff` / `#fff` | 18 | primary text, CTA text |
| `#1a1a1a` | 10 | dropdown / mobile-menu panels |
| `#090a0a` | 8 | **section card background** (dominant page surface) |
| `#facc15` + `#fde047` + `#ffd700` + `#ffe600` | 8 / 6 / 5 / 2 | yellow "UNLIMITED" badges & gold gradient text (`linear-gradient(90deg,#facc15,#ff7a18)`) |
| `#731dfb` (+ `#8547fc`, `#6218e0`) | 6 / 2 / 2 | brand purple family (see tokens) |
| `#101010` | 5 | **page background** |
| `#0f0f0f` | 4 | mobile accordion bg |
| `#b3b3b3` | 4 | secondary text |
| `#ff0b63` / `#ff3b85` / `#ff7a18` | 4 each | pink/orange promo-card gradients (model cards) |
| `#4e40f3` / `#631ffe` / `#8b5cf6` / `#9d7cff` / `#9b6cff` | 2–3 each | violet card glows (Topview T1 card uses `radial-gradient(... rgba(116,62,255,.84) ...), linear-gradient(145deg,#21105e,#02030b 55%,#280548)`) |
| `#d4d4d8`, `#9ca3af` | 6 / 3 | zinc/grey text shades |

White-alpha washes dominate borders/surfaces: `rgba(255,255,255,.08)` ×14, `rgba(255,255,255,0.1)` ×12, plus .04/.05/.06/.12/.16/.2 steps everywhere.

### Most frequent colours — inline in HTML (Tailwind arbitrary values)

| Colour | Count | Role |
|---|---|---|
| `#ff5460` | 52 | **coral-red accent for the "Six Ways" cards** (icons, links, hovers; hover text `#ff8791`, shades `#ff6f7d`, `#ff9aa3`) |
| `#090a0a` | 29 | section card bg (confirms above) |
| `#b985ff` | 22 | light lavender accent (second card family) |
| `#e24ed2` | 12 | magenta accent (third card family) |
| `#ffd700` / `#ffe600` | 8 each | gold badges |
| `#111214` | 8 | model-card base bg |
| `#101010` | 5 | page bg |
| `#1b1b1b` | 2 | **hero composer box background** |
| `#7C3AED` (hover `#8B4CF5`) | 1 | "More Skills" pill button under the composer |

**Palette summary for the rebuild:** black `#000` / `#090a0a` / `#101010` surfaces, white text, grey `#b3b3b3` secondary, brand purple `#731dfb` (hover `#8547fc`, active `#6218e0`), coral `#ff5460` + lavender `#b985ff` + magenta `#e24ed2` as per-card accents, gold `#facc15→#ff7a18` for "UNLIMITED" badges, pink→violet→cyan gradient for highlights.

---

## 2. Fonts

**Not Inter.** Three Google-font families loaded via `next/font` (CSS vars on the page root div: `__variable_cc0b8f / __variable_98d8ca / __variable_df48dc`):

| Family | CSS var | Used for | Weights |
|---|---|---|---|
| **Outfit** | `--font-outfit` | **Page default** — root div is `font-[family-name:var(--font-outfit)]`; body copy, nav, most UI | variable 100–900 |
| **Darker Grotesque** | `--font-darker-grotesque` | Display / big numbers & headings accents (9 direct `font-family` hits in CSS, most of any family) | 300, 700, 800 |
| **Instrument Sans** | `--font-instrument-sans` | Secondary UI font (e.g. white pill buttons) | 400–700 |

Fallback stacks: `"Outfit","Outfit Fallback"` (fallback = local Arial with size-adjust), likewise for the other two. System stack only in the CSS reset (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, …`). Mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, …`.

Preloaded woff2 (latin subset, `-s.p.woff2` — these are the 3 files referenced in the HTML `<head>`):

- Darker Grotesque → `https://lp.topview.ai/_next/static/media/198f51926e9fc6dc-s.p.woff2` (24,016 B)
- Instrument Sans → `https://lp.topview.ai/_next/static/media/26d0ba92e140f0dc-s.p.woff2` (29,904 B)
- Outfit → `https://lp.topview.ai/_next/static/media/7b0b24f36b1a6d0b-s.p.woff2` (32,228 B)

Other subsets declared in `@font-face` but not preloaded: Outfit latin-ext `98848575513c9742-s.woff2`; Darker Grotesque vietnamese/latin-ext `4fcf11d1ef75d758-s.woff2`, `1240183dc2a04bc0-s.woff2` (same two files reused for weights 300/700/800); Instrument Sans latin-ext `adb45196eddef626-s.woff2`. All `font-display: swap`.

---

## 3. Layout tokens

- **Header:** height 56 px mobile / 70 px desktop (`--tvl-header-height-*`), z-index 1001, sticky glass (blur 18px).
- **Radii:** `--radius: 0.75rem` (shadcn base); `--tvl-radius-button: 100px` (pill nav/auth buttons), `--tvl-radius-cta: 22px`, `--tvl-radius-dropdown: 8px`. In markup: section cards `rounded-[24px]`, model cards `rounded-[16px]`, composer `rounded-[14px]` (sm `18px`), FAQ items `rounded-[22px]`, chips `rounded-[20px]`, tool pills `rounded-2xl`.
- **Containers:** page sections `px-4 md:px-8`; outer section cards `max-w-[1824px]`, inner `max-w-[1680px]`; text blocks `max-w-[980px]` (hero + agent intro), `max-w-4xl` centred headings; footer links grid collapses to 2 cols ≤767 px, 1 col ≤460 px.
- **Type sizes:** H1 hero `35px` (≥400 px: `38px`; md: `36px` / line-height 46px, weight 600→700, tracking −0.045em, max-w 16ch mobile). Section H2 pattern `30px → sm 42px/50px → lg 52px/60px`, bold, tracking ≈ −0.035em. Eyebrow labels ~13–15 px semibold. Body 14–16 px.
- **Shadows:** CTA `inset 0 1px 0 rgba(255,255,255,.2), 0 10px 24px rgba(115,29,251,.34)`; nav `0 16px 42px rgba(0,0,0,.18)`; section cards use inset top highlight + `0 20px 52px rgba(0,0,0,.3)`.
- **Transitions:** fast .15s ease-in-out / normal .2s / slow .3s (`--tvl-transition-*`).

---

## 4. Page structure & copy (document order)

### 4.0 Promo banner (above header, first thing in body text flow)

> "Seedance 2.5 $3.6 / 30s · 30-Day Unlimited | 365-Day Unlimited: Wan 3.0 & MinMax H3 & GPT Image 2.5"

### 4.1 Header nav (`nav.tvl-header.tvl-theme-dark`)

- Logo: `dark-v2.webp` (146×33) → https://www.topview.ai
- Dropdown triggers (Radix Navigation Menu, contents **not** in SSR HTML): **Use Cases**, **AI Tools**, **Resources**, **Models**
- Plain links: **MCP/Skill** → `/mcp`, **Plugin** → `/plugin`, **API** → `/openapi`, **Pricing** → `/pricing`
- Language selector (client-rendered; footer instance shows "English")
- Auth buttons: **Login** (secondary), **Sign Up** (primary purple pill)
- Mobile: hamburger (`aria-label="Open menu"`) + accordion menu

### 4.2 Hero (section 1)

- **H1: "Create Any Video, Just Tell Your Agent"** (silver gradient text)
- Sub: "Describe your idea or add a script, reference video, or product URL. Topview plans scenes, selects the right models, generates assets, and keeps every shot editable on Canvas."
- Above the composer there is a small product toggle in the rendered text flow: "AI Video / AI Image".
- **Composer box** (`data-home-composer-shell`, `role="button"`, `aria-label="Open video composer"`, bg `#1b1b1b`, max-w 980px):
  - Mode tabs: **Video Agent** (active, white underline; with a sub-pill **Canvas ▾**) · **Drama Studio** · **AI Video** · **AI Image**
  - Placeholder (rotating prompt, 120 px tall area): **"Ask Topview to create a UGC-style product ad"**
  - Bottom row: **+** upload button (`aria-label="Upload file"`), model selector **Seedance 2.5 ▾**, agent model selector **GPT-6 Luna ▾**, round send button (arrow-up icon, disabled-looking white/25)
  - Below: a horizontal skill-chip marquee row ending in a purple **"More Skills ›"** pill → `https://www.topview.ai/home` (bg `#7C3AED`)

### 4.3 Model cards row (section 2) — 4 cards, each a link into Board

| Card | Badge | Copy | Link model-id |
|---|---|---|---|
| Seedance 2.5 (ByteDance logo) | 30 DAYS UNLIMITED | "The most powerful model yet." | `seedance-2.5` |
| Topview T1 (Topview symbol) | 30 DAYS UNLIMITED | "Seedance 2.5 quality at 38% of the official price." | `topview-t1` |
| Wan 3.0 (Wan logo) | 365 DAYS UNLIMITED | "Near-Seedance 2.5 quality at 30% of the price." | `qwen-wan3.0-video` |
| MiniMax H3 (MiniMax logo) | 365 DAYS UNLIMITED | "Near-Seedance 2.0 quality at 30% of the cost." | `minimax-h3` |

Cards: `rounded-[16px]`, min-height 112 px, hover brightness-up; T1 card has the violet radial glow background.

### 4.4 Quick starts (`#home-agent-quick-starts`, section 3)

**Empty in SSR** — chips/cards are client-loaded; no copy obtainable from the served HTML.

### 4.5 Plugin banner (sections 4–5, duplicated responsive variants)

- Eyebrow/H2: "Topview Plugin with **GPT-6 Astra**" (large gradient wordmark image `6ZPeIRBK4cOkKy8T.webp`, 842×202)
- CTA: **Install Plugin** → `/plugin`
- A row/marquee of 5 slide cards (854×480 images) labelled: **Plugin Blender**, **Plugin Blender 2**, **Plugin Codex**, **Depth Extraction**, **Plugin Blender 3** — all link to `/plugin`.

### 4.6 Feature cases (`#home-feature-cases`, section 6)

**Empty in SSR** — showcase cases are client-loaded; no copy/media obtainable from the served HTML.

### 4.7 Agent intro (section 7)

- Eyebrow: "The Smartest AI Video Agent"
- **H2: "Create Short Films and Marketing Videos with an AI Video Agent"**
- Copy = same as hero sub (script / reference video / product URL → Canvas).

### 4.8 Community prompt hints (sections 8–9; §8 is an `sr-only` SEO duplicate of §9)

- **H2: "Community"**
- Category tabs (buttons): **Marketing Video** (active) · **Film & Drama** · **Video Clone** · **Social Media** · **Image Design**
- Each category lists 3 example prompts (also repeated as full sections 24–28, `prompt-hint-category-*`):

| Category | Example prompts |
|---|---|
| Marketing Video | create a UGC-style product ad. / make a 30-second launch video. / build a conversion-focused promo video |
| Film & Drama | create a 90-second cinematic short film. / turn your story idea into a mini film. / make a dialogue-free emotional short |
| Video Clone | remake a viral video for your product. / clone the pacing of a reference video. / adapt a competitor ad to your brand |
| Social Media | turn raw clips into a viral Reel. / make a TikTok-ready short video. / create a punchy vertical video |
| Image Design | design a premium product poster. / create a bold campaign key visual. / generate a clean social graphic |

### 4.9 Product pillars (sections 10–13) — each is a video block (poster + MP4, see asset manifest)

1. **H2: "Canvas: Agent-Driven, Free-Form Video Creation"** → `/canvas`
   "You bring the idea and choose the direction. The agentic Canvas proposes scenes, creates assets, executes the production flow, and helps keep voice, characters, and visual identity consistent across multi-shot videos."
2. **H2: "Drama Studio: Professional Micro-Drama Production"** → `/drama-studio`
   "Create micro-dramas, mini dramas, vertical dramas, and short-form series from a novel, script, or plot, with consistent characters, scenes, visuals, and sound."
3. **H2: "Board: All-in-One Models and Asset Management"** → `/board`
   "Use image, video, audio, and avatar models in one place, then organize outputs for review, comparison, and reuse."
4. **H2: "3D Shot Composer: Stage Scenes and Control Camera Angles"**
   "Place characters and props in a 3D scene, adjust the virtual camera, and generate consistent AI video shots from multiple angles before spending credits."

Followed by a quick-link strip: **AI Canvas · Drama Studio · Board · AI Video Agent · AI Video Generator · AI Image Generator · Topview Skill · API** (from the `data-home-primary-pillars` block's link set).

### 4.10 Teams (`#home-teams`, section 14)

- Eyebrow: "Topview for Teams"
- **H2: "Share Projects, Credits, and Assets Across the Team"**
- Lead: "Give creators one place for team video collaboration while admins control credits and keep production materials organized." / "Built for enterprise marketing teams, agencies, and film or creative studios."
- 3 cards:
  - **Collaborate on Video Projects** — "Team members can work from shared projects in Canvas, Drama Studio, and Board, with references and outputs kept in one place."
  - **Manage Team Credits** — "Admins can share credits, monitor usage, and keep production spend under control across members and departments."
  - **Organize Every Generated Asset** — "Videos, images, audio, avatars, references, and approved materials stay grouped, reviewed, and reusable."

### 4.11 Six Ways (section 15)

- Eyebrow: "AI Video Agent for film, drama, and marketing"
- **H2: "Six Ways to Create Films, Short Dramas, and Ads with AI"**
- Intro: "Topview AI Video Agent is built for film creators, micro-drama teams, marketers, and ecommerce brands. Use it as an AI film generator, AI movie maker, AI short drama generator, AI marketing video generator, and AI ad video generator in one creative workspace."
- 6 cards (each with a CTA link):
  1. **AI Film and Cinematic Video Production** — "Turn a scene idea, script, or visual reference into cinematic shots with camera movement, lighting, mood, character direction, and editable story structure. Topview works as an AI film generator and AI movie maker for creators who want film-style video without a full production crew." — CTA *Create a film scene*
  2. **AI Short Drama and Micro-Drama Creation** — "Build short dramas, micro-dramas, vertical dramas, and episode-style story videos from a novel, script, or rough plot. The agent helps plan characters, scenes, props, prompts, continuity, and dialogue so Drama Studio can move from story to generated video faster." — CTA *Create a short drama* → `/drama-studio`
  3. **Reference Video Recreation** — "Upload a reference video and let the AI Video Agent analyze the style, rhythm, shot structure, camera language, and hooks. Recreate the creative direction for your own film scene, short drama, product story, or campaign video." — CTA *Clone a video style*
  4. **UGC-Style Ads** — "Generate realistic UGC-style ads with lifelike AI presenters, natural hooks, creator-style pacing, and product storytelling. It is designed for teams testing AI ad videos across TikTok, Instagram, Meta, and other paid channels." — CTA *Try AI UGC*
  5. **TikTok, Reels, and Shorts Content** — "Batch-create short-form videos for TikTok, Reels, Shorts, and social campaigns from one idea or asset set. Keep brand voice consistent while testing hooks, captions, aspect ratios, edits, and platform-native video formats." — CTA *Generate short videos*
  6. **URL to Marketing and Ad Video** — "Paste a product URL or campaign brief and turn it into a polished marketing video, explainer, product ad, or comparison clip. Topview acts as an AI marketing video generator and AI ad video generator for commercial creative teams." — CTA *Create ad videos*

### 4.12 Comparison table (section 16) — present as a real `<table>` plus a card version

- Eyebrow: "Workflow shift"
- **H2: "From Single-Purpose Generators to an Agent Production System"**
- Lead: "Most tools make one asset at a time. Topview is designed for the full creative loop: plan, generate, compare, refine, and adapt across video, image, social, and commercial formats."
- Columns: **Capability | Traditional Manual Production | Current Gen — Generic AI Video Tools | Next Gen — TopView AI Video Agent ("Best")**

| Capability | Manual Production | Generic AI Video Tools | TopView AI Video Agent |
|---|---|---|---|
| Creative Input | Brief, shot list, assets, team handoff | Mostly prompt-only | Prompt, URL, image, video, or reference mix |
| Reference Video Recreation | Manual research and editing | Limited or template-bound | Analyzes pacing, shots, hooks, and structure |
| Image + Video Workflow | Separate design and video tools | Usually one media type | Create images, scene boards, clips, and edits together |
| Narrative Production | Writers, directors, editors, actors | Short isolated clips | Plans scenes, characters, shots, and variants |
| Platform Formats | Rebuild per channel | Export and resize manually | Adapts for TikTok, Reels, Shorts, ads, and stories |
| Localization and Scale | High cost per market | Limited and one at a time | Voice, captions, and versions across 30+ languages |
| **Verdict** | High control, high overhead | Fast clips, narrow workflow | Multi-format production from one workspace |

### 4.13 Model orchestration (section 17)

- Eyebrow: "Model orchestration"
- **H2: "One Workspace, Many Creative Engines"**
- Lead: "Topview routes creative work across video, image, avatar, voice, and localization capabilities so each task uses the model best suited to the output."
- 3 rows: **Video generation — Seedance 2.0** → H3 "Cinematic Motion and Scene Output": "Generate short films, drama scenes, social clips, product videos, and reference-led variations with strong motion, camera direction, and visual continuity." · **Image creation — GPT Image 2** → H3 "Visual Assets Before and After Video": "Create thumbnails, product imagery, character references, scene concepts, and image edits that can feed directly into video generation and campaign production." · **Performance layer — Avatar + voice** → H3 "People, Dialogue, and Localization": "Add presenters, voiceover, captions, and 30+ language localization when a video needs explanation, performance, or market-specific versions."

### 4.14 Tools cloud (section 18)

- Eyebrow: "Creative toolkit"
- **H2: "Specialized Tools When the Agent Needs Sharper Control"**
- Lead: "Move from broad agent creation into focused tools for video generation, image creation, character swaps, upscaling, motion control, product photography, voiceover, and more."
- Pills (🔥 = "Hot" badge): AI Video Agent 🔥 → `/home` · AI Canvas 🔥 → `/canvas` · AI Drama 🔥 → `/drama-studio` · AI Image Generator 🔥 → `/ai-image-generator` · Topview Skill → `/topview-skill` · AI Video Generator → `/ai-video-generator` · Video Character Swap 🔥 → `/video-character-swap` · Video Upscale → `/video-upscale` · Motion Control → `/motion-control` · Inpaint → `/inpaint` · Image Character Swap → `/image-character-swap` · Image Face Swap → `/image-face-swap` · Image Upscale → `/image-upscale` · Photo Angle Editor → `/photo-angle-editor` · Virtual Try-On → `/virtual-try-on` · Product Photography → `/product-photography` · Voiceover → `/voiceover` · **Open the full toolset** → `/home`

### 4.15 Stats band (section 19)

- Eyebrow: "Why agent-first"
- **H2: "A Broader Production Surface for Modern Creative Teams"**
- Lead: "Create films, drama scenes, social posts, image assets, product videos, and localized campaigns from one agent-driven creative system."
- Stats: **1** — "Agent workspace for video planning, image creation, reference inputs, model choice, and final output." · **5+** — "Major creation modes: films and dramas, video recreation, social content, ads, image assets, and API workflows." · **30+** — "Languages for voiceover, captions, and localized creative variants when teams need global output."

### 4.16 Case study (section 20)

- **H2: "Production Teams Already Use Topview to Scale Output"**
- Quote: "TopView's AI Video Agent helped iLive by SHOPNOW grow our AI video production services revenue by 80%, while cutting labor and costs by 50%. It gives our team a faster way to test ideas, produce variations, and turn creative work into measurable output."
- Attribution: **Long Ma, CEO, Shopnow Technology JSC** (initials avatar "LM")
- Metrics: **+80%** Revenue growth in AI video production services · **−50%** Labor and production cost reduction · **10×** Faster turnaround on every video campaign

### 4.17 Testimonials (section 21)

- **H2: "What Video Creators and Marketing Teams Say"**
- The SSR section body is **empty** (client-rendered carousel/marquee), but the full data is in the RSC payload — 10 Trustpilot reviews in two rows labelled "Film, drama, and social video creators" and "Marketing video and growth teams":
  - Taskophilus Tanner — "For a high-volume YouTube workflow, the clean interface and Board make it easy to track outputs, iterate on ideas, and access multiple tools in one place."
  - Minh — "Drama Studio helps me turn a story into characters, props, environments, and reusable references, while the support team responds quickly when I need help."
  - QZDA_Proj — "Even when unlimited rendering requires patience, the clean workflow, Board, audio controls, and genuinely responsive support make Topview worthwhile."
  - Steve Eriksson — "After decades in film and television, I value Topview's fast access to new video models, practical unlimited plans, and responsive human support."
  - Nuna Business — "Topview gives me a strong video-generation workspace, with an especially helpful layout for organizing and adding assets."
  - rune trasop — "As a hobby creator, I get strong value from Seedance 2.0 and 2.5, and the unlimited generations make experimenting much more affordable."
  - J Robert Ormond — "The platform has been an excellent place to create videos, and the customer service team has been enthusiastic and supportive."
  - Alperen Hayder Karamus — "I regularly use Topview for both image and video generation and value the range of services available in one place."
  - Mohammad Milhem — "Topview is one of the best video-generation tools I've used, especially because live support is available when I need assistance."
  - Cjf — "The site was easy to learn, the generation pricing was very competitive, and customer support responded quickly with useful guidance."
- Avatars referenced as `/avatar/trustpilot-<name>.webp` for 6 of them (client-side path; not downloaded).

### 4.18 Final CTA (section 22)

- **H2: "Create Your Next Video with Topview AI"** — button **"Start creating"**

### 4.19 FAQ (section 23)

- **H2: "Topview AI Video Creation FAQ"** — Radix accordion, all items `data-state="closed"` in SSR with **empty panels**; the answers below are recovered verbatim from the page's JSON-LD `FAQPage` schema:
  1. **What is Topview AI?** — "Topview AI is an agent-driven creative platform for video creation. It connects Canvas, Drama Studio, and Board so creators can plan, generate, organize, and refine videos from one workspace."
  2. **What is Canvas best for?** — "Canvas is best for agent-led video creation. It supports short films, micro drama, video cloning, URL-to-video, batch video production, music videos, explainers, product ads, and image-to-video workflows. It can also work as an AI marketing video generator or AI ad video generator when teams need campaign videos fast."
  3. **How does the Canvas agent turn an idea into a video?** — "You describe the idea, add references, or upload assets. The agent reads the intent, plans scenes, selects models, generates visual and audio assets, applies skills, and keeps the project editable on the canvas. You can also manually run and adjust each generation tool when you want direct control."
  4. **Do beginners need video production skills?** — "No. Beginners can work by chatting with the agent, giving ideas, and making direction choices. They do not need to understand timelines, model settings, prompt engineering, or manual canvas nodes."
  5. **Can advanced creators still control the details?** — "Yes. Professional creators can control prompts, references, characters, scenes, models, aspect ratios, shot structure, edits, and asset choices while using the agent as a creative partner."
  6. **What is Drama Studio for?** — "Drama Studio is designed for AI micro-drama, mini drama, vertical drama, short-form drama, and multi-episode storytelling. It helps break down scripts, plan characters, scenes, props, and prompts, and preserve visual and audio continuity across clips and episodes."
  7. **How does Drama Studio keep episodes consistent?** — "It organizes the script, character bible, scene design, props, and generation prompts as reusable production assets. That makes it easier to keep characters, locations, visuals, and sound coherent across a series."
  8. **What is Board used for?** — "Board brings image, video, audio, and avatar models into one workspace. It also gives creators asset management for grouping, rating, viewing, pinning, comparing, and batch-operating generated materials."
  9. **Can Topview recreate a reference video style?** — "Yes. Topview can study a reference video's pacing, shot structure, hook, motion, framing, and visual tone, then create a new video around your own story, product, or character."
  10. **How is Topview different from generic AI video tools?** — "Most tools either generate a single clip or ask users to manually operate nodes. Topview is an Agent and agentic canvas system: it can plan, generate, compare, refine, manage assets, and learn reusable skills from the creator's workflow."
- Disclaimer under FAQ: "Third-party model and brand names are trademarks of their respective owners. Topview provides access to supported AI models through its independent platform and is not the developer of those third-party models."

### 4.20 Footer (`footer.tvl-footer`)

9 link columns (heading → links):

- **AI Ads:** AI Video Agent (→ https://agent.topview.ai), AI Ads Video, AI Product Video, AI UGC Video, URL to Video
- **AI Avatar:** AI Avatar Generator, Product Avatar, Design My Avatar, AI Lip Sync
- **AI Video:** AI Video Generator, Drama Studio, AI Video Body Swap, AI Video Upscaler, AI Video Watermark Remover, TikTok Watermark Remover, Sora Watermark Remover, Subtitle Remover, AI Motion Control, AI Lip Sync, URL to Video
- **AI Image:** AI Image Generator, AI Face Swap, AI Image Character Swap, AI Image Upscaler, AI Inpaint, AI Image Text Editor, Photo Angle Editor, AI Relighting, AI Product Photography, AI Virtual Try-On, AI Storyboard Generator, Extract Color Palette, Image to Prompt
- **AI Voice:** Voiceover, AI Voice Cloning, AI Music Generator
- **3D:** 3D World Generator, 3D Shot Composer
- **Use Cases:** Advertising, Affiliate Marketing, Ecommerce, DTC Brands, AI Live Stream
- **Resources:** Blog, Affiliate Program, Learning Center, Alternative, API
- **Company:** Topview Studio, Privacy Policy, Terms

Bottom bar: logo again + "© 2026 TOPVIEW PTE. LTD." · "Singapore: 20 Collyer Quay #20-03, Singapore 049319" · "Los Angeles: 15970 Los Serranos CC Dr #251, Chino Hills, CA 91709" · language button "English".

---

## 5. Interactions implied by markup / classes / CSS

- **Sticky glass header** with Radix Navigation Menu dropdowns (Use Cases / AI Tools / Resources / Models) — `data-state` open/closed, chevron rotate; dropdown panel content is rendered client-side (not in SSR).
- **Mobile menu:** hamburger → slide-down panel (`tvl-slideDown` / `tvl-fadeIn` keyframes) with accordion sub-menus on `#0f0f0f`.
- **Hero composer is a teaser, not a real form:** no `<textarea>`/`<input>` in SSR — the whole box is `role="button"` ("Open video composer") with `pointer-events-none` inner content; clicking presumably routes to the app / opens the real composer. Mode tabs (Video Agent / Drama Studio / AI Video / AI Image), model pickers (Seedance 2.5 ▾, GPT-6 Luna ▾) are visual only here. Placeholder text rotates through example prompts (only the first, "Ask Topview to create a UGC-style product ad", is in SSR).
- **Skill-chip marquee** under the composer: duplicated track + `@keyframes scrollLeft / scrollRight` in CSS (track width constant 2096px + 24px gap in the keyframes), pauses/implied hover states via group classes.
- **Model cards:** hover brighten (`hover:brightness-105`, 700 ms ease-out on group-hover), whole card is a link into Board with pre-selected model.
- **Community prompt hints:** category tab buttons switch 5 anchored sections (`#prompt-hint-category-*`, `scroll-mt-40`); CSS module `HomePromptHints_*` hides cards beyond the 2nd at certain container widths (`:nth-child(n+3){display:none}`) — i.e. a "show more" toggle pattern. Clicking a prompt presumably loads it into the composer ("Use this case" / "Bring the prompt and available references with you. Nothing generates automatically." strings in RSC data).
- **Product pillar videos:** no `<video>` tags in SSR — poster images + MP4 URLs exist only in JSON-LD `VideoObject` schema; the player is client-mounted (expect autoplay-muted-loop on scroll into view).
- **Comparison:** rendered twice — card stacks on mobile, real `<table>` on desktop.
- **Tool pills:** hover lift (`hover:-translate-y-0.5`), "Hot" badges.
- **Testimonials:** two-row marquee/carousel (client-rendered; `scrollLeft`/`scrollRight` keyframes; row labels in §4.17).
- **FAQ:** Radix Accordion (`animate-accordion-up/down`, chevron rotates 180° when `data-state=open`, panels `rounded-[22px]` white/4.5% bg).
- **Animations available in CSS:** `fade-in`, `fade-in-up/down`, `slide-up`, `scale-in`, `float` (±10 px), `pulse-glow` (purple glow on `--primary`), `shimmer`, `spin`, plus header `tvl-fadeIn/slideDown/slideUp`. Scroll-triggered reveals are JS-driven (no SSR markers beyond these classes).
- **Language switcher:** button with globe, `aria-label` "选择语言" (Select language) in the footer instance — opens a language menu (client-side).

## 6. Not obtainable from served source (needs live browser / JS execution)

- Nav dropdown panel contents (Use Cases / AI Tools / Resources / Models menus).
- `#home-agent-quick-starts` and `#home-feature-cases` sections — completely empty in SSR.
- Testimonial carousel DOM (recovered copy from RSC payload instead — §4.17).
- Pillar `<video>` elements, rotating composer placeholder list beyond the first prompt, and any community-case imagery (all client-fetched; no further image URLs exist anywhere in the HTML/RSC payload).
- Exact scroll/marquee behaviour and timing (only keyframe names/distances are visible).
