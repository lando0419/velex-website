# IXRA Website Vision Document

## The Standard

> **"Every pixel is intentional. Every animation tells a story. Every micro-interaction creates a moment."**

This is not a website. This is **the standard** for engineering simulation presentation. When visitors arrive, they don't just see IXRA - they feel the precision, the power, the obsession with detail that defines world-class engineering.

---

## Quality Principles

### 1. PRECISION
- Clean code, perfect alignment, consistent spacing
- No magic numbers - every value comes from design tokens
- TypeScript strict mode - zero `any` types
- ESLint passes with zero warnings

**Check**: Is every pixel where it should be?

### 2. POWER
- 60fps animations, always
- GPU-accelerated where possible
- Sub-3-second load times
- Lighthouse 95+ on all metrics

**Check**: Does it feel fast and smooth?

### 3. INTELLIGENCE
- Fully accessible (WCAG 2.1 AA)
- Keyboard navigable
- Reduced motion support
- Responsive at every breakpoint

**Check**: Does it work for everyone?

### 4. PREMIUM
- Every hover state considered
- Every transition intentional
- Every micro-interaction delightful
- The details that billionaires notice

**Check**: Would Apple's design team approve?

---

## The Vision Check

Before marking ANY section complete, ask:

```
[ ] Does it meet all quality constraints?
[ ] Does it follow the design tokens exactly?
[ ] Is it accessible?
[ ] Is it performant?
[ ] Would this make Apple jealous?
```

If any answer is NO, it's not done.

---

## Color Palette (Sacred)

```
VOID BLACK:      #050508  (background)
IXRA BLUE:      #00d4ff  (primary accent)
ELECTRIC CYAN:   #00fff2  (highlights)
PLASMA WHITE:    #f0f8ff  (text)

STRESS RED:      #ff3b3b  (maximum)
WARNING ORANGE:  #ff6b35  (caution)
SUCCESS GREEN:   #00ff88  (pass)
DEEP PURPLE:     #6366f1  (depth)
TITANIUM:        #8892a0  (metal)
```

These colors are THE BRAND. Do not deviate.

---

## Typography (Sacred)

```
HEADLINES:  Exo 2         (technical, futuristic)
BODY:       Inter         (clean, readable)
CODE:       JetBrains Mono (precise, monospace)
NUMBERS:    Space Mono    (data visualization)
ACCENT:     Bebas Neue    (impact statements)
```

Letter-spacing: -0.02em on headlines (tighter = premium)

---

## Animation Timing (Sacred)

```
EASING:     cubic-bezier(0.4, 0, 0.2, 1)
FAST:       150ms
NORMAL:     300ms
SLOW:       500ms
```

This easing is "the feel" - don't change it.

---

## Micro-Interaction Standards

### Buttons
- Hover: scale(1.02), shadow increase, subtle glow
- Active: scale(0.98), shadow decrease
- Focus: 2px ring, matches element color

### Inputs
- Focus: border color change, translateY(-1px)
- Valid: green checkmark
- Invalid: red X, subtle shake

### Cards
- Hover: translateY(-4px), shadow increase
- Active: scale(0.99)

### Links
- Hover: underline draws in from left
- Active: color darkens

---

## The Three Rules

1. **Don't ship crap.** If it's not right, fix it before moving on.

2. **Details matter.** The difference between good and great is in the details no one consciously notices but everyone feels.

3. **Test everything.** If you didn't test it, it doesn't work.

---

## Reminder

Engineers will visit this site. Billionaires will visit this site. They notice craftsmanship. They appreciate precision. They can tell the difference between "good enough" and "exceptional."

This is the obsession. This is the standard. This is IXRA.
