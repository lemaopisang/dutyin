import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export type Meeting = {
  id: string
  title: string
  date: string
  actionItems: number
  status: 'Open' | 'Closed'
}

export function Dashboard({
  userName,
  recentMeetings,
  metrics,
}: {
  userName: string
  recentMeetings: Meeting[]
  metrics: { openTasks: number; closedTasksLast7Days: number }
}) {
  return (
    <section className="space-y-6">
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-500">Welcome back</p>
          <h2 className="text-2xl font-semibold text-gray-900">Hey {userName}, keep the follow-ups moving.</h2>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/demo">New Meeting</Link>
          </Button>
          <Button variant="secondary">Upload Transcript</Button>
          <Button variant="ghost">Connect Calendar</Button>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm text-gray-500">Open tasks</p>
          <p className="text-3xl font-semibold">{metrics.openTasks}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Closed last 7 days</p>
          <p className="text-3xl font-semibold">{metrics.closedTasksLast7Days}</p>
        </Card>
      </div>
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent meetings</h3>
          <Badge>Auto synced</Badge>
        </div>
        {recentMeetings.length === 0 ? (
          <div className="mt-6 text-center text-sm text-gray-500">
            Upload a sample transcript to see how follow-ups get tracked.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {recentMeetings.map((meeting) => (
              <Link
                key={meeting.id}
                href={`/meetings/${meeting.id}`}
                className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 transition hover:border-gray-300"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{meeting.title}</p>
                  <p className="text-xs text-gray-500">{new Date(meeting.date).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span>{meeting.actionItems} action items</span>
                  <span className={`rounded-full px-3 py-1 text-xs ${meeting.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {meeting.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </section>
  )
}
