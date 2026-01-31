# Section 25: Page Transitions

## Overview
**Phase**: Polish | **Est. Lines**: 400-500 | **Day**: 12

---

## Deliverables

- [ ] Route change detection
- [ ] Exit animation
- [ ] Enter animation
- [ ] Loading state

---

## Quality Constraints

1. **Duration**: 400-600ms
2. **No FOUC**: No flash of unstyled content
3. **Loading**: Indicator if > 300ms
4. **Back/Forward**: Works correctly

---

## Animation

### Exit
- Current page fades out
- Slides slightly up
- Duration: 200ms

### Loading
- If > 300ms, show progress indicator
- Centered, subtle

### Enter
- New page fades in
- Slides slightly up
- Duration: 300ms

---

## Implementation

```typescript
// Using Framer Motion
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## Vision Check

- [ ] Transitions are smooth
- [ ] No jarring jumps
- [ ] Loading is graceful
