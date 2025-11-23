'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Checkbox({ className, ...props }: CheckboxPrimitive.CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-white text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="h-4 w-4 text-gray-900" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
