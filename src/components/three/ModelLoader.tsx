'use client'

import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ModelLoaderProps {
  url: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  animate?: boolean
}

export function ModelLoader({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animate = false,
}: ModelLoaderProps) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  // Clone to allow multiple instances
  const clonedScene = scene.clone()

  useFrame((state) => {
    if (animate && modelRef.current) {
      modelRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  )
}

// Preload helper
ModelLoader.preload = (url: string) => useGLTF.preload(url)
