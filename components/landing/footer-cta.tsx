import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function FooterCTA() {
  return (
    <Card className="text-center">
      <p className="text-sm uppercase tracking-wide text-gray-500">Ready to ship action items?</p>
      <h3 className="mt-3 text-3xl font-semibold text-gray-900">Spin up the Smart Meeting Follow-Up Machine</h3>
      <p className="mt-3 text-base text-gray-600">
        Upload a sample transcript, watch the agents work, then invite your team.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="sm:w-auto">
          <a href="/demo">Launch the demo</a>
        </Button>
        <Button asChild variant="secondary" className="sm:w-auto">
          <a href="#pricing">See pricing</a>
        </Button>
      </div>
    </Card>
  )
}
