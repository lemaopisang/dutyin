'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const bands = [
  { colors: ['#5d5bff', '#4338ca'], blur: 'blur-[60px]', delay: 0 },
  { colors: ['#39ddc8', '#0a5a51'], blur: 'blur-[50px]', delay: 0.1 },
  { colors: ['#ffc857', '#f08a24'], blur: 'blur-[70px]', delay: 0.2 },
  { colors: ['#ffffff', '#69d7ff'], blur: 'blur-[80px]', delay: 0.3 },
]

export function ColorBandIntro() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.color-band',
        { xPercent: -40, opacity: 0, scaleX: 0.6 },
        {
          xPercent: 0,
          opacity: 0.9,
          scaleX: 1,
          duration: 1.6,
          ease: 'power3.out',
          stagger: 0.12,
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative isolate mb-10 overflow-hidden rounded-4xl border border-white/10 bg-[rgba(4,7,18,0.85)] py-10">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at top, rgba(93,91,255,0.2), transparent 65%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 px-6">
        <p className="text-xs uppercase tracking-[0.55em]" style={{ color: 'var(--color-secondary)' }}>
          Color bends
        </p>
        <h2 className="text-3xl font-semibold" style={{ color: 'var(--color-heading)' }}>
          Signal bands warm up the canvas
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          React + GSAP animates each band to bend into view, hinting at iris, cyber, and amber agents powering your workflow.
        </p>
      </div>
      <div className="relative mt-6 flex h-40 w-full items-center justify-center overflow-hidden">
        {bands.map((band, index) => (
          <div
            key={band.colors.join('-')}
            className={`color-band absolute h-12 w-3/4 origin-left -skew-y-6 rounded-full opacity-0 ${band.blur}`}
            style={{
              backgroundImage: `linear-gradient(120deg, ${band.colors[0]}, ${band.colors[1]})`,
              top: `${20 + index * 18}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
