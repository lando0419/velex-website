'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'
import { cn } from '@/lib/utils'

type ServiceType = 'full-service' | 'sim-only'
type Complexity = 'simple' | 'medium' | 'complex'
type SimType = 'structural' | 'thermal' | 'cfd' | 'multi'
type Urgency = 'standard' | 'rush'

const SERVICE_OPTIONS: { value: ServiceType; label: string; desc: string }[] = [
  { value: 'full-service', label: 'Full-Service', desc: 'We design + simulate' },
  { value: 'sim-only', label: 'Simulation-Only', desc: 'You provide CAD' },
]

const COMPLEXITY_MULTIPLIER: Record<Complexity, number> = {
  simple: 1,
  medium: 1.5,
  complex: 2.5,
}

// Different base prices for each service type
const FULL_SERVICE_BASE: Record<SimType, number> = {
  structural: 3000,
  thermal: 3500,
  cfd: 4000,
  multi: 6000,
}

const SIM_ONLY_BASE: Record<SimType, number> = {
  structural: 500,
  thermal: 600,
  cfd: 800,
  multi: 1200,
}

const URGENCY_MULTIPLIER: Record<Urgency, number> = {
  standard: 1,
  rush: 1.5,
}

const COMPLEXITY_OPTIONS: { value: Complexity; label: string }[] = [
  { value: 'simple', label: 'Simple' },
  { value: 'medium', label: 'Medium' },
  { value: 'complex', label: 'Complex' },
]

const TYPE_OPTIONS: { value: SimType; label: string }[] = [
  { value: 'structural', label: 'Structural' },
  { value: 'thermal', label: 'Thermal' },
  { value: 'cfd', label: 'CFD' },
  { value: 'multi', label: 'Multi-Physics' },
]

const URGENCY_OPTIONS: { value: Urgency; label: string }[] = [
  { value: 'standard', label: 'Standard (48-72h)' },
  { value: 'rush', label: 'Rush (24h)' },
]

export function QuoteCalculator() {
  const [serviceType, setServiceType] = useState<ServiceType>('full-service')
  const [complexity, setComplexity] = useState<Complexity>('medium')
  const [simType, setSimType] = useState<SimType>('structural')
  const [urgency, setUrgency] = useState<Urgency>('standard')

  const estimate = useMemo(() => {
    const baseTable = serviceType === 'full-service' ? FULL_SERVICE_BASE : SIM_ONLY_BASE
    const base = baseTable[simType]
    const complexityMult = COMPLEXITY_MULTIPLIER[complexity]
    const urgencyMult = URGENCY_MULTIPLIER[urgency]
    const total = base * complexityMult * urgencyMult

    // Return range (±20%)
    const low = Math.round(total * 0.8 / 100) * 100
    const high = Math.round(total * 1.2 / 100) * 100

    return { low, high }
  }, [serviceType, complexity, simType, urgency])

  return (
    <div className="max-w-2xl mx-auto rounded-xl border border-titanium/20 bg-void/80 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-velex-blue" />
        <h3 className="font-headline text-xl text-plasma-white">
          Quick Estimate Calculator
        </h3>
      </div>

      {/* Service Type Toggle */}
      <div className="mb-6">
        <label className="block text-sm text-titanium mb-2">Service Type</label>
        <div className="grid grid-cols-2 gap-3">
          {SERVICE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setServiceType(opt.value)}
              className={cn(
                'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-1 focus-visible:ring-offset-void',
                serviceType === opt.value
                  ? 'bg-velex-blue text-void'
                  : 'bg-titanium/10 text-titanium hover:bg-titanium/20'
              )}
            >
              <span className="block">{opt.label}</span>
              <span className={cn(
                'block text-xs mt-0.5',
                serviceType === opt.value ? 'text-void/70' : 'text-titanium/60'
              )}>
                {opt.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* Complexity */}
        <div>
          <label className="block text-sm text-titanium mb-2">
            Part Complexity
          </label>
          <div className="flex flex-col gap-2">
            {COMPLEXITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setComplexity(opt.value)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-1 focus-visible:ring-offset-void',
                  complexity === opt.value
                    ? 'bg-velex-blue text-void'
                    : 'bg-titanium/10 text-titanium hover:bg-titanium/20'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Simulation Type */}
        <div>
          <label className="block text-sm text-titanium mb-2">
            Simulation Type
          </label>
          <div className="flex flex-col gap-2">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSimType(opt.value)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-1 focus-visible:ring-offset-void',
                  simType === opt.value
                    ? 'bg-velex-blue text-void'
                    : 'bg-titanium/10 text-titanium hover:bg-titanium/20'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm text-titanium mb-2">
            Turnaround
          </label>
          <div className="flex flex-col gap-2">
            {URGENCY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setUrgency(opt.value)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-1 focus-visible:ring-offset-void',
                  urgency === opt.value
                    ? 'bg-velex-blue text-void'
                    : 'bg-titanium/10 text-titanium hover:bg-titanium/20'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Estimate Display */}
      <div className="text-center p-6 bg-titanium/5 rounded-lg border border-titanium/10">
        <p className="text-sm text-titanium mb-2">Estimated Range</p>
        <motion.p
          key={`${serviceType}-${complexity}-${simType}-${urgency}`}
          className="font-numbers text-4xl text-velex-blue"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
        </motion.p>
        <p className="text-xs text-titanium/60 mt-2">
          Final pricing based on project scope review
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <a
          href="#contact"
          className="inline-block px-8 py-3 bg-velex-blue text-void font-medium rounded-lg hover:bg-electric-cyan focus-visible:bg-electric-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void transition-colors"
        >
          Get a Quote
        </a>
      </div>
    </div>
  )
}
