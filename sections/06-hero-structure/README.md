# Section 06: Hero - Structure & Animation

## Overview
**Phase**: Core
**Est. Lines**: 600-800
**Day**: 4

---

## Deliverables

- [ ] Full viewport hero container
- [ ] Background gradient (deep space)
- [ ] Text content (headline, tagline, CTAs)
- [ ] Scroll indicator
- [ ] Entry animation sequence
- [ ] Mouse parallax effect

---

## Quality Constraints

1. **Animation timing**: EXACT to spec (see below)
2. **60fps minimum**: No frame drops
3. **Reduced motion**: Fallback for accessibility
4. **Mobile**: Simplified animation (no parallax)

---

## Animation Sequence

```
0.0s - Black screen, single point of light (center)
0.5s - Light expands into particle ring
1.5s - Text fades in with subtle blur
2.0s - Tagline types out (letter by letter)
2.5s - CTAs materialize (fade + slide up)
3.0s - Ambient state begins (subtle movements)
```

---

## Content

```
V E L E X
─────────────────────────────────────────

Engineering Simulation. GPU-Accelerated.
Precision you can trust. Speed you need.

[Request Analysis]  [See Our Work]
```

### Typography
- "IXRA": Bebas Neue or Exo 2, massive, letter-spaced
- Tagline: Inter, medium weight
- CTAs: Button components from Section 03

---

## Background

### Gradient
```css
background: linear-gradient(
  180deg,
  #050508 0%,
  #0a1628 50%,
  #050508 100%
);
```

### Optional: Star field
- Very subtle
- Particles that drift slowly
- Not distracting

---

## Scroll Indicator

- Position: Bottom center
- Animation: Gentle bounce
- Content: Chevron or "scroll" text
- Fades out on scroll

---

## Mouse Parallax

### Desktop Only
- Background layers move opposite to mouse
- Subtle effect (10-20px max)
- Smooth with `lerp`

### Mobile
- Disabled (performance)
- Static background

---

## Reduced Motion

When `prefers-reduced-motion: reduce`:
- No particle animation
- No typewriter effect
- Instant fade in
- No parallax

---

## Code Structure

```typescript
// components/sections/Hero/
├── Hero.tsx           // Main component
├── HeroBackground.tsx // Gradient + particles
├── HeroContent.tsx    // Text + CTAs
├── HeroAnimation.tsx  // Animation orchestration
├── ScrollIndicator.tsx
└── index.ts
```

---

## Vision Check

- [ ] First impression is "wow"
- [ ] Animation feels cinematic
- [ ] Text is readable against background
- [ ] Mobile is smooth

---

## Notes for PC Claude

This is the first thing users see. The animation sequence should feel like a movie opening - each beat timed perfectly. Don't over-animate, but make every frame count.
