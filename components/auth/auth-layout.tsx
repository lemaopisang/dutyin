import { Card } from '@/components/ui/card'

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl py-16">
      <Card className="grid gap-10 p-10 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-gray-500">Workspace onboarding</p>
          <h1 className="mt-2 text-3xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li>✔️ Choose a use case: team meeting, sales sync, design review.</li>
            <li>✔️ Invite teammates or stay solo.</li>
            <li>✔️ Push action items to calendars or trackers.</li>
          </ul>
        </div>
        <div>{children}</div>
      </Card>
    </div>
  )
}
