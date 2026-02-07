'use client'

import { motion } from 'framer-motion'

export function LoadingIndicator() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing logo */}
        <motion.div
          className="font-headline text-xl tracking-[0.2em] text-ixra-blue"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          IXRA
        </motion.div>

        {/* Loading bar */}
        <div className="w-32 h-0.5 bg-titanium/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-ixra-blue rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
