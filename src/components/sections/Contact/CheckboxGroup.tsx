'use client'

import { cn } from '@/lib/utils'

interface CheckboxOption {
  id: string
  label: string
}

interface CheckboxGroupProps {
  label: string
  options: CheckboxOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  disabled?: boolean
}

export function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  disabled = false,
}: CheckboxGroupProps) {
  const handleToggle = (id: string) => {
    if (disabled) return

    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm text-titanium">{label}</label>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleToggle(option.id)}
            disabled={disabled}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
              'border',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-1 focus-visible:ring-offset-void',
              disabled && 'opacity-50 cursor-not-allowed',
              selected.includes(option.id)
                ? 'bg-velex-blue text-void border-velex-blue'
                : 'bg-transparent text-titanium border-titanium/30 hover:border-titanium/50'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
