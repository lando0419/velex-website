'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
  onComplete?: () => void
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function CountUp({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
  onComplete,
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const range = end - start

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)
      const currentValue = start + range * easedProgress

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
        onComplete?.()
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, start, end, duration, onComplete])

  const formattedValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toLocaleString()

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{formattedValue}{suffix}
    </span>
  )
}
