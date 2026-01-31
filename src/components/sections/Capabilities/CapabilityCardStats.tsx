'use client'

import { motion } from 'framer-motion'

interface CapabilityCardStatsProps {
  stats: Record<string, string>
  isVisible: boolean
}

export function CapabilityCardStats({ stats, isVisible }: CapabilityCardStatsProps) {
  const entries = Object.entries(stats)

  return (
    <motion.div
      className="absolute inset-x-6 bottom-16 space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3, delay: isVisible ? 0.1 : 0 }}
    >
      {entries.map(([key, value], index) => (
        <motion.div
          key={key}
          className="flex justify-between items-center text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
          transition={{ duration: 0.2, delay: isVisible ? index * 0.05 : 0 }}
        >
          <span className="text-titanium capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </span>
          <span className="font-numbers text-plasma-white">{value}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
