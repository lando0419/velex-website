'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { useChat } from '@/hooks/useChat'

interface ChatWindowProps {
  onClose?: () => void
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  void onClose // Available for future header close button
  const { messages, isTyping, sendMessage, transferToForm } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex flex-col h-[500px] max-h-[70vh] rounded-xl border border-titanium/20 bg-void/95 backdrop-blur-md shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-titanium/20 bg-void/50">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-ixra-blue/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-ixra-blue" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-green rounded-full border-2 border-void" />
        </div>
        <div>
          <h3 className="font-headline text-sm text-plasma-white">IXRA Assistant</h3>
          <p className="text-xs text-success-green">Online - Ready to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onTransferToForm={message.showTransfer ? transferToForm : undefined}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-titanium"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 bg-ixra-blue rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            <span className="text-xs">IXRA is thinking...</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isTyping} />
    </div>
  )
}
