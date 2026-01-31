'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { GalleryItem as GalleryItemType } from './ShowcaseSection'

interface GalleryItemProps {
  item: GalleryItemType
  onClick: () => void
}

export function GalleryItem({ item, onClick }: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [imageError, setImageError] = useState(false)
  const isActive = isHovered || isFocused

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  // Generate a consistent gradient based on category
  const gradientMap: Record<string, string> = {
    structural: 'from-stress-red/20 to-warning-orange/20',
    thermal: 'from-warning-orange/20 to-success-green/20',
    cfd: 'from-velex-blue/20 to-electric-cyan/20',
    modal: 'from-deep-purple/20 to-velex-blue/20',
    optimization: 'from-success-green/20 to-velex-blue/20',
  }

  const gradient = gradientMap[item.category] || 'from-titanium/20 to-void'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer',
        'border border-titanium/20 bg-void',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void'
      )}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title} case study`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {/* Background - placeholder gradient or image */}
      <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)}>
        {!imageError && (
          <motion.img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageError(true)}
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className="px-2 py-1 text-xs font-medium text-velex-blue bg-void/80 rounded-full border border-velex-blue/30">
          {item.category.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-headline text-lg text-plasma-white mb-1">
          {item.title}
        </h3>
        <motion.p
          className="text-xs text-titanium line-clamp-2"
          animate={{ opacity: isActive ? 1 : 0.7 }}
        >
          {item.description}
        </motion.p>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-velex-blue/10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* View prompt */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <span className="px-4 py-2 text-sm font-medium text-void bg-velex-blue rounded-full">
          View Case Study
        </span>
      </motion.div>
    </motion.div>
  )
}
