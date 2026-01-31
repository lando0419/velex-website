'use client'

import { motion } from 'framer-motion'

interface EnergyLineProps {
  isActive: boolean
  delay: number
  orientation: 'horizontal' | 'vertical'
}

export function EnergyLine({ isActive, delay, orientation }: EnergyLineProps) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      className={
        isHorizontal
          ? 'flex-1 h-0.5 mx-4 relative hidden lg:block'
          : 'w-0.5 h-12 my-2 relative lg:hidden mx-auto'
      }
    >
      {/* Background track */}
      <div
        className={`absolute ${
          isHorizontal ? 'inset-x-0 h-full' : 'inset-y-0 w-full'
        } bg-titanium/20 rounded-full`}
      />

      {/* Animated energy line */}
      <motion.div
        className={`absolute ${
          isHorizontal ? 'h-full left-0' : 'w-full top-0'
        } bg-gradient-to-r from-velex-blue to-electric-cyan rounded-full`}
        initial={isHorizontal ? { width: 0 } : { height: 0 }}
        animate={
          isActive
            ? isHorizontal
              ? { width: '100%' }
              : { height: '100%' }
            : {}
        }
        transition={{
          duration: 0.6,
          delay,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          boxShadow: isActive ? '0 0 10px rgba(0, 212, 255, 0.5)' : 'none',
        }}
      />

      {/* Traveling glow particle */}
      {isActive && (
        <motion.div
          className={`absolute ${
            isHorizontal ? 'w-4 h-full -left-2' : 'h-4 w-full -top-2'
          }`}
          initial={isHorizontal ? { x: 0, opacity: 0 } : { y: 0, opacity: 0 }}
          animate={
            isHorizontal
              ? { x: ['0%', '2500%'], opacity: [0, 1, 1, 0] }
              : { y: ['0%', '400%'], opacity: [0, 1, 1, 0] }
          }
          transition={{
            duration: 0.8,
            delay: delay + 0.1,
            ease: 'easeOut',
          }}
        >
          <div
            className={`${
              isHorizontal ? 'w-2 h-full' : 'h-2 w-full'
            } bg-electric-cyan rounded-full blur-sm`}
          />
        </motion.div>
      )}
    </div>
  )
}
