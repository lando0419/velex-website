'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  children?: React.ReactNode
  autoRotate?: boolean
  rotationSpeed?: number
}

export function Scene({
  children,
  autoRotate = false,
  rotationSpeed = 0.5,
}: SceneProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Content */}
      <group ref={groupRef}>{children}</group>
    </>
  )
}
