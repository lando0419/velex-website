'use client'

import { useState, useCallback } from 'react'
import type { Message } from '@/components/chat/ChatMessage'
import type { EstimateData } from '@/components/chat/EstimateCard'

interface UseChatReturn {
  messages: Message[]
  isTyping: boolean
  sendMessage: (content: string) => void
  transferToForm: () => void
}

// Mock responses - replace with actual API later
const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm the IXRA assistant. Tell me about your project and I'll help you scope it out with cost, timeline, and material recommendations.",
  timestamp: new Date(),
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function analyzeUserMessage(content: string): { response: string; estimate?: EstimateData; showTransfer?: boolean } {
  const lowerContent = content.toLowerCase()

  // Check for keywords to generate contextual responses
  const hasCAD = lowerContent.includes('cad') || lowerContent.includes('file') || lowerContent.includes('model')
  const hasBracket = lowerContent.includes('bracket') || lowerContent.includes('mount')
  const hasEnclosure = lowerContent.includes('enclosure') || lowerContent.includes('housing') || lowerContent.includes('case')
  const hasMaterial = lowerContent.includes('aluminum') || lowerContent.includes('steel') || lowerContent.includes('carbon') || lowerContent.includes('plastic')
  const hasLoad = /\d+\s*(kg|lb|n|newton)/i.test(content)
  const hasSize = /\d+\s*(mm|cm|inch|")/i.test(content)

  // If user has CAD files
  if (hasCAD && (lowerContent.includes('have') || lowerContent.includes('already') || lowerContent.includes('got'))) {
    return {
      response: "Great, you already have CAD files! That means we can offer our Simulation-Only service at a lower cost. What type of analysis do you need? (structural, thermal, CFD, or multi-physics)",
    }
  }

  // If enough info for an estimate (bracket example)
  if ((hasBracket || hasEnclosure) && (hasMaterial || hasLoad)) {
    const isComplex = hasEnclosure || lowerContent.includes('assembly') || lowerContent.includes('multiple')
    const baseCost = isComplex ? 4500 : 3200
    const estimate: EstimateData = {
      title: hasBracket ? 'Custom Bracket Design' : 'Enclosure Design',
      costRange: { low: baseCost, high: Math.round(baseCost * 1.3) },
      timeline: isComplex ? '7-10 business days' : '5-7 business days',
      weight: hasMaterial && lowerContent.includes('aluminum') ? '~85g (6061-T6 Al)' : '~120g (estimated)',
      material: lowerContent.includes('aluminum') ? '6061-T6 Aluminum' : lowerContent.includes('steel') ? '304 Stainless Steel' : 'Material TBD',
      materialReason: lowerContent.includes('aluminum') ? 'Best strength-to-weight for your application' : 'We can recommend optimal material during consultation',
      successRate: hasLoad ? 94 : 88,
      suggestion: lowerContent.includes('aluminum') ? {
        text: 'Consider 7075-T6 for 15% more strength',
        costDelta: '+$200',
      } : undefined,
    }

    return {
      response: "Here's your project estimate based on what you've described:",
      estimate,
      showTransfer: true,
    }
  }

  // Ask clarifying questions
  if (hasBracket || hasEnclosure) {
    const questions: string[] = []
    if (!hasMaterial) questions.push('What material are you considering? (aluminum, steel, carbon fiber, etc.)')
    if (!hasLoad) questions.push('What loads or forces will it experience?')
    if (!hasSize) questions.push('Approximately what size/dimensions?')

    return {
      response: `Got it, ${hasBracket ? 'a bracket' : 'an enclosure'} design! A few questions to help me estimate:\n\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`,
    }
  }

  // Generic project inquiry
  if (lowerContent.includes('project') || lowerContent.includes('design') || lowerContent.includes('build') || lowerContent.includes('need')) {
    return {
      response: "I'd love to help scope your project. Can you tell me:\n\n1. What are you trying to build? (bracket, enclosure, mechanism, etc.)\n2. What material do you have in mind?\n3. Any load/stress requirements?\n4. Do you have existing CAD files, or do you need design from scratch?",
    }
  }

  // Fallback
  return {
    response: "Tell me more about what you're looking to build. For example:\n\n• \"I need an aluminum bracket for 50kg load\"\n• \"Design an enclosure for my electronics\"\n• \"I have CAD files that need simulation\"",
  }
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = useCallback((content: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const { response, estimate, showTransfer } = analyzeUserMessage(content)
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        estimate,
        showTransfer,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 500)
  }, [])

  const transferToForm = useCallback(() => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }

    // Add confirmation message
    const confirmMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: "I've scrolled you to the contact form. Your project details have been noted - just fill in your contact info and we'll be in touch within 24 hours!",
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
