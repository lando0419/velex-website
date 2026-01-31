'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ContactForm } from './ContactForm'
import { useReducedMotion } from '@/hooks'

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-void py-24 overflow-hidden"
    >
      {/* Subtle glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-velex-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            LET&apos;S <span className="text-velex-blue">TALK</span>
          </h2>
          <p className="text-xl text-titanium">
            Tell us about your project. We&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
