Style Guideline for BBA FinTech
(Updated December 2024 — Aligned with New Brand Identity)

---

## 1. Color Palette

The new BBA FinTech brand uses a sophisticated **Deep Indigo-Navy** as its foundation, with purple undertones that distinguish it from traditional banking blues. This creates a modern, tech-forward identity while maintaining financial credibility.

### Primary Colors

| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| **Primary (Brand Base)** | Deep Indigo Navy | `#2D2A5E` | Logo background, headers, primary buttons, footer |
| **Primary Dark** | Midnight Indigo | `#1E1B4B` | Hover states, depth, dark sections |
| **Primary Light** | Soft Indigo | `#3D3A6E` | Secondary backgrounds, cards on dark |

### Accent Colors

| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| **Accent 1 (Highlight)** | Periwinkle | `#9A98C4` | Icon outlines, subtle highlights, borders |
| **Accent 2 (CTA)** | Electric Lavender | `#A5A3D9` | Call-to-action buttons, links, interactive elements |
| **Accent 3 (Success)** | Soft Teal | `#5EEAD4` | Success states, positive data indicators, growth charts |

### Neutral Colors

| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| **Background Light** | White | `#FFFFFF` | Primary light mode background |
| **Background Soft** | Ghost White | `#F8F9FC` | Section backgrounds, cards |
| **Text Primary** | Charcoal | `#1F2937` | Headings, body text on light backgrounds |
| **Text Secondary** | Slate | `#64748B` | Subheadings, captions, muted text |
| **Text on Dark** | White | `#FFFFFF` | Text on indigo backgrounds |
| **Text Muted on Dark** | Lavender Grey | `#C4C3DC` | Secondary text on dark backgrounds |
| **Border** | Silver Mist | `#E2E4EB` | Dividers, card borders, input borders |

### Why This Palette Works

- **Deep Indigo-Navy** conveys trust, intelligence, and sophistication — essential for financial services — while the purple undertone adds a modern, innovative edge that signals "fintech" rather than "traditional bank."
- **Periwinkle accents** create visual harmony with the primary color while providing enough contrast for UI elements.
- **Soft Teal** as a tertiary accent adds energy for data visualizations and success states without clashing with the indigo family.
- The palette maintains **WCAG AA accessibility** standards for text contrast.

---

## CSS Variables (Ready to Use)

```css
:root {
  /* Primary */
  --color-primary: #2D2A5E;
  --color-primary-dark: #1E1B4B;
  --color-primary-light: #3D3A6E;
  
  /* Accents */
  --color-accent-1: #9A98C4;
  --color-accent-2: #A5A3D9;
  --color-accent-3: #5EEAD4;
  
  /* Neutrals */
  --color-bg-white: #FFFFFF;
  --color-bg-soft: #F8F9FC;
  --color-text-primary: #1F2937;
  --color-text-secondary: #64748B;
  --color-text-on-dark: #FFFFFF;
  --color-text-muted-dark: #C4C3DC;
  --color-border: #E2E4EB;
}
```

---

## 2. Typography

The new BBA FinTech logo uses a **clean, modern sans-serif** with generous letter-spacing. The typography system should reflect this: sophisticated, highly legible, and tech-forward.

### Font Pairing

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Display / Headlines** | **Plus Jakarta Sans** | 600–700 | Hero titles, section headings, impact statements |
| **Body / UI** | **Plus Jakarta Sans** | 400–500 | Paragraphs, navigation, buttons, form labels |
| **Data / Numbers** | **Plus Jakarta Sans** (Tabular) | 500 | Financial figures, tables, charts, statistics |
| **Monospace (Code/Data)** | **JetBrains Mono** | 400 | Code snippets, technical data, audit trails |

**Why Plus Jakarta Sans?**
- Modern geometric sans-serif that matches the logo's clean aesthetic
- Excellent legibility at all sizes
- Professional without being cold
- Supports tabular figures for financial data alignment

### Typography Scale

```css
/* Font Sizes */
--text-xs: 0.75rem;    /* 12px - Captions, labels */
--text-sm: 0.875rem;   /* 14px - Small text, metadata */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Lead paragraphs */
--text-xl: 1.25rem;    /* 20px - Subheadings */
--text-2xl: 1.5rem;    /* 24px - Section titles */
--text-3xl: 2rem;      /* 32px - Page titles */
--text-4xl: 2.5rem;    /* 40px - Hero headlines */
--text-5xl: 3.5rem;    /* 56px - Display headlines */
```

### Typography Guidelines

- **Letter-spacing:** Slightly increased for headings (0.01–0.02em) to match logo style
- **Line-height:** 1.5–1.6 for body text, 1.1–1.2 for headlines
- **Font-weight:** Use 400 for body, 500 for emphasis, 600–700 for headings
- **Avoid:** Decorative fonts, overly thin weights, all-caps body text

---

## 3. Logo Usage

### Logo Elements

The BBA FinTech logo consists of:
1. **Wordmark:** "BBA FINTECH" in clean sans-serif with generous letter-spacing
2. **Icon:** A stylized document/chart symbol with horizontal data lines, outlined in periwinkle

### Logo Variants

| Variant | Use Case |
|---------|----------|
| **Primary (Horizontal)** | Website header, documents, presentations |
| **Icon Only** | Favicon, app icon, watermarks, social avatars |
| **White on Dark** | Use on indigo/dark backgrounds |
| **Dark on Light** | Use on white/light backgrounds |

### Clear Space & Sizing

- **Minimum clear space:** Equal to the height of the "B" in BBA on all sides
- **Minimum size:** 120px wide for digital, 30mm for print
- **Never:** Stretch, rotate, add effects, or place on busy backgrounds

---

## 4. Layout & UI Principles

### Design Philosophy

BBA's UI should communicate **intelligence, clarity, and trust**. Every element should feel intentional and data-informed.

### Core Principles

- **Generous Whitespace:** Let content breathe. Minimum 80px between major sections.
- **Strong Hierarchy:** Use size, weight, and color to guide attention. Hero → Subhead → Body → Caption.
- **Data-First Design:** Support charts, tables, and dashboards with clean grids and accent highlights.
- **Responsive & Modular:** Components should adapt seamlessly across desktop, tablet, and mobile.

### Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

### UI Components

- **Buttons:** Rounded (border-radius: 8px), solid fills for primary, outlined for secondary
- **Cards:** White background, subtle border (`#E2E4EB`), soft shadow on hover
- **Inputs:** Clean borders, focus state uses accent color
- **Icons:** Line-style, 1.5px stroke, consistent 24px grid

---

## 5. Brand Voice & Tone

### Personality

BBA FinTech speaks with **calm authority**. We are experts who simplify complexity.

### Voice Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Confident** | We know our domain | "Transform your data into decisive action." |
| **Clear** | No jargon, no fluff | "See risks before they become problems." |
| **Supportive** | Partner, not vendor | "We help you navigate complexity." |
| **Forward-thinking** | Innovation-focused | "AI-powered intelligence for tomorrow's challenges." |

### Writing Guidelines

- Use active voice
- Lead with benefits, not features
- Keep sentences concise (under 25 words)
- Avoid: "leverage," "synergy," "best-in-class," "cutting-edge"

---

## 6. Visual Assets & Imagery

### Data Visualizations

- Use brand colors: Indigo for primary data, Periwinkle for secondary, Teal for highlights
- Clean gridlines in `#E2E4EB`
- Avoid 3D effects, gradients in charts

### Icons

- Style: Line icons, 1.5px stroke weight
- Color: Primary indigo or slate grey
- Size: 24px base, scale proportionally

### Photography (If Used)

- Professional, authentic imagery
- Avoid generic stock photos
- Apply subtle indigo overlay for brand cohesion

### Illustrations

- Abstract, geometric style
- Use brand color palette
- Avoid cartoonish or overly playful styles

---

## Summary

This style guide ensures BBA FinTech presents a **unified, professional, and modern** brand across all touchpoints:

- **Trust:** Deep indigo conveys stability and expertise
- **Innovation:** Purple undertones and clean typography signal modern fintech
- **Clarity:** Generous spacing and hierarchy make complex information accessible
- **Consistency:** CSS variables and defined scales ensure cohesive implementation

Allows for gradual brand expansion (new products, marketing campaigns, global reach) while preserving core identity.