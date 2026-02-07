'use client'

import { forwardRef, useState, useId } from 'react'
import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'

type InputVariant = 'default' | 'filled'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  variant?: InputVariant
  leftIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      success,
      variant = 'default',
      leftIcon,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId || generatedId
    const errorId = `${id}-error`
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(Boolean(props.value || props.defaultValue))

    const isFloating = isFocused || hasValue

    return (
      <div className="relative w-full">
        {/* Input container */}
        <div
          className={cn(
            'relative group',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-titanium pointer-events-none z-10">
              {leftIcon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              // Base styles
              'w-full px-4 py-3 rounded bg-void/50 text-plasma-white',
              'border transition-all duration-200 ease-default',
              'placeholder:text-transparent',
              // Default state
              'border-titanium/30',
              // Focus state - the satisfying lift
              'focus:outline-none focus:border-ixra-blue focus:-translate-y-px',
              'focus:shadow-[0_0_0_1px_rgba(0,212,255,0.3)]',
              'motion-reduce:focus:translate-y-0',
              // Filled variant
              variant === 'filled' && 'bg-void/80',
              // Error state
              error && 'border-stress-red focus:border-stress-red focus:shadow-[0_0_0_1px_rgba(255,59,59,0.3)]',
              // Success state
              success && 'border-success-green focus:border-success-green focus:shadow-[0_0_0_1px_rgba(0,255,136,0.3)]',
              // Left icon padding
              leftIcon && 'pl-10',
              // Right padding for status icons
              (error || success) && 'pr-10',
              className
            )}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              setHasValue(Boolean(e.target.value))
              props.onBlur?.(e)
            }}
            onChange={(e) => {
              setHasValue(Boolean(e.target.value))
              props.onChange?.(e)
            }}
            {...props}
          />

          {/* Floating label */}
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'absolute left-4 transition-all duration-200 ease-default pointer-events-none',
                'text-titanium',
                leftIcon && 'left-10',
                isFloating
                  ? 'top-0 -translate-y-1/2 text-xs px-1 bg-void'
                  : 'top-1/2 -translate-y-1/2 text-base',
                isFocused && !error && !success && 'text-ixra-blue',
                error && 'text-stress-red',
                success && 'text-success-green'
              )}
            >
              {label}
            </label>
          )}

          {/* Status icons */}
          {success && !error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success-green animate-in fade-in duration-200">
              <Check size={18} />
            </div>
          )}
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stress-red animate-in fade-in duration-200">
              <X size={18} />
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-sm text-stress-red"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
