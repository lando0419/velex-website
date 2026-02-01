'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CapabilityCard, type Capability } from './CapabilityCard'
import { useReducedMotion } from '@/hooks'

const CAPABILITIES: Capability[] = [
  {
    id: 'structural',
    title: 'Structural Analysis',
    description: 'Finite Element Analysis for stress, strain, and deformation. Know your limits before you hit them.',
    features: ['Static analysis', 'Fatigue prediction', 'Factor of safety', 'Material optimization'],
    stats: { peakStress: '342 MPa', safetyFactor: '2.4', solveTime: '127s' },
    icon: 'structural',
    extendedInfo: {
      longDescription: 'Our GPU-accelerated Finite Element Analysis identifies stress concentrations, predicts failure points, and optimizes material usage before your part ever leaves the computer. We analyze real-world loading conditions to ensure your design meets safety margins.',
      useCases: [
        'Load-bearing brackets and mounts',
        'Pressure vessels and enclosures',
        'Suspension and chassis components',
        'Aerospace structural members',
      ],
      technicalDetails: [
        'Linear and non-linear static analysis',
        'Contact and bolted joint simulation',
        'Composite layup optimization',
        'Fatigue life prediction (S-N curves)',
      ],
    },
  },
  {
    id: 'thermal',
    title: 'Thermal Simulation',
    description: 'Heat transfer analysis for temperature distribution, thermal stress, and cooling optimization.',
    features: ['Steady-state analysis', 'Transient simulation', 'Conjugate heat transfer', 'Thermal stress coupling'],
    stats: { maxTemp: '87°C', heatFlux: '2.4 kW/m²', thermalResistance: '0.12 K/W' },
    icon: 'thermal',
    extendedInfo: {
      longDescription: 'We simulate heat flow through your design to prevent overheating, optimize cooling paths, and predict thermal expansion. Critical for electronics enclosures, heat exchangers, and any component exposed to temperature extremes.',
      useCases: [
        'Electronics cooling and heat sinks',
        'Battery thermal management',
        'Engine and exhaust components',
        'LED housings and thermal interfaces',
      ],
      technicalDetails: [
        'Steady-state and transient analysis',
        'Conjugate heat transfer (solid + fluid)',
        'Radiation and convection modeling',
        'Thermal stress coupling with structural',
      ],
    },
  },
  {
    id: 'cfd',
    title: 'CFD Analysis',
    description: 'Computational Fluid Dynamics for airflow, pressure distribution, and aerodynamic optimization.',
    features: ['External aerodynamics', 'Internal flow', 'Pressure drop analysis', 'Drag optimization'],
    stats: { dragCoefficient: '0.32', maxVelocity: '45 m/s', pressureDrop: '12 Pa' },
    icon: 'cfd',
    extendedInfo: {
      longDescription: 'Computational Fluid Dynamics reveals how air and liquids flow around and through your design. We optimize for minimum drag, maximum cooling, or precise flow distribution—before expensive prototypes.',
      useCases: [
        'Aerodynamic fairings and spoilers',
        'HVAC ducts and manifolds',
        'Drone and UAV frames',
        'Cooling channels and heat exchangers',
      ],
      technicalDetails: [
        'External aerodynamics (drag, lift, downforce)',
        'Internal flow and pressure drop',
        'Turbulence modeling (k-ε, SST)',
        'Multiphase flow (air + water)',
      ],
    },
  },
  {
    id: 'modal',
    title: 'Modal Analysis',
    description: 'Natural frequency and mode shape analysis for vibration prediction and resonance avoidance.',
    features: ['Natural frequencies', 'Mode shapes', 'Harmonic response', 'Random vibration'],
    stats: { mode1: '124 Hz', mode2: '287 Hz', maxDisplacement: '0.8mm' },
    icon: 'modal',
    extendedInfo: {
      longDescription: "We identify your part's natural frequencies to prevent resonance failures. Critical for anything that vibrates, rotates, or experiences dynamic loads. We ensure your design avoids destructive resonance across its operating range.",
      useCases: [
        'Motor and pump mounts',
        'Rotating machinery components',
        'Vehicle chassis and suspension',
        'Precision instruments and optics',
      ],
      technicalDetails: [
        'Natural frequency extraction',
        'Mode shape visualization',
        'Harmonic response analysis',
        'Random vibration (PSD) analysis',
      ],
    },
  },
  {
    id: 'topology',
    title: 'Topology Optimization',
    description: 'Material distribution optimization for minimum weight, maximum stiffness, and organic structures.',
    features: ['Weight reduction', 'Stiffness maximization', 'Manufacturing constraints', 'Multi-objective optimization'],
    stats: { weightReduction: '47%', stiffnessRetained: '98%', iterations: '127' },
    icon: 'topology',
    extendedInfo: {
      longDescription: "Our algorithms remove material where it's not needed, creating organic, weight-optimized structures that maintain full strength. The result: parts that are lighter, stiffer, and often impossible to manufacture traditionally.",
      useCases: [
        'Aerospace brackets and fittings',
        'Lightweighting for EV and drones',
        'Medical implants and prosthetics',
        'High-performance motorsports parts',
      ],
      technicalDetails: [
        'Density-based optimization (SIMP)',
        'Multi-objective (weight + stiffness)',
        'Stress and displacement constraints',
        'Overhang and minimum thickness for printing',
      ],
      manufacturingNote: 'DMLS (Direct Metal Laser Sintering) ONLY. Topology-optimized geometries cannot be CNC machined—they require additive manufacturing. We recommend DMLS printing for all high-end optimized builds.',
    },
  },
  {
    id: 'multiphysics',
    title: 'Multi-Physics',
    description: 'Coupled simulations combining thermal, structural, and fluid effects for real-world accuracy.',
    features: ['Thermal-structural coupling', 'Fluid-structure interaction', 'Electromagnetic-thermal', 'Full system simulation'],
    stats: { physicsCoupled: '3', convergence: '0.001%', totalSolve: '847s' },
    icon: 'multiphysics',
    extendedInfo: {
      longDescription: "Real-world problems don't respect physics boundaries. Our coupled simulations combine thermal, structural, and fluid effects simultaneously for accurate predictions of how your design actually behaves in operation.",
      useCases: [
        'Electronics under thermal + vibration load',
        'Turbocharger housings (heat + flow + stress)',
        'Battery packs (thermal runaway + structural)',
        'Aerospace components (all environments)',
      ],
      technicalDetails: [
        'Thermal-structural coupling',
        'Fluid-structure interaction (FSI)',
        'Electromagnetic-thermal for motors',
        'Fully coupled transient analysis',
      ],
    },
  },
]

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative min-h-screen bg-void py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            THE <span className="text-velex-blue">ARSENAL</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            Every project includes all six simulation types.
            No picking and choosing—we run them all.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-velex-blue/10 border border-velex-blue/30 rounded-full">
            <span className="text-velex-blue font-medium">✓ All included</span>
            <span className="text-titanium/70 text-sm">in every engineering package</span>
          </div>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CAPABILITIES.map((capability, index) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <CapabilityCard capability={capability} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
