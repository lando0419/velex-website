'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type CardVariant = 'base' | 'interactive' | 'featured'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  as?: 'div' | 'article' | 'section'
}

const variantStyles: Record<CardVariant, string> = {
  base: 'bg-void/50 border border-titanium/20 shadow-lg',
  interactive:
    'bg-void/50 border border-titanium/20 shadow-lg cursor-pointer transition-all duration-300 ease-default hover:-translate-y-1 hover:shadow-xl hover:border-titanium/40 active:scale-[0.99] active:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ixra-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
  featured:
    'bg-void/80 border border-ixra-blue/30 shadow-lg shadow-ixra-blue/10 transition-all duration-300 ease-default hover:border-ixra-blue/50 hover:shadow-ixra-blue/20',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'base', as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg p-6',
          // Variant styles
          variantStyles[variant],
          className
        )}
        tabIndex={variant === 'interactive' ? 0 : undefined}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Card.displayName = 'Card'

// Card subcomponents for structured content
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('text-xl font-headline text-plasma-white', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-titanium text-sm mt-1', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 flex items-center gap-2', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'
