# Section 08: Problem Section

## Overview
**Phase**: Core
**Est. Lines**: 400-500
**Day**: 6

---

## Deliverables

- [ ] Split screen layout
- [ ] "Old way" visualization (grayscale, stuck)
- [ ] Counter animation (4 hours → 2 minutes)
- [ ] Scroll-triggered transformation
- [ ] Content copy

---

## Quality Constraints

1. **Scroll trigger**: At 80% viewport
2. **Animation duration**: 1.5s
3. **Counter**: Animated numbers library
4. **Copy**: Exact from V2 plan

---

## Content

```
THE OLD WAY IS HOLDING YOU BACK

Engineers wait. Projects stall.
CPUs grind through yesterday's math.
Your GPU sits idle. Thousands of cores. Wasted.

Average FEA solve: 4 hours
Your deadline: Yesterday
The gap: Unacceptable
```

---

## Visual Design

### Split Screen
- Left: "The Old Way" (grayscale, static)
- Right: "The IXRA Way" (full color, dynamic)

### Left Side (Before)
- Grayscale filter
- Loading bar stuck at 47%
- Clock ticking slowly
- Frustrated visuals

### Right Side (After)
- Full color, IXRA palette
- Instant results
- GPU cores lighting up
- Energy and speed

---

## Animation Sequence

1. User scrolls to section
2. At 80% viewport, animation triggers
3. Left side "cracks" and dissolves (1s)
4. Right side builds from pieces (1s)
5. Counter animates: 4:00:00 → 0:02:07

---

## Counter Animation

```typescript
import { useCountUp } from 'react-countup'

// From 4 hours to 2 minutes
const { countUp } = useCountUp({
  start: 14400, // 4 hours in seconds
  end: 127,     // 2 min 7 sec
  duration: 2,
  suffix: ' seconds',
  formattingFn: formatTime,
})
```

---

## Vision Check

- [ ] Problem feels REAL
- [ ] Transformation is dramatic
- [ ] Counter is satisfying
- [ ] Makes viewer uncomfortable with old way

---

## Notes for PC Claude

This section creates tension. The viewer should feel the pain of the old way before seeing the solution. Make the left side feel slow, frustrating. Make the right side feel like relief.
