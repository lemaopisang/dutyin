import { Card } from '@/components/ui/card'

const palettes = [
  {
    name: 'Midnight Ops',
    description: 'Primary canvas + shell backgrounds for the dark-screened look.',
    className: 'palette-midnight',
    swatches: ['#050a1c', '#0b1024', '#151b3c'],
  },
  {
    name: 'Iris Volt',
    description: 'Hero gradients, CTA borders, and highlight strokes.',
    className: 'palette-iris',
    swatches: ['#7c84ff', '#5d5bff', '#4338ca'],
  },
  {
    name: 'Cyber Current',
    description: 'Agent confidence badges, success pills, and live statuses.',
    className: 'palette-emerald',
    swatches: ['#39ddc8', '#10b6a9', '#0a5a51'],
  },
  {
    name: 'Signal Amber',
    description: 'Warnings, nudges, and "due soon" cards.',
    className: 'palette-amber',
    swatches: ['#ffc857', '#f6a13d', '#5b3510'],
  },
]

export function ColorPaletteShowcase() {
  return (
    <section className="space-y-8" aria-labelledby="palette-heading">
      <div className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--color-secondary)' }}>
          Color system
        </p>
        <h2 id="palette-heading" className="text-3xl font-semibold" style={{ color: 'var(--color-heading)' }}>
          Layered palettes for clarity + focus
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Midnight canvas, iris gradients, cyber greens, and amber alerts keep every state readable in the dark UI.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {palettes.map((palette) => (
          <Card key={palette.name} className="h-full border border-white/10 bg-transparent">
            <div
              className={`rounded-2xl border border-white/10 p-6 text-left ${palette.className}`}
              style={{ color: 'var(--color-heading)' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/70">{palette.name}</p>
                  <p className="text-base font-semibold text-white">{palette.description}</p>
                </div>
                <div className="flex gap-2">
                  {palette.swatches.map((value) => (
                    <span
                      key={value}
                      className="h-10 w-10 rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                      style={{ backgroundColor: value }}
                      aria-label={`Color swatch ${value}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
