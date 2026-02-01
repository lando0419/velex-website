'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CapabilityCardStats } from './CapabilityCardStats'
import { CapabilityModal } from './CapabilityModal'
import {
  Box,
  Thermometer,
  Wind,
  Activity,
  Layers,
  Zap,
} from 'lucide-react'

export interface Capability {
  id: string
  title: string
  description: string
  features: string[]
  stats: Record<string, string>
  icon: string
  extendedInfo: {
    longDescription: string
    useCases: string[]
    technicalDetails: string[]
    manufacturingNote?: string
  }
}

interface CapabilityCardProps {
  capability: Capability
}

const ICONS: Record<string, typeof Box> = {
  structural: Box,
  thermal: Thermometer,
  cfd: Wind,
  modal: Activity,
  topology: Layers,
  multiphysics: Zap,
}

export function CapabilityCard({ capability }: CapabilityCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const Icon = ICONS[capability.icon] || Box
  const isActive = isHovered || isFocused

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <motion.div
        className={cn(
          'group relative h-[320px] rounded-lg overflow-hidden cursor-pointer',
          'border border-titanium/20 bg-void/80',
          'transition-shadow duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void'
        )}
        tabIndex={0}
        role="button"
        aria-label={`Learn more about ${capability.title}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        whileHover={{ y: -4 }}
        whileFocus={{ y: -4 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: isActive
            ? '0 20px 40px -12px rgba(0, 212, 255, 0.15)'
            : '0 4px 12px -4px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Background placeholder for Blender render */}
        <div className="absolute inset-0 bg-gradient-to-br from-void via-void/90 to-titanium/10">
          {/* Future: <Image src={`/renders/${capability.id}.webp`} fill /> */}
          <motion.div
            className="absolute inset-0 bg-velex-blue/5"
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6">
          {/* Icon */}
          <motion.div
            className="mb-4"
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-8 h-8 text-velex-blue" />
          </motion.div>

          {/* Title & Description */}
          <h3 className="font-headline text-xl text-plasma-white mb-2">
            {capability.title}
          </h3>
          <p className="text-sm text-titanium mb-4">
            {capability.description}
          </p>

          {/* Features - visible by default */}
          <motion.ul
            className="space-y-1"
            animate={{ opacity: isActive ? 0 : 1, y: isActive ? 10 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {capability.features.slice(0, 3).map((feature) => (
              <li key={feature} className="text-xs text-titanium/70 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-velex-blue/60" />
                {feature}
              </li>
            ))}
          </motion.ul>

          {/* Stats overlay - visible on hover */}
          <CapabilityCardStats stats={capability.stats} isVisible={isActive} />

          {/* Learn more CTA */}
          <motion.div
            className="absolute bottom-6 right-6"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs text-velex-blue font-medium">
              Learn more →
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <CapabilityModal
          capability={capability}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
