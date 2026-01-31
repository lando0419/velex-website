'use client'

import { useSyncExternalStore } from 'react'

// WebGL support check
function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch {
    return false
  }
}

function checkIsMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// These values don't change after initial load, so simple subscribe
function subscribe() {
  return () => {}
}

function getWebGLSnapshot() {
  return checkWebGLSupport()
}

function getMobileSnapshot() {
  return checkIsMobile()
}

function getServerSnapshot() {
  return true // Assume supported on server
}

function getMobileServerSnapshot() {
  return false // Assume desktop on server
}

export function useWebGL() {
  const isSupported = useSyncExternalStore(
    subscribe,
    getWebGLSnapshot,
    getServerSnapshot
  )
  const isMobile = useSyncExternalStore(
    subscribe,
    getMobileSnapshot,
    getMobileServerSnapshot
  )

  return { isSupported, isMobile }
}
