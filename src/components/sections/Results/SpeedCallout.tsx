'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { CountUp } from '@/components/ui'

interface SpeedCalloutProps {
  isInView: boolean
}

export function SpeedCallout({ isInView }: SpeedCalloutProps) {
  const prefersReducedMotion = useReducedMotion()
  const delay = prefersReducedMotion ? 0 : 3

  return (
    <motion.div
      className="text-center pt-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      <motion.div
        className="inline-block"
        animate={
          isInView && !prefersReducedMotion
            ? {
                textShadow: [
                  '0 0 20px rgba(0, 212, 255, 0)',
                  '0 0 40px rgba(0, 212, 255, 0.6)',
                  '0 0 20px rgba(0, 212, 255, 0.3)',
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          delay: delay + 0.3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <span className="font-headline text-5xl md:text-7xl text-ixra-blue">
          {isInView && !prefersReducedMotion ? (
            <CountUp end={120} duration={2000} suffix="x" />
          ) : (
            '120x'
          )}
        </span>
        <span className="font-headline text-3xl md:text-5xl text-plasma-white ml-3">
          FASTER
        </span>
      </motion.div>
    </motion.div>
  )
}
