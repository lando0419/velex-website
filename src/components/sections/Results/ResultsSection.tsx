'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BenchmarkChart } from './BenchmarkChart'
import { SpeedCallout } from './SpeedCallout'
import { ValidationNote } from './ValidationNote'
import { useReducedMotion } from '@/hooks'

export function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative bg-void py-24 overflow-hidden"
    >
      {/* Subtle glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-ixra-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            PERFORMANCE THAT <span className="text-ixra-blue">SPEAKS</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            Numbers don&apos;t lie. Neither do we.
          </p>
        </motion.div>

        <motion.div
          className="rounded-xl border border-titanium/20 bg-void/80 backdrop-blur-sm p-6 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-titanium text-sm mb-8 font-code tracking-wider">
            100,000 ELEMENT FEA SOLVE
          </p>

          <BenchmarkChart isInView={isInView} />

          <SpeedCallout isInView={isInView} />
        </motion.div>

        <ValidationNote isInView={isInView} />
      </div>
    </section>
  )
}
