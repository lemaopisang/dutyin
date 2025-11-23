'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type OwnerStat = {
  owner: string
  completionRate: number
  overdue: number
}

export function Analytics({
  metrics,
  ownerStats,
}: {
  metrics: { period: string; meetings: number; avgActionItems: number; avgCloseTimeHours: number; overdueRate: number }
  ownerStats: OwnerStat[]
}) {
  const trendData = ownerStats.map((stat, index) => ({ name: `Week ${index + 1}`, items: stat.overdue }))

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-gray-500">Analytics</p>
          <h2 className="text-3xl font-semibold text-gray-900">Meeting performance</h2>
        </div>
        <Button variant="secondary">Export report</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <p className="text-xs text-gray-500">Meetings ({metrics.period})</p>
          <p className="text-3xl font-semibold">{metrics.meetings}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500">Avg action items</p>
          <p className="text-3xl font-semibold">{metrics.avgActionItems}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500">Avg close time</p>
          <p className="text-3xl font-semibold">{metrics.avgCloseTimeHours}h</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500">Overdue rate</p>
          <p className="text-3xl font-semibold">{metrics.overdueRate}%</p>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <ChartTooltip formatter={(value) => [`${value} overdue`, 'Action items']} />
              <Line type="monotone" dataKey="items" stroke="#111827" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ownerStats}>
              <XAxis dataKey="owner" />
              <YAxis hide />
              <ChartTooltip formatter={(value) => [`${value}%`, 'Completion']} />
              <Bar dataKey="completionRate" fill="#0f172a" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </section>
  )
}
