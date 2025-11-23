'use client'

import { Button } from '@/components/ui/button'
import { Chrome, PanelsTopLeft } from 'lucide-react'
import { toast } from 'sonner'

const providers = [
  { id: 'google', label: 'Continue with Google', icon: Chrome },
  { id: 'microsoft', label: 'Continue with Microsoft', icon: PanelsTopLeft },
]

export function OAuthButtons() {
  return (
    <div className="grid gap-3">
      {providers.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="secondary"
          className="flex items-center gap-2"
          onClick={() => toast.success(`Redirecting to ${provider.label}`)}
        >
          <provider.icon className="h-4 w-4" />
          {provider.label}
        </Button>
      ))}
    </div>
  )
}
