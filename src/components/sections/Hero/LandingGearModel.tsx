'use client'

import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface LandingGearModelProps {
  url: string
  onLoad?: () => void
}

export function LandingGearModel({ url, onLoad }: LandingGearModelProps) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (scene) {
      onLoad?.()
    }
  }, [scene, onLoad])

  // Apply stress material to specific meshes
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Apply custom stress visualization
        child.material = new THREE.MeshStandardMaterial({
          color: '#8892a0', // titanium base
          metalness: 0.8,
          roughness: 0.2,
        })
      }
    })
  }, [scene])

  return <primitive ref={modelRef} object={scene} scale={1.5} />
}

// Preload helper
LandingGearModel.preload = (url: string) => useGLTF.preload(url)
