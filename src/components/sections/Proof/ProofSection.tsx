'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Rocket, Car, Bot, HeartPulse, Shield, X } from 'lucide-react'
import { useReducedMotion } from '@/hooks'

const INDUSTRIES = [
  {
    icon: Rocket,
    label: 'Aerospace',
    extendedInfo: 'Satellite brackets, CubeSat payload mounts, flight-qualified components. We design for thermal cycling (-40\u00B0C to +85\u00B0C), vibration spectra, and factor of safety requirements per AS9100.',
  },
  {
    icon: Car,
    label: 'Automotive',
    extendedInfo: 'Suspension arms, chassis components, bracket optimization. Track-day to production \u2014 topology optimized for weight reduction with fatigue life analysis.',
  },
  {
    icon: Bot,
    label: 'Robotics',
    extendedInfo: 'End-effector adapters, gripper housings, sensor mounts. Designed for precision (\u00B10.02mm repeatability) and high-cycle life (2M+ operations).',
  },
  {
    icon: HeartPulse,
    label: 'Medical',
    extendedInfo: 'Patient-specific prosthetics, surgical guides, implant housings. Biocompatible material optimization with comfort and fit analysis from 3D scan data.',
  },
  {
    icon: Shield,
    label: 'Defense',
    extendedInfo: 'Ruggedized enclosures, weapon system mounts, vehicle armor optimization. Designed to MIL-STD environmental and shock specifications.',
  },
]

type Industry = (typeof INDUSTRIES)[number]

function IndustryModal({ industry, onClose }: { industry: Industry; onClose: () => void }) {
  const Icon = industry.icon

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-void/95 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="relative w-full max-w-lg bg-void border border-titanium/30 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="relative p-6 pb-4 border-b border-titanium/20">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-titanium/10 border border-titanium/20 text-titanium hover:text-plasma-white hover:border-ixra-blue transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-ixra-blue/10 border border-ixra-blue/30">
                <Icon className="w-8 h-8 text-ixra-blue" />
              </div>
              <h2 className="font-headline text-2xl text-plasma-white">
                {industry.label}
              </h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-titanium leading-relaxed">
              {industry.extendedInfo}
            </p>
          </div>
          <div className="p-4 border-t border-titanium/20 bg-titanium/5 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-titanium/30 text-titanium rounded-lg hover:border-ixra-blue hover:text-plasma-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const STATS = [
  { value: '47+', label: 'Projects Delivered' },
  { value: '<2%', label: 'Error vs Physical Test' },
  { value: '48hr', label: 'Average Turnaround' },
  { value: '100%', label: 'NDA Compliance' },
]

export function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null)

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative bg-void py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-3xl md:text-5xl text-plasma-white mb-3">
            TRUSTED BY <span className="text-ixra-blue">ENGINEERS</span>
          </h2>
          <p className="text-lg text-titanium max-w-xl mx-auto">
            Delivering validated results across the industries that matter most.
          </p>
        </motion.div>

        {/* Industry Icons */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
        >
          {INDUSTRIES.map((industry, index) => (
            <motion.button
              key={industry.label}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => setSelectedIndustry(industry)}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.3 + index * 0.1,
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-14 h-14 rounded-lg bg-titanium/5 border border-titanium/15 flex items-center justify-center hover:border-ixra-blue/40 transition-colors">
                <industry.icon className="w-6 h-6 text-ixra-blue" />
              </div>
              <span className="text-xs text-titanium/70 font-medium uppercase tracking-wider">
                {industry.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.5,
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 bg-titanium/5 border border-titanium/10 rounded-lg"
            >
              <div className="font-headline text-2xl md:text-3xl text-ixra-blue mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-titanium/70 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {selectedIndustry && (
        <IndustryModal
          industry={selectedIndustry}
          onClose={() => setSelectedIndustry(null)}
        />
      )}
    </section>
  )
}
