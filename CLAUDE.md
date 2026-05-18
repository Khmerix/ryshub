# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RysHub is a **static HTML educational platform** for ESL teachers and learners, hosted on GitHub Pages. It is entirely client-side — no backend, no build step, no package manager for the main site. All apps are standalone HTML files.

## Running Locally

Any static file server works. Audio features in `apps/toefl/listening/` require a server (they won't work over `file://`):

```bash
python -m http.server 8000
# or
npx serve .
```

Convenience scripts for TOEFL audio: `apps/toefl/listening/start-server.bat` / `start-server.ps1`.

**Deployment:** Push to `main`. GitHub Pages serves the repo root directly. `.nojekyll` disables Jekyll. No build step.

## Architecture

### Single-File App Pattern

Each app is a self-contained `.html` file with inline `<style>` and `<script>` blocks. Pages load dependencies from CDN:

- **Tailwind CSS** via `https://cdn.tailwindcss.com` (most pages)
- **Font Awesome 6.4.0** via jsDelivr CDN
- **Google Fonts** (Inter, Space Grotesk, Orbitron, Cinzel, Rajdhani, Lora)
- **Three.js r128**, **Chart.js 3.9.1**, **epub.js + JSZip** — used in specific apps only

### Shared Assets (`assets/`)

Three files are injected into pages that opt in:

| File | What it does |
|------|-------------|
| `ryshub-global-header.js` | Injects a fixed 56px nav bar and loads `ryshub-theme.css`. Adds `padding-top: 56px` to `<body>`. Skip it if the page has its own fixed header. |
| `ryshub-auth.js` | Exposes `window.RysHubAuth`. Prefer `RysHubAuth.check()` over legacy boolean flags. |
| `ryshub-theme.css` | Light/dark theme variables, loaded automatically by the global header. |

`ryshub-global-header.js` detects the site root by looking for `/apps/` in `window.location.pathname`. Restructuring directories will break header link generation — test it.

### Authentication

`RysHubAuth` (in `assets/ryshub-auth.js`) is **client-side obfuscation only**. It uses a non-cryptographic hash + Base64 token stored in `localStorage`/`sessionStorage` with a 24-hour expiry. Legacy boolean flags (`ryshub_master_access`, `ryshub_loggedIn`, `teacherLoggedIn`) still exist as fallbacks during migration — `RysHubAuth.checkCompat()` handles both.

All `localStorage` keys should be prefixed with `ryshub_`. Theme is stored as `ryshub-theme` with value `'dark'` or `'light'`.

### Content Security Policy

`index.html` defines a strict CSP via `<meta http-equiv="Content-Security-Policy">`. **Adding any new CDN resource requires updating this policy**, or the landing page will silently block it.

### TOEFL Design System (`apps/toefl/`)

TOEFL pages use a shared CSS design system instead of inline styles:

```html
<link rel="stylesheet" href="toefl-styles.css">
<link rel="stylesheet" href="toefl-section-colors.css">
<body class="section-reading">  <!-- or section-listening, section-speaking, section-writing -->
```

Start new TOEFL sections from `apps/toefl/TEMPLATE.html`. Section accent colors are automatically applied by the body class. See `apps/toefl/DESIGN-SYSTEM.md` for component markup and `MIGRATION-GUIDE.md` for converting legacy TOEFL pages.

### Interactive Books (`apps/books/`)

Each book lives in `apps/books/<book-id>/` with `index.html` and a `data.js` exporting a `STORY_DATA` choice tree. Books are registered in the `INTERACTIVE_BOOKS` array in `apps/books/library.html`. Full instructions in `INTERACTIVE_BOOKS_SETUP.md`.

## Code Conventions

- **Vanilla JS only** — no frameworks, no bundler, no transpiler.
- Match the `var` style of the surrounding file. Existing code uses `var` for broad compatibility; use `const`/`let` only in files that already use them.
- Wrap scripts in IIFEs `(function() { 'use strict'; ... })()` to avoid polluting globals. Expose only what's needed on `window`.
- Use **CSS custom properties** (`:root` variables) for colors — don't hardcode hex values in new code.
- Dark theme is the default; use `clamp()` for fluid sizing and `backdrop-filter: blur()` for glass effects.
- Use relative paths for everything (`../assets/`, `apps/toefl/`). The site is served from the repo root.

## Key Pitfalls

1. **CSP violations** — any new CDN URL must be added to the `<meta http-equiv="Content-Security-Policy">` in `index.html`.
2. **Global header offset** — pages including `ryshub-global-header.js` get `padding-top: 56px` added automatically. Don't add it again manually.
3. **File size** — `apps/book1.html` is ~680 KB of inline HTML. Edit cautiously.
4. **`ryshub-react/`** — this directory contains only orphaned native Node modules. The React rewrite described in `PLAN.md` has not been started. Treat the project as vanilla static until that changes.
5. **Firebase config** in `apps/brickforge.html` and the Google Apps Script URL in the TOEFL Speaking section are visible in client-side source — treat as public.
