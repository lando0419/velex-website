import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

type IconSize = 'sm' | 'md' | 'lg' | 'xl'

interface IconProps {
  icon: LucideIcon
  size?: IconSize
  className?: string
  label?: string
}

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

export function Icon({ icon: LucideIcon, size = 'md', className, label }: IconProps) {
  const pixelSize = sizeMap[size]

  return (
    <LucideIcon
      size={pixelSize}
      className={cn('flex-shrink-0', className)}
      aria-hidden={!label}
      aria-label={label}
    />
  )
}
