'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface SimulationRunnerProps {
  projectTitle: string
  onComplete: () => void
}

const SIMULATION_STEPS = [
  'Meshing geometry...',
  'Running structural analysis...',
  'Computing thermal distribution...',
  'Validating results...',
] as const

const DURATION_MS = 4000
const TOTAL_ELEMENTS = 124_847

export function SimulationRunner({
  projectTitle,
  onComplete,
}: SimulationRunnerProps) {
  const [progress, setProgress] = useState(0)
  const [elementCount, setElementCount] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number>(0)
  const completedRef = useRef(false)

  const tick = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const t = Math.min(elapsed / DURATION_MS, 1)

      // Progress: 0-100 linearly
      setProgress(Math.round(t * 100))

      // Element count: ramp up with a slight ease-out curve for drama
      const easedT = 1 - Math.pow(1 - t, 2)
      setElementCount(Math.round(easedT * TOTAL_ELEMENTS))

      // Active step: each step occupies a quarter of the duration
      const step = Math.min(Math.floor(t * 4), 3)
      setActiveStep(step)

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else if (!completedRef.current) {
        completedRef.current = true
        // Small delay so the user sees 100% and the final checkmark
        setTimeout(onComplete, 400)
      }
    },
    [onComplete],
  )

  useEffect(() => {
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [tick])

  return (
    <motion.div
      className="w-full max-w-xl mx-auto rounded-xl border border-titanium/20 bg-void/80 p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Title */}
      <h3 className="font-headline text-xl text-plasma-white text-center mb-6">
        Simulating{' '}
        <span className="text-ixra-blue">{projectTitle}</span>...
      </h3>

      {/* Element counter */}
      <div className="text-center mb-6">
        <span className="font-numbers text-ixra-blue text-2xl">
          {elementCount.toLocaleString()}
        </span>
        <span className="text-titanium text-sm ml-2">elements</span>
      </div>

      {/* Progress bar */}
      <div className="bg-titanium/20 rounded-full h-2 mb-8 overflow-hidden">
        <motion.div
          className="bg-ixra-blue h-full rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
      </div>

      {/* Simulation steps */}
      <div className="space-y-3">
        {SIMULATION_STEPS.map((label, index) => {
          const isComplete = progress >= (index + 1) * 25
          const isActive = activeStep === index && !isComplete

          return (
            <motion.div
              key={label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Icon */}
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {isComplete ? (
                  <motion.svg
                    className="w-4 h-4 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                ) : isActive ? (
                  <div className="w-4 h-4 border-2 border-ixra-blue border-t-transparent rounded-full animate-spin" />
                ) : null}
              </div>

              {/* Label */}
              <span
                className={
                  isComplete || isActive
                    ? 'text-plasma-white text-sm'
                    : 'text-titanium/40 text-sm'
                }
              >
                {label}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Percentage readout */}
      <div className="text-center mt-6">
        <span className="font-numbers text-titanium text-sm">
          {progress}%
        </span>
      </div>
    </motion.div>
  )
}
