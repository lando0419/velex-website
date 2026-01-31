'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

interface ValidationNoteProps {
  isInView: boolean
}

export function ValidationNote({ isInView }: ValidationNoteProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="mt-8 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 3.5,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <p className="text-titanium text-sm">
        Validated against{' '}
        <span className="text-plasma-white/90">Ansys</span>,{' '}
        <span className="text-plasma-white/90">Nastran</span>,{' '}
        <span className="text-plasma-white/90">Abaqus</span>
      </p>
      <p className="text-titanium/70 text-xs mt-1">
        Within 2% accuracy on all test cases
      </p>
    </motion.div>
  )
}
