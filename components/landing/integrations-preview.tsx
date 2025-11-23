import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Slack, Trello, Mail } from 'lucide-react'

const connectors = [
  { id: 'calendar', name: 'Google Calendar', description: 'Auto-create follow-up events', icon: Calendar },
  { id: 'slack', name: 'Slack', description: 'Send reminders in channels', icon: Slack },
  { id: 'trello', name: 'Trello', description: 'Push action items into boards', icon: Trello },
  { id: 'gmail', name: 'Gmail', description: 'Send AI follow-up drafts', icon: Mail },
]

export function IntegrationsPreview() {
  return (
    <section className="space-y-8" id="integrations">
      <div className="text-center">
        <Badge>Integrations</Badge>
        <h2 className="mt-4 text-3xl font-semibold text-gray-900">Play nice with your existing stack</h2>
        <p className="mt-3 text-base text-gray-600">
          Push action items to Trello/Asana/Jira, send follow-ups via Slack or email, and sync with calendars.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {connectors.map((connector) => (
          <Card key={connector.id} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white">
              <connector.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">{connector.name}</p>
              <p className="text-sm text-gray-600">{connector.description}</p>
            </div>
            <Button variant="ghost" className="ml-auto text-sm text-gray-500 hover:text-gray-900">
              Connect
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}
