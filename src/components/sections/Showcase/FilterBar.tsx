'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'

interface FilterOption {
  id: string
  label: string
}

interface FilterBarProps {
  options: FilterOption[]
  activeFilter: string
  onFilterChange: (filter: string) => void
  isInView: boolean
}

export function FilterBar({
  options,
  activeFilter,
  onFilterChange,
  isInView,
}: FilterBarProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={cn(
            'relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void',
            activeFilter === option.id
              ? 'text-void'
              : 'text-titanium hover:text-plasma-white'
          )}
        >
          {/* Active background */}
          {activeFilter === option.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-velex-blue rounded-full"
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </motion.div>
  )
}
