'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PricingCard } from './PricingCard'
import { QuoteCalculator } from './QuoteCalculator'
import { useReducedMotion } from '@/hooks'

export interface PricingTier {
  id: string
  name: string
  priceRange: string
  features: string[]
  highlighted?: boolean
}

// Full-Service: We design + simulate + validate + deliver
const FULL_SERVICE_TIERS: PricingTier[] = [
  {
    id: 'single-part',
    name: 'Single Part',
    priceRange: '$3,000 - $5,000',
    features: [
      'CAD design from your specs',
      'GPU-accelerated simulation',
      'Engineering validation',
      'Full deliverable package',
    ],
  },
  {
    id: 'assembly',
    name: 'Complex Assembly',
    priceRange: '$8,000 - $15,000',
    features: [
      'Multi-part CAD modeling',
      'Assembly-level simulation',
      'Component interaction analysis',
      'Detailed documentation',
    ],
    highlighted: true,
  },
  {
    id: 'system',
    name: 'Full System',
    priceRange: 'From $25,000',
    features: [
      'Complete system design',
      'Multi-physics simulation',
      'Enterprise integration',
      'Dedicated engineering team',
    ],
  },
]

// Rendering Services
const RENDERING_TIERS: PricingTier[] = [
  {
    id: 'render-package',
    name: 'Per Render Package',
    priceRange: '$500 - $2,000',
    features: [
      'Photorealistic product renders',
      'Simulation visualization & overlays',
      'Animation & exploded views',
      'Marketing-ready assets',
    ],
  },
]

// Simulation-Only: Customer provides CAD, we simulate
const SIM_ONLY_TIERS: PricingTier[] = [
  {
    id: 'per-analysis',
    name: 'Per Analysis',
    priceRange: '$500 - $1,500',
    features: [
      'You provide CAD files',
      'GPU-accelerated simulation',
      'Results report',
      'Quick turnaround',
    ],
  },
  {
    id: 'subscription',
    name: 'Monthly Subscription',
    priceRange: '$2,500/mo',
    features: [
      'Unlimited simulation runs',
      'Priority queue',
      'Dedicated support',
      'Volume discounts available',
    ],
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="pricing"
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
            <span className="text-ixra-blue">PRICING</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            Two ways to work with us. Full-service engineering or simulation-only.
          </p>
        </motion.div>

        {/* Full-Service Engineering */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          <h3 className="font-headline text-2xl text-plasma-white text-center mb-2">
            Full-Service Engineering
          </h3>
          <p className="text-titanium text-center mb-8">
            We design, simulate, validate, and deliver
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FULL_SERVICE_TIERS.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.3 + index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <PricingCard tier={tier} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Simulation-Only */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.5 }}
        >
          <h3 className="font-headline text-2xl text-plasma-white text-center mb-2">
            Simulation-Only
          </h3>
          <p className="text-titanium text-center mb-8">
            You provide CAD files, we run GPU-accelerated analysis
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {SIM_ONLY_TIERS.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.6 + index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <PricingCard tier={tier} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rendering Services */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.7 }}
        >
          <h3 className="font-headline text-2xl text-plasma-white text-center mb-2">
            Rendering Services
          </h3>
          <p className="text-titanium text-center mb-8">
            Photorealistic renders and simulation visualizations for your products
          </p>
          <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
            {RENDERING_TIERS.map((tier) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <PricingCard tier={tier} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <QuoteCalculator />
        </motion.div>
      </div>
    </section>
  )
}
