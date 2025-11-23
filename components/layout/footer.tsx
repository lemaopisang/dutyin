import Link from 'next/link'

const navSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Workflow tour', href: '/#how-it-works' },
      { label: 'Live demo', href: '/demo' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    title: 'Compliance',
    links: [
      { label: 'Security + retention', href: '/#integrations' },
      { label: 'Data processing FAQ', href: '/#faq' },
      { label: 'Status dashboard', href: '/#analytics' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { label: 'hi@dutyi.ai', href: 'mailto:hi@dutyi.ai' },
      { label: 'Slack community', href: 'https://dutyi.ai/slack' },
      { label: 'Book a call', href: '/auth/signup' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10" style={{ background: 'linear-gradient(135deg,#070c1d,#111634 65%,#1b1740)' }}>
      <div className="mx-auto max-w-6xl px-6 py-10 text-white/80">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="text-lg font-semibold text-white">Dutyin</p>
            <p className="text-sm">
              Multi-agent meeting follow-ups with confidence badges, action-item ownership, and calendar-ready next steps.
            </p>
            <p className="text-xs text-white/60">© {new Date().getFullYear()} Dutyin. All rights reserved.</p>
          </div>
          <div className="grid flex-1 gap-8 md:grid-cols-3">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="text-sm font-semibold text-white">{section.title}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="link-underline text-white/70">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
