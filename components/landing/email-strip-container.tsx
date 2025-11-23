'use client'

import { useEffect, useState } from 'react'
import { EmailStrip } from './email-strip'
import { toast } from 'sonner'

export function EmailStripContainer() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  async function handleSubmit(email: string) {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    toast.success('Demo link sent to ' + email)
  }

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex flex-col items-center gap-3 px-4 sm:bottom-6">
      {isOpen ? (
        <EmailStrip
          variant="floating"
          onSubmitAction={handleSubmit}
          onDismiss={() => setIsOpen(false)}
        />
      ) : (
        <button
          type="button"
          className="pointer-events-auto rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/40 transition hover:bg-white/20"
          onClick={() => setIsOpen(true)}
        >
          Get early access
        </button>
      )}
    </div>
  )
}
