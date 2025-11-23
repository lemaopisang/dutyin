'use client'

import { useMemo, useState } from 'react'
import { FollowUp } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const channels: FollowUp['channel'][] = ['email', 'slack']

type FollowUpComposerProps = {
  template: string
  recipients: { name: string; email: string }[]
  meetingContext: string
  onSendAction: (payload: { content: string; channel: FollowUp['channel']; schedule?: string }) => Promise<void>
}

export function FollowUpComposer({ template, recipients, meetingContext, onSendAction }: FollowUpComposerProps) {
  const [content, setContent] = useState(template)
  const [channel, setChannel] = useState<FollowUp['channel']>('email')
  const [schedule, setSchedule] = useState('')

  const preview = useMemo(() => {
    let result = content
    result = result.replace('{{owner}}', recipients[0]?.name ?? 'team')
    result = result.replace('{{task_list}}', '- Confirm Jira workflow\n- Share navigation spec')
    result = result.replace('{{context}}', meetingContext)
    return result
  }, [content, meetingContext, recipients])

  async function handleSend() {
    await onSendAction({ content: preview, channel, schedule })
    toast.success(`Follow-up sent via ${channel}`)
  }

  return (
    <Card>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Channel</label>
            <div className="mt-2 flex gap-2">
              {channels.map((option) => (
                <button
                  key={option}
                  className={`rounded-full border px-4 py-1 text-sm capitalize ${channel === option ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600'}`}
                  onClick={() => setChannel(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700">
            Template
            <Textarea className="mt-2 min-h-40" value={content} onChange={(e) => setContent(e.target.value)} />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Schedule send (optional)
            <Input type="datetime-local" value={schedule} onChange={(e) => setSchedule(e.target.value)} className="mt-2" />
          </label>
          <Button onClick={handleSend}>Send follow-up</Button>
        </div>
        <div className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs uppercase text-gray-500">Preview</p>
          <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-800">{preview}</pre>
        </div>
      </div>
    </Card>
  )
}
