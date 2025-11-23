import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type Plan = {
  id: string
  name: string
  price?: string
  features: string[]
  ctaText: string
  highlighted?: boolean
}

const defaultPlans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    features: ['3 workspaces', 'Up to 10 meetings/mo', 'Email summaries'],
    ctaText: 'Start for free',
  },
  {
    id: 'team',
    name: 'Team',
    price: '$79',
    features: ['Unlimited meetings', 'Action items + calendar pushes', 'Slack + email nudges', 'Workspace roles & approvals'],
    ctaText: 'Upgrade to Team',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    features: [
      'Unlimited workspaces & seats',
      'SAML/SCIM + advanced retention',
      'Custom agent orchestration & human approvals',
      'Dedicated CSM + white-glove onboarding',
      'Private cloud & audit-ready exports',
    ],
    ctaText: 'Contact Sales',
  },
]

export function Pricing({ plans = defaultPlans }: { plans?: Plan[] }) {
  return (
    <section className="space-y-10" id="pricing">
      <div className="text-center">
        <Badge>Pricing</Badge>
        <h2 className="mt-4 text-3xl font-semibold" style={{ color: 'var(--color-heading)' }}>
          Flexible plans for hybrid teams
        </h2>
        <p className="mt-3 text-base" style={{ color: 'var(--color-muted)' }}>
          Start with the landing + demo experience and scale to enterprise governance.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              'flex h-full flex-col border shadow-sm transition hover:-translate-y-1 hover:shadow-lg',
              plan.highlighted
                ? 'border-transparent bg-linear-to-br from-[#4338ca] via-[#5d5bff] to-[#1fb8ae] text-white'
                : 'border-white/10 bg-[rgba(6,8,20,0.9)] text-slate-100'
            )}
          >
            {plan.highlighted && (
              <Badge className="border border-white/30 bg-white/15 text-xs uppercase tracking-wide text-white">
                Most popular
              </Badge>
            )}
            <h3 className="mt-4 text-2xl font-semibold" style={{ color: 'var(--color-heading)' }}>
              {plan.name}
            </h3>
            {plan.price && (
              <p className="mt-2 text-3xl font-bold" style={{ color: 'var(--color-heading)' }}>
                {plan.price}
              </p>
            )}
            <ul
              className={cn('mt-4 space-y-2 text-sm', plan.highlighted ? 'text-white/80' : 'text-gray-600')}
            >
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      plan.highlighted ? 'bg-white/80 shadow-[0_0_0_3px_rgba(255,255,255,0.15)]' : 'bg-emerald-500/70'
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className={cn(
                'mt-6 w-full',
                plan.highlighted
                  ? 'bg-gradient-to-r from-[#5d5bff] via-[#65f6d4] to-[#1fb8ae] text-[#050616] hover:brightness-110'
                  : plan.id === 'enterprise'
                    ? 'border-white/40 text-white hover:bg-white/10'
                    : ''
              )}
              variant={plan.highlighted ? 'primary' : 'secondary'}
            >
              {plan.ctaText}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}
