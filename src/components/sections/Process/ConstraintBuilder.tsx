'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { DemoProject } from './ProjectPicker'

interface ConstraintBuilderProps {
  project: DemoProject
  onSimulate: () => void
}

export function ConstraintBuilder({
  project,
  onSimulate,
}: ConstraintBuilderProps) {
  const [values, setValues] = useState<number[]>(
    project.constraints.map((c) => c.value),
  )
  const [isAutoFilling, setIsAutoFilling] = useState(false)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const handleSliderChange = useCallback(
    (index: number, newValue: number) => {
      setValues((prev) => {
        const next = [...prev]
        next[index] = newValue
        return next
      })
    },
    [],
  )

  const handleAutoFill = useCallback(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    setIsAutoFilling(true)

    // Reset all sliders to their minimums
    setValues(project.constraints.map((c) => c.min))

    // Cascade each slider back to its default value
    project.constraints.forEach((constraint, index) => {
      const timeout = setTimeout(() => {
        setValues((prev) => {
          const next = [...prev]
          next[index] = constraint.value
          return next
        })

        // End auto-fill state after the last slider finishes
        if (index === project.constraints.length - 1) {
          const endTimeout = setTimeout(() => {
            setIsAutoFilling(false)
          }, 300)
          timeoutsRef.current.push(endTimeout)
        }
      }, (index + 1) * 300)

      timeoutsRef.current.push(timeout)
    })
  }, [project.constraints])

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Title */}
      <h3 className="font-headline text-plasma-white text-center text-xl md:text-2xl mb-8">
        What does your{' '}
        <span className="text-ixra-blue">{project.title}</span>{' '}
        need to handle?
      </h3>

      {/* Auto-Fill Button */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={handleAutoFill}
          disabled={isAutoFilling}
          className={cn(
            'rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors',
            'border-ixra-blue/30 text-ixra-blue bg-ixra-blue/10',
            'hover:bg-ixra-blue/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          {isAutoFilling ? 'Determining...' : '✦ Auto-Fill Constraints'}
        </button>
      </motion.div>

      {/* Constraint Sliders */}
      <div className="space-y-6 mb-10">
        {project.constraints.map((constraint, index) => (
          <motion.div
            key={constraint.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Label row */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-titanium text-sm">
                {constraint.label}
              </span>
              <span className="font-numbers text-plasma-white text-sm">
                <motion.span
                  key={values[index]}
                  initial={{ opacity: 0.6, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {values[index]}
                </motion.span>
                <span className="text-titanium ml-1 text-xs">
                  {constraint.unit}
                </span>
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={constraint.min}
              max={constraint.max}
              step={
                constraint.max - constraint.min > 100
                  ? 1
                  : 0.1
              }
              value={values[index]}
              onChange={(e) =>
                handleSliderChange(index, parseFloat(e.target.value))
              }
              disabled={isAutoFilling}
              className={cn(
                'w-full h-1.5 rounded-full appearance-none cursor-pointer',
                'bg-titanium/20 accent-ixra-blue',
                'transition-all duration-300',
                '[&::-webkit-slider-thumb]:appearance-none',
                '[&::-webkit-slider-thumb]:w-4',
                '[&::-webkit-slider-thumb]:h-4',
                '[&::-webkit-slider-thumb]:rounded-full',
                '[&::-webkit-slider-thumb]:bg-ixra-blue',
                '[&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,163,255,0.4)]',
                '[&::-webkit-slider-thumb]:cursor-pointer',
                '[&::-webkit-slider-thumb]:transition-shadow',
                '[&::-webkit-slider-thumb]:duration-200',
                '[&::-webkit-slider-thumb]:hover:shadow-[0_0_12px_rgba(0,163,255,0.6)]',
                '[&::-moz-range-thumb]:w-4',
                '[&::-moz-range-thumb]:h-4',
                '[&::-moz-range-thumb]:rounded-full',
                '[&::-moz-range-thumb]:bg-ixra-blue',
                '[&::-moz-range-thumb]:border-0',
                '[&::-moz-range-thumb]:shadow-[0_0_8px_rgba(0,163,255,0.4)]',
                '[&::-moz-range-thumb]:cursor-pointer',
                'disabled:opacity-70 disabled:cursor-not-allowed',
              )}
            />

            {/* Min / Max labels */}
            <div className="flex items-center justify-between mt-1">
              <span className="font-numbers text-titanium/40 text-[10px]">
                {constraint.min}
              </span>
              <span className="font-numbers text-titanium/40 text-[10px]">
                {constraint.max}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Simulate Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <motion.button
          onClick={onSimulate}
          disabled={isAutoFilling}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={cn(
            'bg-ixra-blue text-void font-medium text-lg rounded-lg',
            'px-10 py-4',
            'shadow-[0_0_20px_rgba(0,163,255,0.3)]',
            'hover:shadow-[0_0_30px_rgba(0,163,255,0.5)]',
            'transition-shadow duration-300',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          SIMULATE
        </motion.button>
      </motion.div>
    </div>
  )
}
