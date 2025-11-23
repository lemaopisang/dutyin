import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDeadline(iso?: string) {
  if (!iso) return 'No deadline'
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function confidenceToLabel(score: number) {
  if (score >= 0.85) return 'High'
  if (score >= 0.65) return 'Medium'
  return 'Low'
}
