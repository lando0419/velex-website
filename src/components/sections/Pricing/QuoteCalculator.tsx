'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ServiceType = 'full-service' | 'sim-only'
type Complexity = 'simple' | 'medium' | 'complex'
type SimDepth = '1x' | '2x' | '4x' | '10x'

const SERVICE_OPTIONS: { value: ServiceType; label: string; desc: string }[] = [
  { value: 'full-service', label: 'Full-Service', desc: 'We design + simulate' },
  { value: 'sim-only', label: 'Simulation-Only', desc: 'You provide CAD' },
]

const COMPLEXITY_OPTIONS: { value: Complexity; label: string; tooltip: string; minHours: number }[] = [
  { value: 'simple', label: 'Simple', tooltip: 'Single-part geometry, basic loads', minHours: 24 },
  { value: 'medium', label: 'Medium', tooltip: 'Multi-component assembly, moderate complexity', minHours: 48 },
  { value: 'complex', label: 'Complex', tooltip: 'Multi-body assembly, non-linear materials, advanced constraints', minHours: 48 },
]

const DEPTH_OPTIONS: { value: SimDepth; label: string; tooltip: string; multiplier: number; minHours: number }[] = [
  { value: '1x', label: 'Standard (1x)', tooltip: 'Full simulation suite—structural, thermal, CFD, modal, topology, multi-physics', multiplier: 1, minHours: 0 },
  { value: '2x', label: 'Enhanced (2x)', tooltip: '2x more iterations. More data points, better optimization potential.', multiplier: 2, minHours: 0 },
  { value: '4x', label: 'Deep (4x)', tooltip: '4x iterations. Significantly more data, higher probability of optimal results.', multiplier: 4, minHours: 48 },
  { value: '10x', label: 'Maximum (10x)', tooltip: '10x iterations. Exhaustive analysis for mission-critical parts.', multiplier: 10, minHours: 72 },
]

const COMPLEXITY_MULTIPLIER: Record<Complexity, number> = {
  simple: 1,
  medium: 1.5,
  complex: 2.5,
}

// Base prices for each service type (includes ALL simulation types)
const FULL_SERVICE_BASE = 3500
const SIM_ONLY_BASE = 800

export function QuoteCalculator() {
  const [serviceType, setServiceType] = useState<ServiceType>('full-service')
  const [complexity, setComplexity] = useState<Complexity>('medium')
  const [simDepth, setSimDepth] = useState<SimDepth>('1x')
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null)

  const estimate = useMemo(() => {
    const base = serviceType === 'full-service' ? FULL_SERVICE_BASE : SIM_ONLY_BASE
    const complexityMult = COMPLEXITY_MULTIPLIER[complexity]
    const depthMult = DEPTH_OPTIONS.find(d => d.value === simDepth)?.multiplier || 1
    const total = base * complexityMult * depthMult

    // Return range (±20%)
    const low = Math.round(total * 0.8 / 100) * 100
    const high = Math.round(total * 1.2 / 100) * 100

    return { low, high }
  }, [serviceType, complexity, simDepth])

  const minTurnaround = useMemo(() => {
    const complexityHours = COMPLEXITY_OPTIONS.find(c => c.value === complexity)?.minHours || 24
    const depthHours = DEPTH_OPTIONS.find(d => d.value === simDepth)?.minHours || 0
    return Math.max(complexityHours, depthHours)
  }, [complexity, simDepth])

  return (
    <div className="max-w-2xl mx-auto rounded-xl border border-titanium/20 bg-void/80 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-velex-blue" />
        <h3 className="font-headline text-xl text-plasma-white">
          Quick Estimate Calculator
        </h3>
      </div>

      {/* All Simulations Included Note */}
      <div className="mb-6 p-3 bg-velex-blue/10 border border-velex-blue/20 rounded-lg">
        <p className="text-sm text-velex-blue flex items-center gap-2">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>All 6 simulation types included:</strong> Structural, Thermal, CFD, Modal, Topology, Multi-Physics
          </span>
        </p>
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

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Complexity */}
        <div>
          <label className="block text-sm text-titanium mb-2">
            Part Complexity
          </label>
          <div className="flex flex-col gap-2">
            {COMPLEXITY_OPTIONS.map((opt) => (
              <div key={opt.value} className="relative">
                <button
                  onClick={() => setComplexity(opt.value)}
                  onMouseEnter={() => setHoveredTooltip(`complexity-${opt.value}`)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className={cn(
                    'w-full px-4 py-2 rounded-lg text-sm font-medium transition-all text-left',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-1 focus-visible:ring-offset-void',
                    complexity === opt.value
                      ? 'bg-velex-blue text-void'
                      : 'bg-titanium/10 text-titanium hover:bg-titanium/20'
                  )}
                >
                  <span className="flex items-center justify-between">
                    {opt.label}
                    {opt.minHours >= 48 && (
                      <span className={cn(
                        'text-xs',
                        complexity === opt.value ? 'text-void/60' : 'text-titanium/50'
                      )}>
                        {opt.minHours}h min
                      </span>
                    )}
                  </span>
                </button>
                {hoveredTooltip === `complexity-${opt.value}` && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-10 px-3 py-2 bg-titanium/90 text-void text-xs rounded-lg max-w-48 whitespace-normal">
                    {opt.tooltip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Simulation Depth */}
        <div>
          <label className="block text-sm text-titanium mb-2">
            Simulation Depth
          </label>
          <div className="flex flex-col gap-2">
            {DEPTH_OPTIONS.map((opt) => (
              <div key={opt.value} className="relative">
                <button
                  onClick={() => setSimDepth(opt.value)}
                  onMouseEnter={() => setHoveredTooltip(`depth-${opt.value}`)}
                  onMouseLeave={() => setHoveredTooltip(null)}
                  className={cn(
                    'w-full px-4 py-2 rounded-lg text-sm font-medium transition-all text-left',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-1 focus-visible:ring-offset-void',
                    simDepth === opt.value
                      ? 'bg-velex-blue text-void'
                      : 'bg-titanium/10 text-titanium hover:bg-titanium/20'
                  )}
                >
                  <span className="flex items-center justify-between">
                    {opt.label}
                    {opt.minHours > 0 && (
                      <span className={cn(
                        'text-xs',
                        simDepth === opt.value ? 'text-void/60' : 'text-titanium/50'
                      )}>
                        {opt.minHours}h min
                      </span>
                    )}
                  </span>
                </button>
                {hoveredTooltip === `depth-${opt.value}` && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-10 px-3 py-2 bg-titanium/90 text-void text-xs rounded-lg max-w-56 whitespace-normal">
                    {opt.tooltip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estimate Display */}
      <div className="text-center p-6 bg-titanium/5 rounded-lg border border-titanium/10">
        <p className="text-sm text-titanium mb-2">Estimated Range</p>
        <motion.p
          key={`${serviceType}-${complexity}-${simDepth}`}
          className="font-numbers text-4xl text-velex-blue"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
        </motion.p>
        <p className="text-sm text-titanium/80 mt-2">
          Minimum turnaround: <span className="text-plasma-white font-medium">{minTurnaround} hours</span>
        </p>
        <p className="text-xs text-titanium/60 mt-1">
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
