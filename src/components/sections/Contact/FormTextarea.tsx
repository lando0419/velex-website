'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FormTextareaProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  rows?: number
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  disabled = false,
  rows = 4,
}: FormTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block text-sm text-titanium"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        rows={rows}
        className={cn(
          'w-full px-4 py-3 rounded-lg bg-void border transition-all duration-200',
          'text-plasma-white placeholder-titanium/50 resize-none',
          'focus:outline-none',
          disabled && 'opacity-50 cursor-not-allowed',
          isFocused
            ? 'border-ixra-blue shadow-[0_0_10px_rgba(0,212,255,0.2)]'
            : 'border-titanium/30 hover:border-titanium/50'
        )}
      />
    </div>
  )
}
