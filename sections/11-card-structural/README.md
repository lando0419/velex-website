# Section 11: Capability Card - Structural

## Overview
**Phase**: Core
**Est. Lines**: 300-400
**Day**: 7
**DEPENDENCY**: Blender structural render

---

## Deliverables

- [ ] Card with Blender render background
- [ ] Hover state (depth, stress values)
- [ ] Click to expand (case study)
- [ ] Copy integration

---

## Quality Constraints

1. **Hover**: `translateY(-4px)`, shadow increase
2. **Background**: cover, slight zoom on hover
3. **Stress values**: Animate in on hover
4. **Transition**: 300ms ease

---

## Content

```
STRUCTURAL ANALYSIS

Finite Element Analysis for stress, strain,
and deformation. Know your limits before
you hit them.

• Static analysis
• Fatigue prediction
• Factor of safety
• Material optimization
```

---

## Card States

### Default
- Background: Blender render (bracket with stress)
- Title + brief description visible
- Subtle gradient overlay for text readability

### Hover
- Card lifts: `translateY(-4px)`
- Shadow increases
- Background zooms slightly (1.05x)
- Stress values fade in
- "Learn more" CTA appears

### Click/Active
- Opens case study modal or page

---

## Stress Values Display

On hover, show overlay:
```
Peak Stress: 342 MPa
Safety Factor: 2.4
Solve Time: 127s
```

---

## Case Study Content

When expanded:
- Full Blender render gallery
- Problem statement
- IXRA solution
- Results comparison
- Testimonial (if available)

---

## Vision Check

- [ ] Card feels premium
- [ ] Hover is satisfying
- [ ] Information reveals naturally
- [ ] Makes viewer want to click

---

## Notes for PC Claude

This card template will be reused for all 6 capability cards. Get it perfect here. The hover state should feel like the card is "coming alive" with information.
