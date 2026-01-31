'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SplitScreen } from './SplitScreen'
import { TimeCounter } from './TimeCounter'
import { useReducedMotion } from '@/hooks'

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-void py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            THE OLD WAY IS{' '}
            <span className="text-stress-red">HOLDING YOU BACK</span>
          </h2>
        </motion.div>

        {/* Split Screen Comparison */}
        <SplitScreen isActive={isInView && !prefersReducedMotion} />

        {/* Problem Copy */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xl text-titanium leading-relaxed">
            Engineers wait. Projects stall.
            <br />
            CPUs grind through yesterday&apos;s math.
            <br />
            Your GPU sits idle.{' '}
            <span className="text-velex-blue">Thousands of cores. Wasted.</span>
          </p>
        </motion.div>

        {/* Time Counter */}
        <motion.div
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <TimeCounter
            label="Average FEA Solve"
            fromSeconds={14400}
            toSeconds={14400}
            isActive={false}
            className="text-stress-red"
          />
          <div className="hidden md:block h-16 w-px bg-titanium/30" />
          <TimeCounter
            label="With VELEX"
            fromSeconds={14400}
            toSeconds={127}
            isActive={isInView}
            className="text-success-green"
          />
        </motion.div>

        {/* The Gap */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p className="text-titanium">
            Your deadline:{' '}
            <span className="text-warning-orange">Yesterday</span>
          </p>
          <p className="text-2xl font-headline text-stress-red mt-2">
            The gap: Unacceptable
          </p>
        </motion.div>
      </div>
    </section>
  )
}
