'use client'

import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { Observable } from 'rxjs'
import { UploadPage } from './upload-page'
import { SpeakerEditor } from './speaker-editor'
import { ProcessingModal } from './processing-modal'
import { MeetingResults } from './meeting-results'
import { sampleTranscript, sampleResults } from '@/lib/mock-data'
import { MeetingResults as MeetingResultsType, ProcessResponse, StatusEvent, TranscriptLine, ActionItem } from '@/lib/types'
import { toast } from 'sonner'

const agentSteps = [
  { agent: 'Summary', message: 'Summarizing meeting context…' },
  { agent: 'ActionItems', message: 'Extracting owners and deadlines…' },
  { agent: 'Calendar', message: 'Matching deadlines with availability…' },
  { agent: 'FollowUp', message: 'Drafting personalized follow-ups…' },
  { agent: 'Tracker', message: 'Syncing with project tools…' },
] as const satisfies Array<Pick<StatusEvent, 'agent' | 'message'>>

const PROCESSING_DURATION_MS = agentSteps.length * 1000 + 1600

function cloneMeetingResults(data: MeetingResultsType): MeetingResultsType {
    return {
    ...data,
    actionItems: data.actionItems.map((item) => ({ ...item })),
    decisions: data.decisions.map((decision) => ({ ...decision, participants: [...decision.participants] })),
    timeline: data.timeline.map((event) => ({ ...event })),
    followUps: data.followUps.map((follow) => ({ ...follow })),
    }
}

function createStatusStream(): Observable<StatusEvent> {
    return new Observable((subscriber) => {
        const timers: ReturnType<typeof setTimeout>[] = []

    agentSteps.forEach((step, index) => {
        const startTimer = setTimeout(() => {
            const running: StatusEvent = { ...step, status: 'running' }
        subscriber.next(running)
        const doneTimer = setTimeout(() => {
          subscriber.next({ ...running, status: 'done', message: 'Completed' })
          if (index === agentSteps.length - 1) {
            subscriber.complete()
          }
        }, 600)
        timers.push(doneTimer)
      }, index * 1000)

      timers.push(startTimer)
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  })
}

export function DemoExperience() {
  const [step, setStep] = useState<'upload' | 'edit' | 'processing' | 'results'>('upload')
  const [editedTranscript, setEditedTranscript] = useState<TranscriptLine[]>(sampleTranscript)
  const [jobId, setJobId] = useState('')
  const [processingOpen, setProcessingOpen] = useState(false)
  const [statusStream, setStatusStream] = useState<Observable<StatusEvent> | null>(null)
  const [results, setResults] = useState<MeetingResultsType | null>(null)
  const processingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isProcessingLocked, setIsProcessingLocked] = useState(false)
  const [, startTransition] = useTransition()

  async function handleProcess(input: string): Promise<ProcessResponse> {
    const job = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)
    setJobId(job)
    setEditedTranscript(sampleTranscript.map((line) => ({ ...line })))
    return {
      jobId: job,
      preview: input.slice(0, 140) + '…',
    }
  }

  function clearProcessingTimer() {
    if (processingTimerRef.current) {
      clearTimeout(processingTimerRef.current)
      processingTimerRef.current = null
    }
  }

  function completeRun() {
    const clonedResults = cloneMeetingResults(sampleResults)
    startTransition(() => {
      setProcessingOpen(false)
      setStatusStream(null)
      setStep('results')
      setResults(clonedResults)
      setIsProcessingLocked(false)
    })
    toast.success('Agents completed! Results ready.')
  }

  function handleSaveTranscript(lines: TranscriptLine[]) {
    if (isProcessingLocked) {
      toast.info('Processing already in flight — hang tight 📡')
      return
    }
    setEditedTranscript(lines)
    setStep('processing')
    setIsProcessingLocked(true)
    const stream = createStatusStream()
    setStatusStream(stream)
    setProcessingOpen(true)
    clearProcessingTimer()
    processingTimerRef.current = setTimeout(() => {
      processingTimerRef.current = null
      completeRun()
    }, PROCESSING_DURATION_MS)
  }

  const actions = useMemo(() => ({
    async updateAction(item: ActionItem) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      setResults((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          actionItems: prev.actionItems.map((existing) => (existing.id === item.id ? item : existing)),
        }
      })
    },
    async bulk(action: string, ids: string[]) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      toast.success(`${action} queued for ${ids.length} items`)
    },
    async sendFollowUp(payload: { content: string; channel: 'email' | 'slack'; schedule?: string }) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      toast.success(`Follow-up scheduled via ${payload.channel}`)
    },
  }), [])

  useEffect(() => {
    return () => clearProcessingTimer()
  }, [])

  return (
    <div className="space-y-10">
      {step === 'upload' && <UploadPage onProcessAction={handleProcess} onEditAction={() => setStep('edit')} />}
      {step === 'edit' && <SpeakerEditor transcriptLines={editedTranscript} onSaveAction={handleSaveTranscript} />}
      {step === 'results' && results && (
        <MeetingResults
          data={results}
          onUpdateActionItemAction={actions.updateAction}
          onBulkActionAction={actions.bulk}
          onSendFollowUpAction={actions.sendFollowUp}
        />
      )}
      {statusStream && (
        <ProcessingModal
          jobId={jobId}
          statusStream={statusStream}
          open={processingOpen}
          onOpenChangeAction={setProcessingOpen}
          onAbortAction={() => {
            clearProcessingTimer()
            setProcessingOpen(false)
            setStatusStream(null)
            setResults(null)
            setStep('upload')
            setIsProcessingLocked(false)
            toast.error('Run aborted')
          }}
        />
      )}
    </div>
  )
}
