'use client'

import { TimelineStep } from './TimelineStep'
import { EnergyLine } from './EnergyLine'
import { useReducedMotion } from '@/hooks'
import type { ProcessStep } from './ProcessSection'

interface TimelineProps {
  steps: ProcessStep[]
  isInView: boolean
}

export function Timeline({ steps, isInView }: TimelineProps) {
  const prefersReducedMotion = useReducedMotion()
  const baseDelay = prefersReducedMotion ? 0 : 0.3

  return (
    <div className="max-w-5xl mx-auto">
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:flex items-start justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-start flex-1">
            <div className="flex-shrink-0 w-40">
              <TimelineStep
                step={step}
                isActive={isInView}
                delay={prefersReducedMotion ? 0 : baseDelay + index * 0.4}
              />
            </div>
            {index < steps.length - 1 && (
              <EnergyLine
                isActive={isInView}
                delay={prefersReducedMotion ? 0 : baseDelay + index * 0.4 + 0.3}
                orientation="horizontal"
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="lg:hidden flex flex-col items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center">
            <TimelineStep
              step={step}
              isActive={isInView}
              delay={prefersReducedMotion ? 0 : baseDelay + index * 0.3}
            />
            {index < steps.length - 1 && (
              <EnergyLine
                isActive={isInView}
                delay={prefersReducedMotion ? 0 : baseDelay + index * 0.3 + 0.2}
                orientation="vertical"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
