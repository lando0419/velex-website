'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FilterBar } from './FilterBar'
import { MasonryGrid } from './MasonryGrid'
import { DemoModal } from './DemoModal'
import { useReducedMotion } from '@/hooks'
import { PROJECTS } from '@/data/projects'

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

const GALLERY_ITEMS: GalleryItem[] = PROJECTS.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  description: p.description,
  image: p.image,
  status: p.status,
  stats: p.stats,
}))

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
            DEMO <span className="text-ixra-blue">PROJECTS</span>
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
