'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  vx: number
  vy: number
}

function generateParticles(): Particle[] {
  // Generate 50-80 particles
  const count = Math.floor(Math.random() * 30) + 50
  const particles: Particle[] = []

  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: 50 + (Math.random() - 0.5) * 40, // Center with spread
      y: 50 + (Math.random() - 0.5) * 40,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 0.3,
      vx: (Math.random() - 0.5) * 200,
      vy: (Math.random() - 0.5) * 200 - 100,
    })
  }

  return particles
}

export function CelebrationParticles() {
  // Use lazy initializer - only runs once on mount
  const [particles] = useState(generateParticles)

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-velex-blue"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            initial={{ opacity: 1, scale: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, 1, 1],
              x: particle.vx,
              y: particle.vy,
            }}
            transition={{
              duration: 0.5, // Brief burst per spec
              delay: particle.delay * 0.5, // Scale delays proportionally
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
