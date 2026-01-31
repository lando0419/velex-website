'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

type Phase = 'idle' | 'typing' | 'solving' | 'complete'

interface ResultDisplayProps {
  phase: Phase
  onComplete: () => void
}

const RESULTS = [
  { label: 'Solve Time', value: '127 seconds' },
  { label: 'Elements', value: '100,847' },
  { label: 'Peak Stress', value: '342 MPa' },
  { label: 'Safety Factor', value: '2.4' },
]

export function ResultDisplay({ phase, onComplete }: ResultDisplayProps) {
  const [visibleResults, setVisibleResults] = useState(0)
  const [showStatus, setShowStatus] = useState(false)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (phase !== 'solving' || hasStartedRef.current) return
    hasStartedRef.current = true

    const timeouts: NodeJS.Timeout[] = []

    // Simulate solve time (2 seconds)
    const solveTimer = setTimeout(() => {
      // Reveal results one by one
      RESULTS.forEach((_, index) => {
        const resultTimeout = setTimeout(() => {
          setVisibleResults(index + 1)
          if (index === RESULTS.length - 1) {
            const statusTimeout = setTimeout(() => {
              setShowStatus(true)
              onComplete()
            }, 500)
            timeouts.push(statusTimeout)
          }
        }, index * 300)
        timeouts.push(resultTimeout)
      })
    }, 2000)
    timeouts.push(solveTimer)

    return () => timeouts.forEach(clearTimeout)
  }, [phase, onComplete])

  return (
    <div className="rounded-lg border border-titanium/20 bg-void/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-titanium/20 flex items-center justify-between">
        <span className="font-headline text-plasma-white">
          ANALYSIS RESULTS
        </span>
        {phase === 'solving' && !showStatus && (
          <motion.div
            className="w-4 h-4 border-2 border-velex-blue border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      {/* Results Grid */}
      <div className="p-4 space-y-3 min-h-[200px]">
        {phase === 'idle' && (
          <p className="text-titanium/50 text-sm">Waiting for simulation...</p>
        )}

        <AnimatePresence>
          {RESULTS.slice(0, visibleResults).map((result) => (
            <motion.div
              key={result.label}
              className="flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="text-titanium text-sm">{result.label}</span>
              <span className="font-numbers text-plasma-white">
                {result.value}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Status Badge */}
        <AnimatePresence>
          {showStatus && (
            <motion.div
              className="mt-4 flex items-center justify-center gap-2 py-3 rounded-md bg-success-green/10 border border-success-green/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Check className="w-5 h-5 text-success-green" />
              <span className="font-headline text-success-green">PASS</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
