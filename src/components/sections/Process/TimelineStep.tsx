'use client'

import { motion } from 'framer-motion'
import { MessageSquare, PenTool, Cpu, Package } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProcessStep } from './ProcessSection'

interface TimelineStepProps {
  step: ProcessStep
  isActive: boolean
  delay: number
}

const ICONS = {
  message: MessageSquare,
  pen: PenTool,
  cpu: Cpu,
  package: Package,
}

export function TimelineStep({ step, isActive, delay }: TimelineStepProps) {
  const Icon = ICONS[step.icon]

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Icon Circle */}
      <motion.div
        className={cn(
          'relative w-16 h-16 rounded-full flex items-center justify-center mb-4',
          'border-2 transition-colors duration-300',
          isActive
            ? 'border-ixra-blue bg-ixra-blue/10'
            : 'border-titanium/30 bg-void'
        )}
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <Icon
          className={cn(
            'w-7 h-7 transition-colors duration-300',
            isActive ? 'text-ixra-blue' : 'text-titanium/50'
          )}
        />

        {/* Pulse ring on active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-ixra-blue"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
          />
        )}
      </motion.div>

      {/* Step Number */}
      <motion.span
        className={cn(
          'font-numbers text-xs mb-2 transition-colors duration-300',
          isActive ? 'text-ixra-blue' : 'text-titanium/50'
        )}
      >
        0{step.number}
      </motion.span>

      {/* Title */}
      <h3
        className={cn(
          'font-headline text-lg md:text-xl mb-1 transition-colors duration-300',
          isActive ? 'text-plasma-white' : 'text-titanium/70'
        )}
      >
        {step.title}
      </h3>

      {/* Subtitle */}
      <p
        className={cn(
          'text-sm mb-3 transition-colors duration-300',
          isActive ? 'text-titanium' : 'text-titanium/50'
        )}
      >
        {step.subtitle}
      </p>

      {/* Details */}
      <div className="space-y-0.5">
        {step.details.map((detail, i) => (
          <p
            key={i}
            className={cn(
              'text-xs transition-colors duration-300',
              isActive ? 'text-titanium/80' : 'text-titanium/40'
            )}
          >
            {detail}
          </p>
        ))}
      </div>
    </motion.div>
  )
}
