import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

export function Card({ className, style, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'rounded-3xl border p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur',
        className,
      )}
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-card)', ...style }}
      {...props}
    />
  )
}
