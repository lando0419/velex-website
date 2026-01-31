# Section 24: GSAP Scroll Animations

## Overview
**Phase**: Polish | **Est. Lines**: 500-600 | **Day**: 12

---

## Deliverables

- [ ] ScrollTrigger for all sections
- [ ] Parallax effects
- [ ] Pin sections (optional)
- [ ] Timeline coordination

---

## Quality Constraints

1. **60fps always** - no frame drops
2. **Debounced handlers** - performance
3. **Mobile**: Reduced complexity
4. **Reduced motion**: Disable all

---

## ScrollTrigger Setup

```typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Example
gsap.from('.section-content', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
})
```

---

## Sections to Animate

- Hero: Parallax layers
- Problem: Transform effect
- Solution: Code typing trigger
- Capabilities: Card stagger
- Process: Timeline progress
- Showcase: Gallery reveal
- Results: Bar chart
- Pricing: Cards entrance
- FAQ: Accordion hints

---

## Vision Check

- [ ] Scroll feels cinematic
- [ ] 60fps everywhere
- [ ] Mobile is smooth
- [ ] Reduced motion works
