'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Children, ReactNode } from 'react'

interface StaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
