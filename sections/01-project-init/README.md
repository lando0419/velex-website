# Section 01: Project Initialization

## Overview
**Phase**: Foundation
**Est. Lines**: 300-400
**Day**: 1

---

## Deliverables

- [ ] Next.js 14 project with App Router
- [ ] TypeScript strict configuration
- [ ] Tailwind CSS setup
- [ ] ESLint + Prettier configuration
- [ ] Folder structure creation
- [ ] Git initialization
- [ ] README with setup instructions

---

## Quality Constraints

1. **Zero TypeScript errors** - `tsc --noEmit` must pass
2. **Zero ESLint warnings** - `npm run lint` must pass
3. **Folder structure matches plan exactly** (see below)
4. **All dependencies at latest stable versions**

---

## Folder Structure

```
velex-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # Base components
│   │   ├── sections/           # Page sections
│   │   └── layout/             # Layout components
│   ├── lib/                    # Utilities
│   ├── hooks/                  # Custom hooks
│   └── styles/                 # Global styles
├── public/
│   ├── renders/                # Blender outputs
│   ├── videos/                 # Animations
│   └── assets/                 # Static assets
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── package.json
```

---

## Dependencies to Install

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "@types/node": "^20.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "eslint": "^8.x",
    "eslint-config-next": "^14.x",
    "prettier": "^3.x",
    "prettier-plugin-tailwindcss": "^0.5.x"
  }
}
```

---

## tsconfig.json Settings

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## Vision Check

- [ ] Foundation is rock-solid
- [ ] No shortcuts taken
- [ ] Would support a production site
- [ ] Clean, organized, professional

---

## Commands

```bash
# Create project
npx create-next-app@latest velex-website --typescript --tailwind --eslint --app --src-dir

# Verify
npm run build   # Should pass
npm run lint    # Zero warnings
```

---

## Notes for PC Claude

When this section is assigned, create the Next.js project with strict TypeScript, proper folder structure, and all necessary configuration. This is the foundation - make it bulletproof.
