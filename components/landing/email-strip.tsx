'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  notify: z.boolean(),
})

type FormValues = z.infer<typeof schema>

type EmailStripProps = {
  placeholder?: string
  onSubmitAction: (email: string) => Promise<void>
  variant?: 'inline' | 'floating'
  onDismiss?: () => void
  className?: string
}

export function EmailStrip({
  placeholder = 'you@company.com',
  onSubmitAction,
  variant = 'inline',
  onDismiss,
  className,
}: EmailStripProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { notify: true },
  })

  const [success, setSuccess] = useState(false)
  const isFloating = variant === 'floating'

  const submit = handleSubmit(async (values) => {
    await onSubmitAction(values.email)
    setSuccess(true)
    reset({ email: '', notify: true })
    setTimeout(() => setSuccess(false), 8000)
  })

  return (
    <section
      className={cn(
        'relative rounded-3xl border border-white/15 bg-[rgba(5,8,20,0.95)] p-6 text-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur',
        isFloating
          ? 'pointer-events-auto mx-auto w-full max-w-4xl'
          : 'sticky bottom-6 z-20 mx-auto max-w-4xl',
        className,
      )}
    >
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss early access form"
          onClick={onDismiss}
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-1 text-slate-200 transition hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {success ? (
        <p className="text-center text-sm font-medium text-slate-100" role="status">
          Check your inbox — demo access link sent.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4 md:flex-row md:items-center" aria-live="polite">
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-200" htmlFor="email">
              Get early access
            </label>
            <Input id="email" placeholder={placeholder} aria-invalid={!!errors.email} {...register('email')} />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" className="h-4 w-4 rounded border-white/25 bg-transparent" defaultChecked {...register('notify')} />
            Notify me about product updates
          </label>
          <Button type="submit" disabled={isSubmitting} className="md:w-auto">
            {isSubmitting ? 'Sending…' : 'Get Demo Link'}
          </Button>
        </form>
      )}
    </section>
  )
}
