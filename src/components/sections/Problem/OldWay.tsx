'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Clock, Loader2 } from 'lucide-react'

interface OldWayProps {
  isActive: boolean
}

// Generate shatter fragment positions
function generateFragments(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 200,
    rotation: (Math.random() - 0.5) * 90,
    scale: 0.5 + Math.random() * 0.5,
    delay: Math.random() * 0.3,
    clipPath: `polygon(${Math.random() * 30}% ${Math.random() * 30}%, ${70 + Math.random() * 30}% ${Math.random() * 30}%, ${70 + Math.random() * 30}% ${70 + Math.random() * 30}%, ${Math.random() * 30}% ${70 + Math.random() * 30}%)`,
  }))
}

export function OldWay({ isActive }: OldWayProps) {
  const [isShattered, setIsShattered] = useState(false)
  const fragments = useMemo(() => generateFragments(8), [])

  // Reset when section leaves view
  useEffect(() => {
    if (!isActive) {
      setIsShattered(false)
    }
  }, [isActive])

  // Trigger shatter effect after content is shown
  useEffect(() => {
    if (!isActive) return

    const timer = setTimeout(() => setIsShattered(true), 3500)
    return () => clearTimeout(timer)
  }, [isActive])

  return (
    <div className="relative p-8">
      {/* Main content - shatters when triggered */}
      <motion.div
        className="grayscale relative"
        animate={isShattered ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-headline text-titanium mb-6 text-center">
          The Old Way
        </h3>

        {/* Stuck loading bar */}
        <div className="relative h-4 bg-void/50 rounded-full overflow-hidden border border-titanium/30">
          <motion.div
            className="absolute left-0 top-0 h-full bg-titanium/50"
            initial={{ width: '0%' }}
            animate={isActive ? { width: '47%' } : {}}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-titanium"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            47%
          </motion.div>
        </div>

        {/* Stuck indicator */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-6 text-titanium"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Estimating... 3h 42m remaining</span>
        </motion.div>

        {/* Slow clock visualization */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0.5 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="relative">
            <Clock className="h-24 w-24 text-titanium" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={isActive && !isShattered ? { rotate: 360 } : {}}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-0.5 h-8 bg-titanium origin-bottom" />
            </motion.div>
          </div>
        </motion.div>

        {/* Frustration text */}
        <motion.p
          className="text-center text-titanium/70 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 2.5 }}
        >
          Waiting... Waiting... Waiting...
        </motion.p>

        {/* Crack overlay - appears before shatter */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isShattered ? 0 : isActive ? 1 : 0 }}
          transition={{ delay: 3, duration: 0.3 }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M50,0 L48,25 L55,50 L45,75 L52,100"
              stroke="rgba(255,59,59,0.3)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? 1 : 0 }}
              transition={{ delay: 3, duration: 0.5 }}
            />
            <motion.path
              d="M48,25 L30,35 L20,50"
              stroke="rgba(255,59,59,0.2)"
              strokeWidth="0.3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? 1 : 0 }}
              transition={{ delay: 3.2, duration: 0.3 }}
            />
            <motion.path
              d="M55,50 L75,55 L85,70"
              stroke="rgba(255,59,59,0.2)"
              strokeWidth="0.3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? 1 : 0 }}
              transition={{ delay: 3.3, duration: 0.3 }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Shatter fragments */}
      {isShattered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {fragments.map((fragment) => (
            <motion.div
              key={fragment.id}
              className="absolute inset-0 bg-titanium/10"
              style={{ clipPath: fragment.clipPath }}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 0.5 }}
              animate={{
                x: fragment.x,
                y: fragment.y,
                rotate: fragment.rotation,
                opacity: 0,
                scale: fragment.scale,
              }}
              transition={{
                duration: 0.8,
                delay: fragment.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* "Shattered" message */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isShattered ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-stress-red/60 font-headline text-xl">OBSOLETE</p>
      </motion.div>
    </div>
  )
}
