'use client'

import { Suspense, ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface Canvas3DProps {
  children: ReactNode
  className?: string
  fallback?: ReactNode
  camera?: {
    position?: [number, number, number]
    fov?: number
  }
}

export function Canvas3D({
  children,
  className,
  fallback,
  camera = { position: [0, 0, 5], fov: 45 },
}: Canvas3DProps) {
  const prefersReducedMotion = useReducedMotion()

  // Show fallback for reduced motion
  if (prefersReducedMotion) {
    return <div className={cn('relative', className)}>{fallback}</div>
  }

  return (
    <div className={cn('relative', className)}>
      <Canvas
        camera={camera}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
