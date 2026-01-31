'use client'

import { forwardRef, useState, useId } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      success,
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
    const [hasValue, setHasValue] = useState(
      Boolean(props.value || props.defaultValue)
    )

    const isFloating = isFocused || hasValue

    return (
      <div className="relative w-full">
        <div
          className={cn(
            'relative group',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <textarea
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              // Base styles
              'w-full px-4 py-3 rounded bg-void/50 text-plasma-white min-h-[120px] resize-y',
              'border transition-all duration-200 ease-default',
              'placeholder:text-transparent',
              // Default state
              'border-titanium/30',
              // Focus state
              'focus:outline-none focus:border-velex-blue',
              'focus:shadow-[0_0_0_1px_rgba(0,212,255,0.3)]',
              // Error state
              error &&
                'border-stress-red focus:border-stress-red focus:shadow-[0_0_0_1px_rgba(255,59,59,0.3)]',
              // Success state
              success &&
                'border-success-green focus:border-success-green focus:shadow-[0_0_0_1px_rgba(0,255,136,0.3)]',
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
                isFloating
                  ? 'top-0 -translate-y-1/2 text-xs px-1 bg-void'
                  : 'top-4 text-base',
                isFocused && !error && !success && 'text-velex-blue',
                error && 'text-stress-red',
                success && 'text-success-green'
              )}
            >
              {label}
            </label>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-sm text-stress-red">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
