'use client'

import Image from 'next/image'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

export function EmptyState({
  title,
  description,
  action,
  illustration = '/window.svg',
}: {
  title: string
  description: string
  illustration?: string
  action?: ReactNode
}) {
  return (
    <Card className="flex flex-col items-center text-center">
  <Image src={illustration} alt="Empty state" width={96} height={96} className="h-24 w-24" />
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </Card>
  )
}

export function ErrorBanner({
  code,
  message,
  onRetryAction,
}: {
  code?: string
  message: string
  onRetryAction?: () => void
}) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{code ?? 'Something went wrong'}</p>
          <p>{message}</p>
        </div>
        {onRetryAction && (
          <Button variant="ghost" onClick={onRetryAction} className="text-rose-700">
            Retry
          </Button>
        )}
      </div>
    </div>
  )
}

export function ConfirmationModal({
  title,
  description,
  open,
  onOpenChangeAction,
  onConfirmAction,
}: {
  title: string
  description: string
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onConfirmAction: () => void
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeAction}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-gray-900">{title}</Dialog.Title>
            <Dialog.Close className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="ghost">Cancel</Button>
            </Dialog.Close>
            <Button
              onClick={() => {
                onConfirmAction()
                onOpenChangeAction(false)
              }}
            >
              Confirm
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function Tooltip({ children, content }: { children: ReactNode; content: string }) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className="rounded-lg bg-gray-900 px-3 py-2 text-xs text-white">
            {content}
            <TooltipPrimitive.Arrow className="fill-gray-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
