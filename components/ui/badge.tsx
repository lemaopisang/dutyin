import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

export function Badge({ className, style, ...props }: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide',
        className,
      )}
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-surface-soft)',
        color: 'var(--color-muted)',
        ...style,
      }}
      {...props}
    />
  )
}
