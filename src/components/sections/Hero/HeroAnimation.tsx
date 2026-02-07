'use client'

import { useState, useEffect, ReactNode, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroAnimationProps {
  children: ReactNode
}

type Phase = 'black' | 'light' | 'particles' | 'expand' | 'content'

export function HeroAnimation({ children }: HeroAnimationProps) {
  const [phase, setPhase] = useState<Phase>('black')

  // Generate particle positions once
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30) * (Math.PI / 180),
      delay: i * 0.03,
    })),
  [])

  useEffect(() => {
    // Animation sequence timing per spec:
    // 0.0s - Black screen, single point of light
    // 0.5s - Light expands into particle ring
    // 1.5s - Content begins
    const timers = [
      setTimeout(() => setPhase('light'), 0),           // 0.0s - Light appears
      setTimeout(() => setPhase('particles'), 500),     // 0.5s - Particles form ring
      setTimeout(() => setPhase('expand'), 1000),       // 1.0s - Ring expands
      setTimeout(() => setPhase('content'), 1500),      // 1.5s - Content reveals
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      {/* Black overlay that fades */}
      <motion.div
        className="absolute inset-0 bg-void z-30 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'black' ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Central light point */}
      <AnimatePresence>
        {(phase === 'light' || phase === 'particles') && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 'particles' ? 0.5 : 1,
              opacity: phase === 'particles' ? 0.8 : 1
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="h-6 w-6 rounded-full bg-ixra-blue"
              style={{
                boxShadow: '0 0 60px 20px rgba(0, 212, 255, 0.6), 0 0 100px 40px rgba(0, 212, 255, 0.3)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle ring formation */}
      <AnimatePresence>
        {(phase === 'particles' || phase === 'expand') && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute h-2 w-2 rounded-full bg-ixra-blue"
                style={{
                  boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: Math.cos(particle.angle) * (phase === 'expand' ? 300 : 80),
                  y: Math.sin(particle.angle) * (phase === 'expand' ? 300 : 80),
                  scale: phase === 'expand' ? 0 : 1,
                  opacity: phase === 'expand' ? 0 : 1,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: phase === 'expand' ? 0.8 : 0.4,
                  delay: particle.delay,
                  ease: phase === 'expand' ? 'easeOut' : [0.34, 1.56, 0.64, 1],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Expanding ring wave */}
      <AnimatePresence>
        {phase === 'expand' && (
          <>
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ixra-blue/60 z-20"
              initial={{ width: 160, height: 160, opacity: 1 }}
              animate={{ width: 800, height: 800, opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ixra-blue/30 z-20"
              initial={{ width: 160, height: 160, opacity: 0.8 }}
              animate={{ width: 600, height: 600, opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Content reveals after animation */}
      <AnimatePresence>
        {phase === 'content' && (
          <motion.div
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
