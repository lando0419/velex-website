'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { CodeEditor } from './CodeEditor'
import { ResultDisplay } from './ResultDisplay'
import { GPUMeter } from './GPUMeter'
import { CelebrationParticles } from './CelebrationParticles'
import { useReducedMotion } from '@/hooks'

type Phase = 'idle' | 'typing' | 'solving' | 'complete'

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [showCelebration, setShowCelebration] = useState(false)

  // Phase progression callbacks
  const handleCodeComplete = useCallback(() => setPhase('solving'), [])
  const handleSolveComplete = useCallback(() => {
    setPhase('complete')
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 1500)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-void py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            IXRA{' '}
            <span className="text-ixra-blue">CHANGES THE EQUATION</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            You describe what you need. We design, simulate, validate, and deliver.
            Full-service engineering. Fast.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CodeEditor
              isActive={isInView && !prefersReducedMotion}
              onComplete={handleCodeComplete}
            />
          </motion.div>

          {/* Right: Results + GPU Meter */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <GPUMeter phase={phase} />
            <ResultDisplay
              phase={phase}
              onComplete={handleSolveComplete}
            />
          </motion.div>
        </div>
      </div>

      {/* Celebration Particles */}
      {showCelebration && <CelebrationParticles />}
    </section>
  )
}
