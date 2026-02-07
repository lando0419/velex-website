# IXRA Website Build Roadmap

## Overview

**Total Sections**: 28
**Estimated Lines**: 12,400 - 15,800
**Timeline**: ~14 working days (~3 weeks)

---

## Phase 1: Foundation (Days 1-3)

### Day 1: Project Setup + Design System
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 01 | Project Initialization | 300-400 | [ ] |
| 02 | Design System & Tokens | 400-500 | [ ] |

**Deliverables**:
- Next.js 14 project running
- All design tokens configured
- Tailwind setup with custom config

### Day 2: Base Components
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 03 | Base Component Library | 800-1000 | [ ] |

**Deliverables**:
- Button, Input, Card, Badge, Spinner
- All accessible, all with TypeScript interfaces

### Day 3: Advanced Components + Layout
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 04 | Advanced Components | 600-800 | [ ] |
| 05 | Layout Components | 500-600 | [ ] |

**Deliverables**:
- Accordion, Modal, Tabs, Tooltip, Toast
- Header, Footer, Section wrapper

**MILESTONE**: Foundation Complete - Can start building pages

---

## Phase 2: Core Sections (Days 4-7)

### Day 4: Hero Structure
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 06 | Hero - Structure & Animation | 600-800 | [ ] |

**Deliverables**:
- Full viewport hero with gradient
- Entry animation sequence
- Scroll indicator

### Day 5: Hero 3D
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 07 | Hero - 3D Integration | 800-1000 | [ ] |

**Deliverables**:
- Three.js/R3F integration
- Blender model loading
- Mobile fallback

**DEPENDENCY**: Blender hero renders needed

### Day 6: Problem + Solution
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 08 | Problem Section | 400-500 | [ ] |
| 09 | Solution Section | 500-600 | [ ] |

**Deliverables**:
- Split screen with scroll animation
- Code typing visualization
- Counter animations

### Day 7: Capabilities Grid + 3 Cards
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 10 | Capabilities Grid | 400-500 | [ ] |
| 11 | Card: Structural | 300-400 | [ ] |
| 12 | Card: Thermal | 300-400 | [ ] |
| 13 | Card: CFD | 300-400 | [ ] |

**Deliverables**:
- 3x2 responsive grid
- First 3 capability cards

**MILESTONE**: Above-fold Complete

---

## Phase 3: Business Sections (Days 8-10)

### Day 8: Remaining Cards
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 14 | Card: Modal/Vibration | 300-400 | [ ] |
| 15 | Card: Topology | 300-400 | [ ] |
| 16 | Card: Multi-Physics | 300-400 | [ ] |

**Deliverables**:
- All 6 capability cards complete

**DEPENDENCY**: All Blender capability renders needed

### Day 9: Process + Showcase
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 17 | Process Timeline | 500-600 | [ ] |
| 18 | Showcase Gallery | 600-800 | [ ] |

**Deliverables**:
- Timeline with animations
- Masonry gallery with video hover

**DEPENDENCY**: Showcase gallery Blender renders needed

### Day 10: Results + Pricing + FAQ
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 19 | Results/Benchmarks | 400-500 | [ ] |
| 20 | Pricing Section | 500-600 | [ ] |
| 21 | FAQ Section | 400-500 | [ ] |

**Deliverables**:
- Animated benchmark charts
- Quote calculator
- FAQ accordion

**MILESTONE**: All Content Sections Complete

---

## Phase 4: Contact & Footer (Day 11)

### Day 11: Contact + Footer
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 22 | Contact Form | 600-800 | [ ] |
| 23 | Footer | 300-400 | [ ] |

**Deliverables**:
- Form with validation and API
- Success celebrations
- Footer with all links

**MILESTONE**: Functionally Complete Website

---

## Phase 5: Polish (Days 12-14)

### Day 12: GSAP + Transitions
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 24 | GSAP Scroll Animations | 500-600 | [ ] |
| 25 | Page Transitions | 400-500 | [ ] |

**Deliverables**:
- ScrollTrigger on all sections
- Smooth page transitions

### Day 13: Micro-interactions + Sound
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 26 | Micro-Interactions System | 400-500 | [ ] |
| 27 | Sound Design (Optional) | 300-400 | [ ] |

**Deliverables**:
- Every interaction polished
- Optional audio layer

### Day 14: Performance + A11y
| Section | Name | Lines | Status |
|---------|------|-------|--------|
| 28 | Performance & Accessibility | 400-500 | [ ] |

**Deliverables**:
- Lighthouse 95+ all metrics
- Zero accessibility violations
- SEO optimized

**MILESTONE**: V2 (100%) COMPLETE - THE OBSESSION

---

## Blender Asset Dependencies

| Asset | Needed By | Section |
|-------|-----------|---------|
| Hero landing gear renders (8K) | Day 5 | 07 |
| Hero rotation animation (60fps) | Day 5 | 07 |
| Structural bracket render (4K) | Day 8 | 11 |
| Thermal heat sink render (4K) | Day 8 | 12 |
| CFD streamlines render (4K) | Day 8 | 13 |
| Modal vibration render (4K) | Day 8 | 14 |
| Topology optimization render (4K) | Day 8 | 15 |
| Multi-physics render (4K) | Day 8 | 16 |
| Showcase gallery pieces (10+, 4K) | Day 9 | 18 |

---

## Progress Tracker

```
Phase 1: Foundation    [--------------------] 0/5 sections
Phase 2: Core          [--------------------] 0/11 sections
Phase 3: Business      [--------------------] 0/5 sections
Phase 4: Contact       [--------------------] 0/2 sections
Phase 5: Polish        [--------------------] 0/5 sections

TOTAL:                 [--------------------] 0/28 sections
```

Update this as sections complete.

---

## Quality Gates

Before moving to next phase:

### Phase 1 Complete
- [ ] All components render without errors
- [ ] TypeScript strict mode passes
- [ ] All components accessible

### Phase 2 Complete
- [ ] Hero loads in < 3 seconds
- [ ] Animations are 60fps
- [ ] Mobile responsive

### Phase 3 Complete
- [ ] Forms submit correctly
- [ ] Calculator works
- [ ] All content in place

### Phase 4 Complete
- [ ] No console errors
- [ ] All links work
- [ ] Basic SEO tags

### Phase 5 Complete
- [ ] Lighthouse 95+ all
- [ ] Zero a11y violations
- [ ] Cross-browser tested

---

## Ready to Build

Start with Section 01. Read the README.md in each section folder for specific requirements.

**Command**: `cd ~/ixra-website && npm run dev`
