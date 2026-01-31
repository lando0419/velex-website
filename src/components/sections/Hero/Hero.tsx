'use client'

import { useReducedMotion } from '@/hooks'
import { HeroBackground } from './HeroBackground'
import { HeroContent } from './HeroContent'
import { HeroAnimation } from './HeroAnimation'
import { ScrollIndicator } from './ScrollIndicator'

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <HeroBackground />

      {/* Content Layer */}
      <div className="relative z-10 h-full">
        {prefersReducedMotion ? (
          <HeroContent instant />
        ) : (
          <HeroAnimation>
            <HeroContent />
          </HeroAnimation>
        )}
      </div>

      <ScrollIndicator />
    </section>
  )
}
