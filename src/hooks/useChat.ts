'use client'

import { useState, useCallback, useRef } from 'react'
import type { Message } from '@/components/chat/ChatMessage'

interface UseChatReturn {
  messages: Message[]
  isTyping: boolean
  sendMessage: (content: string) => void
  transferToForm: () => void
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hey — I'm the IXRA assistant. Tell me what you're building and I'll scope it out with cost, timeline, and material recommendations.",
  timestamp: new Date(),
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [isTyping, setIsTyping] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    const assistantId = generateId()
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Build conversation history for API (exclude welcome metadata)
    const history = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        throw new Error('API request failed')
      }

      const data = await res.json()
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { ...assistantMessage, content: data.content },
      ])
    } catch (error) {
      if ((error as Error).name === 'AbortError') return

      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: "Something went wrong. Try again, or reach out directly at LandonKancir@Ixra.tech.",
          timestamp: new Date(),
        },
      ])
    }
  }, [messages])

  const transferToForm = useCallback(() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }

    const confirmMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: "Scrolled you to the contact form. Fill in your info and we'll get back to you within 24 hours.",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, confirmMessage])
  }, [])

  return {
    messages,
    isTyping,
    sendMessage,
    transferToForm,
  }
}
