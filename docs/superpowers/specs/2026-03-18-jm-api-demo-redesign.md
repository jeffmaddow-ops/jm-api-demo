# JM API Demo — Portfolio Theme Redesign
**Date:** 2026-03-18
**Scope:** Visual skin swap of `public/index.html` to match the portfolio at jeffmaddow-ops.github.io

---

## Goal

Align the jm-api-demo UI with the portfolio's "Dark Editorial / Warm Brass" design system. No structural HTML changes, no new features. Only the `<style>` block and `<head>` font link are modified.

---

## Approach

Option A — Skin swap. Keep the existing collapsible card layout and all JavaScript unchanged. Replace all CSS tokens, fonts, background, and component styles to match the portfolio design system.

---

## Design Tokens

Replace the current GitHub-dark CSS variables with the portfolio's design system:

| Token | Current Value | New Value |
|---|---|---|
| Background primary | `#0d1117` | `#0F0F0F` |
| Background elevated (cards) | `#161b22` | `#1A1A1C` |
| Border | `#30363d` | `rgba(255,255,255,0.07)` |
| Text primary | `#e6edf3` | `#EDE9E3` |
| Text secondary/muted | `#8b949e` | `#A09890` |
| Text tertiary | — | `#585450` |
| Accent (buttons, links, focus) | `#58a6ff` (blue) | `#C09050` (brass) |
| Accent dim | — | `rgba(192,144,80,0.12)` |
| Accent glow | — | `rgba(192,144,80,0.06)` |
| Green (GET badge, status dot) | `#3fb950` | `#3fb950` (unchanged) |
| Red (errors) | `#f85149` | `#f85149` (unchanged) |
| Orange (JSON numbers) | `#d29922` | `#d29922` (unchanged) |
| Purple (JSON booleans) | `#bc8cff` | `#bc8cff` (unchanged) |

---

## Typography

Add Google Fonts import to `<head>`:
```
Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400
DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600
JetBrains+Mono:wght@400
```

Font assignments:

| Element | Font | Weight/Size |
|---|---|---|
| Header title "JM · API Demo" | Cormorant Garamond | 600, ~20px |
| Header subtitle | DM Sans | 300, muted |
| Card descriptions | DM Sans | 400, 13px |
| Section labels (REQUEST BODY etc.) | DM Sans | uppercase, letter-spacing |
| Run button | DM Sans | 500 |
| Footer | DM Sans | 400, small |
| Card paths (`/health` etc.) | JetBrains Mono | unchanged |
| HTTP method badges | JetBrains Mono | unchanged |
| Status badge, response time | JetBrains Mono | unchanged |
| Textarea, JSON response | JetBrains Mono | unchanged |

---

## Background

Body gets the portfolio's atmospheric background:
- `background-color: #0F0F0F`
- `background-image`: four radial gradients (brass top-left, blue bottom-right, purple center, teal bottom-left)
- `background-attachment: fixed`
- Grain texture overlay via `body::before` (SVG fractalNoise, `opacity: 0.028`, `position: fixed`, `pointer-events: none`)

---

## Component Details

**Cards:**
- Background: `#1A1A1C`
- Border: `rgba(255,255,255,0.07)`
- Border-radius: 6px (unchanged)
- Header hover background: `rgba(192,144,80,0.06)` (brass glow)
- Chevron color: `#585450`

**Textarea:**
- Background: `#0F0F0F`
- Border: `rgba(255,255,255,0.07)`
- Focus border: `#C09050`

**Run button:**
- Background: `#C09050` (brass)
- Text color: `#0F0F0F` (dark)
- Font: DM Sans 500

**Header:**
- "JM ·" in `#A09890` (text-secondary)
- "API Demo" in `#C09050` (brass accent)
- Status dot: green (unchanged — semantic live indicator)
- Border-bottom: `rgba(255,255,255,0.07)`

**Footer:**
- Font: DM Sans
- Link color: `#C09050`
- Link hover: underline

---

## Files Changed

| File | Change |
|---|---|
| `public/index.html` | Replace `<style>` block; add Google Fonts `<link>` to `<head>` |

No other files are modified. Backend (`index.js`), package files, and all JavaScript are untouched.

---

## Out of Scope

- GSAP animations (not appropriate for a single-page interactive tool)
- Structural HTML changes
- New endpoints or features
- Light mode support
