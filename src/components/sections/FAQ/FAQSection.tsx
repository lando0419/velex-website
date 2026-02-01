'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FAQAccordion } from './FAQAccordion'
import { useReducedMotion } from '@/hooks'

export interface FAQItem {
  id: number
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: 'Do you only simulate, or do you design too?',
    answer: 'Both! Our full-service offering includes CAD design, simulation, validation, and delivery. We also offer simulation-only for customers who already have CAD files.',
  },
  {
    id: 2,
    question: 'What if I already have CAD files?',
    answer: 'Perfect. Use our simulation-only service at a lower cost. We accept STL, STEP, IGES, Parasolid, and direct CAD links (SolidWorks, Fusion 360, Onshape).',
  },
  {
    id: 3,
    question: 'How accurate are your simulations?',
    answer: 'Within 2% of commercial solvers. Every result is validated against established benchmarks.',
  },
  {
    id: 4,
    question: "What's your turnaround time?",
    answer: 'Standard: 48-72 hours. Rush: 24 hours (+50%). Complex assemblies and full-service projects may require additional time.',
  },
  {
    id: 5,
    question: 'Do you sign NDAs?',
    answer: 'Absolutely. Your IP is protected by default. We can sign your NDA or provide ours.',
  },
  {
    id: 6,
    question: 'What industries do you serve?',
    answer: 'Aerospace, automotive, robotics, medical devices, consumer products, industrial equipment.',
  },
  {
    id: 7,
    question: 'How do I get started?',
    answer: "Start with a free consultation. Tell us what you need, and we'll scope the project together. Fill out the contact form and we'll respond within 24 hours.",
  },
  {
    id: 8,
    question: "What if I'm not satisfied with the results?",
    answer: "Unlimited revisions until approved. We don't consider a project complete until you do.",
  },
  {
    id: 9,
    question: 'What simulation depth do I need?',
    answer: `For most projects, Standard (1x) depth is sufficient. Here's what each level provides:

• Standard (1x): 10,000–100,000 simulations per part. Covers typical stress, thermal, and flow analysis. Recommended for most projects.

• Enhanced (2x): ~200,000 simulations. Better optimization, more design iterations. Good for performance-critical parts.

• Deep (4x): ~1,000,000 simulations. Comprehensive analysis with extensive parameter sweeps. For complex assemblies or high-stakes applications.

• Maximum (10x): 5–10 million simulations. Aerospace/defense grade. Only needed for mission-critical systems (satellites, aircraft, medical implants). Requires consultation—most projects don't need this level.

When in doubt, start with Standard. We'll recommend upgrading if your project needs it.`,
  },
  {
    id: 10,
    question: 'Can you handle complete builds with multiple parts?',
    answer: `Yes! For complete builds with multiple parts:

1. Select "Complete Build" in the quote calculator
2. Tell us how many parts and describe the assembly
3. We'll review your requirements and provide a custom timeline and quote

Multi-part builds take longer but benefit from system-level optimization—we can analyze how parts interact under load, thermal expansion, and vibration.`,
  },
  {
    id: 11,
    question: 'Why are your prices lower than traditional FEA consultants?',
    answer: `Three reasons:

1. GPU Acceleration: Our simulations run 100x faster on GPUs, reducing compute costs dramatically.

2. Streamlined Process: No lengthy proposal processes or enterprise overhead. You describe the project, we get to work.

3. Volume: We handle many projects efficiently rather than a few projects slowly.

Traditional consultants charge $150-300/hour and take weeks. We deliver in days at a fraction of the cost.`,
  },
  {
    id: 12,
    question: 'Is my design data secure?',
    answer: `Absolutely. We take IP protection seriously:

• NDA Available: We sign mutual NDAs before any project begins
• Encrypted Transfer: All files transferred via encrypted channels
• No Third Parties: Your data never leaves our systems
• Deletion Policy: We delete all project files within 30 days of completion (unless you request otherwise)

Many of our clients work in defense, aerospace, and medical—industries where confidentiality is non-negotiable.`,
  },
]

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-void py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            <span className="text-velex-blue">FAQ</span>
          </h2>
          <p className="text-xl text-titanium">
            Questions? We&apos;ve got answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <FAQAccordion items={FAQ_ITEMS} />
        </motion.div>
      </div>
    </section>
  )
}
