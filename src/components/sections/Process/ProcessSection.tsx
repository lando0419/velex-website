'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Timeline } from './Timeline'
import { useReducedMotion } from '@/hooks'

export interface ProcessStep {
  number: number
  title: string
  subtitle: string
  details: string[]
  icon: 'message' | 'pen' | 'cpu' | 'package'
}

const STEPS: ProcessStep[] = [
  {
    number: 1,
    title: 'CONSULT',
    subtitle: 'Tell us what you need',
    details: ['Free consultation', 'NDA available'],
    icon: 'message',
  },
  {
    number: 2,
    title: 'DESIGN',
    subtitle: 'We build your CAD',
    details: ['Expert modeling', 'Your specs'],
    icon: 'pen',
  },
  {
    number: 3,
    title: 'SIMULATE',
    subtitle: 'GPU-accelerated analysis',
    details: ['100x faster', 'than CPU'],
    icon: 'cpu',
  },
  {
    number: 4,
    title: 'DELIVER',
    subtitle: 'Validated results + files',
    details: ['Full report', 'CAD + data'],
    icon: 'package',
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-void py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            HOW IT <span className="text-velex-blue">WORKS</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            From concept to confidence in four simple steps.
          </p>
        </motion.div>

        <Timeline steps={STEPS} isInView={isInView} />
      </div>
    </section>
  )
}
