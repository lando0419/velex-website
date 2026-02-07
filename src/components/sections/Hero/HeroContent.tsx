'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { TypewriterText } from './TypewriterText'

interface HeroContentProps {
  instant?: boolean
}

export function HeroContent({ instant = false }: HeroContentProps) {
  const transition = { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }

  if (instant) {
    return <HeroContentStatic />
  }

  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
      {/* IXRA Logo */}
      <motion.h1
        className="font-accent text-[clamp(4rem,15vw,12rem)] tracking-[0.3em] text-plasma-white"
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ ...transition, delay: 1.5 }}
      >
        IXRA
      </motion.h1>

      {/* Decorative line */}
      <motion.div
        className="my-6 h-px bg-gradient-to-r from-transparent via-ixra-blue to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '200px', opacity: 1 }}
        transition={{ ...transition, delay: 2.0 }}
      />

      {/* Tagline - typewriter effect */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
      >
        <TypewriterText
          text="Design. Simulate. Deliver. GPU-Accelerated."
          className="font-headline text-xl md:text-2xl text-titanium"
          delay={2.0}
        />
        <motion.p
          className="mt-2 font-body text-lg text-plasma-white/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 2.8 }}
        >
          From concept to validated design. Fast.
        </motion.p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="mt-10 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 2.5 }}
      >
        <a href="#contact">
          <Button variant="primary" size="lg">
            Start Your Project
          </Button>
        </a>
        <a href="#showcase">
          <Button variant="secondary" size="lg">
            See Our Work
          </Button>
        </a>
      </motion.div>
    </div>
  )
}

function HeroContentStatic() {
  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
      <h1 className="font-accent text-[clamp(4rem,15vw,12rem)] tracking-[0.3em] text-plasma-white">
        IXRA
      </h1>
      <div className="my-6 h-px w-[200px] bg-gradient-to-r from-transparent via-ixra-blue to-transparent" />
      <p className="font-headline text-xl md:text-2xl text-titanium">
        Design. Simulate. Deliver. GPU-Accelerated.
      </p>
      <p className="mt-2 font-body text-lg text-plasma-white/80">
        From concept to validated design. Fast.
      </p>
      <div className="mt-10 flex gap-4">
        <a href="#contact">
          <Button variant="primary" size="lg">
            Start Your Project
          </Button>
        </a>
        <a href="#showcase">
          <Button variant="secondary" size="lg">
            See Our Work
          </Button>
        </a>
      </div>
    </div>
  )
}
