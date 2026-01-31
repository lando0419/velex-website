'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion, useWebGL } from '@/hooks'

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { isMobile } = useWebGL()

  // Disable parallax on mobile for performance
  const shouldDisableParallax = prefersReducedMotion || isMobile

  // Mouse position for parallax
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Smooth spring for parallax
  const springConfig = { stiffness: 100, damping: 30 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for background shift (opposite to mouse)
  const bgX = useTransform(x, [0, 1], [20, -20])
  const bgY = useTransform(y, [0, 1], [20, -20])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldDisableParallax) return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set(clientX / innerWidth)
    mouseY.set(clientY / innerHeight)
  }

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 bg-gradient-hero"
      style={shouldDisableParallax ? {} : { x: bgX, y: bgY }}
      onMouseMove={shouldDisableParallax ? undefined : handleMouseMove}
    >
      {/* Subtle star field overlay */}
      <div className="absolute inset-0 opacity-30">
        <StarField />
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, #050508 70%)',
        }}
      />
    </motion.div>
  )
}

// Simple star field with CSS
function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Generate stars with CSS pseudo-elements via utility class */}
      <div className="stars-layer-1" />
      <div className="stars-layer-2" />
    </div>
  )
}
