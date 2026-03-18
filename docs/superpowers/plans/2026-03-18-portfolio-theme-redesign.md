# Portfolio Theme Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `<style>` block in `public/index.html` to match the portfolio's "Dark Editorial / Warm Brass" design system.

**Architecture:** Single-file CSS skin swap — only `public/index.html` is modified. All changes are confined to the `<style>` block and a Google Fonts `<link>` tag added to `<head>`. No JS, no HTML structure, no backend changes. This is a pure visual replacement.

**Tech Stack:** Vanilla HTML/CSS. Google Fonts (Cormorant Garamond, DM Sans, JetBrains Mono). No build step.

**Spec:** `docs/superpowers/specs/2026-03-18-jm-api-demo-redesign.md`

---

## File Map

| File | Change |
|---|---|
| `public/index.html` | Add Google Fonts `<link>` tags; replace entire `<style>` block |

No other files change.

---

### Task 1: Add Google Fonts

**Files:**
- Modify: `public/index.html` — `<head>` section, before the `<style>` tag

- [ ] **Step 1: Open `public/index.html` and locate the `<style>` tag in `<head>`**

Find this line:
```html
  <style>
```

- [ ] **Step 2: Insert Google Fonts preconnect and link tags immediately before `<style>`**

Add these three lines:
```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
  <style>
```

- [ ] **Step 3: Verify the file loads without error**

Open `public/index.html` in a browser (or run `node index.js` and visit `http://localhost:3000`). Confirm the page still renders — fonts may not yet change since `:root` still uses `--font-mono` for body.

- [ ] **Step 4: Commit**

```bash
git add public/index.html
git commit -m "style: add Google Fonts (Cormorant Garamond, DM Sans, JetBrains Mono)"
```

---

### Task 2: Replace CSS Custom Properties in `:root`

**Files:**
- Modify: `public/index.html` — `:root` block inside `<style>`

- [ ] **Step 1: Locate the `:root` block**

It starts at approximately line 10:
```css
    :root {
      --bg:        #0d1117;
      --surface:   #161b22;
      --border:    #30363d;
      --text:      #e6edf3;
      --muted:     #8b949e;
      --green:     #3fb950;
      --blue:      #58a6ff;
      --orange:    #d29922;
      --red:       #f85149;
      --purple:    #bc8cff;
      --font-mono: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    }
```

- [ ] **Step 2: Replace the entire `:root` block with the new design tokens**

```css
    :root {
      --bg:          #0F0F0F;
      --surface:     #1A1A1C;
      --border:      rgba(255,255,255,0.07);
      --text:        #EDE9E3;
      --muted:       #A09890;
      --muted-dim:   #585450;
      --accent:      #C09050;
      --accent-dim:  rgba(192,144,80,0.12);
      --accent-glow: rgba(192,144,80,0.06);
      --green:       #3fb950;
      --orange:      #d29922;
      --red:         #f85149;
      --purple:      #bc8cff;
      --font-mono:   'JetBrains Mono', 'SF Mono', monospace;
      --font-body:   'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-display:'Cormorant Garamond', Georgia, serif;
    }
```

Note: `--blue` is removed. It will be replaced by `--accent` in component rules. `--font-body` and `--font-display` are new additions.

- [ ] **Step 3: Verify no obvious breakage**

Reload the page. Colors won't fully update yet (component rules still reference old values), but no errors should appear in the browser console.

- [ ] **Step 4: Commit**

```bash
git add public/index.html
git commit -m "style: replace :root design tokens with warm-brass palette"
```

---

### Task 3: Update `body` and Add Grain Overlay

**Files:**
- Modify: `public/index.html` — `body` rule and add `body::before` inside `<style>`

- [ ] **Step 1: Locate the `body` rule**

Find:
```css
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.6;
      min-height: 100vh;
      padding: 24px 16px 48px;
    }
```

- [ ] **Step 2: Replace the `body` rule**

Replace the entire `body` block. The key changes: `font-family` switches from `--font-mono` to `--font-body`; `background` shorthand is replaced by longhand `background-color` + `background-image` + `background-attachment`.

```css
    body {
      background-color: var(--bg);
      background-image:
        radial-gradient(ellipse 80% 60% at 10% 15%, rgba(192, 144, 80, 0.26) 0%, transparent 60%),
        radial-gradient(ellipse 65% 55% at 90% 80%, rgba(55, 80, 140, 0.22) 0%, transparent 58%),
        radial-gradient(ellipse 50% 40% at 60% 45%, rgba(100, 65, 120, 0.15) 0%, transparent 55%),
        radial-gradient(ellipse 40% 30% at 30% 85%, rgba(60, 110, 100, 0.14) 0%, transparent 50%);
      background-attachment: fixed;
      color: var(--text);
      font-family: var(--font-body);
      font-size: 13px;
      line-height: 1.6;
      min-height: 100vh;
      padding: 24px 16px 48px;
    }
```

- [ ] **Step 3: Add `body::before` grain overlay immediately after the `body` rule**

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

Note: `z-index: 9999` with `pointer-events: none` and `opacity: 0.028` is correct — it matches the portfolio exactly. The overlay is barely visible and does not block interaction.

- [ ] **Step 4: Verify in browser**

Reload. The page background should now show warm atmospheric gradients (brass glow top-left, blue glow bottom-right). Body text should render in DM Sans (sans-serif), not monospace.

- [ ] **Step 5: Commit**

```bash
git add public/index.html
git commit -m "style: atmospheric background gradients and grain overlay"
```

---

### Task 4: Update Header and Typography Rules

**Files:**
- Modify: `public/index.html` — header and label rules inside `<style>`

- [ ] **Step 1: Locate and replace the `/* ── Header ── */` section**

Find the header section (approximately lines 34–61). Replace it entirely:

```css
    /* ── Header ── */
    .header {
      max-width: 780px;
      margin: 0 auto 32px;
      display: flex;
      align-items: baseline;
      gap: 16px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 16px;
    }
    .header__title {
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 600;
      color: var(--muted);
    }
    .header__title span { color: var(--accent); }
    .header__sub {
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 300;
      color: var(--muted);
    }
    .status-dot {
      display: inline-block;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--green);
      margin-right: 6px;
      box-shadow: 0 0 6px var(--green);
    }
```

Key changes: `.header__title` gets `font-display`, size 20px (from 15px), color `var(--muted)`. `.header__title span` gets `var(--accent)` (brass). `.header__sub` gets `font-body` 300 weight. `.status-dot` stays green (unchanged).

- [ ] **Step 2: Locate and replace the `/* ── Request editor ── */` label rule**

Find:
```css
    .label {
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 0.6px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
```

Replace with:
```css
    .label {
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 0.6px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
```

(Only adds `font-family: var(--font-body)`.)

- [ ] **Step 3: Verify in browser**

Reload. The "JM ·" header text should appear in Cormorant Garamond (serif). "API Demo" should be in brass (#C09050). The subtitle should be in DM Sans.

- [ ] **Step 4: Commit**

```bash
git add public/index.html
git commit -m "style: update header and label typography to display/body fonts"
```

---

### Task 5: Update Card Styles

**Files:**
- Modify: `public/index.html` — `/* ── Cards ── */` section inside `<style>`

- [ ] **Step 1: Locate the `/* ── Cards ── */` section and replace it**

Find (approximately lines 63–110):
```css
    /* ── Cards ── */
    .cards { ... }
    .card { ... }
    .card__header { ... }
    .card__header:hover { ... }
    .method { ... }
    .method--get { ... }
    .method--post { ... }
    .card__path { ... }
    .card__desc { ... }
    .card__chevron { ... }
    .card.is-open .card__chevron { ... }
    .card__body { ... }
    .card.is-open .card__body { ... }
```

Replace the entire cards section with:

```css
    /* ── Cards ── */
    .cards {
      max-width: 780px;
      margin: 0 auto;
      display: grid;
      gap: 16px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
    }

    .card__header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      cursor: pointer;
      user-select: none;
    }
    .card__header:hover { background: var(--accent-glow); }

    .method {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 3px;
      letter-spacing: 0.5px;
    }
    .method--get    { background: rgba(63,185,80,0.15);  color: var(--green); }
    .method--post   { background: var(--accent-dim);     color: var(--accent); }

    .card__path  { font-family: var(--font-mono); color: var(--text); font-size: 13px; }
    .card__desc  { font-family: var(--font-body); color: var(--muted); font-size: 12px; margin-left: auto; }
    .card__chevron { color: var(--muted-dim); font-size: 10px; transition: transform 0.2s; margin-left: 8px; }
    .card.is-open .card__chevron { transform: rotate(90deg); }

    .card__body {
      display: none;
      padding: 16px;
      gap: 12px;
      flex-direction: column;
    }
    .card.is-open .card__body { display: flex; }
```

Key changes: `.card__header:hover` uses `var(--accent-glow)`. `.method--post` uses `var(--accent-dim)` / `var(--accent)`. `.card__desc` gets `font-body`. `.card__chevron` uses `var(--muted-dim)`.

- [ ] **Step 2: Verify in browser**

Reload. Click a card header to open it. The hover state should show a faint brass glow. The POST badge should be brass-colored. The GET badge stays green. The chevron is a dimmer grey.

- [ ] **Step 3: Commit**

```bash
git add public/index.html
git commit -m "style: update card, badge, and chevron styles to warm-brass theme"
```

---

### Task 6: Update Textarea, Button, Response, and Footer

**Files:**
- Modify: `public/index.html` — textarea, button, response, pre, JSON highlight, footer rules inside `<style>`

- [ ] **Step 1: Locate and replace the `/* ── Run button ── */` section**

Find:
```css
    .btn-run {
      align-self: flex-start;
      background: var(--blue);
      color: #0d1117;
      border: none;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      padding: 7px 18px;
      cursor: pointer;
      letter-spacing: 0.3px;
      transition: opacity 0.15s;
    }
    .btn-run:hover { opacity: 0.85; }
    .btn-run:disabled { opacity: 0.4; cursor: not-allowed; }
```

Replace with:
```css
    /* ── Run button ── */
    .btn-run {
      align-self: flex-start;
      background: var(--accent);
      color: #0F0F0F;
      border: none;
      border-radius: 4px;
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 500;
      padding: 7px 18px;
      cursor: pointer;
      letter-spacing: 0.3px;
      transition: opacity 0.15s;
    }
    .btn-run:hover { opacity: 0.85; }
    .btn-run:disabled { opacity: 0.4; cursor: not-allowed; }
```

Key changes: background `var(--blue)` → `var(--accent)`; color `#0d1117` → `#0F0F0F`; font-family `var(--font-mono)` → `var(--font-body)`; font-weight `700` → `500`.

- [ ] **Step 2: Locate and replace the textarea rule**

Find:
```css
    textarea {
      width: 100%;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      color: var(--text);
      font-family: var(--font-mono);
      font-size: 12px;
      line-height: 1.6;
      padding: 10px 12px;
      resize: vertical;
      min-height: 80px;
      outline: none;
    }
    textarea:focus { border-color: var(--blue); }
```

Replace with (only the focus rule changes — `--blue` → `--accent`):
```css
    textarea {
      width: 100%;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      color: var(--text);
      font-family: var(--font-mono);
      font-size: 12px;
      line-height: 1.6;
      padding: 10px 12px;
      resize: vertical;
      min-height: 80px;
      outline: none;
    }
    textarea:focus { border-color: var(--accent); }
```

- [ ] **Step 3: Locate and replace the JSON highlighting rules**

Find:
```css
    .json-key    { color: var(--blue); }
```

Replace with:
```css
    .json-key    { color: var(--accent); }
```

(Only `.json-key` changes. `.json-string`, `.json-number`, `.json-bool`, `.json-null` are unchanged.)

- [ ] **Step 4: Locate and replace the `/* ── Footer ── */` section**

Find:
```css
    .footer {
      max-width: 780px;
      margin: 32px auto 0;
      font-size: 11px;
      color: var(--muted);
      text-align: center;
    }
    .footer a { color: var(--blue); text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
```

Replace with:
```css
    /* ── Footer ── */
    .footer {
      max-width: 780px;
      margin: 32px auto 0;
      font-family: var(--font-body);
      font-size: 11px;
      color: var(--muted);
      text-align: center;
    }
    .footer a { color: var(--accent); text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
```

Key changes: adds `font-family: var(--font-body)`; link color `--blue` → `--accent`.

- [ ] **Step 5: Verify in browser**

Reload. Check:
- Run button is brass (#C09050) with dark text, DM Sans font
- Clicking into a textarea shows brass focus border
- Open a card, click Run — JSON response keys should be brass-colored
- Footer link should be brass

- [ ] **Step 6: Commit**

```bash
git add public/index.html
git commit -m "style: update button, textarea, JSON highlight, footer to warm-brass theme"
```

---

### Task 7: Final Visual Verification

**Files:**
- Read-only: `public/index.html`

- [ ] **Step 1: Run the server**

```bash
node index.js
```

Visit `http://localhost:3000`.

- [ ] **Step 2: Visual checklist**

Verify each of the following:

| Element | Expected |
|---|---|
| Background | Dark near-black with warm brass glow top-left, blue glow bottom-right |
| Header title "JM ·" | Muted grey (#A09890), Cormorant Garamond serif font |
| Header "API Demo" | Brass (#C09050), Cormorant Garamond |
| Header subtitle | DM Sans, light weight |
| Status dot | Green, glowing |
| GET badge | Green on dark green bg |
| POST badge | Brass (#C09050) on dim brass bg |
| Card hover | Faint brass glow on hover |
| Card chevron | Dim grey (#585450) |
| Card description text | DM Sans sans-serif |
| LABEL text ("REQUEST BODY") | DM Sans uppercase |
| Textarea | Dark bg, subtle border; brass focus ring |
| Run button | Brass bg, dark text, DM Sans |
| JSON keys in response | Brass (#C09050) |
| JSON strings | Green |
| JSON numbers | Orange |
| Footer link | Brass, underlines on hover |
| Response status 200 OK | Green badge (unchanged) |
| Response error | Red badge (unchanged) |

- [ ] **Step 3: Test all four endpoints**

Open each card, click Run, confirm:
- `/health` — returns JSON, renders correctly highlighted
- `/transform` — edit body JSON, run, verify response
- `/webhook/simulate` — run, verify random event JSON
- `/auth/token` — run, verify token response

- [ ] **Step 4: Check browser console for errors**

Open DevTools. Confirm zero console errors. Confirm all three Google Fonts loaded (Network tab: Cormorant Garamond, DM Sans, JetBrains Mono).

- [ ] **Step 5: Final commit if any small fixes were made during verification**

```bash
git add public/index.html
git commit -m "style: final visual tweaks from verification pass"
```
