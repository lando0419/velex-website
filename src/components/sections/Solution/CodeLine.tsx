'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface CodeLineProps {
  lineNumber: number
  text: string
  isComment?: boolean
  animate?: boolean
}

// Simple Python syntax highlighting
function highlightSyntax(text: string, isComment?: boolean): React.ReactNode {
  if (isComment || text.startsWith('#')) {
    return <span className="text-titanium/60">{text}</span>
  }

  if (!text) {
    return '\u00A0'
  }

  // Build highlighted parts
  const parts: React.ReactNode[] = []
  let key = 0

  // Keywords
  const keywords = ['from', 'import', 'as', 'def', 'return', 'class']
  // Functions/methods
  const functions = ['simulate', 'print', 'open']

  // Simple tokenizer - split by spaces and special chars
  const tokens = text.split(/(\s+|"[^"]*"|[()=,])/g).filter(Boolean)

  tokens.forEach((token) => {
    if (token.startsWith('"') && token.endsWith('"')) {
      // String literal
      parts.push(
        <span key={key++} className="text-success-green">
          {token}
        </span>
      )
    } else if (keywords.includes(token)) {
      // Keyword
      parts.push(
        <span key={key++} className="text-deep-purple">
          {token}
        </span>
      )
    } else if (functions.includes(token)) {
      // Function
      parts.push(
        <span key={key++} className="text-velex-blue">
          {token}
        </span>
      )
    } else {
      // Regular text
      parts.push(
        <span key={key++} className="text-plasma-white">
          {token}
        </span>
      )
    }
  })

  return <>{parts}</>
}

export function CodeLine({ lineNumber, text, isComment, animate }: CodeLineProps) {
  const [displayedText, setDisplayedText] = useState(animate ? '' : text)

  useEffect(() => {
    if (!animate || !text) {
      setDisplayedText(text)
      return
    }

    let index = 0
    const speed = 1000 / 70 // ~70 chars/sec

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [animate, text])

  return (
    <div className="flex leading-6">
      <span className="w-8 text-right pr-4 text-titanium/40 select-none">
        {lineNumber}
      </span>
      <span className={cn('flex-1', isComment && 'text-titanium/60')}>
        {displayedText ? highlightSyntax(displayedText, isComment) : '\u00A0'}
      </span>
    </div>
  )
}
