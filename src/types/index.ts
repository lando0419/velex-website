/**
 * IXRA Shared TypeScript Types
 */

export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type Size = 'sm' | 'md' | 'lg'
export type Status = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}
