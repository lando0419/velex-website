'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FilterBar } from './FilterBar'
import { MasonryGrid } from './MasonryGrid'
import { GalleryModal } from './GalleryModal'
import { useReducedMotion } from '@/hooks'

export interface GalleryItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  stats?: Record<string, string>
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Aerospace Landing Gear',
    category: 'structural',
    description: 'High-cycle fatigue analysis for critical aircraft components. Optimized weight while exceeding safety margins.',
    image: '/renders/showcase/landing-gear.webp',
    stats: { stress: '287 MPa', cycles: '10M+', weight: '-23%' },
  },
  {
    id: 2,
    title: 'Automotive Suspension',
    category: 'structural',
    description: 'Multi-load case analysis for performance suspension system. Validated under extreme track conditions.',
    image: '/renders/showcase/suspension.webp',
    stats: { loads: '12 cases', stiffness: '+15%', mass: '4.2 kg' },
  },
  {
    id: 3,
    title: 'Drone Frame Optimization',
    category: 'optimization',
    description: 'Topology optimization for maximum stiffness-to-weight ratio. Additive manufacturing ready.',
    image: '/renders/showcase/drone-frame.webp',
    stats: { reduction: '47%', stiffness: '98%', iterations: '127' },
  },
  {
    id: 4,
    title: 'Heat Exchanger Analysis',
    category: 'thermal',
    description: 'Conjugate heat transfer simulation for compact heat exchanger design. Optimized fin geometry.',
    image: '/renders/showcase/heat-exchanger.webp',
    stats: { transfer: '+34%', deltaT: '42°C', flow: '2.4 L/min' },
  },
  {
    id: 5,
    title: 'Aerodynamic Fairing',
    category: 'cfd',
    description: 'External aerodynamics study for reduced drag coefficient. Wind tunnel validated results.',
    image: '/renders/showcase/fairing.webp',
    stats: { cd: '0.28', downforce: '+18%', velocity: '180 km/h' },
  },
  {
    id: 6,
    title: 'Precision Instrument Modal',
    category: 'modal',
    description: 'Natural frequency analysis for vibration-sensitive optical equipment. Isolation system design.',
    image: '/renders/showcase/instrument.webp',
    stats: { mode1: '45 Hz', damping: '2.3%', isolation: '99%' },
  },
  {
    id: 7,
    title: 'Lightweight Bracket',
    category: 'optimization',
    description: 'Generative design for aerospace bracket. 60% weight reduction with improved load paths.',
    image: '/renders/showcase/bracket.webp',
    stats: { original: '1.2 kg', optimized: '0.48 kg', FoS: '2.1' },
  },
  {
    id: 8,
    title: 'Electronic Enclosure',
    category: 'thermal',
    description: 'Thermal management for high-power electronics. Natural convection and conduction paths.',
    image: '/renders/showcase/enclosure.webp',
    stats: { power: '150W', maxTemp: '72°C', ambient: '40°C' },
  },
  {
    id: 9,
    title: 'Valve Body CFD',
    category: 'cfd',
    description: 'Internal flow analysis for hydraulic valve. Pressure drop optimization and cavitation prediction.',
    image: '/renders/showcase/valve.webp',
    stats: { flow: '45 L/min', deltaP: '0.8 bar', cv: '12.4' },
  },
  {
    id: 10,
    title: 'Turbine Blade Modal',
    category: 'modal',
    description: 'Campbell diagram analysis for rotating machinery. Resonance avoidance across operating range.',
    image: '/renders/showcase/turbine.webp',
    stats: { rpm: '12,000', modes: '8', margin: '>15%' },
  },
]

export const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'structural', label: 'Structural' },
  { id: 'thermal', label: 'Thermal' },
  { id: 'cfd', label: 'CFD' },
  { id: 'modal', label: 'Modal' },
  { id: 'optimization', label: 'Optimization' },
]

export function ShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const prefersReducedMotion = useReducedMotion()

  const filteredItems =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter)

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative bg-void py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            OUR <span className="text-velex-blue">WORK</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            Real projects. Real results. Real engineering.
          </p>
        </motion.div>

        <FilterBar
          options={FILTER_OPTIONS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isInView={isInView}
        />

        <MasonryGrid
          items={filteredItems}
          onItemClick={setSelectedItem}
          isInView={isInView}
        />

        {selectedItem && (
          <GalleryModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </section>
  )
}
