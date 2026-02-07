'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface DemoProject {
  id: string
  title: string
  icon: string
  category: string
  image: string
  constraints: {
    label: string
    value: number
    unit: string
    min: number
    max: number
  }[]
  results: {
    label: string
    value: string
  }[]
}

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'ur10e-adapter',
    title: 'UR10e Robot Adapter',
    icon: '🤖',
    category: 'Robotics',
    image: '/demos/ur10e-adapter/hero.webp',
    constraints: [
      { label: 'Payload', value: 12.5, unit: 'kg', min: 1, max: 25 },
      { label: 'Max Temp', value: 42, unit: '°C', min: 20, max: 100 },
      { label: 'Stiffness Target', value: 34, unit: '%', min: 10, max: 60 },
    ],
    results: [
      { label: 'Max Stress', value: '124 MPa' },
      { label: 'Factor of Safety', value: '2.8' },
      { label: 'Weight', value: '0.42 kg' },
      { label: 'Max Deflection', value: '0.12mm' },
    ],
  },
  {
    id: 'drone-frame',
    title: 'Racing Drone Frame',
    icon: '🛩️',
    category: 'Drones',
    image: '/demos/drone-frame/hero.webp',
    constraints: [
      { label: 'Target Weight', value: 128, unit: 'g', min: 80, max: 200 },
      { label: 'Thrust Ratio', value: 4, unit: ':1', min: 2, max: 8 },
      { label: 'Impact Rating', value: 60, unit: '%', min: 20, max: 100 },
    ],
    results: [
      { label: 'Final Weight', value: '128g' },
      { label: 'Thrust-to-Weight', value: '4:1' },
      { label: 'Durability Grade', value: 'A+' },
      { label: 'Vibe Dampening', value: '-82%' },
    ],
  },
  {
    id: 'suspension-arm',
    title: 'Suspension A-Arm',
    icon: '🚗',
    category: 'Automotive',
    image: '/demos/suspension-arm/hero.webp',
    constraints: [
      { label: 'Weight Reduction', value: 42, unit: '%', min: 10, max: 60 },
      { label: 'Stiffness Gain', value: 18, unit: '%', min: 5, max: 40 },
      { label: 'Fatigue Cycles', value: 500, unit: 'k', min: 100, max: 1000 },
    ],
    results: [
      { label: 'Weight Saved', value: '-42%' },
      { label: 'Stiffness', value: '+18%' },
      { label: 'Fatigue Life', value: '500k+ cycles' },
      { label: 'FoS', value: '2.4' },
    ],
  },
  {
    id: 'satellite-bracket',
    title: 'Satellite Bracket',
    icon: '🛰️',
    category: 'Aerospace',
    image: '/demos/satellite-bracket/hero.webp',
    constraints: [
      { label: 'Mass Budget', value: 86, unit: 'g', min: 50, max: 150 },
      { label: 'Temp Range', value: 125, unit: '°C', min: 60, max: 200 },
      { label: 'Factor of Safety', value: 3.2, unit: 'x', min: 2, max: 5 },
    ],
    results: [
      { label: 'Final Mass', value: '86g' },
      { label: 'Temp Range', value: '-40 to +85°C' },
      { label: 'Factor of Safety', value: '3.2' },
      { label: 'Qualification', value: 'Flight-ready' },
    ],
  },
  {
    id: 'ebike-mount',
    title: 'E-Bike Motor Mount',
    icon: '⚡',
    category: 'EV',
    image: '/demos/ebike-mount/hero.webp',
    constraints: [
      { label: 'Motor Power', value: 750, unit: 'W', min: 250, max: 1500 },
      { label: 'Cooling Gain', value: 45, unit: '%', min: 10, max: 80 },
      { label: 'Target Weight', value: 340, unit: 'g', min: 200, max: 500 },
    ],
    results: [
      { label: 'Power Rating', value: '750W' },
      { label: 'Cooling Boost', value: '+45%' },
      { label: 'Weight', value: '0.34 kg' },
      { label: 'Vibe Isolation', value: '94%' },
    ],
  },
  {
    id: 'turbine-housing',
    title: 'Turbine Housing',
    icon: '🏭',
    category: 'Industrial',
    image: '/demos/turbine-housing/hero.webp',
    constraints: [
      { label: 'Flow Gain', value: 12, unit: '%', min: 5, max: 25 },
      { label: 'Max Temp', value: 950, unit: '°C', min: 500, max: 1200 },
      { label: 'Efficiency', value: 87, unit: '%', min: 70, max: 95 },
    ],
    results: [
      { label: 'Flow Improvement', value: '+12%' },
      { label: 'Max Temp', value: '950°C' },
      { label: 'Efficiency', value: '87%' },
      { label: 'Pressure Drop', value: '-8%' },
    ],
  },
]

interface ProjectPickerProps {
  onSelect: (project: DemoProject) => void
  selectedProject: DemoProject | null
}

export function ProjectPicker({
  onSelect,
  selectedProject,
}: ProjectPickerProps) {
  // Auto-advance to next step after selection
  useEffect(() => {
    if (!selectedProject) return

    const timer = setTimeout(() => {
      // The parent component handles step advancement via onSelect
      // This timeout allows the selection animation to play before advancing
    }, 800)

    return () => clearTimeout(timer)
  }, [selectedProject])

  return (
    <div className="w-full">
      <p className="text-titanium mb-8 text-center text-lg">
        Choose a project to simulate
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {DEMO_PROJECTS.map((project) => {
          const isSelected = selectedProject?.id === project.id
          const hasSelection = selectedProject !== null

          return (
            <motion.button
              key={project.id}
              onClick={() => onSelect(project)}
              whileHover={!hasSelection ? { scale: 1.05 } : undefined}
              whileTap={!hasSelection ? { scale: 0.98 } : undefined}
              animate={
                isSelected
                  ? { scale: 1.05 }
                  : hasSelection
                    ? { scale: 1, opacity: 0.5 }
                    : { scale: 1, opacity: 1 }
              }
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
              className={cn(
                'relative flex flex-col items-center rounded-lg border p-6 text-center transition-colors',
                'cursor-pointer focus:outline-none',
                isSelected
                  ? 'border-ixra-blue bg-ixra-blue/10'
                  : 'border-titanium/20 bg-void hover:border-titanium/40',
              )}
            >
              {/* Glow effect for selected card */}
              {isSelected && (
                <motion.div
                  className="bg-ixra-blue/20 absolute inset-0 rounded-lg blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              <span className="relative z-10 mb-3 text-4xl md:text-5xl">
                {project.icon}
              </span>

              <h3
                className={cn(
                  'font-headline relative z-10 mb-1 text-sm font-semibold md:text-base',
                  isSelected ? 'text-ixra-blue' : 'text-plasma-white',
                )}
              >
                {project.title}
              </h3>

              <span className="text-titanium relative z-10 text-xs md:text-sm">
                {project.category}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
