'use client'

import { motion } from 'framer-motion'
import { OldWay } from './OldWay'
import { VelexWay } from './VelexWay'

interface SplitScreenProps {
  isActive: boolean
}

export function SplitScreen({ isActive }: SplitScreenProps) {
  return (
    <div className="relative grid md:grid-cols-2 gap-8 md:gap-0">
      {/* Divider */}
      <motion.div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-titanium/20 origin-top"
        initial={{ scaleY: 0 }}
        animate={isActive ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Left: The Old Way */}
      <motion.div
        className="relative"
        initial={{ x: -50, opacity: 0 }}
        animate={isActive ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <OldWay isActive={isActive} />
      </motion.div>

      {/* Right: The VELEX Way */}
      <motion.div
        className="relative"
        initial={{ x: 50, opacity: 0 }}
        animate={isActive ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <VelexWay isActive={isActive} />
      </motion.div>
    </div>
  )
}
