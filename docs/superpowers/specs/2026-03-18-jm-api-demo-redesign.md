# JM API Demo — Portfolio Theme Redesign
**Date:** 2026-03-18
**Scope:** Visual skin swap of `public/index.html` to match the portfolio at jeffmaddow-ops.github.io

---

## Goal

Align the jm-api-demo UI with the portfolio's "Dark Editorial / Warm Brass" design system. No structural HTML changes, no new features. Only the `<style>` block and the Google Fonts `<link>` tag in `<head>` are modified.

---

## Approach

Option A — Skin swap. Keep the existing collapsible card layout and all JavaScript unchanged. Replace all CSS tokens, fonts, background, and component styles to match the portfolio design system.

---

## Head Changes

Add this `<link>` tag to `<head>` before the `<style>` block:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

---

## Design Tokens

Replace all `:root` CSS variables. Keep `--font-mono` as the variable name but update its value:

| Token | Current Value | New Value |
|---|---|---|
| `--bg` | `#0d1117` | `#0F0F0F` |
| `--surface` | `#161b22` | `#1A1A1C` |
| `--border` | `#30363d` | `rgba(255,255,255,0.07)` |
| `--text` | `#e6edf3` | `#EDE9E3` |
| `--muted` | `#8b949e` | `#A09890` |
| `--muted-dim` | _(new)_ | `#585450` |
| `--accent` | _(new — replaces `--blue` as primary accent)_ | `#C09050` |
| `--accent-dim` | _(new)_ | `rgba(192,144,80,0.12)` — used for `.method--post` background |
| `--accent-glow` | _(new)_ | `rgba(192,144,80,0.06)` — used for `.card__header:hover` background |
| `--blue` | `#58a6ff` | **removed** — replaced by `--accent` everywhere |
| `--green` | `#3fb950` | `#3fb950` (unchanged) |
| `--orange` | `#d29922` | `#d29922` (unchanged) |
| `--red` | `#f85149` | `#f85149` (unchanged) |
| `--purple` | `#bc8cff` | `#bc8cff` (unchanged) |
| `--font-mono` | `'SF Mono', 'Fira Code', 'Cascadia Code', monospace` | `'JetBrains Mono', 'SF Mono', monospace` |
| `--font-body` | _(new)_ | `'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif` |
| `--font-display` | _(new)_ | `'Cormorant Garamond', Georgia, serif` |

All existing references to `var(--blue)` in the style block are updated to `var(--accent)`.

---

## Typography

Font assignments:

The `body` rule changes `font-family` from `var(--font-mono)` to `var(--font-body)`. All other body properties are preserved.

The `.btn-run` rule changes `font-family` from `var(--font-mono)` to `var(--font-body)` and `font-weight` from `700` to `500`.

| Element / Selector | Font | Weight | Size |
|---|---|---|---|
| `body` | `var(--font-body)` (DM Sans) | 400 | 13px |
| `.header__title` | `var(--font-display)` (Cormorant Garamond) | 600 | 20px (intentional increase from 15px — display font warrants larger size) |
| `.header__sub` | `var(--font-body)` | 300 | 12px |
| `.label` | `var(--font-body)` | 400 | 11px, uppercase, letter-spacing 0.6px |
| `.btn-run` | `var(--font-body)` | 500 | 12px |
| `.footer` | `var(--font-body)` | 400 | 11px |
| `.card__desc` | `var(--font-body)` | 400 | 12px |
| `.card__path` | `var(--font-mono)` | 400 | 13px (unchanged) |
| `.method` | `var(--font-mono)` | 700 | 11px (unchanged) |
| `textarea` | `var(--font-mono)` | 400 | 12px (unchanged) |
| `pre` | `var(--font-mono)` | 400 | 12px (unchanged) |
| `.status-badge` | `var(--font-mono)` | 700 | unchanged |
| `.response__time` | `var(--font-mono)` | 400 | 11px (unchanged) |

---

## Background

**Replace** the existing `background: var(--bg)` shorthand on `body` with the longhand block below. Do not add to it — the shorthand resets all sub-properties and must be removed entirely.

```css
body {
  background-color: #0F0F0F;
  background-image:
    radial-gradient(ellipse 80% 60% at 10% 15%, rgba(192, 144, 80, 0.26) 0%, transparent 60%),
    radial-gradient(ellipse 65% 55% at 90% 80%, rgba(55, 80, 140, 0.22) 0%, transparent 58%),
    radial-gradient(ellipse 50% 40% at 60% 45%, rgba(100, 65, 120, 0.15) 0%, transparent 55%),
    radial-gradient(ellipse 40% 30% at 30% 85%, rgba(60, 110, 100, 0.14) 0%, transparent 50%);
  background-attachment: fixed;
}
```

Add grain texture overlay as `body::before`. The `z-index: 9999` is intentional — this is the exact pattern from the portfolio. At `opacity: 0.028` the overlay is barely perceptible and `pointer-events: none` ensures no interaction is blocked. All content remains fully readable and interactive through it.

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  background-repeat: repeat;
}
```

---

## Component Details

**Layout:** `max-width: 780px` on `.header` and `.cards` stays unchanged.

**Cards:**
- Background: `#1A1A1C`
- Border: `1px solid rgba(255,255,255,0.07)`
- Border-radius: `6px` (unchanged)
- `.card__header:hover { background: var(--accent-glow); }` (replaces `rgba(255,255,255,0.03)`)
- `.card__chevron { color: var(--muted-dim); }` — i.e., `#585450` (replaces `var(--muted)`)

**Method badges:**
- `.method--get`: `background: rgba(63,185,80,0.15); color: #3fb950` (unchanged)
- `.method--post`: `background: var(--accent-dim); color: var(--accent)` (brass — replaces blue)

**Textarea:**
- Background: `#0F0F0F`
- Border: `1px solid rgba(255,255,255,0.07)`
- `textarea:focus` border: `#C09050` (replaces `--blue`)

**`pre` element:** Background uses `var(--bg)` via the existing rule — updates automatically to `#0F0F0F` via the token swap. No explicit override needed.

**Run button:**
- Background: `#C09050`
- Text color: `#0F0F0F` (intentional change from the current hardcoded `#0d1117` — aligns with `--bg` value)
- Font: `var(--font-body)`, 500 weight
- Border-radius: `4px` (unchanged)
- Hover: `opacity: 0.85` (unchanged)

**Header:**
- `.header__title { color: var(--muted); }` — intentionally changes from `var(--text)` to `var(--muted)`, making the "JM ·" text node dimmer (`#A09890`) so "API Demo" in brass stands out
- `.header__title span { color: var(--accent); }` — this selector matches both `.status-dot` and the "API Demo" span. Setting `color` on `.status-dot` is harmless: it renders via `background`, not `color`, so brass `color` has no visible effect on it. "API Demo" renders as `#C09050`. No structural HTML change needed.
- All rules using `var(--border)` — `.header` border-bottom, `.card` border, `.card__header` border-bottom, `textarea` border, `pre` border — update automatically via the token swap. No explicit rule changes needed for any of them; this is expected behavior.
- Status dot background and box-shadow remain green (unchanged).

**Status badges:**
- `.status-badge--ok`: `background: rgba(63,185,80,0.15); color: #3fb950` (unchanged)
- `.status-badge--err`: `background: rgba(248,81,73,0.15); color: #f85149` (unchanged)

**JSON syntax highlighting:**
- `.json-key`: `color: var(--accent)` (#C09050 brass — replaces `--blue`)
- `.json-string`: `color: #3fb950` (unchanged)
- `.json-number`: `color: #d29922` (unchanged)
- `.json-bool`: `color: #bc8cff` (unchanged)
- `.json-null`: `color: #f85149` (unchanged)

**Footer:**
- Font: `var(--font-body)`
- `.footer a`: `color: var(--accent)` (#C09050)
- `.footer a:hover`: `text-decoration: underline`

---

## Files Changed

| File | Change |
|---|---|
| `public/index.html` | Add Google Fonts `<link>` tags to `<head>`; replace entire `<style>` block |

No other files are modified. `index.js`, `package.json`, and all JavaScript in `index.html` are untouched.

---

## Out of Scope

- GSAP or scroll animations
- Structural HTML changes (no new elements, classes, or markup)
- New endpoints or backend features
- Light mode / theme switching
- Responsive breakpoint changes
