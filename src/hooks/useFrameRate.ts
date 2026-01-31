'use client'

import { useState, useEffect, useRef } from 'react'

export function useFrameRate(targetFPS: number = 30) {
  const [isLowPerf, setIsLowPerf] = useState(false)
  const framesRef = useRef<number[]>([])
  const lastTimeRef = useRef<number | null>(null)

  useEffect(() => {
    let frameId: number
    lastTimeRef.current = performance.now()

    const checkPerformance = () => {
      const now = performance.now()
      const delta = now - (lastTimeRef.current ?? now)
      lastTimeRef.current = now

      if (delta > 0) {
        const fps = 1000 / delta
        framesRef.current.push(fps)

        // Keep last 60 samples
        if (framesRef.current.length > 60) {
          framesRef.current.shift()
        }

        // Check average after collecting samples
        if (framesRef.current.length === 60) {
          const avgFps = framesRef.current.reduce((a, b) => a + b) / 60
          setIsLowPerf(avgFps < targetFPS)
        }
      }

      frameId = requestAnimationFrame(checkPerformance)
    }

    frameId = requestAnimationFrame(checkPerformance)
    return () => cancelAnimationFrame(frameId)
  }, [targetFPS])

  return isLowPerf
}
