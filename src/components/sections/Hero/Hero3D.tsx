'use client'

import dynamic from 'next/dynamic'
import { useWebGL, useReducedMotion } from '@/hooks'
import { MobileFallback } from '@/components/three'
import { Spinner } from '@/components/ui'

// Dynamic import to avoid SSR issues
const Hero3DScene = dynamic(
  () => import('./Hero3DScene').then((m) => ({ default: m.Hero3DScene })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    ),
  }
)

interface Hero3DProps {
  fallbackImage?: string
}

export function Hero3D({
  fallbackImage = '/renders/hero-fallback.webp',
}: Hero3DProps) {
  const { isSupported, isMobile } = useWebGL()
  const prefersReducedMotion = useReducedMotion()

  // Show fallback for mobile, no WebGL, or reduced motion
  if (isMobile || !isSupported || prefersReducedMotion) {
    return (
      <MobileFallback
        imageSrc={fallbackImage}
        alt="VELEX Engineering Simulation - Landing Gear Analysis"
        className="absolute inset-0"
      />
    )
  }

  return (
    <div className="absolute inset-0">
      <Hero3DScene />
    </div>
  )
}
