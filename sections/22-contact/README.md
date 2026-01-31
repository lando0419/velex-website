# Section 22: Contact Form

## Overview
**Phase**: Contact | **Est. Lines**: 600-800 | **Day**: 11

---

## Deliverables

- [ ] Form fields (Name, Email, Company, Type, Message)
- [ ] Real-time validation
- [ ] Checkbox group for simulation type
- [ ] Loading state
- [ ] Success celebration
- [ ] Error handling
- [ ] API route integration

---

## Form Fields

```
Your Name *
[                                    ]

Your Email *
[                                    ]

Company (optional)
[                                    ]

What are you simulating?
[ ] Structural  [ ] Thermal  [ ] CFD
[ ] Modal       [ ] Optimization  [ ] Other

Project Description
[                                    ]
[                                    ]
[                                    ]

[Request Quote]
```

---

## Validation

- Name: Required, min 2 chars
- Email: Required, valid format
- Message: Optional but encouraged
- Real-time, inline feedback

---

## States

### Default
- Clean form, subtle styling

### Focus
- Input lifts, glows, border color

### Valid
- Green checkmark appears

### Invalid
- Red X, subtle shake, error message

### Loading
- Button shows spinner
- Inputs disabled

### Success
- Particle celebration
- Thank you message
- Clear form

### Error
- Error message
- Retry option
- Form data preserved

---

## API Route

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  // Validate
  // Send to email/CRM
  // Return success/error
}
```

---

## Vision Check

- [ ] Form feels premium
- [ ] Validation is helpful
- [ ] Success is rewarding
- [ ] Errors are clear
