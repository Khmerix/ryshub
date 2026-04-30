# RysHub — Agent Guide

> This file is for AI coding agents. The project uses English for all code, comments, and documentation.

## Project Overview

RysHub is a client-side educational platform and content portal built as a collection of static HTML applications. It is hosted on GitHub Pages and serves as a central hub for:

- **TOEFL iBT test preparation** (Reading, Listening, Speaking, Writing)
- **Interactive books library** with EPUB support and choose-your-own-adventure stories
- **Educational games** (memory, typing race, solar system quiz, colony builder)
- **Student progress tracking** with Chart.js dashboards
- **Classroom utilities** (timer, writing trainer, teacher command center)
- **World Class 2 course materials** (homework, vocabulary, grammar, writing units)

The entire project is vanilla HTML/CSS/JavaScript. There is no backend server, no build step, and no package manager for the main site.

## Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Markup | HTML5 | Single-file apps with inline `<style>` and `<script>` |
| Styling | CSS3 + Tailwind CSS (CDN) | `https://cdn.tailwindcss.com` loaded in most pages |
| Fonts | Google Fonts CDN | Inter, Space Grotesk, Orbitron, Cinzel, Rajdhani, Lora |
| Icons | Font Awesome 6.4.0 CDN | `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css` |
| Scripts | Vanilla ES5/ES6 | No bundler, no transpiler, no frameworks |
| 3D Graphics | Three.js r128 CDN | Used in `apps/brickforge.html` |
| Charts | Chart.js 3.9.1 CDN | Used in `apps/student-tracker.html` |
| Database | Firebase Realtime Database | Used in `apps/brickforge.html` for shared builds |
| EPUB Reading | epub.js + JSZip CDN | Used in `apps/books/library.html` |
| Auth | Client-side tokens only | See **Security Considerations** below |

### Notable Absences

- **No `package.json`** — the main site has no Node.js build process.
- **No bundler** — Vite, Webpack, Rollup, etc. are not used for the deployed site.
- **No test suite** — there are no unit tests, integration tests, or E2E tests.
- **No CI/CD build** — the only GitHub Action is CodeQL security scanning.

## Project Structure

```
ryshub/
├── index.html                          # Main landing page (~4,300 lines)
├── apps/
│   ├── toefl/
│   │   ├── index.html                  # TOEFL hub / main test shell
│   │   ├── toefl-styles.css            # Shared TOEFL design system (26 KB)
│   │   ├── toefl-section-colors.css    # Section color overrides
│   │   ├── TEMPLATE.html               # Starter template for new TOEFL sections
│   │   ├── DESIGN-SYSTEM.md            # TOEFL component documentation
│   │   ├── MIGRATION-GUIDE.md          # How to migrate old TOEFL pages
│   │   ├── toeflreading-MIGRATED.html
│   │   ├── toefllistening-MIGRATED.html
│   │   ├── toeflspeaking-MIGRATED.html
│   │   ├── toeflwriting-MIGRATED.html
│   │   ├── listening/                  # MP3 audio assets + local server scripts
│   │   └── Speaking/                   # MP3 audio + Google Apps Script integration
│   ├── books/
│   │   ├── library.html                # EPUB / interactive book browser
│   │   ├── blackwood-manor/            # Choice-based story
│   │   └── the-secret-cave/            # Choice-based story (+ data.js)
│   ├── games/
│   │   ├── index.html                  # Game arcade landing
│   │   ├── colony/
│   │   ├── memory-game/
│   │   ├── solar-system/
│   │   └── typing-race/
│   ├── writing-trainer/
│   │   └── index.html                  # WriteCraft — writing practice app
│   ├── files seperate/                 # World Class 2 course portal
│   │   ├── index.html                  # Course hub
│   │   ├── homework/                   # Per-unit homework pages
│   │   ├── unit7.html … unit12.html    # Unit study pages
│   │   └── *.mp4                       # Course videos
│   ├── login.html                      # Auth gate
│   ├── student-tracker.html            # Dashboard with Chart.js
│   ├── timer.html                      # Classroom countdown timer
│   ├── brickforge.html                 # Three.js 3D building sandbox
│   ├── command-center.html             # Teacher admin dashboard
│   ├── book1.html                      # Large legacy book (~680 KB)
│   ├── book2b.html                     # Secondary book (~60 KB)
│   └── toeflwriting.html               # Legacy writing page
├── assets/
│   ├── images/                         # Page banners, card images
│   ├── ryshub-auth.js                  # Client-side auth utilities
│   ├── ryshub-global-header.js         # Injected nav header for all pages
│   ├── ryshub-theme.css                # Shared light/dark theme CSS
│   ├── ryshub-dynamic-background.js    # Animated background effects
│   └── *.svg                           # Preview illustrations
├── calender/
│   └── Aii_2026_Interactive_Calendar.html
├── rule book/
│   └── Aii_Teachers_Handbook_6th_Edition_Complete.html
├── ryshub-react/                       # Planned React rewrite (NOT ACTIVE)
│   └── node_modules/                   # Only native bindings exist; no source code
├── .github/
│   ├── workflows/codeql.yml            # Weekly CodeQL security scan
│   └── agents/                         # GitHub Copilot agent templates (unused)
├── _config.yml                         # Default Jekyll config (mostly unused)
├── .nojekyll                           # Bypass Jekyll processing on GitHub Pages
├── .stylelintrc.json                   # Ignores JS and HTML
├── SECURITY.md                         # Template — not customized
├── PLAN.md                             # Architecture plan for React + Vite rewrite
├── INTERACTIVE_BOOKS_SETUP.md          # Guide for adding new interactive books
└── README.md                           # Generic template — not project-specific
```

## Build and Deployment

### How to Run Locally

Because the project is static HTML, any local file server works:

```bash
# Python 3
python -m http.server 8000

# Node.js (if available)
npx serve .

# PowerShell (Windows)
# Simply open index.html in a browser, or use IIS Express
```

Some audio features in `apps/toefl/listening/` require a local server. Convenience scripts are provided:

- `apps/toefl/listening/start-server.bat`
- `apps/toefl/listening/start-server.ps1`

### Deployment

The site is deployed via **GitHub Pages**:

1. Push changes to the `main` branch.
2. GitHub Pages serves the repository root directly (`.nojekyll` disables Jekyll processing).
3. No build step is required.

### React Rewrite (Planned but Not Started)

`PLAN.md` describes a future migration to **Vite + React + TypeScript** inside `ryshub-react/`:

- `react-globe.gl` for a real-time 3D globe hero
- `framer-motion` for animations
- `tailwindcss` for styling
- Preserve `apps/` and `assets/` by copying or symlinking them into `public/`

**Important:** As of the current codebase, `ryshub-react/` contains only orphaned native Node modules. No source files, configs, or builds exist yet.

## Code Style Guidelines

### HTML

- Use HTML5 doctype and semantic structure.
- Load Tailwind CSS via CDN in the `<head>`:
  ```html
  <script src="https://cdn.tailwindcss.com"></script>
  ```
- Inline `<style>` blocks are the norm. Each app page is typically self-contained.
- Use `box-sizing: border-box` globally.

### CSS

- Prefer **CSS custom properties** (`:root` variables) for colors and spacing.
- Use `clamp()` for fluid typography and sizing.
- Dark theme is the default for most apps; some apps (TOEFL, writing-trainer) also support an explicit light theme.
- Common visual patterns:
  - Glassmorphism (`backdrop-filter: blur(16px)`)
  - Gradient overlays
  - Subtle grid backgrounds (`background-size: 50px 50px`)
  - Glow shadows (`box-shadow: 0 0 20px rgba(...)`)

### JavaScript

- Write **vanilla JS** — no jQuery, no React, no build tools.
- Prefer `var` for broad browser compatibility (the existing codebase uses `var` extensively).
- Use IIFE wrappers to avoid global namespace pollution:
  ```javascript
  (function () {
      'use strict';
      // ...
  })();
  ```
- Expose minimal globals when needed (e.g., `window.RysHubAuth`).
- Avoid `const`/`let` if the surrounding file uses `var` exclusively — match the existing style.

### Shared Assets

When modifying shared CSS or JS in `assets/`, remember they affect **all pages** that include them:

| File | Inclusion Method | Scope |
|------|-----------------|-------|
| `assets/ryshub-auth.js` | `<script src="...">` | Any page that imports it |
| `assets/ryshub-global-header.js` | `<script src="...">` | Injects nav + theme CSS automatically |
| `assets/ryshub-theme.css` | Injected by `ryshub-global-header.js` | All pages with the global header |

## Authentication & Security

### Client-Side Auth (`assets/ryshub-auth.js`)

- **Not production-grade.** The codebase explicitly warns that client-side auth can be bypassed with DevTools.
- Uses a simple hash + Base64 token stored in `localStorage` / `sessionStorage`.
- Token expires after 24 hours.
- Legacy boolean flags (`ryshub_master_access`, `ryshub_loggedIn`, `teacherLoggedIn`) are still checked as fallbacks.
- Login logic lives in `apps/login.html`.

### Content Security Policy

`index.html` defines a CSP:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://www.youtube.com https://drive.google.com; connect-src 'self';">
```

If you add new CDN resources, you **must** update this policy or the main landing page will block them.

### Secrets & Credentials

- **No `.env` files** or server-side secrets exist.
- Firebase config in `apps/brickforge.html` is visible in client-side source. Treat it as public.
- Google Apps Script URL for TOEFL Speaking is also client-side visible.

## Testing

There is no automated testing infrastructure. All verification is manual:

1. Open the page in a browser.
2. Test responsive layouts at 320px, 768px, 1024px, and 1440px viewports.
3. Verify dark/light theme toggles where supported.
4. Check that `ryshub-global-header.js` does not break embedded/iframe contexts.
5. For TOEFL pages, run through the migration checklist in `apps/toefl/MIGRATION-GUIDE.md`.

## Adding New Apps or Pages

### Adding a New Standalone App

1. Create a new folder under `apps/` or a new `.html` file directly in `apps/`.
2. Include the standard CDN links:
   - Tailwind CSS
   - Font Awesome
   - Google Fonts (Inter at minimum)
3. Include `../assets/ryshub-auth.js` if the page should be protected.
4. Include `../assets/ryshub-global-header.js` if the page should show the top navigation bar.
5. Use `<a href="...">` for navigation — React Router is not used.
6. Add a link card on `index.html` pointing to the new app.

### Adding a New Interactive Book

Follow the guide in `INTERACTIVE_BOOKS_SETUP.md`:

1. Create `apps/books/<book-id>/`
2. Add `index.html` and `data.js` with the `STORY_DATA` choice tree.
3. Register the book in `apps/books/library.html`'s `INTERACTIVE_BOOKS` array.

### Adding a New TOEFL Section

1. Copy `apps/toefl/TEMPLATE.html`.
2. Add `toefl-styles.css` and `toefl-section-colors.css` links.
3. Set `<body class="section-reading">` (or `listening`, `speaking`, `writing`).
4. Follow the component patterns documented in `apps/toefl/DESIGN-SYSTEM.md`.

## Important Conventions

- **File paths:** Use relative paths (`apps/toefl/index.html`, `../assets/...`). The site is served from the repo root on GitHub Pages.
- **No server-side rendering:** Everything must work when opened as `file://` or served statically.
- **Storage:** Use `localStorage` / `sessionStorage` for persistence. Keys should be prefixed with `ryshub_` to avoid collisions.
- **Theme sync:** The React plan expects `localStorage.setItem('ryshub-theme', 'dark'|'light')`. Existing vanilla pages read this key in `ryshub-global-header.js`.
- **Large files:** `apps/book1.html` is ~680 KB of inline HTML. Be cautious with edits that could bloat it further.

## Common Pitfalls

1. **CSP violations:** Adding a new CDN script without updating `index.html`'s `<meta http-equiv="Content-Security-Policy">` will break the landing page.
2. **Auth bypass:** Do not rely on `RysHubAuth.check()` for sensitive data. It is obfuscation, not security.
3. **Global header injection:** `ryshub-global-header.js` adds `padding-top: 56px` to `<body>`. If a page has its own fixed header, account for the extra offset or skip the global header.
4. **Path resolution:** `ryshub-global-header.js` resolves the site root by looking for `/apps/` in `window.location.pathname`. If you restructure directories, test header link generation.
5. **React migration debt:** `PLAN.md` describes a desired future state. Until the React rewrite is actually implemented, continue treating the project as a vanilla static site.
