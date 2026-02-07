# Section 05: Layout Components

## Overview
**Phase**: Foundation
**Est. Lines**: 500-600
**Day**: 3

---

## Deliverables

- [ ] Header (sticky, blur backdrop, scroll-aware)
- [ ] Footer (grid layout, hover states)
- [ ] Section wrapper (consistent padding)
- [ ] Container component
- [ ] Grid utilities
- [ ] Page transition wrapper

---

## Quality Constraints

1. **Header**: `backdrop-blur`, opacity change on scroll
2. **Footer**: Subtle grid background (8-10% opacity)
3. **Section padding**: Responsive (mobile/tablet/desktop)
4. **Smooth scroll**: Lenis integration

---

## Header

```typescript
interface HeaderProps {
  transparent?: boolean  // For hero overlay
}
```

### Behavior
- Fixed/sticky position
- Blur backdrop on scroll
- Opacity: 0 → 1 as user scrolls
- Logo + Navigation + CTA
- Mobile: Hamburger menu

---

## Footer

### Content
```
IXRA

[Navigation]     [Resources]      [Company]
Capabilities     Documentation    About
Pricing          Case Studies     Contact
Showcase         FAQ              Careers

[LinkedIn] [Twitter] [GitHub]

© 2026 IXRA Engineering. Precision is the standard.
```

### Styling
- Grid background (subtle)
- Links: underline-draw on hover
- Social icons: scale on hover

---

## Section Wrapper

```typescript
interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  background?: 'default' | 'dark' | 'gradient'
}
```

### Padding
- Mobile: 64px top/bottom
- Tablet: 80px top/bottom
- Desktop: 96px top/bottom

---

## Container

```typescript
interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
}
```

### Max Widths
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px (default)
- full: 100%

---

## Lenis Setup

```typescript
// Smooth scroll configuration
const lenis = new Lenis({
  lerp: 0.1,      // Smoothness
  duration: 1.2,  // Duration multiplier
  smoothWheel: true,
})
```

---

## Vision Check

- [ ] Header scroll behavior feels native
- [ ] Sections have consistent rhythm
- [ ] Smooth scroll is buttery
- [ ] Mobile layout works perfectly

---

## Notes for PC Claude

Layout is invisible when done right. The user shouldn't notice the header or the scroll - they should just feel "this is smooth." Test on mobile extensively.
