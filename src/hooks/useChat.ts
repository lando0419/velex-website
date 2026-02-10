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
  content: "Hey — I'm the IXRA assistant. Tell me what you're building and I'll help scope it out.",
  timestamp: new Date(),
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function callChatAPI(history: { role: string; content: string }[]): Promise<string> {
  const res = await fetchWithTimeout('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: history }),
  }, 25000)

  const data = await res.json()
  return data.content || data.error || ''
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [isTyping, setIsTyping] = useState(false)
  const activeRef = useRef(false)

  const sendMessage = useCallback(async (content: string) => {
    if (activeRef.current) return
    activeRef.current = true

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    const history = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }))

    let responseContent = ''

    // Try up to 2 times
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        responseContent = await callChatAPI(history)
        if (responseContent) break
      } catch {
        if (attempt === 1) break
      }
    }

    setIsTyping(false)
    activeRef.current = false

    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: 'assistant',
        content: responseContent || 'Response failed. Try again or email LandonKancir@Ixra.tech.',
        timestamp: new Date(),
      },
    ])
  }, [messages])

  const transferToForm = useCallback(() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }

    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: 'assistant',
        content: "Scrolled you to the contact form. Fill in your info and we'll get back to you within 24 hours.",
        timestamp: new Date(),
      },
    ])
  }, [])

  return {
    messages,
    isTyping,
    sendMessage,
    transferToForm,
  }
}
