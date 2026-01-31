'use client'

import { motion } from 'framer-motion'
import { User, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EstimateCard, type EstimateData } from './EstimateCard'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  estimate?: EstimateData
  showTransfer?: boolean
}

interface ChatMessageProps {
  message: Message
  onTransferToForm?: () => void
}

export function ChatMessage({ message, onTransferToForm }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex gap-3', isUser && 'flex-row-reverse')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser ? 'bg-titanium/20' : 'bg-velex-blue/20'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-titanium" />
        ) : (
          <Sparkles className="w-4 h-4 text-velex-blue" />
        )}
      </div>

      {/* Content */}
      <div className={cn('flex-1 max-w-[280px]', isUser && 'flex flex-col items-end')}>
        <div
          className={cn(
            'px-4 py-2.5 rounded-2xl text-sm',
            isUser
              ? 'bg-velex-blue text-void rounded-br-md'
              : 'bg-titanium/10 text-plasma-white rounded-bl-md'
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Estimate Card */}
        {message.estimate && (
          <div className="mt-3">
            <EstimateCard data={message.estimate} />
          </div>
        )}

        {/* Transfer to form button */}
        {message.showTransfer && onTransferToForm && (
          <motion.button
            onClick={onTransferToForm}
            className={cn(
              'mt-3 flex items-center gap-2 px-4 py-2 rounded-lg',
              'bg-velex-blue/10 text-velex-blue text-sm font-medium',
              'hover:bg-velex-blue/20 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue'
            )}
            whileHover={{ x: 4 }}
          >
            Start Project
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-titanium/50 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  )
}
