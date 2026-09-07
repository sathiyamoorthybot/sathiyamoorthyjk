# Sathiya Moorthy — Portfolio

A cinematic, dark single-page portfolio. Pure static HTML / CSS / JS — **no build step**.

## Structure
```
Website/
├── index.html         # home page          →  /
├── works/index.html   # video gallery      →  /works/
├── css/styles.css     # styling, theme tokens, responsive rules
├── js/main.js         # scroll reveal, counters, nav, cursor glow
├── js/works.js        # video list + gallery & lightbox
└── README.md
```

URLs are extensionless: each page is a folder with its own `index.html`, so
`/works/` works on any static server (no rewrite rules or `vercel.json` needed).

## Run locally
Serve from the project root so the clean URLs resolve:
```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy to Vercel
This is a static site — Vercel needs no configuration.

**Option A — drag & drop**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag the `Website` folder onto the page.

**Option B — Git**
```bash
git init && git add . && git commit -m "Portfolio"
# push to GitHub, then "Import Project" on Vercel
```

## Editing
- **Text / content** → `index.html`
- **Videos** → the `VIDEOS` array at the top of `js/works.js` (id, title, category, org)
- **Colours & fonts** → CSS variables at the top of `css/styles.css` (`:root`)
  - Accent gold: `--gold`
- **Animations / counters** → `js/main.js`

## Customization ideas
- Swap the gold accent (`--gold`) for a broadcast red (`#e5342b`) if you prefer.
- Add real project thumbnails / video reels to the "Selected work" cards.
- Plug in social links (LinkedIn, YouTube, Instagram) in the footer.
