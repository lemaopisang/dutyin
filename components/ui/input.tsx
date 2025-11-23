'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
  'w-full rounded-xl border border-white/15 bg-[rgba(8,11,26,0.85)] px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-[#9397ff] focus:outline-none focus:ring-2 focus:ring-[#9397ff]/30',
        className,
      )}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
