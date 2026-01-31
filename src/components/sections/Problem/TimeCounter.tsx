'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TimeCounterProps {
  label: string
  fromSeconds: number
  toSeconds: number
  isActive: boolean
  className?: string
}

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function TimeCounter({
  label,
  fromSeconds,
  toSeconds,
  isActive,
  className,
}: TimeCounterProps) {
  const [currentValue, setCurrentValue] = useState(fromSeconds)
  const hasStartedRef = useRef(false)

  const animate = useCallback(() => {
    const duration = 1500 // 1.5 seconds per spec
    const startTime = performance.now()
    const startValue = fromSeconds
    const endValue = toSeconds

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const value = startValue + (endValue - startValue) * easeOut
      setCurrentValue(Math.round(value))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [fromSeconds, toSeconds])

  useEffect(() => {
    if (isActive && !hasStartedRef.current) {
      hasStartedRef.current = true
      animate()
    }
  }, [isActive, animate])

  return (
    <div className="text-center">
      <p className="text-sm text-titanium uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className={cn('font-numbers text-5xl md:text-6xl tabular-nums', className)}>
        {formatTime(currentValue)}
      </p>
    </div>
  )
}
