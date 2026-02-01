'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FilterBar } from './FilterBar'
import { MasonryGrid } from './MasonryGrid'
import { DemoModal } from './DemoModal'
import { useReducedMotion } from '@/hooks'

export interface DemoImage {
  src: string
  alt: string
  caption?: string
}

export interface DemoDocument {
  title: string
  type: 'pdf' | 'spec' | 'report'
  url: string
}

export interface DemoDownload {
  title: string
  format: string
  size: string
  url: string
}

export interface GalleryItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  status: 'complete' | 'in-progress' | 'coming-soon'
  stats?: Record<string, string>
  // Enhanced demo content
  images?: DemoImage[]
  documents?: DemoDocument[]
  downloads?: DemoDownload[]
  analysisData?: {
    structural?: Record<string, string>
    thermal?: Record<string, string>
    cfd?: Record<string, string>
    modal?: Record<string, string>
  }
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'UR10e Robot Adapter',
    category: 'robotics',
    description: 'Custom end-effector adapter for Universal Robots UR10e. Designed for high-precision pick-and-place applications with integrated cable management.',
    image: '/demos/ur10e-adapter/hero.webp',
    status: 'in-progress',
    stats: { payload: '12.5 kg', stiffness: '+34%', weight: '0.42 kg' },
    images: [
      { src: '/demos/ur10e-adapter/render-1.webp', alt: 'UR10e Adapter Isometric View' },
      { src: '/demos/ur10e-adapter/render-2.webp', alt: 'UR10e Adapter Side View' },
      { src: '/demos/ur10e-adapter/stress-map.webp', alt: 'Stress Distribution Analysis' },
    ],
    documents: [
      { title: 'Design Specifications', type: 'spec', url: '/demos/ur10e-adapter/specs.pdf' },
      { title: 'Analysis Report', type: 'report', url: '/demos/ur10e-adapter/report.pdf' },
    ],
    downloads: [
      { title: 'Blender File (.blend)', format: 'BLEND', size: '24.3 MB', url: '/demos/ur10e-adapter/model.blend' },
      { title: 'STEP File', format: 'STEP', size: '8.1 MB', url: '/demos/ur10e-adapter/model.step' },
    ],
    analysisData: {
      structural: { maxStress: '124 MPa', FoS: '2.8', maxDeflection: '0.12mm' },
      thermal: { maxTemp: '42°C', gradient: '8°C', dissipation: '4.2W' },
      modal: { mode1: '287 Hz', mode2: '412 Hz', dampingRatio: '2.1%' },
    },
  },
  {
    id: 2,
    title: 'Racing Drone Frame',
    category: 'drones',
    description: 'Lightweight 5-inch racing drone frame optimized for FPV competition. Carbon fiber layup with integrated vibration dampening.',
    image: '/demos/drone-frame/hero.webp',
    status: 'coming-soon',
    stats: { weight: '128g', thrust: '4:1', durability: 'A+' },
  },
  {
    id: 3,
    title: 'Suspension A-Arm',
    category: 'automotive',
    description: 'Performance suspension component for track-day vehicles. Topology-optimized for minimum weight with maximum stiffness.',
    image: '/demos/suspension-arm/hero.webp',
    status: 'coming-soon',
    stats: { reduction: '-42%', stiffness: '+18%', cycles: '500k+' },
  },
  {
    id: 4,
    title: 'Satellite Bracket',
    category: 'aerospace',
    description: 'Flight-qualified mounting bracket for CubeSat payloads. Designed for space environment with thermal cycling considerations.',
    image: '/demos/satellite-bracket/hero.webp',
    status: 'coming-soon',
    stats: { mass: '86g', tempRange: '-40°C to +85°C', FoS: '3.2' },
  },
  {
    id: 5,
    title: 'Industrial Gripper',
    category: 'robotics',
    description: 'Pneumatic parallel gripper for manufacturing automation. High-cycle life with integrated force sensing mounting.',
    image: '/demos/gripper/hero.webp',
    status: 'coming-soon',
    stats: { force: '120N', cycles: '2M+', repeatability: '±0.02mm' },
  },
  {
    id: 6,
    title: 'E-Bike Motor Mount',
    category: 'ev',
    description: 'Mid-drive motor integration bracket for electric bicycle conversion. Heat-dissipating design with vibration isolation.',
    image: '/demos/ebike-mount/hero.webp',
    status: 'coming-soon',
    stats: { power: '750W', cooling: '+45%', weight: '0.34 kg' },
  },
  {
    id: 7,
    title: 'Prosthetic Socket',
    category: 'medical',
    description: 'Custom-fit below-knee prosthetic socket. Patient-specific design from 3D scan data with comfort optimization.',
    image: '/demos/prosthetic/hero.webp',
    status: 'coming-soon',
    stats: { fitScore: '98%', weight: '185g', comfort: 'A+' },
  },
  {
    id: 8,
    title: 'RC Car Chassis',
    category: 'hobby',
    description: '1/10 scale RC competition chassis plate. Impact-resistant design with optimized flex characteristics for handling.',
    image: '/demos/rc-chassis/hero.webp',
    status: 'coming-soon',
    stats: { flex: 'Tuned', impact: '+60%', weight: '142g' },
  },
  {
    id: 9,
    title: 'Turbine Housing',
    category: 'industrial',
    description: 'High-temperature turbine scroll housing for turbocharger application. CFD-optimized flow paths with thermal management.',
    image: '/demos/turbine-housing/hero.webp',
    status: 'coming-soon',
    stats: { flow: '+12%', temp: '950°C', efficiency: '87%' },
  },
]

export const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'drones', label: 'Drones' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'aerospace', label: 'Aerospace' },
  { id: 'ev', label: 'EV & E-Mobility' },
  { id: 'medical', label: 'Medical' },
  { id: 'hobby', label: 'Hobby & RC' },
  { id: 'industrial', label: 'Industrial' },
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
            DEMO <span className="text-velex-blue">PROJECTS</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            Real engineering. Real parts. Full simulation packages you can download and explore.
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
          <DemoModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </section>
  )
}
