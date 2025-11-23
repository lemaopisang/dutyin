'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List
    className={cn(
      'inline-flex items-center rounded-full border border-gray-200 bg-white/80 p-1 text-sm text-gray-500',
      className,
    )}
    {...props}
  />
)

export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex min-w-[120px] items-center justify-center rounded-full px-4 py-1.5 font-medium transition-all data-[state=active]:bg-gray-900 data-[state=active]:text-white',
      className,
    )}
    {...props}
  />
)

export const TabsContent = ({ className, ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content className={cn('mt-6', className)} {...props} />
)
