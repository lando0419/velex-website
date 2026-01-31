'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useSound } from '@/hooks/useSound'
import type { SoundName } from '@/lib/sounds'

interface SoundContextValue {
  playSound: (name: SoundName) => void
  toggleSound: () => void
  isSoundEnabled: boolean
  isLoaded: boolean
}

const SoundContext = createContext<SoundContextValue | null>(null)

interface SoundProviderProps {
  children: ReactNode
}

/**
 * Provider for sound functionality across the app
 * Sound is OFF by default
 */
export function SoundProvider({ children }: SoundProviderProps) {
  const sound = useSound()

  return (
    <SoundContext.Provider value={sound}>
      {children}
    </SoundContext.Provider>
  )
}

/**
 * Hook to access sound context
 * Returns a no-op version if used outside provider
 */
export function useSoundContext(): SoundContextValue {
  const context = useContext(SoundContext)

  // Return no-op fallback if not in provider
  if (!context) {
    return {
      playSound: () => {},
      toggleSound: () => {},
      isSoundEnabled: false,
      isLoaded: false,
    }
  }

  return context
}
