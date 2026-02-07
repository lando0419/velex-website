# Section 03: Base Component Library

## Overview
**Phase**: Foundation
**Est. Lines**: 800-1000
**Day**: 2

---

## Deliverables

- [ ] Button (primary, secondary, ghost, danger variants)
- [ ] Input (text, email, password, textarea)
- [ ] Card (base, interactive, featured)
- [ ] Badge (status indicators)
- [ ] Spinner/Loader
- [ ] Icon system setup

---

## Quality Constraints

1. **Button hover**: `scale(1.02)`, shadow increase, subtle glow
2. **Button active**: `scale(0.98)`, shadow decrease
3. **Input focus**: border color change, `translateY(-1px)`
4. **All components**: Full ARIA accessibility
5. **All components**: TypeScript props interface
6. **All components**: Use design tokens only

---

## Button Component

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger'
  size: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}
```

### Button States
- **Default**: Background, no transform
- **Hover**: `scale(1.02)`, `shadow-lg`, subtle glow
- **Active**: `scale(0.98)`, `shadow-sm`
- **Focus**: 2px ring, matches variant color
- **Disabled**: 50% opacity, no interactions
- **Loading**: Spinner replaces text

---

## Input Component

```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'textarea'
  label: string
  placeholder?: string
  error?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
}
```

### Input States
- **Default**: Border subtle, label above
- **Focus**: `translateY(-1px)`, border color, glow
- **Filled**: Label floats, different style
- **Valid**: Green checkmark, green border
- **Invalid**: Red X, red border, subtle shake
- **Disabled**: Grayed out

---

## Card Component

```typescript
interface CardProps {
  variant: 'base' | 'interactive' | 'featured'
  children: React.ReactNode
  onClick?: () => void
}
```

### Card States
- **Base**: Static, subtle shadow
- **Interactive Hover**: `translateY(-4px)`, shadow increase
- **Interactive Active**: `scale(0.99)`
- **Featured**: Glow border, premium feel

---

## Badge Component

```typescript
interface BadgeProps {
  variant: 'default' | 'success' | 'warning' | 'error' | 'info'
  children: React.ReactNode
}
```

---

## Spinner Component

```typescript
interface SpinnerProps {
  size: 'sm' | 'md' | 'lg'
  color?: string  // defaults to ixra-blue
}
```

Smooth CSS animation, not jerky.

---

## Icon System

Use Lucide React or similar. Setup:
- Consistent sizing
- Color inheritance
- Accessible (aria-hidden when decorative)

---

## File Structure

```
components/ui/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── index.ts
├── Input/
│   ├── Input.tsx
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   └── index.ts
├── Badge/
│   └── Badge.tsx
├── Spinner/
│   └── Spinner.tsx
└── index.ts (barrel export)
```

---

## Vision Check

- [ ] Every component feels premium
- [ ] Hover states are smooth, not jarring
- [ ] Focus states are visible and pretty
- [ ] Would use these in a production app

---

## Notes for PC Claude

These components are the building blocks. They'll be used everywhere. Perfect the interactions - the slight bounce, the timing, the shadow transitions. Users feel these even if they don't notice them consciously.
