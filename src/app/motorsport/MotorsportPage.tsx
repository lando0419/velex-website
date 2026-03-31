'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { cn } from '@/lib/utils'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] as const },
})

function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('relative py-20 md:py-28 overflow-hidden', className)}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  )
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-code text-xs uppercase tracking-[0.15em] text-ixra-blue bg-ixra-blue/8 border border-ixra-blue/20 px-4 py-1.5 rounded-full mb-6">
      {children}
    </span>
  )
}

function AnimatedBlock({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   PART CLASS DATA
   ═══════════════════════════════════════════════════════════ */
const PART_CLASSES = [
  {
    num: '01',
    title: 'Brake Cooling Ducts',
    desc: 'Optimized internal flow geometry for maximum cooling efficiency with minimal mass.',
    metric: '54.8% weight reduction',
  },
  {
    num: '02',
    title: 'Suspension Uprights',
    desc: 'Improved stiffness-to-weight ratio under real load cases and packaging constraints.',
  },
  {
    num: '03',
    title: 'Cooling Manifolds',
    desc: 'Integrated flow distribution with reduced pressure drop and consolidated part count.',
  },
  {
    num: '04',
    title: 'Turbo / Intake Plenums',
    desc: 'Re-engineered internal volume and runner geometry for improved flow uniformity.',
  },
  {
    num: '05',
    title: 'Exhaust Headers / Manifolds',
    desc: 'Thermal-aware geometry optimization for mass reduction and heat management.',
  },
  {
    num: '06',
    title: 'Lightweight Structural Brackets',
    desc: 'Topology-optimized mounting structures for maximum load-path efficiency.',
  },
  {
    num: '07',
    title: 'Gearbox / Differential Housings',
    desc: 'Structural optimization under combined thermal and mechanical loading.',
  },
  {
    num: '08',
    title: 'Battery / Electronics Cooling Plates',
    desc: 'Integrated thermal management with optimized channel geometry.',
  },
  {
    num: '09',
    title: 'Aerodynamic Mounting Structures',
    desc: 'Stiffness-optimized wing and splitter supports with minimal drag contribution.',
  },
  {
    num: '10',
    title: 'Pedal Boxes / Driver Controls',
    desc: 'Ergonomic and structural optimization under dynamic driver input loads.',
  },
]

const METRICS = [
  { value: '54.8%', label: 'Weight Reduction' },
  { value: '100%', label: 'DMLS Manufacturability' },
  { value: '400K+', label: 'Mesh Elements per Analysis' },
  { value: '<72hr', label: 'Standard Turnaround' },
]

const PHILOSOPHY_FEATURES = [
  'DMLS-first design logic — manufacturability from the first iteration',
  'Integrated structural, thermal, and flow reasoning in a single workflow',
  'Physics-based optimization — not heuristic guesswork',
  'Proven ability to improve already-optimized motorsport components',
  'No invalid geometry generation — every output is manufacturable',
]

const PIPELINE_STEPS = [
  { num: '1', title: 'Input', desc: 'Component geometry, constraints, materials, and operating conditions.' },
  { num: '2', title: 'Design Space', desc: 'Build parametric or topological design space around the problem.' },
  { num: '3', title: 'Optimize', desc: 'Constraint-driven, exploration-based, or hybrid strategy applied.' },
  { num: '4', title: 'Validate', desc: 'FEA, thermal, and flow verification against requirements.' },
  { num: '5', title: 'Deliver', desc: 'Manufacturing-ready geometry, reports, and trade-off analysis.' },
]

const CONFIDENCE_ITEMS = [
  {
    title: 'Validated Against Real Components',
    desc: 'Every optimization target is based on real motorsport part classes with real geometries, real materials, and real operating constraints.',
  },
  {
    title: 'Physics-Based Process',
    desc: 'FEA, thermal analysis, and CFD drive every design decision. No surrogate models or simplified approximations where full-fidelity matters.',
  },
  {
    title: 'DMLS-Native Outputs',
    desc: 'Geometry is designed for additive manufacturing from the start. Build orientation, support requirements, and thermal distortion are considered during optimization, not after.',
  },
  {
    title: 'Manufacturability Review on Every Output',
    desc: 'No geometry leaves IXRA without a manufacturability assessment. If it cannot be built, it does not ship.',
  },
  {
    title: 'Transparent Methodology',
    desc: 'Full documentation of assumptions, constraints, solver settings, and convergence criteria. You see exactly how we arrived at the result.',
  },
]

const DELIVERABLES = [
  { title: 'Optimized Geometry', desc: 'STEP and STL files, manufacturing-ready. Native CAD-compatible formats.' },
  { title: 'FEA Validation Report', desc: 'Stress, displacement, and safety factor analysis with convergence verification.' },
  { title: 'DMLS Build Guide', desc: 'Recommended build orientation, support strategy, and thermal considerations.' },
  { title: 'Baseline Comparison', desc: 'Mass, stiffness, and performance metrics versus your original component.' },
  { title: 'Design Rationale', desc: 'Engineering decisions, trade-offs, and constraint satisfaction documented.' },
  { title: 'Variant Options', desc: 'Alternative design candidates where the design space permits.' },
]

const TRADITIONAL = [
  'Manual iteration with limited design variants explored',
  'Design and manufacturing treated as separate concerns',
  'Geometry defined first, manufacturability checked later',
  'Thermal and structural analysis run independently',
  'Slow iteration cycles with long feedback loops',
  'Post-process fixes required for DMLS compatibility',
]

const IXRA_APPROACH = [
  'Broad computational design-space exploration',
  'DMLS-first integrated design and manufacturing logic',
  'Manufacturability enforced from the first iteration',
  'Coupled structural, thermal, and flow reasoning',
  'Rapid iteration with physics in the loop',
  'Manufacturing-ready outputs from the start',
]

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function MotorsportPage() {
  return (
    <main>
      {/* ── 1. HERO ── */}
      <HeroSection />
      {/* ── 2. PROOF ── */}
      <ProofSection />
      {/* ── 3. METRICS ── */}
      <MetricsSection />
      {/* ── 4. PHILOSOPHY ── */}
      <PhilosophySection />
      {/* ── 5. AUDIENCE ── */}
      <AudienceSection />
      {/* ── 6. PIPELINE ── */}
      <PipelineSection />
      {/* ── 7. CONFIDENCE ── */}
      <ConfidenceSection />
      {/* ── 8. DELIVERABLES ── */}
      <DeliverablesSection />
      {/* ── 9. COMPARISON ── */}
      <ComparisonSection />
      {/* ── 10. CTA / CONTACT ── */}
      <MotorsportContactSection />
    </main>
  )
}

/* ═══════════════════════════════════════════════════════════
   SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()
  const dur = prefersReducedMotion ? 0 : 0.8

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-svh flex items-center justify-center overflow-hidden bg-void"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      <div className="relative text-center max-w-[860px] px-4 py-24">
        <motion.span
          className="inline-flex items-center gap-2 font-code text-xs uppercase tracking-[0.15em] text-ixra-blue bg-ixra-blue/6 border border-ixra-blue/20 px-5 py-2 rounded-full mb-8"
          {...fadeUp(0.3)}
          animate={isInView ? fadeUp(0.3).animate : {}}
        >
          DMLS-Optimized Component Design
        </motion.span>

        <motion.h1
          className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: dur, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          Already Optimized.
          <br />
          <span className="text-ixra-blue">Now Outperformed.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-titanium max-w-[640px] mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: dur, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          IXRA re-engineers real motorsport components for weight, strength,
          thermal performance, and manufacturability&nbsp;&mdash; designed for
          DMLS from the start.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: dur, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3.5 bg-ixra-blue text-void font-bold rounded text-sm hover:bg-electric-cyan transition-colors shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]"
          >
            Submit a Component
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function ProofSection() {
  return (
    <Section id="proof" className="bg-void border-t border-titanium/6">
      <AnimatedBlock>
        <div className="text-center mb-16">
          <SectionTag>Component Classes</SectionTag>
          <h2 className="font-headline text-3xl md:text-5xl text-plasma-white mb-4">
            Validated Against Real Motorsport Components
          </h2>
          <p className="text-lg text-titanium max-w-2xl mx-auto">
            Ten performance-critical part classes. Real geometries, real constraints,
            real materials. Each re-optimized for weight, efficiency, and manufacturability.
          </p>
        </div>
      </AnimatedBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PART_CLASSES.map((part, i) => (
          <AnimatedBlock key={part.num} delay={i * 0.06}>
            <div className="group flex gap-5 p-5 md:p-6 bg-titanium/3 border border-titanium/6 rounded hover:border-ixra-blue/25 transition-colors">
              <span className="font-code text-2xl font-bold text-ixra-blue/40 leading-none shrink-0 w-9">
                {part.num}
              </span>
              <div className="min-w-0">
                <h3 className="font-headline text-base font-semibold text-plasma-white mb-1">
                  {part.title}
                </h3>
                <p className="text-sm text-titanium leading-relaxed">{part.desc}</p>
                {part.metric && (
                  <span className="inline-block mt-2 font-code text-xs font-semibold text-ixra-blue bg-ixra-blue/8 border border-ixra-blue/20 px-3 py-1 rounded-full">
                    {part.metric}
                  </span>
                )}
              </div>
            </div>
          </AnimatedBlock>
        ))}
      </div>
    </Section>
  )
}

function MetricsSection() {
  return (
    <Section className="bg-void border-y border-titanium/6 py-16 md:py-20">
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {METRICS.map((m, i) => (
          <AnimatedBlock key={m.label} delay={i * 0.1}>
            <div className="text-center px-6 md:px-10 py-6 bg-titanium/3 border border-titanium/6 rounded min-w-[160px] flex-1 max-w-[240px]">
              <span className="block font-code text-3xl md:text-4xl font-bold text-ixra-blue leading-tight mb-1">
                {m.value}
              </span>
              <span className="text-xs text-titanium uppercase tracking-wider">
                {m.label}
              </span>
            </div>
          </AnimatedBlock>
        ))}
      </div>
    </Section>
  )
}

function PhilosophySection() {
  return (
    <Section id="philosophy" className="bg-void">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <AnimatedBlock>
          <SectionTag>Design Philosophy</SectionTag>
          <h2 className="font-headline text-3xl md:text-5xl text-plasma-white mb-6">
            Constraint-Driven.
            <br />
            Exploration-Validated.
          </h2>
          <div className="space-y-5 text-titanium leading-relaxed">
            <p>
              IXRA operates on a hybrid engineering philosophy. When the problem is
              well-defined and manufacturability matters most, we apply constraint-driven
              design&nbsp;&mdash; getting it right the first time with physics-validated
              geometry that is DMLS-ready from the start.
            </p>
            <p>
              When the problem benefits from broad search&nbsp;&mdash; where
              geometry-sensitive physics like airflow, thermal distribution, or complex
              load paths dominate&nbsp;&mdash; we deploy large-scale iterative exploration
              across the design space.
            </p>
            <p>
              Most real motorsport components need both. That integration is what makes
              IXRA different.
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.2}>
          <div className="flex flex-col gap-3 lg:mt-16">
            {PHILOSOPHY_FEATURES.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-titanium/3 border border-titanium/6 rounded hover:border-ixra-blue/20 transition-colors"
              >
                <span className="text-ixra-blue text-sm mt-0.5 shrink-0">&#10003;</span>
                <span className="text-sm text-titanium">{feat}</span>
              </div>
            ))}
          </div>
        </AnimatedBlock>
      </div>
    </Section>
  )
}

function AudienceSection() {
  const cards = [
    {
      title: 'Formula-Level Programs',
      desc: 'Development-driven teams optimizing every component for weight, stiffness, and thermal performance. Where the engineering budget exists to pursue measurable per-part advantage.',
    },
    {
      title: 'GT & Sports Car Racing',
      desc: 'Production-derived platforms where packaging constraints, material regulations, and development windows define the engineering challenge. Maximum performance within tight boundaries.',
    },
    {
      title: 'Endurance Racing',
      desc: 'Long-duration reliability demands where thermal management, fatigue life, and system-level integration matter as much as outright performance. Components that survive and perform.',
    },
  ]

  return (
    <Section className="bg-void border-t border-titanium/6">
      <AnimatedBlock>
        <div className="text-center mb-16">
          <SectionTag>Built For</SectionTag>
          <h2 className="font-headline text-3xl md:text-5xl text-plasma-white mb-4">
            Competitive Motorsport Engineering
          </h2>
          <p className="text-lg text-titanium max-w-xl mx-auto">
            For teams where engineering advantage is measured in grams, degrees, and milliseconds.
          </p>
        </div>
      </AnimatedBlock>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <AnimatedBlock key={c.title} delay={i * 0.1}>
            <div className="p-6 md:p-8 bg-titanium/3 border border-titanium/6 rounded hover:border-ixra-blue/20 transition-colors h-full">
              <h3 className="font-headline text-lg font-semibold text-plasma-white mb-3">
                {c.title}
              </h3>
              <p className="text-sm text-titanium leading-relaxed">{c.desc}</p>
            </div>
          </AnimatedBlock>
        ))}
      </div>
    </Section>
  )
}

function PipelineSection() {
  return (
    <Section id="pipeline" className="bg-void border-t border-titanium/6">
      <AnimatedBlock>
        <div className="text-center mb-16">
          <SectionTag>Engineering Pipeline</SectionTag>
          <h2 className="font-headline text-3xl md:text-5xl text-plasma-white mb-4">
            From Component to Advantage
          </h2>
          <p className="text-lg text-titanium">A structured engineering process. Not a black box.</p>
        </div>
      </AnimatedBlock>

      {/* Desktop: horizontal, Mobile: vertical */}
      <div className="flex flex-col md:flex-row gap-0 relative">
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-ixra-blue/15" />
        {/* Connecting line (mobile) */}
        <div className="md:hidden absolute top-0 bottom-0 left-[27px] w-px bg-ixra-blue/15" />

        {PIPELINE_STEPS.map((step, i) => (
          <AnimatedBlock
            key={step.num}
            delay={i * 0.12}
            className="flex-1 relative"
          >
            <div className="flex md:flex-col items-start md:items-center md:text-center p-4 md:p-5">
              <span className="relative z-10 inline-flex items-center justify-center w-10 h-10 font-code text-sm font-bold text-ixra-blue bg-ixra-blue/8 border border-ixra-blue/25 rounded-full shrink-0 mr-4 md:mr-0 md:mb-4">
                {step.num}
              </span>
              <div>
                <h3 className="font-headline text-base font-semibold text-plasma-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-titanium leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </AnimatedBlock>
        ))}
      </div>
    </Section>
  )
}

function ConfidenceSection() {
  return (
    <Section id="confidence" className="bg-void border-t border-titanium/6">
      <AnimatedBlock>
        <SectionTag>Technical Credibility</SectionTag>
        <h2 className="font-headline text-3xl md:text-5xl text-plasma-white mb-10">
          Precision Over Promise
        </h2>
      </AnimatedBlock>

      <div className="max-w-3xl space-y-6">
        {CONFIDENCE_ITEMS.map((item, i) => (
          <AnimatedBlock key={item.title} delay={i * 0.08}>
            <div className="flex gap-5">
              <div className="shrink-0 w-[3px] bg-ixra-blue/30 rounded-full self-stretch" />
              <div>
                <h4 className="font-headline text-base font-semibold text-plasma-white mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-titanium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </AnimatedBlock>
        ))}
      </div>
    </Section>
  )
}

function DeliverablesSection() {
  return (
    <Section id="deliverables" className="bg-void border-t border-titanium/6">
      <AnimatedBlock>
        <div className="text-center mb-16">
          <SectionTag>What You Receive</SectionTag>
          <h2 className="font-headline text-3xl md:text-5xl text-plasma-white mb-4">
            Complete Engineering Deliverables
          </h2>
          <p className="text-lg text-titanium max-w-xl mx-auto">
            Every engagement produces a complete, actionable package. Not a report. Not a concept. A manufacturing-ready result.
          </p>
        </div>
      </AnimatedBlock>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DELIVERABLES.map((d, i) => (
          <AnimatedBlock key={d.title} delay={i * 0.08}>
            <div className="p-5 md:p-6 bg-titanium/3 border border-titanium/6 rounded hover:border-ixra-blue/20 transition-colors h-full">
              <h3 className="font-headline text-base font-semibold text-plasma-white mb-2">
                {d.title}
              </h3>
              <p className="text-sm text-titanium leading-relaxed">{d.desc}</p>
            </div>
          </AnimatedBlock>
        ))}
      </div>
    </Section>
  )
}

function ComparisonSection() {
  return (
    <Section id="comparison" className="bg-void border-t border-titanium/6">
      <AnimatedBlock>
        <div className="text-center mb-16">
          <SectionTag>The Difference</SectionTag>
          <h2 className="font-headline text-3xl md:text-5xl text-plasma-white">
            Traditional Workflow vs. IXRA
          </h2>
        </div>
      </AnimatedBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <AnimatedBlock>
          <div className="p-6 md:p-8 rounded border border-titanium/8 bg-titanium/2 h-full">
            <h3 className="font-headline text-lg font-semibold text-titanium/60 mb-6">
              Traditional Approach
            </h3>
            <ul className="space-y-4">
              {TRADITIONAL.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-titanium/50">
                  <span className="font-code text-xs text-stress-red/60 mt-0.5">−</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedBlock>

        {/* VS divider — mobile only */}
        <div className="md:hidden text-center py-2 font-code text-sm font-bold text-titanium/40 tracking-widest">
          VS
        </div>

        <AnimatedBlock delay={0.15}>
          <div className="p-6 md:p-8 rounded border border-ixra-blue/20 bg-ixra-blue/3 h-full">
            <h3 className="font-headline text-lg font-semibold text-ixra-blue mb-6">
              IXRA Approach
            </h3>
            <ul className="space-y-4">
              {IXRA_APPROACH.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-titanium">
                  <span className="font-code text-xs text-ixra-blue mt-0.5">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedBlock>
      </div>
    </Section>
  )
}

function MotorsportContactSection() {
  return (
    <Section id="contact" className="bg-void border-t border-titanium/6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <AnimatedBlock>
          <SectionTag>Get Started</SectionTag>
          <h2 className="font-headline text-3xl md:text-5xl text-plasma-white mb-6">
            Submit a Component
          </h2>
          <p className="text-titanium leading-relaxed mb-8">
            Send us your current part geometry and operating constraints. We scope the
            optimization, define the engineering approach, and deliver a
            manufacturing-ready result. Fixed price per component.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-titanium/3 border border-titanium/6 rounded">
              <span className="text-xl">&#9993;</span>
              <div>
                <span className="block text-xs text-titanium/60 uppercase tracking-wider mb-0.5">Email</span>
                <a href="mailto:LandonKancir@Ixra.tech" className="text-plasma-white hover:text-ixra-blue transition-colors font-medium">
                  LandonKancir@Ixra.tech
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-titanium/3 border border-titanium/6 rounded">
              <span className="text-xl">&#128337;</span>
              <div>
                <span className="block text-xs text-titanium/60 uppercase tracking-wider mb-0.5">Turnaround</span>
                <span className="text-plasma-white font-medium">48-72 hours standard, 24hr rush available</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-titanium/3 border border-titanium/6 rounded">
              <span className="text-xl">&#9906;</span>
              <div>
                <span className="block text-xs text-titanium/60 uppercase tracking-wider mb-0.5">Response Time</span>
                <span className="text-plasma-white font-medium">Within 24 hours</span>
              </div>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.15}>
          <form
            className="bg-titanium/3 border border-titanium/6 rounded p-6 md:p-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
              // TODO: wire up to /api/contact
              alert('Thank you. We will be in touch within 24 hours.')
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ms-name" className="block text-sm text-titanium mb-1.5">Full Name</label>
                <input
                  id="ms-name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-void border border-titanium/10 rounded text-plasma-white text-sm focus:border-ixra-blue focus:outline-none focus:ring-1 focus:ring-ixra-blue/30 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="ms-company" className="block text-sm text-titanium mb-1.5">Team / Organization</label>
                <input
                  id="ms-company"
                  name="company"
                  type="text"
                  className="w-full px-4 py-3 bg-void border border-titanium/10 rounded text-plasma-white text-sm focus:border-ixra-blue focus:outline-none focus:ring-1 focus:ring-ixra-blue/30 transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ms-email" className="block text-sm text-titanium mb-1.5">Email Address</label>
                <input
                  id="ms-email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-void border border-titanium/10 rounded text-plasma-white text-sm focus:border-ixra-blue focus:outline-none focus:ring-1 focus:ring-ixra-blue/30 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="ms-class" className="block text-sm text-titanium mb-1.5">Racing Class</label>
                <select
                  id="ms-class"
                  name="racing-class"
                  className="w-full px-4 py-3 bg-void border border-titanium/10 rounded text-plasma-white text-sm focus:border-ixra-blue focus:outline-none focus:ring-1 focus:ring-ixra-blue/30 transition-colors appearance-none"
                >
                  <option value="">Select racing class...</option>
                  <option value="formula">Formula</option>
                  <option value="gt">GT / Sports Car</option>
                  <option value="endurance">Endurance</option>
                  <option value="touring">Touring Car</option>
                  <option value="prototype">Prototype / LMP</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="ms-component" className="block text-sm text-titanium mb-1.5">Component Description</label>
              <textarea
                id="ms-component"
                name="component"
                rows={4}
                placeholder="Describe the component, current material, operating conditions, and what you are looking to improve..."
                className="w-full px-4 py-3 bg-void border border-titanium/10 rounded text-plasma-white text-sm focus:border-ixra-blue focus:outline-none focus:ring-1 focus:ring-ixra-blue/30 transition-colors resize-y"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3.5 bg-ixra-blue text-void font-bold rounded text-sm hover:bg-electric-cyan transition-colors shadow-[0_0_20px_rgba(0,212,255,0.15)] min-h-[48px]"
            >
              Submit Component
            </button>
            <p className="text-xs text-titanium/50 text-center">
              All submissions are confidential. NDA available on request.
            </p>
          </form>
        </AnimatedBlock>
      </div>
    </Section>
  )
}
