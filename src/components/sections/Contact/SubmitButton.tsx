'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubmitButtonProps {
  isLoading: boolean
  disabled?: boolean
}

export function SubmitButton({ isLoading, disabled = false }: SubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      disabled={disabled || isLoading}
      className={cn(
        'w-full py-4 rounded-lg font-medium text-lg transition-all',
        'bg-velex-blue text-void',
        'hover:bg-electric-cyan',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-velex-blue focus:ring-offset-2 focus:ring-offset-void'
      )}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Sending...
        </span>
      ) : (
        'Request Quote'
      )}
    </motion.button>
  )
}
