'use client'

import { motion } from 'framer-motion'
import { useScrollProgress, useReducedMotion } from '@/hooks'
import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  const scrollProgress = useScrollProgress()
  const prefersReducedMotion = useReducedMotion()

  // Fade out as user scrolls
  const opacity = Math.max(0, 1 - scrollProgress * 10)

  if (opacity === 0) return null

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      style={{ opacity }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.5, duration: 0.5 }}
    >
      <span className="text-xs uppercase tracking-widest text-titanium">
        Scroll
      </span>
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6 text-ixra-blue" />
      </motion.div>
    </motion.div>
  )
}
