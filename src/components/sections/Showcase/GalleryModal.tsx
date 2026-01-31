'use client'

import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GalleryItem } from './ShowcaseSection'

interface GalleryModalProps {
  item: GalleryItem
  onClose: () => void
}

// Separate component for image with error handling
function ModalImage({ item, gradient }: { item: GalleryItem; gradient: string }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={cn('relative aspect-video bg-gradient-to-br', gradient)}>
      {!imageError && (
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          unoptimized
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
    </div>
  )
}

export function GalleryModal({ item, onClose }: GalleryModalProps) {
  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const gradientMap: Record<string, string> = {
    structural: 'from-stress-red/30 to-warning-orange/30',
    thermal: 'from-warning-orange/30 to-success-green/30',
    cfd: 'from-velex-blue/30 to-electric-cyan/30',
    modal: 'from-deep-purple/30 to-velex-blue/30',
    optimization: 'from-success-green/30 to-velex-blue/30',
  }

  const gradient = gradientMap[item.category] || 'from-titanium/30 to-void'

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
          className="absolute inset-0 bg-void/90 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-3xl bg-void border border-titanium/30 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-void/80 border border-titanium/30 text-titanium hover:text-plasma-white hover:border-velex-blue focus-visible:text-plasma-white focus-visible:border-velex-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image area */}
          <ModalImage item={item} gradient={gradient} />

          {/* Content */}
          <div className="p-6">
            {/* Category badge */}
            <span className="inline-block px-3 py-1 text-xs font-medium text-velex-blue bg-velex-blue/10 rounded-full border border-velex-blue/30 mb-4">
              {item.category.toUpperCase()}
            </span>

            <h2 className="font-headline text-2xl md:text-3xl text-plasma-white mb-3">
              {item.title}
            </h2>

            <p className="text-titanium mb-6">{item.description}</p>

            {/* Stats */}
            {item.stats && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-titanium/5 rounded-lg border border-titanium/10">
                {Object.entries(item.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="font-numbers text-lg text-velex-blue">{value}</p>
                    <p className="text-xs text-titanium capitalize">{key}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-6 flex gap-4">
              <button className="flex-1 px-6 py-3 bg-velex-blue text-void font-medium rounded-lg hover:bg-electric-cyan focus-visible:bg-electric-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void transition-colors">
                Request Similar Analysis
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-titanium/30 text-titanium rounded-lg hover:border-velex-blue hover:text-plasma-white focus-visible:border-velex-blue focus-visible:text-plasma-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
