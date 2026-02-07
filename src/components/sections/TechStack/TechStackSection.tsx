'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Cpu, Layers, Wind, Code, Zap, Eye, X } from 'lucide-react'
import { useReducedMotion } from '@/hooks'

const TECH_ITEMS = [
  {
    icon: Cpu,
    name: 'NVIDIA CUDA',
    description: 'GPU-accelerated solvers running on enterprise NVIDIA hardware',
    accent: 'from-green-500/20 to-ixra-blue/20',
    extendedInfo: 'Parallel processing across thousands of GPU cores. We run simulations on RTX/A-series cards that process mesh elements simultaneously — turning hours into seconds.',
  },
  {
    icon: Layers,
    name: 'SolidWorks & Fusion 360',
    description: 'Industry-standard CAD for parametric modeling and assemblies',
    accent: 'from-ixra-blue/20 to-electric-cyan/20',
    extendedInfo: 'Full parametric modeling with assembly constraints, sheet metal, surfacing, and GD&T. We design to manufacturing standards from day one.',
  },
  {
    icon: Wind,
    name: 'ANSYS & OpenFOAM',
    description: 'Validated commercial and open-source simulation engines',
    accent: 'from-warning-orange/20 to-stress-red/20',
    extendedInfo: 'ANSYS for commercial-grade validation. OpenFOAM for custom fluid simulations. Both validated against physical test data within 2% accuracy.',
  },
  {
    icon: Code,
    name: 'Python & NumPy',
    description: 'Custom automation pipelines for batch processing and optimization',
    accent: 'from-electric-cyan/20 to-ixra-blue/20',
    extendedInfo: 'Automated batch processing, parametric sweeps, and custom optimization scripts. We can run 10,000 design variations overnight.',
  },
  {
    icon: Zap,
    name: 'Custom GPU Solver',
    description: 'Proprietary solver architecture for 100x acceleration over CPU',
    accent: 'from-ixra-blue/20 to-deep-purple/20',
    extendedInfo: 'Our proprietary solver architecture distributes mesh elements across GPU cores. 100x faster than CPU-based solvers for the same accuracy.',
  },
  {
    icon: Eye,
    name: 'Blender & ParaView',
    description: 'Photorealistic visualization and post-processing of simulation results',
    accent: 'from-warning-orange/20 to-ixra-blue/20',
    extendedInfo: 'Photorealistic renders of simulation results. Stress maps, flow visualization, thermal gradients — all publication-quality.',
  },
]

type TechItem = (typeof TECH_ITEMS)[number]

interface TechModalProps {
  tech: TechItem
  onClose: () => void
}

function TechModal({ tech, onClose }: TechModalProps) {
  const Icon = tech.icon

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
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-void/95 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-lg bg-void border border-titanium/30 rounded-xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
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
              <div>
                <h2 className="font-headline text-2xl md:text-3xl text-plasma-white">
                  {tech.name}
                </h2>
                <p className="text-sm text-titanium mt-1">
                  {tech.description}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-titanium leading-relaxed">
              {tech.extendedInfo}
            </p>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-titanium/20 bg-titanium/5">
            <div className="flex gap-4 justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-titanium/30 text-titanium rounded-lg hover:border-ixra-blue hover:text-plasma-white transition-colors"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="px-6 py-2 bg-ixra-blue text-void font-medium rounded-lg hover:bg-electric-cyan transition-colors"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null)

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="relative bg-void py-24 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            THE <span className="text-ixra-blue">ENGINE ROOM</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            Enterprise-grade tools. No shortcuts. No compromises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {TECH_ITEMS.map((item, index) => (
            <motion.div
              key={item.name}
              className="group relative p-6 rounded-lg border border-titanium/15 bg-void/80 hover:border-ixra-blue/30 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedTech(item)}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <item.icon className="w-8 h-8 text-ixra-blue mb-4" />
                <h3 className="font-headline text-lg text-plasma-white mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-titanium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedTech && (
        <TechModal tech={selectedTech} onClose={() => setSelectedTech(null)} />
      )}
    </section>
  )
}
