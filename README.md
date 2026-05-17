# RysHub

RysHub is a static educational web platform built with vanilla HTML, CSS, and JavaScript, hosted on GitHub Pages.

It combines TOEFL iBT practice tools, interactive books, classroom utilities, student tracking, and educational mini-games in one repository.

## What’s in this repository

- **Main portal:** `index.html`
- **TOEFL apps:** `apps/toefl/` (Reading, Listening, Speaking, Writing)
- **Books library:** `apps/books/library.html` (+ interactive stories)
- **Games hub:** `apps/games/index.html`
- **Classroom tools:** `apps/timer.html`, `apps/student-tracker.html`, `apps/command-center.html`
- **Course materials:** `apps/files seperate/` (World Class 2 resources)
- **Shared assets:** `assets/` (auth, global header, theme, backgrounds)

## Tech stack

- HTML5 + CSS3 + Vanilla JavaScript (no framework build for main site)
- Tailwind CSS (CDN)
- Font Awesome + Google Fonts (CDN)
- Chart.js (student tracker)
- Three.js (BrickForge)
- epub.js + JSZip (books library)

## Run locally

This is a static site, so any simple local server works:

```bash
cd ryshub
python -m http.server 8000
```

Then open:

- `http://localhost:8000/` (main portal)

## Deployment

- Deployed via **GitHub Pages** from repository root.
- `.nojekyll` is included so files are served directly.
- No build step is required for the current vanilla site.

## Project structure (high level)

```text
ryshub/
├── index.html
├── apps/
│   ├── toefl/
│   ├── books/
│   ├── games/
│   ├── writing-trainer/
│   ├── files seperate/
│   └── *.html (login, timer, tracker, brickforge, etc.)
├── assets/
├── calender/
├── rule book/
├── PLAN.md
└── README.md
```

## Security notes

- Auth is client-side (`assets/ryshub-auth.js`) and intended as lightweight access control, not production-grade server security.
- `index.html` uses a Content Security Policy (CSP). If you add new CDN sources, update CSP accordingly.

## Current status

- Active platform is the static/vanilla implementation in repo root.
- `PLAN.md` documents a possible future React/Vite migration; it is not the current runtime.

## Contributing

1. Create a branch from `main`.
2. Make focused changes.
3. Open a pull request with a clear summary.

## Contact

- GitHub: [@Khmerix](https://github.com/Khmerix)
- Issues: https://github.com/Khmerix/ryshub/issues
