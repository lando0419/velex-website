'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  SOUND_SPRITES,
  SOUND_SPRITE_PATH,
  SOUND_STORAGE_KEY,
  type SoundName,
} from '@/lib/sounds'

interface UseSoundReturn {
  playSound: (name: SoundName) => void
  toggleSound: () => void
  isSoundEnabled: boolean
  isLoaded: boolean
}

// Helper to read localStorage without causing hydration issues
function getStoredSoundPreference(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(SOUND_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

// Subscribe function for useSyncExternalStore
function subscribeToStorage(callback: () => void): () => void {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

/**
 * Hook for playing UI sounds
 * Sound is OFF by default - user must enable
 * Gracefully handles missing audio files and blocked audio
 */
export function useSound(): UseSoundReturn {
  // Use useSyncExternalStore for localStorage to avoid effect state updates
  const storedPreference = useSyncExternalStore(
    subscribeToStorage,
    getStoredSoundPreference,
    () => false // Server snapshot
  )

  const [isSoundEnabled, setIsSoundEnabled] = useState(storedPreference)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize audio when enabled
  useEffect(() => {
    if (!isSoundEnabled || typeof window === 'undefined') return

    const initAudio = async () => {
      try {
        // Create audio element for the sprite
        const audio = new Audio()
        audio.src = SOUND_SPRITE_PATH
        audio.preload = 'auto'

        // Wait for it to be ready
        await new Promise<void>((resolve, reject) => {
          audio.oncanplaythrough = () => resolve()
          audio.onerror = () => reject(new Error('Failed to load audio'))
          // Timeout after 3 seconds
          setTimeout(() => resolve(), 3000)
        })

        audioRef.current = audio
        setIsLoaded(true)
      } catch {
        // Audio failed to load, disable silently
        setIsLoaded(false)
      }
    }

    initAudio()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [isSoundEnabled])

  const playSound = useCallback(
    (name: SoundName) => {
      if (!isSoundEnabled || !isLoaded || !audioRef.current) return

      const sprite = SOUND_SPRITES[name]
      if (!sprite) return

      try {
        const audio = audioRef.current

        // Clone the audio for overlapping sounds
        const clone = audio.cloneNode() as HTMLAudioElement
        clone.currentTime = sprite.start
        clone.volume = 0.3 // Keep sounds subtle

        // Stop after duration
        const stopTimeout = setTimeout(() => {
          clone.pause()
          clone.remove()
        }, sprite.duration * 1000 + 50)

        clone.play().catch(() => {
          // Audio play failed (autoplay policy), ignore silently
          clearTimeout(stopTimeout)
        })
      } catch {
        // Any error, fail silently
      }
    },
    [isSoundEnabled, isLoaded]
  )

  const toggleSound = useCallback(() => {
    const newValue = !isSoundEnabled
    setIsSoundEnabled(newValue)

    try {
      localStorage.setItem(SOUND_STORAGE_KEY, String(newValue))
    } catch {
      // localStorage not available
    }

    // Initialize AudioContext on user gesture (required for Web Audio)
    if (newValue && !audioContextRef.current) {
      try {
        audioContextRef.current = new AudioContext()
      } catch {
        // AudioContext not available
      }
    }
  }, [isSoundEnabled])

  return {
    playSound,
    toggleSound,
    isSoundEnabled,
    isLoaded,
  }
}
