'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FAQItem as FAQItemType } from './FAQSection'

interface FAQItemProps {
  item: FAQItemType
  isOpen: boolean
  onToggle: () => void
}

export function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      className={cn(
        'rounded-lg border transition-colors duration-200',
        isOpen
          ? 'border-velex-blue/50 bg-velex-blue/5'
          : 'border-titanium/20 bg-void hover:border-titanium/40'
      )}
    >
      <button
        id={`faq-question-${item.id}`}
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-velex-blue"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className={cn(
          'font-medium transition-colors',
          isOpen ? 'text-plasma-white' : 'text-titanium'
        )}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className={cn(
            'w-5 h-5 transition-colors',
            isOpen ? 'text-velex-blue' : 'text-titanium'
          )} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-question-${item.id}`}
          >
            <div className="px-4 pb-4">
              <p className="text-titanium text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
