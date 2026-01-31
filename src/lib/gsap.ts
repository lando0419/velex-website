'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register plugins only on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Default animation settings matching design tokens
export const ANIMATION_DEFAULTS = {
  duration: 0.5,
  ease: 'power2.out', // matches cubic-bezier(0.4, 0, 0.2, 1)
}

export { gsap, ScrollTrigger, useGSAP }
