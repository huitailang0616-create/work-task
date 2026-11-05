# Web Clone Test — Local Replica

Local static replica built for Margaret's practical test. It recreates the
layout, colour tone, and main interactions of two publicly visible pages
using original, hand-written HTML/CSS/JS and CSS/SVG placeholder visuals.
No original site code or image assets were copied, nothing is deployed,
nothing was pushed to GitHub, and no account credentials are used anywhere.

## File structure

```
web-clone-test/
├── README.md
├── wrangler.toml          # deployment placeholder only — no account info
└── public/                # static root (point Cloudflare assets/Pages here)
    ├── index.html         # route /         → Topview homepage replica
    ├── ugc-ads/
    │   └── index.html     # route /ugc-ads/ → LumeFlow UGC Ads replica
    └── assets/
        ├── topview.css    # Topview styles
        ├── topview.js     # Topview interactions
        ├── lume.css       # LumeFlow styles
        └── ugc.js         # LumeFlow interactions
```

Later, deployment only needs: pick a Worker/Pages name, deploy `public/`
as static assets, and return the first access URL. That step requires
GitHub repository selection and Cloudflare account access, intentionally
not handled here.

## Implemented interactions

### `/` — Topview replica
- Sticky header that gains a background/shadow on scroll; mobile nav toggle.
- Hero creator box: Idea / Script / Product URL / Reference video mode tabs
  that change the placeholder, suggestion chips that fill the input, live
  character count (0/600).
- "Create video" button runs a simulated agent plan (4 steps animate in
  sequence with a status line); explicitly labelled as a front-end demo.
- Capability comparison table (Traditional Manual Production vs Generic AI
  Video Tools vs TopView Agent) with the 6 verified rows: Creative Input,
  Reference Video Recreation, Image+Video Workflow, Narrative Production,
  Platform Formats, Localization — row hover + highlighted TopView column.
- Canvas / Drama Studio / Board feature cards with hover lift.
- Scroll-reveal animations via IntersectionObserver.
- FAQ accordion (10 questions), single-open behaviour.

### `/ugc-ads/` — LumeFlow UGC Ads replica
- Model header: "Seedance 2.0 — Create cinematic ad videos with smooth
  motion and realistic visuals."
- Product upload and Avatar (optional) upload: click / Enter / drag-and-drop,
  local in-browser image preview (object URL, never uploaded anywhere),
  remove button.
- Prompt textarea with live 0/5000 character counter.
- Language select; Resolution segmented control (480P / 720P / 1080P);
  Duration segmented control (5s / 10s / 15s); Outputs segmented control
  (1–4); Aspect Ratio pills (Auto / 16:9 / 4:3 / 1:1 / 3:4 / 9:16 / 21:9) —
  all single-select with a clear active state.
- Generate Audio toggle switch.
- Generate button: simulated loading (spinner, staged status text,
  progress bar) for ~3.4 s, then 1–4 gradient result placeholder cards
  labelled with the chosen ratio/resolution/duration/audio settings, plus
  a session History entry. No real or paid API is called.
- History / Inspiration tabs; Inspiration cards are CSS placeholder art
  whose "Use prompt" action fills the prompt box.
- FAQ accordion (3 questions).

## Local preview

```bash
cd ~/workspace/web-clone-test
python3 -m http.server 8787 --directory public
# Home:     http://localhost:8787/
# UGC Ads:  http://localhost:8787/ugc-ads/
```

Any other static server works the same way (e.g. `npx serve public`).

## Verification notes (build time)

- Both source pages were checked via public web page text only
  (browser search/open). Their original HTML/CSS/JS and image files were
  not downloaded or copied.
- Verified locally with a static server + HTTP checks (200 responses for
  `/`, `/ugc-ads/`, and all CSS/JS assets) and a Node syntax check of
  both JS files plus a tag-balance smoke test of both HTML files.
