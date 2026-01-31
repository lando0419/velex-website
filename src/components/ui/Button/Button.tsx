'use client'

import { forwardRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from '../Spinner'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface RippleStyle {
  left: number
  top: number
  width: number
  height: number
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  enableRipple?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-velex-blue text-void hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] active:shadow-none focus-visible:ring-velex-blue',
  secondary:
    'bg-transparent border border-velex-blue/50 text-velex-blue hover:bg-velex-blue/10 hover:border-velex-blue hover:scale-[1.02] active:scale-[0.98] active:bg-velex-blue/20 focus-visible:ring-velex-blue',
  ghost:
    'bg-transparent text-plasma-white hover:bg-plasma-white/10 hover:scale-[1.02] active:scale-[0.98] active:bg-plasma-white/5 focus-visible:ring-plasma-white',
  danger:
    'bg-stress-red text-plasma-white hover:bg-stress-red/90 hover:scale-[1.02] active:scale-[0.98] active:bg-stress-red/80 focus-visible:ring-stress-red',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      enableRipple = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading
    const [ripples, setRipples] = useState<RippleStyle[]>([])

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (enableRipple && !isDisabled) {
          const button = e.currentTarget
          const rect = button.getBoundingClientRect()
          const size = Math.max(rect.width, rect.height) * 2
          const x = e.clientX - rect.left - size / 2
          const y = e.clientY - rect.top - size / 2

          const newRipple: RippleStyle = {
            left: x,
            top: y,
            width: size,
            height: size,
          }

          setRipples((prev) => [...prev, newRipple])

          // Remove ripple after animation
          setTimeout(() => {
            setRipples((prev) => prev.slice(1))
          }, 600)
        }

        onClick?.(e)
      },
      [enableRipple, isDisabled, onClick]
    )

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'relative overflow-hidden inline-flex items-center justify-center font-body font-medium rounded',
          'transition-all duration-150 ease-default',
          'motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-void',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Disabled state
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        disabled={isDisabled}
        aria-busy={isLoading}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple effects */}
        {ripples.map((ripple, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-current opacity-20 animate-ripple pointer-events-none"
            style={{
              left: ripple.left,
              top: ripple.top,
              width: ripple.width,
              height: ripple.height,
            }}
          />
        ))}

        {isLoading ? (
          <Spinner size="sm" className="text-current" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
