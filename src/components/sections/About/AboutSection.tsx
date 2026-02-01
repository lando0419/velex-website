'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Clock, Cpu, Users } from 'lucide-react'
import { useReducedMotion } from '@/hooks'

const TRUST_SIGNALS = [
  {
    icon: Clock,
    title: '24-Hour Response',
    description: 'Every inquiry answered within one business day',
  },
  {
    icon: Shield,
    title: 'NDA Ready',
    description: 'Your IP protected from day one',
  },
  {
    icon: Cpu,
    title: '100x Faster',
    description: 'GPU-accelerated simulation vs traditional',
  },
  {
    icon: Users,
    title: 'All 6 Sims Included',
    description: 'Structural, thermal, CFD, modal, topology, multi-physics',
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
              WHO WE <span className="text-velex-blue">ARE</span>
            </h2>
            <p className="text-xl text-titanium max-w-2xl mx-auto">
              Engineers who got tired of waiting weeks for simulation results.
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
                  <span className="text-plasma-white font-medium">VELEX</span> is a GPU-accelerated
                  engineering simulation company founded in <span className="text-velex-blue font-medium">2024</span>.
                  We started because traditional FEA consulting takes too long and costs too much.
                </p>
                <p className="text-lg text-titanium leading-relaxed mb-6">
                  Our team combines <span className="text-plasma-white">formal engineering backgrounds</span> in
                  aerospace and mechanical engineering with <span className="text-plasma-white">hands-on project experience</span> across
                  robotics, automotive, drones, and medical devices.
                </p>
                <p className="text-lg text-titanium leading-relaxed">
                  We&apos;re a <span className="text-velex-blue">fully remote team</span> that moves fast.
                  You describe what you need. We design, simulate, validate, and deliver—in days, not weeks.
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
                className="text-center p-6 bg-titanium/5 border border-titanium/10 rounded-lg hover:border-velex-blue/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : 0.5 + index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <signal.icon className="w-8 h-8 text-velex-blue mx-auto mb-3" />
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
