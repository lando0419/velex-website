# Section 27: Sound Design (Optional)

## Overview
**Phase**: Polish | **Est. Lines**: 300-400 | **Day**: 13

---

## Deliverables

- [ ] Web Audio API setup
- [ ] Sound sprite loading
- [ ] Hover sounds
- [ ] Click sounds
- [ ] Success/error sounds
- [ ] Toggle (OFF by default)

---

## Quality Constraints

1. **Total size**: < 100KB
2. **Default**: OFF (user enables)
3. **Style**: Technical, premium
4. **Fallback**: Silent, no errors

---

## Sounds

```
Ambient:   Very subtle hum (optional, barely audible)
Hover:     Soft tick (10ms, nearly silent)
Click:     Satisfying pop (50ms)
Success:   Celebration chime (200ms)
Error:     Subtle warning (150ms)
Transition: Whoosh (100ms, directional)
```

---

## Implementation

```typescript
// Sound context
const { playSound, toggleSound, isSoundEnabled } = useSound()

// Usage
<Button onMouseEnter={() => playSound('hover')}>
  Click me
</Button>
```

---

## Toggle UI

- Small speaker icon in header
- Click to enable/disable
- Persists in localStorage
- Default: disabled

---

## Vision Check

- [ ] Sounds enhance, not annoy
- [ ] Easy to disable
- [ ] Premium feel
- [ ] Skip if not perfect
