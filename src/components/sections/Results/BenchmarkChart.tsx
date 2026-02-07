'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

interface BenchmarkChartProps {
  isInView: boolean
}

export function BenchmarkChart({ isInView }: BenchmarkChartProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="space-y-6 mb-8">
      {/* CPU Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-titanium">Traditional (CPU)</span>
          <span className="font-numbers text-sm text-titanium/70">4.2 hrs</span>
        </div>
        <div className="h-8 bg-titanium/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-stress-red/80 to-warning-orange/80 rounded-full relative"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{
              duration: prefersReducedMotion ? 0 : 2,
              delay: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={isInView ? { x: '200%' } : {}}
              transition={{
                duration: 1.5,
                delay: 1,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* GPU Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-plasma-white font-medium">IXRA (GPU)</span>
          <span className="font-numbers text-sm text-ixra-blue">2.1 min</span>
        </div>
        <div className="h-8 bg-titanium/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #6366f1 100%)',
              boxShadow: isInView ? '0 0 20px rgba(0, 212, 255, 0.4)' : 'none',
            }}
            initial={{ width: 0 }}
            animate={isInView ? { width: '0.83%' } : {}}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.2,
              delay: prefersReducedMotion ? 0 : 2.7,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
          {/* Minimum visible width for the GPU bar */}
          <motion.div
            className="absolute left-0 top-0 h-full w-8 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #6366f1 100%)',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.2,
              delay: prefersReducedMotion ? 0 : 2.7,
            }}
          />
        </div>
      </div>
    </div>
  )
}
