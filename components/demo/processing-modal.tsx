'use client'

import { useEffect, useState } from 'react'
import { Observable, Subscription } from 'rxjs'
import { StatusEvent } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'

const agents: StatusEvent['agent'][] = ['Summary', 'ActionItems', 'Calendar', 'FollowUp', 'Tracker']

type StatusMap = Record<StatusEvent['agent'], StatusEvent>

export function ProcessingModal({
  jobId,
  statusStream,
  open,
  onOpenChangeAction,
  onAbortAction,
}: {
  jobId: string
  statusStream: Observable<StatusEvent>
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onAbortAction: () => void
}) {
  const [statuses, setStatuses] = useState<StatusMap>(() =>
    agents.reduce((acc, agent) => {
      acc[agent] = { agent, status: 'pending' }
      return acc
    }, {} as StatusMap),
  )

  useEffect(() => {
    const sub: Subscription = statusStream.subscribe((event) => {
      setStatuses((prev) => ({ ...prev, [event.agent]: event }))
    })
    return () => sub.unsubscribe()
  }, [statusStream])

  function renderStatus(status: StatusEvent['status']) {
    if (status === 'running') return <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
    if (status === 'done') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    if (status === 'error') return <AlertTriangle className="h-4 w-4 text-rose-500" />
    return <div className="h-3 w-3 rounded-full bg-gray-300" />
  }

  return (
    <Modal
      title="Running orchestration"
      description={`Job ${jobId} is dispatching agents with retries and monitoring.`}
      open={open}
      onOpenChangeAction={onOpenChangeAction}
    >
      <div className="space-y-4">
        {agents.map((agent) => {
          const status = statuses[agent]
          return (
            <div key={agent} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{agent} Agent</p>
                <p className="text-xs text-gray-500">{status?.message ?? 'Queued'}</p>
              </div>
              <div className="flex items-center gap-3">
                {renderStatus(status?.status ?? 'pending')}
                <p className="text-xs text-gray-500 capitalize">{status?.status ?? 'pending'}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 flex justify-between text-xs text-gray-500">
        <span>Retries enabled · Auto abort at 2 minutes</span>
        <Button variant="ghost" onClick={onAbortAction} className="text-rose-600">
          Abort run
        </Button>
      </div>
    </Modal>
  )
}
