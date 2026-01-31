'use client'

import { useState } from 'react'
import { FAQItem as FAQItemComponent } from './FAQItem'
import type { FAQItem } from './FAQSection'

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null)

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <FAQItemComponent
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  )
}
