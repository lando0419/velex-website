/**
 * Sound Sprite Definitions
 * Section 27: Sound Design System
 *
 * Note: Sound is OFF by default. User must enable.
 * Total sound file size target: < 100KB
 */

export type SoundName = 'hover' | 'click' | 'success' | 'error' | 'transition'

interface SoundSprite {
  start: number
  duration: number
}

// Sound sprite timing (offsets into combined audio file)
// These would map to a single ui-sounds.mp3 sprite file
export const SOUND_SPRITES: Record<SoundName, SoundSprite> = {
  hover: { start: 0, duration: 0.01 }, // 10ms soft tick
  click: { start: 0.02, duration: 0.05 }, // 50ms satisfying pop
  success: { start: 0.1, duration: 0.2 }, // 200ms celebration chime
  error: { start: 0.35, duration: 0.15 }, // 150ms subtle warning
  transition: { start: 0.55, duration: 0.1 }, // 100ms whoosh
}

// Path to the combined sound sprite file
export const SOUND_SPRITE_PATH = '/sounds/ui-sounds.mp3'

// Local storage key for sound preference
export const SOUND_STORAGE_KEY = 'velex-sound-enabled'
