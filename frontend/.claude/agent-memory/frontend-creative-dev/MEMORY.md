# Frontend Creative Dev — Agent Memory

## Project: SynthReport Portfolio (Mathias Bjørkmann)

### Stack
- Next.js 15 (App Router), Bun as runtime (`bun --bun next build`)
- Tailwind CSS via `@import "tailwindcss"` in globals.css — but most custom styles are written as hand-rolled CSS classes in globals.css, NOT as Tailwind utilities in JSX
- No Framer Motion — animations are pure CSS keyframes
- Fonts: Geist Sans + Geist Mono from Google, `'Courier New'` used for UI labels/mono elements

### Design Tokens (globals.css :root)
- `--background: #0a0a0a`
- `--foreground: #ededed`
- `--accent: #d5820e` (orange)
- `--accent-hover: #e89a2e`
- `--card-bg: rgba(255, 255, 255, 0.05)`
- `--card-border: rgba(255, 255, 255, 0.1)`

### CSS Conventions
- All AI tool classes prefixed with `.aitool-` (BEM-like namespacing)
- Global `p { opacity: 70% }`, `li { opacity: 70% }` — class selectors override these
- Global `h1–h5` use `'Courier New'` with partial opacity
- `.btn-primary` and `.btn-secondary` in globals.css for reusable pill buttons
- `.page-container` for standard page max-width (900px) with padding

### Localization
- `useTranslation()` from `@/lib/locale-context` — must use for ALL user-facing strings
- Keys live in `src/lib/translations.ts` (en + da)
- Never hardcode text strings in components

### Component Patterns
- All components are `"use client"` with explicit prop types at top of file
- Components import `useTranslation` themselves (not passed via props)
- API base: `const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""`

### Page Structure
- `src/app/layout.tsx` — Navbar + LocaleProvider wrap all pages
- `body` has `padding-top: 64px` to clear the fixed navbar
- Pages use `.page-container` or custom page class for max-width + centering

### Animation Patterns
- CSS `@keyframes` defined in globals.css: `fade-in`, `slide-up`, `scan-sweep`, `pulse-text`, `dot-bounce`, `modal-backdrop-in`, `modal-panel-in`, `modal-panel-in-mobile`
- Apply with `animation: slide-up 0.5s ease both` pattern
- Use `animation-delay` for staggered reveals

### Modal Pattern (AnalysisDisplay)
- `.aitool-modal-backdrop` — `position: fixed; inset: 0; z-index: 200; backdrop-filter: blur(8px)`
- `.aitool-modal-panel` — `max-width: 620px; max-height: calc(100vh - 3rem); border-radius: 18px; flex column`
- On mobile (`max-width: 640px`): backdrop `align-items: flex-end`, panel `border-radius: 18px 18px 0 0`, slides up from bottom
- Body scroll lock via `document.body.style.overflow = "hidden"` in useEffect with cleanup
- Close triggers: Escape key (addEventListener in useEffect), backdrop click (check `e.target === e.currentTarget`), X button
- Cards are `<button>` elements with `.aitool-rec-card--clickable` modifier that resets button defaults and adds hover lift

### Mobile Breakpoint (`max-width: 640px`)
- `.hero-title` uses `clamp(1.6rem, 8vw, 2.5rem)`
- `.hero-cta` stacks to column, `.btn-primary/.btn-secondary` stretch to full width with `min-height: 44px`
- `.links-grid` stacks to column; `.contact-cards` goes to single column
- `.aitool-input-row, .aitool-report-row` stack to column; submit buttons go full width
- `.aitool-rec-grid` single column
- All touch targets: `min-height: 44px`

### Details worth remembering
- See `debugging.md` for specificity gotchas with global `p`/`li` opacity rules
- `bun --bun next build` shows `ResolveMessage is not constructable` at the very end — this is a pre-existing Bun/Next.js compat issue, not a real error. Compiled/type-check results above it are authoritative.
