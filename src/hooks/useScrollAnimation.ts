'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

interface ScrollAnimationOptions {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  toggleActions?: string
  markers?: boolean
  onEnter?: () => void
  onLeave?: () => void
}

interface AnimationConfig {
  targets: string | Element | Element[]
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  duration?: number
  stagger?: number
  ease?: string
}

export function useScrollAnimation(
  animationConfig: AnimationConfig,
  scrollOptions: ScrollAnimationOptions = {}
) {
  const containerRef = useRef<HTMLElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const initAnimation = useCallback(() => {
    if (prefersReducedMotion || !containerRef.current) return

    const {
      targets,
      from = {},
      to = {},
      duration = 0.8,
      stagger = 0,
      ease = 'power2.out',
    } = animationConfig

    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      toggleActions = 'play none none reverse',
      markers = false,
      onEnter,
      onLeave,
    } = scrollOptions

    // Create the animation
    const tween = gsap.fromTo(
      targets,
      { ...from },
      {
        ...to,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: trigger || containerRef.current,
          start,
          end,
          scrub,
          toggleActions,
          markers,
          onEnter,
          onLeave,
        },
      }
    )

    // Store reference for cleanup
    scrollTriggerRef.current = tween.scrollTrigger || null

    return tween
  }, [animationConfig, scrollOptions, prefersReducedMotion])

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      initAnimation()
    }, 100)

    return () => {
      clearTimeout(timeout)
      // Cleanup ScrollTrigger
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
    }
  }, [initAnimation])

  return containerRef
}

// Simpler hook for basic scroll-triggered reveals
export function useScrollReveal(options: {
  y?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
} = {}) {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return

    const {
      y = 50,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
    } = options

    const elements = containerRef.current.querySelectorAll('[data-scroll-reveal]')
    if (elements.length === 0) return

    const tween = gsap.from(elements, {
      y,
      opacity,
      duration,
      delay,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill()
      }
    }
  }, [options, prefersReducedMotion])

  return containerRef
}

// Hook for parallax effects
export function useParallax(speed: number = 0.5) {
  const elementRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !elementRef.current) return

    const tween = gsap.to(elementRef.current, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill()
      }
    }
  }, [speed, prefersReducedMotion])

  return elementRef
}
