'use client'

import { EmailStrip } from './email-strip'
import { toast } from 'sonner'

export function EmailStripContainer() {
  async function handleSubmit(email: string) {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    toast.success('Demo link sent to ' + email)
  }

  return <EmailStrip onSubmitAction={handleSubmit} />
}
