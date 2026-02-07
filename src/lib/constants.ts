/**
 * IXRA Application Constants
 * Sacred values - do not modify without explicit approval
 */

export const SITE_NAME = 'IXRA'
export const SITE_TITLE = 'IXRA | GPU-Accelerated Engineering Simulation'
export const SITE_DESCRIPTION = 'Precision you can trust. Speed you need.'

export const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.7,
  },
  ease: {
    default: [0.4, 0, 0.2, 1],
    out: [0, 0, 0.2, 1],
    in: [0.4, 0, 1, 1],
    spring: [0.34, 1.56, 0.64, 1],
  },
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const
