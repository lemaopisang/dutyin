'use client'

import { Slot } from '@radix-ui/react-slot'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = {
  primary:
    'text-ink-dark bg-[var(--color-primary)] hover:bg-[var(--color-primary-strong)] focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--color-secondary)]/30 disabled:opacity-60 disabled:cursor-not-allowed',
  secondary:
    'border border-white/25 text-[var(--color-heading)] hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--color-secondary)]/30 disabled:opacity-60 disabled:cursor-not-allowed',
  ghost:
    'text-slate-100 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--color-secondary)]/30 disabled:opacity-60 disabled:cursor-not-allowed',
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean
  variant?: keyof typeof buttonVariants
}

export const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
  ({ className, asChild = false, variant = 'primary', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none',
          buttonVariants[variant],
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
