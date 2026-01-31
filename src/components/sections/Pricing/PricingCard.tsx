'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PricingTier } from './PricingSection'

interface PricingCardProps {
  tier: PricingTier
}

export function PricingCard({ tier }: PricingCardProps) {
  return (
    <motion.div
      className={cn(
        'relative h-full rounded-xl p-6 border transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void',
        tier.highlighted
          ? 'bg-velex-blue/5 border-velex-blue/50'
          : 'bg-void border-titanium/20 hover:border-titanium/40'
      )}
      tabIndex={0}
      whileHover={{ y: -4 }}
      whileFocus={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Highlighted badge */}
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 text-xs font-medium text-void bg-velex-blue rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier Name */}
      <h3 className="font-headline text-xl text-plasma-white mb-2">
        {tier.name}
      </h3>

      {/* Price Range */}
      <p className={cn(
        'font-numbers text-3xl mb-6',
        tier.highlighted ? 'text-velex-blue' : 'text-plasma-white'
      )}>
        {tier.priceRange}
      </p>

      {/* Features */}
      <ul className="space-y-3">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className={cn(
              'w-5 h-5 flex-shrink-0 mt-0.5',
              tier.highlighted ? 'text-velex-blue' : 'text-success-green'
            )} />
            <span className="text-sm text-titanium">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
