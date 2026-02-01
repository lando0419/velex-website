'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Info, Lock, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

type ServiceType = 'full-service' | 'sim-only'
type BuildType = 'single' | 'multi'
type Complexity = 'simple' | 'medium' | 'complex'
type SimDepth = '1x' | '2x' | '4x' | '10x'

const SERVICE_OPTIONS: { value: ServiceType; label: string; desc: string }[] = [
  { value: 'full-service', label: 'Full-Service', desc: 'We design + simulate' },
  { value: 'sim-only', label: 'Simulation-Only', desc: 'You provide CAD' },
]

const BUILD_OPTIONS: { value: BuildType; label: string; desc: string }[] = [
  { value: 'single', label: 'Single Part', desc: 'One component' },
  { value: 'multi', label: 'Complete Build', desc: 'Multiple parts' },
]

const COMPLEXITY_OPTIONS: { value: Complexity; label: string; tooltip: string; minHours: number }[] = [
  { value: 'simple', label: 'Simple', tooltip: 'Single-part geometry, basic loads', minHours: 24 },
  { value: 'medium', label: 'Medium', tooltip: 'Multi-component assembly, moderate complexity', minHours: 48 },
  { value: 'complex', label: 'Complex', tooltip: 'Multi-body assembly, non-linear materials, advanced constraints', minHours: 48 },
]

const DEPTH_OPTIONS: { value: SimDepth; label: string; tooltip: string; multiplier: number; minHours: number; requiresConsultation?: boolean }[] = [
  { value: '1x', label: 'Standard (1x)', tooltip: '10,000–100,000 simulations. Full suite—structural, thermal, CFD, modal, topology, multi-physics. Recommended for most projects.', multiplier: 1, minHours: 0 },
  { value: '2x', label: 'Enhanced (2x)', tooltip: '~200,000 simulations. Better optimization, more design iterations.', multiplier: 2, minHours: 0 },
  { value: '4x', label: 'Deep (4x)', tooltip: '~1,000,000 simulations. Comprehensive analysis for complex assemblies.', multiplier: 4, minHours: 48 },
  { value: '10x', label: 'Maximum (10x)', tooltip: '5–10 million simulations. Aerospace/defense grade. Requires consultation.', multiplier: 10, minHours: 72, requiresConsultation: true },
]

const COMPLEXITY_MULTIPLIER: Record<Complexity, number> = {
  simple: 1,
  medium: 1.5,
  complex: 2.5,
}

// Base prices for each service type (includes ALL simulation types)
// Reduced from $3,500 and $800
const FULL_SERVICE_BASE = 2000
const SIM_ONLY_BASE = 400

export function QuoteCalculator() {
  const [serviceType, setServiceType] = useState<ServiceType>('full-service')
  const [buildType, setBuildType] = useState<BuildType>('single')
  const [partCount, setPartCount] = useState<number>(2)
  const [complexity, setComplexity] = useState<Complexity>('medium')
  const [simDepth, setSimDepth] = useState<SimDepth>('1x')
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null)
  const [showConsultationMessage, setShowConsultationMessage] = useState(false)

  const isMultiPart = buildType === 'multi'

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

  const handleDepthSelect = (depth: SimDepth) => {
    const option = DEPTH_OPTIONS.find(d => d.value === depth)
    if (option?.requiresConsultation) {
      setShowConsultationMessage(true)
      return
    }
    setSimDepth(depth)
    setShowConsultationMessage(false)
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

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

      {/* Build Type Toggle */}
      <div className="mb-6">
        <label className="block text-sm text-titanium mb-2">Build Type</label>
        <div className="grid grid-cols-2 gap-3">
          {BUILD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setBuildType(opt.value)}
              className={cn(
                'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-1 focus-visible:ring-offset-void',
                buildType === opt.value
                  ? 'bg-velex-blue text-void'
                  : 'bg-titanium/10 text-titanium hover:bg-titanium/20'
              )}
            >
              <span className="block">{opt.label}</span>
              <span className={cn(
                'block text-xs mt-0.5',
                buildType === opt.value ? 'text-void/70' : 'text-titanium/60'
              )}>
                {opt.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Part Options */}
      {isMultiPart && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-titanium/5 border border-titanium/20 rounded-lg"
        >
          <label className="block text-sm text-titanium mb-2">Number of Parts</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="2"
              max="50"
              value={partCount}
              onChange={(e) => setPartCount(parseInt(e.target.value))}
              className="flex-1 h-2 bg-titanium/20 rounded-lg appearance-none cursor-pointer accent-velex-blue"
            />
            <span className="font-numbers text-lg text-velex-blue w-12 text-right">
              {partCount}{partCount >= 50 ? '+' : ''}
            </span>
          </div>
          <p className="text-xs text-titanium/60 mt-3">
            For complete builds, we&apos;ll review your requirements and provide a custom timeline and quote.
          </p>
        </motion.div>
      )}

      {!isMultiPart && (
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
                    onClick={() => handleDepthSelect(opt.value)}
                    onMouseEnter={() => setHoveredTooltip(`depth-${opt.value}`)}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    className={cn(
                      'w-full px-4 py-2 rounded-lg text-sm font-medium transition-all text-left',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-1 focus-visible:ring-offset-void',
                      opt.requiresConsultation
                        ? 'bg-titanium/5 text-titanium/50 cursor-not-allowed border border-titanium/20'
                        : simDepth === opt.value
                          ? 'bg-velex-blue text-void'
                          : 'bg-titanium/10 text-titanium hover:bg-titanium/20'
                    )}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {opt.label}
                        {opt.requiresConsultation && (
                          <Lock className="w-3 h-3" />
                        )}
                      </span>
                      {opt.minHours > 0 && !opt.requiresConsultation && (
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
      )}

      {/* 10x Consultation Message */}
      {showConsultationMessage && !isMultiPart && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-warning-orange/10 border border-warning-orange/30 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-warning-orange flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-plasma-white font-medium mb-1">
                Maximum (10x) requires consultation
              </p>
              <p className="text-xs text-titanium mb-3">
                5–10 million simulations is aerospace/defense grade and only needed for mission-critical systems
                (satellites, aircraft, medical implants). Most projects don&apos;t need this level.
              </p>
              <button
                onClick={scrollToContact}
                className="text-sm text-warning-orange hover:text-warning-orange/80 font-medium underline"
              >
                Request consultation to discuss your requirements
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Estimate Display */}
      <div className="text-center p-6 bg-titanium/5 rounded-lg border border-titanium/10">
        {isMultiPart ? (
          <>
            <p className="text-sm text-titanium mb-2">Complete Build ({partCount}+ parts)</p>
            <p className="font-headline text-2xl text-plasma-white mb-2">
              Custom Quote Required
            </p>
            <p className="text-xs text-titanium/60">
              We&apos;ll analyze your assembly and provide a detailed timeline and pricing.
            </p>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <a
          href="#contact"
          className="inline-block px-8 py-3 bg-velex-blue text-void font-medium rounded-lg hover:bg-electric-cyan focus-visible:bg-electric-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void transition-colors"
        >
          {isMultiPart ? 'Request Custom Quote' : 'Get a Quote'}
        </a>
      </div>
    </div>
  )
}
