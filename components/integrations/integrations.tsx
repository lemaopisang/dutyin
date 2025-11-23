import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Connector = {
  type: string
  connected: boolean
  lastSync?: string
  scopes?: string[]
}

export function Integrations({ connectors }: { connectors: Connector[] }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">Connect your stack</h2>
        <p className="text-sm text-gray-600">Calendar, Slack, Trello, Asana, Gmail</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {connectors.map((connector) => (
          <Card key={connector.type} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">{connector.type}</p>
                <p className="text-xs text-gray-500">
                  {connector.connected ? `Connected · Last sync ${connector.lastSync}` : 'Not connected'}
                </p>
              </div>
              <Button variant={connector.connected ? 'secondary' : 'primary'}>
                {connector.connected ? 'Manage' : 'Connect'}
              </Button>
            </div>
            {connector.scopes && (
              <div className="rounded-2xl bg-gray-50 p-3 text-xs text-gray-500">
                Scopes: {connector.scopes.join(', ')}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
