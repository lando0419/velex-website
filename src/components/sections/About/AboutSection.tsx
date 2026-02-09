'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Clock, Cpu, Users } from 'lucide-react'
import { useReducedMotion } from '@/hooks'

const TRUST_SIGNALS = [
  {
    icon: Clock,
    title: 'Days, Not Weeks',
    description: 'Average turnaround: 48 hours from specs to deliverables',
  },
  {
    icon: Shield,
    title: 'NDA From Day One',
    description: 'Your IP is locked down before we touch a single file',
  },
  {
    icon: Cpu,
    title: 'GPU-Accelerated',
    description: 'Thousands of CUDA cores running your simulation, not a laptop',
  },
  {
    icon: Users,
    title: 'Full Stack',
    description: 'CAD, FEA, CFD, thermal, modal, topology — all in-house',
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-void py-24 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
              WE DON&apos;T CONSULT. <span className="text-ixra-blue">WE BUILD.</span>
            </h2>
            <p className="text-xl text-titanium max-w-2xl mx-auto">
              Engineers, not advisors. We do the work.
            </p>
          </motion.div>

          {/* Story */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="bg-titanium/5 border border-titanium/20 rounded-xl p-8 md:p-10">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-titanium leading-relaxed mb-6">
                  Most engineering firms hand you a report and a bill.{' '}
                  <span className="text-plasma-white font-medium">IXRA</span> hands you a finished design
                  with validated simulation data — ready to manufacture.
                </p>
                <p className="text-lg text-titanium leading-relaxed mb-6">
                  We run <span className="text-ixra-blue font-medium">GPU-accelerated simulations</span> that
                  finish in minutes, not hours. That speed means more design iterations, tighter optimization,
                  and <span className="text-plasma-white">better parts delivered faster</span> than anyone
                  running legacy CPU workflows.
                </p>
                <p className="text-lg text-titanium leading-relaxed">
                  From aerospace brackets to robotic end-effectors, we&apos;ve delivered{' '}
                  <span className="text-plasma-white">47+ projects</span> across five industries.
                  You send specs. We send back engineered, validated, ready-to-build deliverables.{' '}
                  <span className="text-ixra-blue">That&apos;s it.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trust Signals Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {TRUST_SIGNALS.map((signal, index) => (
              <motion.div
                key={signal.title}
                className="text-center p-6 bg-titanium/5 border border-titanium/10 rounded-lg hover:border-ixra-blue/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : 0.5 + index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <signal.icon className="w-8 h-8 text-ixra-blue mx-auto mb-3" />
                <h3 className="text-sm font-medium text-plasma-white mb-1">
                  {signal.title}
                </h3>
                <p className="text-xs text-titanium">
                  {signal.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
