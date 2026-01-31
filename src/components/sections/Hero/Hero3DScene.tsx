'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Preload, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useFrameRate } from '@/hooks'
import { StressMaterial } from './StressMaterial'

export function Hero3DScene() {
  const isLowPerf = useFrameRate(30)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2,
    })
  }

  return (
    <div className="h-full w-full" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={isLowPerf ? 1 : [1, 2]}
        gl={{
          antialias: !isLowPerf,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <HeroSceneContent mousePos={mousePos} isLowPerf={isLowPerf} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

interface HeroSceneContentProps {
  mousePos: { x: number; y: number }
  isLowPerf: boolean
}

function HeroSceneContent({ mousePos, isLowPerf }: HeroSceneContentProps) {
  const groupRef = useRef<THREE.Group>(null)
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Auto-rotate (slow, 10 seconds per rotation)
    groupRef.current.rotation.y += delta * 0.1

    // Mouse follow tilt (max 10 degrees = 0.175 radians)
    targetRotation.current.x = mousePos.y * 0.175
    targetRotation.current.y = mousePos.x * 0.175

    // Lerp to smooth mouse movement
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    )
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow={!isLowPerf}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Model container */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={groupRef}>
          {/* Placeholder: Replace with actual landing gear model */}
          <PlaceholderModel />
        </group>
      </Float>
    </>
  )
}

// Placeholder until Blender model is ready
function PlaceholderModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    // Subtle breathing animation
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <StressMaterial />
    </mesh>
  )
}
