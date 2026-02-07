import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
type BadgeSize = 'sm' | 'md'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-titanium/20 text-titanium border-titanium/30',
  success: 'bg-success-green/20 text-success-green border-success-green/30',
  warning: 'bg-warning-orange/20 text-warning-orange border-warning-orange/30',
  error: 'bg-stress-red/20 text-stress-red border-stress-red/30',
  info: 'bg-ixra-blue/20 text-ixra-blue border-ixra-blue/30',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
}
