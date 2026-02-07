'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Timeline } from './Timeline'
import { ProjectPicker } from './ProjectPicker'
import { ConstraintBuilder } from './ConstraintBuilder'
import { SimulationRunner } from './SimulationRunner'
import { ResultReveal } from './ResultReveal'
import { useReducedMotion } from '@/hooks'
import type { DemoProject } from './ProjectPicker'

export interface ProcessStep {
  number: number
  title: string
  subtitle: string
  details: string[]
  icon: 'message' | 'pen' | 'cpu' | 'package'
}

const STEPS: ProcessStep[] = [
  {
    number: 1,
    title: 'CONSULT',
    subtitle: 'Tell us what you need',
    details: ['Free consultation', 'NDA available'],
    icon: 'message',
  },
  {
    number: 2,
    title: 'DESIGN',
    subtitle: 'We build your CAD',
    details: ['Expert modeling', 'Your specs'],
    icon: 'pen',
  },
  {
    number: 3,
    title: 'SIMULATE',
    subtitle: 'GPU-accelerated analysis',
    details: ['100x faster', 'than CPU'],
    icon: 'cpu',
  },
  {
    number: 4,
    title: 'DELIVER',
    subtitle: 'Validated results + files',
    details: ['Full report', 'CAD + data'],
    icon: 'package',
  },
]

type FlowState = 'idle' | 'project_selected' | 'constraints_set' | 'simulating' | 'complete'

const STEP_LABELS = [
  { num: 1, label: 'Choose' },
  { num: 2, label: 'Configure' },
  { num: 3, label: 'Simulate' },
  { num: 4, label: 'Result' },
]

function getActiveStepNum(state: FlowState): number {
  switch (state) {
    case 'idle': return 1
    case 'project_selected': return 2
    case 'constraints_set': return 3
    case 'simulating': return 3
    case 'complete': return 4
  }
}

function StepIndicator({ state }: { state: FlowState }) {
  const activeNum = getActiveStepNum(state)

  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEP_LABELS.map((step, index) => (
        <div key={step.num} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step.num < activeNum
                  ? 'bg-ixra-blue text-void'
                  : step.num === activeNum
                    ? 'bg-ixra-blue/20 border-2 border-ixra-blue text-ixra-blue'
                    : 'bg-titanium/10 border border-titanium/20 text-titanium/50'
              }`}
            >
              {step.num < activeNum ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block transition-colors duration-300 ${
                step.num <= activeNum ? 'text-plasma-white' : 'text-titanium/50'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < STEP_LABELS.length - 1 && (
            <div
              className={`w-8 md:w-12 h-px transition-colors duration-300 ${
                step.num < activeNum ? 'bg-ixra-blue' : 'bg-titanium/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()

  const [flowState, setFlowState] = useState<FlowState>('idle')
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null)

  const handleProjectSelect = (project: DemoProject) => {
    setSelectedProject(project)
    setFlowState('project_selected')
  }

  const handleSimulate = () => {
    setFlowState('simulating')
  }

  const handleSimulationComplete = () => {
    setFlowState('complete')
  }

  const handleReset = () => {
    setFlowState('idle')
    setSelectedProject(null)
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-void py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            HOW IT <span className="text-ixra-blue">WORKS</span>
          </h2>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            {flowState === 'idle'
              ? 'See it in action. Pick a project.'
              : 'From concept to validated design.'}
          </p>
        </motion.div>

        {/* Desktop: Interactive Flow */}
        <div className="hidden md:block">
          <StepIndicator state={flowState} />

          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {flowState === 'idle' && (
                <motion.div
                  key="picker"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectPicker
                    onSelect={handleProjectSelect}
                    selectedProject={selectedProject}
                  />
                </motion.div>
              )}

              {flowState === 'project_selected' && selectedProject && (
                <motion.div
                  key="constraints"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ConstraintBuilder
                    project={selectedProject}
                    onSimulate={handleSimulate}
                  />
                </motion.div>
              )}

              {flowState === 'simulating' && selectedProject && (
                <motion.div
                  key="simulating"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SimulationRunner
                    projectTitle={selectedProject.title}
                    onComplete={handleSimulationComplete}
                  />
                </motion.div>
              )}

              {flowState === 'complete' && selectedProject && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResultReveal
                    project={selectedProject}
                    onReset={handleReset}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Static Timeline Fallback */}
        <div className="md:hidden">
          <Timeline steps={STEPS} isInView={isInView} />
        </div>
      </div>
    </section>
  )
}
