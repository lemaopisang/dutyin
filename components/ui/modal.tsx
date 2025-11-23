'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

export function Modal({
  title,
  description,
  children,
  open,
  onOpenChangeAction,
}: {
  title: string
  description?: string
  children: ReactNode
  open: boolean
  onOpenChangeAction: (open: boolean) => void
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeAction}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/40 backdrop-blur"
          style={{ animation: 'overlayFadeIn 380ms ease forwards' }}
        />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
          style={{ animation: 'modalPopIn 420ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="text-xl font-semibold text-gray-900">{title}</Dialog.Title>
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
            <Dialog.Close className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="mt-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
