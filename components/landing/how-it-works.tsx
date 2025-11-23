import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const steps = [
  {
    title: 'Upload',
    description: 'Drop a transcript file, paste notes, or connect Zoom/Meet.',
  },
  {
    title: 'Preprocess',
    description: 'Clean speakers, redact sensitive lines, and normalize formatting.',
  },
  {
    title: 'Summary Agent',
    description: 'Synthesizes short, medium, and long briefs for stakeholders.',
  },
  {
    title: 'Action Items Agent',
    description: 'Assigns owners, deadlines, and confidence scores automatically.',
  },
  {
    title: 'Calendar + Follow-up',
    description: 'Suggests calendar events and drafts follow-up messages.',
  },
  {
    title: 'Track',
    description: 'Push tasks to Asana/Trello, send reminders, and monitor progress.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="space-y-10">
      <div className="text-center">
        <Badge>How it works</Badge>
        <h2 className="mt-4 text-3xl font-semibold text-gray-900">Five minutes from transcript to accountability</h2>
        <p className="mt-3 text-base text-gray-600">
          Orchestrate summaries, action items, decisions, and follow-ups with a transparent agent flow.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step.title} className="h-full">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-900 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
            </div>
            <p className="mt-4 text-sm text-gray-600">{step.description}</p>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Button asChild>
          <a href="/demo">Run a Demo</a>
        </Button>
      </div>
    </section>
  )
}
