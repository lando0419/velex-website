'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  const springProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0
      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none',
        className
      )}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-velex-blue to-electric-cyan"
        style={{
          scaleX: springProgress,
          transformOrigin: '0%',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)',
        }}
      />
    </div>
  )
}
