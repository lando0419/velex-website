'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'

type Phase = 'idle' | 'typing' | 'solving' | 'complete'

interface GPUMeterProps {
  phase: Phase
}

export function GPUMeter({ phase }: GPUMeterProps) {
  // Derive utilization directly from phase (no effect needed)
  const utilization = useMemo(() => {
    if (phase === 'solving') return 95
    if (phase === 'complete') return 8
    return 5
  }, [phase])

  const activeCount = Math.floor(64 * (utilization / 100))

  return (
    <div className="rounded-lg border border-titanium/20 bg-void/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-ixra-blue" />
          <span className="text-sm text-titanium">GPU Utilization</span>
        </div>
        <span className="font-numbers text-plasma-white">
          {utilization}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-void rounded-full overflow-hidden border border-titanium/20">
        <motion.div
          className="h-full bg-gradient-to-r from-ixra-blue to-electric-cyan"
          initial={{ width: '5%' }}
          animate={{ width: `${utilization}%` }}
          transition={{
            duration: phase === 'solving' ? 0.5 : 1,
            ease: phase === 'solving' ? 'easeOut' : 'easeInOut',
          }}
        />
      </div>

      {/* Core indicators */}
      <div className="mt-3 grid grid-cols-16 gap-0.5">
        {Array.from({ length: 64 }).map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-[1px]"
            animate={{
              backgroundColor: i < activeCount ? '#00d4ff' : '#1a1a2e',
            }}
            transition={{ delay: i * 0.01, duration: 0.1 }}
          />
        ))}
      </div>
    </div>
  )
}
