# Section 02: Design System & Tokens

## Overview
**Phase**: Foundation
**Est. Lines**: 400-500
**Day**: 1

---

## Deliverables

- [ ] Color tokens (all colors from spec)
- [ ] Typography scale (Exo 2, Inter, JetBrains Mono, Space Mono, Bebas Neue)
- [ ] Spacing system (4px base)
- [ ] Animation tokens (easing, durations)
- [ ] Shadow system
- [ ] Border radius system
- [ ] Tailwind config with all tokens
- [ ] CSS custom properties

---

## Quality Constraints

1. **Colors MUST match spec exactly** - no approximations
2. **Typography letter-spacing**: -0.02em on headlines
3. **Transition timing**: `cubic-bezier(0.4, 0, 0.2, 1)`
4. **Every value documented** in comments
5. **No magic numbers** - all from tokens

---

## Color Tokens (Sacred)

```typescript
const colors = {
  // Primary
  void: '#050508',          // Deep background
  velexBlue: '#00d4ff',     // Primary accent
  electricCyan: '#00fff2',  // Highlights
  plasmaWhite: '#f0f8ff',   // Text

  // Secondary
  stressRed: '#ff3b3b',     // Max stress
  warningOrange: '#ff6b35', // Caution
  successGreen: '#00ff88',  // Pass states
  deepPurple: '#6366f1',    // Premium depth
  titanium: '#8892a0',      // Metal surfaces

  // Gradients (defined in CSS)
  // hero: #050508 → #0a1628 → #050508
  // energy: #00d4ff → #6366f1
  // thermal: blue → cyan → green → yellow → orange → red
  // metal: #3a3f47 → #8892a0 → #3a3f47
}
```

---

## Typography

```typescript
const typography = {
  fonts: {
    headline: '"Exo 2", sans-serif',
    body: '"Inter", sans-serif',
    code: '"JetBrains Mono", monospace',
    numbers: '"Space Mono", monospace',
    accent: '"Bebas Neue", sans-serif',
  },
  letterSpacing: {
    headline: '-0.02em',  // Tighter = premium
    body: 'normal',
  },
  lineHeight: {
    headline: '1.1',
    body: '1.6',
  }
}
```

---

## Spacing System

```typescript
// 4px base
const spacing = {
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
}
```

---

## Animation Tokens

```typescript
const animation = {
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)', // THE easing
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  }
}
```

---

## Shadow System

```typescript
const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px rgba(0, 0, 0, 0.3)',
  lg: '0 4px 24px rgba(0, 0, 0, 0.4)',
  glow: '0 0 20px rgba(0, 212, 255, 0.3)',  // VELEX Blue glow
  glowStrong: '0 0 40px rgba(0, 212, 255, 0.5)',
}
```

---

## Border Radius

```typescript
const borderRadius = {
  none: '0',
  sm: '4px',
  DEFAULT: '6px',   // Buttons, inputs (tested)
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
}
```

---

## Tailwind Config

Create `tailwind.config.ts` with all tokens above. Example:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#050508',
        'velex-blue': '#00d4ff',
        // ... all colors
      },
      fontFamily: {
        headline: ['"Exo 2"', 'sans-serif'],
        // ... all fonts
      },
      // ... all tokens
    }
  }
}
```

---

## Vision Check

- [ ] All colors match spec EXACTLY
- [ ] Typography feels premium
- [ ] Easing feels "just right"
- [ ] Design tokens are the single source of truth

---

## Notes for PC Claude

These tokens ARE the brand. Every value has been chosen with intention. Do not approximate, do not "close enough" - exact values only.
