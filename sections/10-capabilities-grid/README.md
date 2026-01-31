# Section 10: Capabilities Grid

## Overview
**Phase**: Core
**Est. Lines**: 400-500
**Day**: 7

---

## Deliverables

- [ ] 3x2 responsive grid layout
- [ ] Section header and intro
- [ ] Scroll-triggered stagger animation
- [ ] Grid to detail navigation

---

## Quality Constraints

1. **Grid gap**: 24px desktop, 16px mobile
2. **Stagger delay**: 0.1s per card
3. **Entry**: From bottom with fade
4. **Responsive**: 3x2 → 2x3 → 1x6

---

## Content

```
THE ARSENAL

Six capabilities. One platform.
Everything you need for engineering simulation.
```

---

## Grid Layout

### Desktop (1024px+)
```
[Structural] [Thermal] [CFD]
[Modal]      [Topology] [Multi-Physics]
```

### Tablet (768px-1024px)
```
[Structural] [Thermal]
[CFD]        [Modal]
[Topology]   [Multi-Physics]
```

### Mobile (<768px)
```
[Structural]
[Thermal]
[CFD]
[Modal]
[Topology]
[Multi-Physics]
```

---

## Animation

### Scroll Trigger
```typescript
gsap.from('.capability-card', {
  scrollTrigger: {
    trigger: '.capabilities-section',
    start: 'top 80%',
  },
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power2.out',
})
```

---

## Card Component Usage

Each card uses the CapabilityCard component (built in Sections 11-16):

```tsx
<CapabilityCard
  type="structural"
  title="Structural Analysis"
  description="FEA for stress, strain, and deformation"
  renderImage="/renders/structural.png"
/>
```

---

## Vision Check

- [ ] Grid is clean and organized
- [ ] Animation is smooth
- [ ] Responsive works perfectly
- [ ] Invites exploration

---

## Notes for PC Claude

The grid is the gateway to capabilities. Make it feel organized but exciting. The stagger animation should feel like the cards are "arriving" to present themselves.
