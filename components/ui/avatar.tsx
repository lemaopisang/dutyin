'use client'

import { cn } from '@/lib/utils'

const colors = ['bg-blue-500', 'bg-purple-500', 'bg-rose-500', 'bg-emerald-500']

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  const color = colors[name.length % colors.length]

  return (
    <div
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold uppercase text-white',
        color,
        className,
      )}
    >
      {initials}
    </div>
  )
}

export function AvatarGroup({
  people,
  className,
}: {
  people: { id: string; name: string }[]
  className?: string
}) {
  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {people.map((person) => (
        <Avatar key={person.id} name={person.name} className="ring-2 ring-white" />
      ))}
    </div>
  )
}
