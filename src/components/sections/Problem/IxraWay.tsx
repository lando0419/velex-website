'use client'

import { motion } from 'framer-motion'
import { Zap, Check } from 'lucide-react'

interface IxraWayProps {
  isActive: boolean
}

export function IxraWay({ isActive }: IxraWayProps) {
  return (
    <div className="p-8">
      <h3 className="text-2xl font-headline text-ixra-blue mb-6 text-center">
        The IXRA Way
      </h3>

      {/* Instant completion bar */}
      <div className="relative h-4 bg-void/50 rounded-full overflow-hidden border border-ixra-blue/30">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-ixra-blue to-electric-cyan"
          initial={{ width: '0%' }}
          animate={isActive ? { width: '100%' } : {}}
          transition={{ duration: 0.8, delay: 1, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 2, type: 'spring' }}
        >
          <Check className="h-4 w-4 text-success-green" />
          <span className="text-xs text-success-green">Done</span>
        </motion.div>
      </div>

      {/* GPU cores lighting up */}
      <motion.div
        className="mt-8 grid grid-cols-8 gap-1 max-w-xs mx-auto"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-sm"
            initial={{ backgroundColor: '#050508' }}
            animate={
              isActive
                ? {
                    backgroundColor: ['#050508', '#00d4ff', '#00d4ff'],
                  }
                : {}
            }
            transition={{
              delay: 0.5 + i * 0.02,
              duration: 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Speed indicator */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-6 text-ixra-blue"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
      >
        <Zap className="h-4 w-4" />
        <span className="text-sm font-numbers">68x faster</span>
      </motion.div>

      {/* Energy text */}
      <motion.p
        className="text-center text-plasma-white mt-6 text-sm"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 3 }}
      >
        Results in seconds. Not hours.
      </motion.p>
    </div>
  )
}
