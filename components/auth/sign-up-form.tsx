'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { OAuthButtons } from './oauth-buttons'

type SignUpData = {
  email: string
  password: string
  workspace?: string
  agree: boolean
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  workspace: z.string().optional(),
  agree: z.boolean().refine((val) => val, { message: 'You must accept the terms' }),
})

export function SignUpForm({ onSignUpAction }: { onSignUpAction: (data: SignUpData) => Promise<void> }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(schema),
    defaultValues: { agree: true },
  })

  const [strength, setStrength] = useState(0)

  function evaluate(password: string) {
    let score = 0
    if (password.length >= 8) score += 0.3
    if (/[A-Z]/.test(password)) score += 0.2
    if (/[0-9]/.test(password)) score += 0.2
    if (/[^A-Za-z0-9]/.test(password)) score += 0.3
    setStrength(Math.min(score, 1))
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSignUpAction)}>
      <OAuthButtons />
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="flex-1 border-t border-gray-200" />
        or
        <span className="flex-1 border-t border-gray-200" />
      </div>
      <label className="block text-sm font-medium text-gray-700">
        Work email
        <Input type="email" className="mt-1" {...register('email')} />
        {errors.email && <span className="text-xs text-rose-500">{errors.email.message}</span>}
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Password
        <Input type="password" className="mt-1" {...register('password', { onChange: (e) => evaluate(e.target.value) })} />
        <div className="mt-2 h-1 rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-linear-to-r from-orange-400 to-green-500" style={{ width: `${strength * 100}%` }} />
        </div>
        <span className="text-xs text-gray-500">Password strength: {(strength * 100).toFixed(0)}%</span>
        {errors.password && <span className="text-xs text-rose-500">{errors.password.message}</span>}
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Workspace name (optional)
        <Input className="mt-1" placeholder="Orion Studio" {...register('workspace')} />
      </label>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" {...register('agree')} defaultChecked />
        I agree to Terms
      </label>
      {errors.agree && <span className="text-xs text-rose-500">{errors.agree.message}</span>}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating workspace…' : 'Create workspace'}
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => toast.info('Demo workspace launching with sample data')}
      >
        Continue as demo
      </Button>
    </form>
  )
}
