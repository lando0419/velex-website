'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simplified stress visualization using standard material
// Custom shader can be added when Blender model is ready
export function StressMaterial() {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      // Animate the color based on time to simulate stress visualization
      const t = state.clock.elapsedTime
      const hue = (Math.sin(t * 0.5) * 0.5 + 0.5) * 0.3 // Oscillate between blue and green hues
      materialRef.current.color.setHSL(hue + 0.5, 0.8, 0.5)
      materialRef.current.emissive.setHSL(hue + 0.5, 0.5, 0.1)
    }
  })

  return (
    <meshStandardMaterial
      ref={materialRef}
      color="#00d4ff"
      emissive="#0066ff"
      emissiveIntensity={0.2}
      metalness={0.8}
      roughness={0.2}
    />
  )
}
