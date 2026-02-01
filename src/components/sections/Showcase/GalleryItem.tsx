'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GalleryItem as GalleryItemType } from './ShowcaseSection'

interface GalleryItemProps {
  item: GalleryItemType
  onClick: () => void
}

function StatusIndicator({ status }: { status: GalleryItemType['status'] }) {
  const config = {
    'complete': { icon: CheckCircle2, className: 'bg-success-green text-void', pulse: false },
    'in-progress': { icon: Loader2, className: 'bg-warning-orange text-void', pulse: true },
    'coming-soon': { icon: Clock, className: 'bg-titanium/80 text-void', pulse: false },
  }
  const { icon: Icon, className, pulse } = config[status]

  return (
    <span className={cn('flex items-center justify-center w-6 h-6 rounded-full', className)}>
      <Icon className={cn('w-3.5 h-3.5', pulse && 'animate-spin')} />
    </span>
  )
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

  // Generate a consistent gradient based on category (part types)
  const gradientMap: Record<string, string> = {
    robotics: 'from-velex-blue/20 to-electric-cyan/20',
    drones: 'from-warning-orange/20 to-stress-red/20',
    automotive: 'from-stress-red/20 to-warning-orange/20',
    aerospace: 'from-deep-purple/20 to-velex-blue/20',
    ev: 'from-success-green/20 to-velex-blue/20',
    medical: 'from-electric-cyan/20 to-success-green/20',
    hobby: 'from-warning-orange/20 to-success-green/20',
    industrial: 'from-titanium/20 to-velex-blue/20',
  }

  const gradient = gradientMap[item.category] || 'from-titanium/20 to-void'

  const statusLabel = {
    'complete': 'View Demo',
    'in-progress': 'In Progress',
    'coming-soon': 'Coming Soon',
  }

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
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void',
        item.status === 'coming-soon' && 'opacity-70'
      )}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title} demo`}
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

      {/* Top badges row */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className="px-2 py-1 text-xs font-medium text-velex-blue bg-void/80 rounded-full border border-velex-blue/30 capitalize">
          {item.category}
        </span>
        <StatusIndicator status={item.status} />
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
        <span className={cn(
          'px-4 py-2 text-sm font-medium rounded-full',
          item.status === 'complete' ? 'text-void bg-velex-blue' :
          item.status === 'in-progress' ? 'text-void bg-warning-orange' :
          'text-void bg-titanium'
        )}>
          {statusLabel[item.status]}
        </span>
      </motion.div>
    </motion.div>
  )
}
