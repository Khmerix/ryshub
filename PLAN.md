# Plan: Convert Ryshub to React Dynamic Landing Page with Real-Time Globe

## Goal
Replace the broken 2821-line `index.html` with a modern Vite + React + TypeScript landing page featuring a real-time rotating 3D globe synchronized with local time.

## Architecture

### 1. Project Setup
- Initialize **Vite + React + TypeScript** inside `Rys Hub/ryshub/` (or a subfolder like `src-react/`).
- Install dependencies:
  - `react-globe.gl` (Three.js-based declarative globe)
  - `three` + `@types/three`
  - `lucide-react` (icons)
  - `framer-motion` (animations, 3D tilt, scroll effects)
  - `tailwindcss` + `@tailwindcss/vite` (or PostCSS config)
- Preserve the existing `apps/` folder and `assets/images/page-banner.png`.

### 2. Globe Strategy: `react-globe.gl`
- Load a **NASA Blue Marble** (or Natural Earth) texture for the day side.
- Optional: load a **night city-lights** texture for the dark side.
- **Time Sync Logic**:
  - Calculate sun longitude from current UTC time: `sunLng = -((hours + minutes/60) / 24) * 360`.
  - Set globe `rotation` so the user’s local longitude faces the light source (sun) or front-center.
  - Update every minute via `requestAnimationFrame` or `setInterval`.
  - Add a soft atmosphere glow matching the page theme.
- Globe auto-rotates slowly when user is not hovering; pauses on hover.
- Responsive sizing: fills the hero background or sits as a large right-side visual.

### 3. Page Structure (Components)
| Component | Responsibility |
|-----------|----------------|
| `App.tsx` | Root layout, global styles, background effects |
| `Hero.tsx` | Banner image, badges, title, CTAs, feature pills, **Globe background/visual** |
| `Globe.tsx` | `react-globe.gl` wrapper with real-time sun sync |
| `FlashStrips.tsx` | Two horizontally scrolling rows with scroll-driven parallax |
| `ToolCard.tsx` | Reusable card with 3D tilt, glow, badge, dots, button |
| `GameCard.tsx` | Variant of ToolCard for the arcade section |
| `ToolsGrid.tsx` | 5 tool cards (TOEFL, World Class 2-1, 2-2, EduGrade, Word Practice) |
| `GamesGrid.tsx` | 4 game cards (Last Colony, Word Scramble, Typing Race, Memory Match) |
| `StatStrip.tsx` | "200+ Students" animated counter |
| `LiveTicker.tsx` | Auto-updating activity feed |
| `Footer.tsx` | Branding, contact info, social links |
| `Navbar.tsx` | Fixed header, mobile hamburger, slide-out menu |
| `SpotlightBackground.tsx` | Mouse-following radial gradient + floating orbs |

### 4. Visual Design Preserved
- **Fonts:** Inter + Space Grotesk.
- **Background:** Animated gradient orbs + subtle grid pattern + mouse spotlight.
- **Hero:** Keep banner image, "Live Platform 2026" pulse badge, glow buttons, feature pills.
- **Cards:** Re-implement 3D tilt with Framer Motion (`useMotionValue` + `rotateX`/`rotateY`).
- **Flash Strips:** Re-implement parallax on scroll.
- **Colors:** Use the existing Tailwind palette (slate, blue, emerald, purple, cyan).

### 5. Links & Navigation
- All CTAs and cards link to existing `apps/` pages:
  - `apps/toefl/index.html`
  - `apps/book1.html`
  - `apps/book2b.html`
  - `apps/brickforge.html`
  - `apps/games/colony/index.html`
- Use `<a href="...">` tags (not React Router) since external HTML apps live outside the React bundle.

### 6. Cleanup
- Remove the old `index.html` (or rename to `index-legacy.html`).
- Remove dead `<link>` tags to missing `toefl-styles.css` and `toefl-section-colors.css`.
- Strip all residual TOEFL test JavaScript (writing section, audio players, timers, etc.).

### 7. Build & Deploy
- Vite builds to `dist/`.
- Copy `apps/` and `assets/` into `dist/` during build (via `public/` symlink or copy script).
- Final entry point serves the React app at `/` and preserves all app links.

## Trade-offs Considered

| Option | Pros | Cons |
|--------|------|------|
| **A. react-globe.gl** (Recommended) | Beautiful, declarative, atmosphere glow, fast to implement | Higher bundle impact than a custom hook; verify actual Vite build output for this implementation because `three`/globe usage and tree-shaking can vary |
| **B. Custom Three.js hook** | Minimal bundle, full control | More code to maintain, no built-in labels/atmosphere |

**Chosen: Option A** for best visual impact and maintainability.

## File Changes
- `Rys Hub/ryshub/package.json` *(new)*
- `Rys Hub/ryshub/vite.config.ts` *(new)*
- `Rys Hub/ryshub/index.html` *(replace with Vite entry)*
- `Rys Hub/ryshub/src/` *(new React source tree)*
- `Rys Hub/ryshub/public/apps/` *(symlink or copy of existing apps)*
- `Rys Hub/ryshub/public/assets/` *(symlink or copy of existing assets)*
