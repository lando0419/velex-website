'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CodeLine } from './CodeLine'

interface CodeEditorProps {
  isActive: boolean
  onComplete: () => void
}

const CODE_LINES = [
  { text: 'from velex import engineer', delay: 0 },
  { text: '', delay: 0.3 },
  { text: 'project = engineer.create("concept.brief")', delay: 0.6 },
  { text: 'project.design()    # CAD generation', delay: 1.0, isComment: false },
  { text: 'project.simulate()  # GPU analysis', delay: 1.4, isComment: false },
  { text: '# Validating...', delay: 1.8, isComment: true },
]

export function CodeEditor({ isActive, onComplete }: CodeEditorProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [typingComplete, setTypingComplete] = useState(false)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (!isActive || hasStartedRef.current) return
    hasStartedRef.current = true

    const timeouts: NodeJS.Timeout[] = []

    // Reveal lines progressively
    CODE_LINES.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(index + 1)
        if (index === CODE_LINES.length - 1) {
          const completeTimeout = setTimeout(() => {
            setTypingComplete(true)
            onComplete()
          }, 1500)
          timeouts.push(completeTimeout)
        }
      }, line.delay * 1000)
      timeouts.push(timeout)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [isActive, onComplete])

  return (
    <div className="rounded-lg border border-titanium/20 bg-[#0d1117] overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-titanium/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-stress-red/80" />
          <div className="w-3 h-3 rounded-full bg-warning-orange/80" />
          <div className="w-3 h-3 rounded-full bg-success-green/80" />
        </div>
        <span className="text-xs text-titanium ml-2 font-code">
          project.py
        </span>
      </div>

      {/* Code Content */}
      <div className="p-4 font-code text-sm min-h-[200px]">
        {CODE_LINES.slice(0, visibleLines).map((line, index) => (
          <CodeLine
            key={index}
            lineNumber={index + 1}
            text={line.text}
            isComment={line.isComment}
            animate={index === visibleLines - 1}
          />
        ))}

        {/* Blinking cursor */}
        {!typingComplete && visibleLines > 0 && (
          <motion.span
            className="inline-block w-2 h-5 bg-velex-blue ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
      </div>
    </div>
  )
}
