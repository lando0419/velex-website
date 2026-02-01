'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle } from 'lucide-react'
import {
  Box,
  Thermometer,
  Wind,
  Activity,
  Layers,
  Zap,
} from 'lucide-react'
import type { Capability } from './CapabilityCard'

interface CapabilityModalProps {
  capability: Capability
  onClose: () => void
}

const ICONS: Record<string, typeof Box> = {
  structural: Box,
  thermal: Thermometer,
  cfd: Wind,
  modal: Activity,
  topology: Layers,
  multiphysics: Zap,
}

export function CapabilityModal({ capability, onClose }: CapabilityModalProps) {
  const Icon = ICONS[capability.icon] || Box

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-void/95 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-3xl max-h-[90vh] bg-void border border-titanium/30 rounded-xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="relative p-6 pb-4 border-b border-titanium/20">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-titanium/10 border border-titanium/20 text-titanium hover:text-plasma-white hover:border-velex-blue transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-velex-blue/10 border border-velex-blue/30">
                <Icon className="w-8 h-8 text-velex-blue" />
              </div>
              <div>
                <h2 className="font-headline text-2xl md:text-3xl text-plasma-white">
                  {capability.title}
                </h2>
                <p className="text-sm text-titanium mt-1">
                  {capability.description}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Long Description */}
            <p className="text-titanium leading-relaxed mb-6">
              {capability.extendedInfo.longDescription}
            </p>

            {/* Manufacturing Note (only for Topology) */}
            {capability.extendedInfo.manufacturingNote && (
              <div className="mb-6 p-4 bg-warning-orange/10 border border-warning-orange/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-plasma-white font-medium mb-1">
                      Manufacturing Note
                    </p>
                    <p className="text-sm text-titanium">
                      {capability.extendedInfo.manufacturingNote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Two-column layout for Use Cases and Technical Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Use Cases */}
              <div>
                <h3 className="text-sm font-medium text-velex-blue uppercase tracking-wider mb-3">
                  Use Cases
                </h3>
                <ul className="space-y-2">
                  {capability.extendedInfo.useCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-titanium">
                      <span className="w-1.5 h-1.5 rounded-full bg-velex-blue mt-1.5 flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Details */}
              <div>
                <h3 className="text-sm font-medium text-velex-blue uppercase tracking-wider mb-3">
                  Technical Details
                </h3>
                <ul className="space-y-2">
                  {capability.extendedInfo.technicalDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-titanium">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 bg-titanium/5 rounded-lg border border-titanium/10">
              <h3 className="text-xs font-medium text-titanium uppercase tracking-wider mb-3">
                Sample Results
              </h3>
              <div className="flex flex-wrap gap-6">
                {Object.entries(capability.stats).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-numbers text-lg text-velex-blue">{value}</p>
                    <p className="text-xs text-titanium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-titanium/20 bg-titanium/5">
            <div className="flex gap-4 justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-titanium/30 text-titanium rounded-lg hover:border-velex-blue hover:text-plasma-white transition-colors"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="px-6 py-2 bg-velex-blue text-void font-medium rounded-lg hover:bg-electric-cyan transition-colors"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
