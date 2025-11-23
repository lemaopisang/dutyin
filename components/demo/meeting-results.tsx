'use client'

import { useState } from 'react'
import { MeetingResults as MeetingResultsType, ActionItem, FollowUp } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { ActionItemsTable } from './action-items-table'
import { FollowUpComposer } from './follow-up-composer'
import { workspaceOwners } from '@/lib/mock-data'
import { Activity } from 'lucide-react'

export function MeetingResults({
  data,
  onUpdateActionItemAction,
  onBulkActionAction,
  onSendFollowUpAction,
}: {
  data: MeetingResultsType
  onUpdateActionItemAction: (item: ActionItem) => Promise<void>
  onBulkActionAction: (action: string, ids: string[]) => Promise<void>
  onSendFollowUpAction: (payload: { content: string; channel: FollowUp['channel']; schedule?: string }) => Promise<void>
}) {
  const [tab, setTab] = useState('summary')

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase text-gray-500">Meeting #{data.meetingId}</p>
        <h2 className="text-3xl font-semibold text-gray-900">Agent results</h2>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {['summary', 'actionItems', 'decisions', 'timeline', 'followUps'].map((value) => {
            const labelMap: Record<string, string> = {
              summary: 'Summary',
              actionItems: 'Action Items',
              decisions: 'Decisions',
              timeline: 'Timeline',
              followUps: 'Follow-ups',
            }
            return (
              <TabsTrigger key={value} value={value}>
                {labelMap[value]}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <TabsContent value="summary">
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(data.summary).map(([key, value]) => (
              <Card key={key}>
                <p className="text-xs uppercase text-gray-500">{key}</p>
                <p className="mt-2 text-sm text-gray-800">{value}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="actionItems">
          <ActionItemsTable
            items={data.actionItems}
            owners={workspaceOwners}
            onUpdateActionItemAction={onUpdateActionItemAction}
            onBulkActionAction={onBulkActionAction}
          />
        </TabsContent>
        <TabsContent value="decisions">
          <Card>
            <ul className="space-y-4 text-sm text-gray-700">
              {data.decisions.map((decision) => (
                <li key={decision.id}>
                  <p className="font-semibold text-gray-900">{decision.text}</p>
                  <p className="text-xs text-gray-500">Participants: {decision.participants.join(', ')}</p>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
        <TabsContent value="timeline">
          <Card>
            <div className="space-y-4">
              {data.timeline.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-gray-900 p-2 text-white">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                    <p className="text-sm text-gray-800">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="followUps">
          <FollowUpComposer
            template={`Hi {{owner}},\n\nHere is your personalized follow-up after the meeting:\n{{task_list}}\n\nContext: {{context}}`}
            recipients={data.followUps.map((follow) => ({ name: follow.recipient, email: follow.recipient }))}
            meetingContext={data.summary.short}
            onSendAction={onSendFollowUpAction}
          />
        </TabsContent>
      </Tabs>
    </section>
  )
}
