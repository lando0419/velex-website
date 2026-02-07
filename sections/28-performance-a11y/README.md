# Section 28: Performance & Accessibility

## Overview
**Phase**: Polish | **Est. Lines**: 400-500 | **Day**: 14

---

## Deliverables

- [ ] Lighthouse audit (95+)
- [ ] Bundle analysis
- [ ] Image optimization
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Keyboard navigation test
- [ ] Screen reader test
- [ ] Reduced motion pass
- [ ] SEO meta tags

---

## Performance Targets

```
Lighthouse Score:           95+ all categories
First Contentful Paint:     < 1.2s
Largest Contentful Paint:   < 2.5s
Time to Interactive:        < 3.0s
Cumulative Layout Shift:    < 0.1
Total Blocking Time:        < 200ms

Bundle Size:
- Initial JS: < 150KB gzipped
- Total JS: < 500KB (code split)
- Images: WebP/AVIF, lazy loaded
- Videos: Adaptive bitrate
```

---

## Accessibility Checklist

- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Reduced motion supported
- [ ] Skip links present
- [ ] Headings hierarchy correct
- [ ] Forms labeled properly
- [ ] Error messages accessible

---

## SEO Meta Tags

```html
<title>IXRA | GPU-Accelerated Engineering Simulation</title>
<meta name="description" content="..." />
<meta property="og:title" content="IXRA Engineering" />
<meta property="og:description" content="..." />
<meta property="og:image" content="/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## Testing Tools

- Lighthouse (Chrome DevTools)
- WebPageTest
- axe DevTools
- WAVE
- VoiceOver / NVDA
- Keyboard-only navigation

---

## Optimization Tasks

1. Analyze bundle with `next/bundle-analyzer`
2. Code split heavy components (Three.js)
3. Lazy load below-fold content
4. Optimize images (squoosh, sharp)
5. Preload critical assets
6. Remove unused CSS/JS

---

## Vision Check

- [ ] Lighthouse 95+ all categories
- [ ] Zero accessibility violations
- [ ] Fast on slow connections
- [ ] Works for everyone
- [ ] SEO optimized

---

## Notes for PC Claude

This is the final quality gate. Every metric matters. Run Lighthouse, run axe, test with keyboard only, test with VoiceOver. If anything fails, fix it. The site is not done until everything passes.
