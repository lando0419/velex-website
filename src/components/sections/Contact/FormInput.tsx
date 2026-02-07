'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormInputProps {
  label: string
  name: string
  type?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export function FormInput({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  error,
  disabled = false,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  const isValid = isTouched && !error && value.length > 0
  const showError = isTouched && error

  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block text-sm text-titanium"
      >
        {label}
        {required && <span className="text-stress-red ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false)
            setIsTouched(true)
          }}
          disabled={disabled}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-void border transition-all duration-200',
            'text-plasma-white placeholder-titanium/50',
            'focus:outline-none',
            disabled && 'opacity-50 cursor-not-allowed',
            isFocused && 'border-ixra-blue shadow-[0_0_10px_rgba(0,212,255,0.2)]',
            showError && 'border-stress-red',
            isValid && 'border-success-green',
            !isFocused && !showError && !isValid && 'border-titanium/30 hover:border-titanium/50'
          )}
        />

        {/* Validation icon */}
        {isTouched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {isValid ? (
              <Check className="w-5 h-5 text-success-green" />
            ) : showError ? (
              <X className="w-5 h-5 text-stress-red" />
            ) : null}
          </motion.div>
        )}
      </div>

      {/* Error message */}
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-stress-red"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
