'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { GalleryItem } from './GalleryItem'
import { useReducedMotion } from '@/hooks'
import type { GalleryItem as GalleryItemType } from './ShowcaseSection'

interface MasonryGridProps {
  items: GalleryItemType[]
  onItemClick: (item: GalleryItemType) => void
  isInView: boolean
}

export function MasonryGrid({ items, onItemClick, isInView }: MasonryGridProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              delay: prefersReducedMotion ? 0 : index * 0.05,
            }}
          >
            <GalleryItem item={item} onClick={() => onItemClick(item)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
