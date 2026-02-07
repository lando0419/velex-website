'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [value])

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-titanium/20 p-3">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your project..."
          disabled={disabled}
          rows={1}
          className={cn(
            'flex-1 resize-none px-4 py-2.5 rounded-xl',
            'bg-titanium/10 border border-titanium/20',
            'text-sm text-plasma-white placeholder-titanium/50',
            'focus:outline-none focus:border-ixra-blue/50 focus:bg-titanium/5',
            'transition-colors duration-200',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
        <motion.button
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-xl',
            'flex items-center justify-center',
            'bg-ixra-blue text-void',
            'hover:bg-electric-cyan',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ixra-blue',
            'transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-ixra-blue'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
      <p className="text-[10px] text-titanium/40 mt-2 px-1">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  )
}
