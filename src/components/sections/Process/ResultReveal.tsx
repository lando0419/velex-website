'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { DemoProject } from './ProjectPicker'

interface ResultRevealProps {
  project: DemoProject
  onReset: () => void
}

export function ResultReveal({ project, onReset }: ResultRevealProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center">
      {/* Hero image */}
      <motion.div
        className="border-ixra-blue/30 w-full overflow-hidden rounded-xl border"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={533}
          className="h-auto w-full object-cover"
        />
      </motion.div>

      {/* Project title */}
      <motion.h3
        className="font-headline text-plasma-white mt-6 text-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {project.title}
      </motion.h3>

      {/* Results grid */}
      <div className="mt-6 grid w-full grid-cols-2 gap-4">
        {project.results.map((result, index) => (
          <motion.div
            key={result.label}
            className="bg-titanium/5 border-titanium/10 rounded-lg border p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + index * 0.15,
              duration: 0.4,
              ease: 'easeOut',
            }}
          >
            <p className="font-numbers text-ixra-blue text-lg">{result.value}</p>
            <p className="text-titanium text-xs">{result.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Closing message */}
      <motion.p
        className="text-plasma-white mt-8 text-center text-xl font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        That&apos;s it. From concept to validated design.
      </motion.p>

      <motion.p
        className="text-titanium mt-2 text-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        Your project could be next.
      </motion.p>

      {/* Action buttons */}
      <motion.div
        className="mt-6 flex justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <button
          onClick={onReset}
          className="border-titanium/30 text-titanium hover:border-ixra-blue hover:text-plasma-white rounded-lg border px-8 py-3 transition-colors"
        >
          Try Another
        </button>
      </motion.div>
    </div>
  )
}
