'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion, useWebGL } from '@/hooks'

function MeshModel({
  detail,
  radius,
  position,
  color,
  wireframeOpacity,
  glow,
}: {
  detail: number
  radius: number
  position: [number, number, number]
  color: string
  wireframeOpacity: number
  glow?: boolean
}) {
  const meshRef = useRef<THREE.Group>(null)

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(radius, detail)
  }, [detail, radius])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Glow sphere behind mesh */}
      {glow && (
        <mesh>
          <sphereGeometry args={[radius * 1.15, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.08} />
        </mesh>
      )}
      {/* Solid mesh */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={wireframeOpacity}
        />
      </mesh>
    </group>
  )
}

function ComparisonScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} />

      {/* Low-poly mesh (left) - competitor */}
      <MeshModel detail={1} radius={1.2} position={[-2.2, 0, 0]} color="#8892A0" wireframeOpacity={0.7} />

      {/* High-poly mesh (right) - IXRA */}
      <MeshModel detail={6} radius={1.5} position={[2.2, 0, 0]} color="#00D4FF" wireframeOpacity={0.3} glow />

      {/* Divider line */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.01, 3.5, 0.01]} />
        <meshBasicMaterial color="#8892A0" transparent opacity={0.3} />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
      />
    </>
  )
}

function TriangleCounter({
  value,
  label,
  isInView,
  delay,
  highlight,
}: {
  value: string
  label: string
  isInView: boolean
  delay: number
  highlight?: boolean
}) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className={`font-headline text-3xl md:text-4xl mb-1 ${
          highlight ? 'text-ixra-blue' : 'text-titanium/60'
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-titanium/50 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  )
}

function FallbackComparison({ isInView }: { isInView: boolean }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {/* Low poly side */}
      <motion.div
        className="aspect-square rounded-lg border border-titanium/20 bg-titanium/5 flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      >
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon points="100,10 190,150 10,150" fill="none" stroke="#8892A0" strokeWidth="1" />
            <polygon points="100,10 190,150 100,100" fill="none" stroke="#8892A0" strokeWidth="0.5" />
            <polygon points="10,150 190,150 100,100" fill="none" stroke="#8892A0" strokeWidth="0.5" />
            <polygon points="100,10 10,150 100,100" fill="none" stroke="#8892A0" strokeWidth="0.5" />
          </svg>
        </div>
        <span className="text-titanium/40 font-code text-sm">LOW POLY</span>
      </motion.div>

      {/* High poly side */}
      <motion.div
        className="aspect-square rounded-lg border border-ixra-blue/30 bg-ixra-blue/5 flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      >
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {Array.from({ length: 20 }, (_, i) =>
              Array.from({ length: 20 }, (_, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={i * 10}
                  y1={j * 10}
                  x2={i * 10 + 10}
                  y2={j * 10 + 10}
                  stroke="#00D4FF"
                  strokeWidth="0.3"
                />
              ))
            )}
          </svg>
        </div>
        <span className="text-ixra-blue/60 font-code text-sm">IXRA MESH</span>
      </motion.div>
    </div>
  )
}

export function MeshComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' })
  const prefersReducedMotion = useReducedMotion()
  const hasWebGL = useWebGL()

  return (
    <section
      ref={sectionRef}
      id="mesh"
      className="relative bg-void py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            PRECISION AT <span className="text-ixra-blue">SCALE</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            400,000 triangles per part. Every edge, every surface — resolved.
          </p>
        </motion.div>

        {/* 3D Comparison or Fallback */}
        <motion.div
          className="max-w-4xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
        >
          <div className="rounded-xl border border-titanium/20 bg-void/80 overflow-hidden">
            {hasWebGL && !prefersReducedMotion ? (
              <div className="h-[400px] md:h-[500px] relative">
                <Canvas
                  camera={{ position: [0, 0, 6], fov: 45 }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <ComparisonScene />
                </Canvas>

                {/* Labels overlaid on canvas */}
                <div className="absolute top-4 left-4 text-xs text-titanium/50 font-code uppercase tracking-wider">
                  Industry Standard
                </div>
                <div className="absolute top-4 right-4 text-xs text-ixra-blue font-code uppercase tracking-wider">
                  IXRA Standard
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-titanium/40 font-code">
                  Drag to rotate &middot; Scroll to zoom
                </div>
              </div>
            ) : (
              <div className="p-8">
                <FallbackComparison isInView={isInView} />
              </div>
            )}
          </div>
        </motion.div>

        {/* Triangle Counters */}
        <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
          <TriangleCounter
            value="~5,000"
            label="Industry Standard"
            isInView={isInView}
            delay={0.5}
          />
          <TriangleCounter
            value="400,000+"
            label="IXRA Minimum"
            isInView={isInView}
            delay={0.7}
            highlight
          />
        </div>

        {/* Callout */}
        <motion.p
          className="text-center text-lg font-medium text-plasma-white mt-8 mb-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Zoom in. Count the triangles.
        </motion.p>
        <motion.p
          className="text-center text-sm text-titanium/60 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Higher mesh density means more accurate stress distribution, smoother surfaces,
          and results you can trust. We don&apos;t cut corners — literally.
        </motion.p>
      </div>
    </section>
  )
}
