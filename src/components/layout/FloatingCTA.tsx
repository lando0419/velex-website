'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (roughly 100vh)
      setIsVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="#contact"
          className={cn(
            'fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8',
            'flex items-center gap-2 px-5 py-3 rounded-full',
            'bg-ixra-blue text-void font-medium text-sm',
            'hover:bg-electric-cyan hover:scale-105',
            'shadow-lg shadow-ixra-blue/25',
            'transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plasma-white focus-visible:ring-offset-2 focus-visible:ring-offset-void'
          )}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <MessageSquare className="w-4 h-4" />
          Get a Quote
        </motion.a>
      )}
    </AnimatePresence>
  )
}
