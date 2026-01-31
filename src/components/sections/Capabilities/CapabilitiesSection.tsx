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
  },
  {
    id: 'thermal',
    title: 'Thermal Simulation',
    description: 'Heat transfer analysis for temperature distribution, thermal stress, and cooling optimization.',
    features: ['Steady-state analysis', 'Transient simulation', 'Conjugate heat transfer', 'Thermal stress coupling'],
    stats: { maxTemp: '87°C', heatFlux: '2.4 kW/m²', thermalResistance: '0.12 K/W' },
    icon: 'thermal',
  },
  {
    id: 'cfd',
    title: 'CFD Analysis',
    description: 'Computational Fluid Dynamics for airflow, pressure distribution, and aerodynamic optimization.',
    features: ['External aerodynamics', 'Internal flow', 'Pressure drop analysis', 'Drag optimization'],
    stats: { dragCoefficient: '0.32', maxVelocity: '45 m/s', pressureDrop: '12 Pa' },
    icon: 'cfd',
  },
  {
    id: 'modal',
    title: 'Modal Analysis',
    description: 'Natural frequency and mode shape analysis for vibration prediction and resonance avoidance.',
    features: ['Natural frequencies', 'Mode shapes', 'Harmonic response', 'Random vibration'],
    stats: { mode1: '124 Hz', mode2: '287 Hz', maxDisplacement: '0.8mm' },
    icon: 'modal',
  },
  {
    id: 'topology',
    title: 'Topology Optimization',
    description: 'Material distribution optimization for minimum weight, maximum stiffness, and organic structures.',
    features: ['Weight reduction', 'Stiffness maximization', 'Manufacturing constraints', 'Multi-objective optimization'],
    stats: { weightReduction: '47%', stiffnessRetained: '98%', iterations: '127' },
    icon: 'topology',
  },
  {
    id: 'multiphysics',
    title: 'Multi-Physics',
    description: 'Coupled simulations combining thermal, structural, and fluid effects for real-world accuracy.',
    features: ['Thermal-structural coupling', 'Fluid-structure interaction', 'Electromagnetic-thermal', 'Full system simulation'],
    stats: { physicsCoupled: '3', convergence: '0.001%', totalSolve: '847s' },
    icon: 'multiphysics',
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
            Six capabilities. One platform.
            Everything you need for engineering simulation.
          </p>
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
