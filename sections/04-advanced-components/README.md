# Section 04: Advanced Components

## Overview
**Phase**: Foundation
**Est. Lines**: 600-800
**Day**: 3

---

## Deliverables

- [ ] Accordion (smooth GSAP height animation)
- [ ] Modal (portal, focus trap, ESC to close)
- [ ] Tabs (animated indicator)
- [ ] Tooltip
- [ ] Dropdown/Select
- [ ] Toast notifications

---

## Quality Constraints

1. **Accordion**: GSAP height animation, not CSS
2. **Modal**: Focus trap, ESC closes, click outside closes
3. **All**: Keyboard navigable (Tab, Enter, Escape)
4. **All**: Reduced motion support
5. **All**: TypeScript interfaces

---

## Accordion

```typescript
interface AccordionProps {
  items: {
    id: string
    title: string
    content: React.ReactNode
  }[]
  allowMultiple?: boolean
}
```

### Animation
- Use GSAP for height: `auto` animation
- Duration: 300ms
- Easing: design token easing

---

## Modal

```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
}
```

### Features
- Portal to document.body
- Focus trap (first focusable on open)
- ESC key closes
- Click backdrop closes
- Body scroll lock
- Entry: scale + fade
- Exit: fade out

---

## Tabs

```typescript
interface TabsProps {
  tabs: {
    id: string
    label: string
    content: React.ReactNode
  }[]
  defaultTab?: string
}
```

### Animation
- Indicator slides between tabs
- Content fades in/out
- Keyboard: Arrow keys to navigate

---

## Tooltip

```typescript
interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}
```

### Behavior
- Show after delay (default 300ms)
- Fade in
- Position auto-adjusts to viewport

---

## Dropdown/Select

```typescript
interface SelectProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
```

### Features
- Custom styled (not native)
- Keyboard navigable
- Search/filter (optional)
- Proper ARIA

---

## Toast Notifications

```typescript
interface ToastProps {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

// Usage via context
const { showToast } = useToast()
showToast({ message: 'Saved!', type: 'success' })
```

### Animation
- Slide in from corner
- Auto-dismiss after duration
- Stacks if multiple

---

## Vision Check

- [ ] Accordion is buttery smooth
- [ ] Modal feels native and polished
- [ ] Keyboard navigation works everywhere
- [ ] Reduced motion alternatives exist

---

## Notes for PC Claude

These are the complex interactions. Get the animations right - the accordion should feel satisfying, the modal should feel native. Test keyboard nav thoroughly.
