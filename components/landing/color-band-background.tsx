"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

const bands = [
  { colors: ['#5d5bff', '#4338ca'], blur: 'blur-[90px]', delay: 0 },
  { colors: ['#39ddc8', '#0a5a51'], blur: 'blur-[110px]', delay: 0.1 },
  { colors: ['#ffc857', '#f08a24'], blur: 'blur-[130px]', delay: 0.2 },
  { colors: ['#ffffff', '#69d7ff'], blur: 'blur-[150px]', delay: 0.3 },
]

type ColorBandBackgroundProps = {
  variant?: 'global' | 'hero'
}

export function ColorBandBackground({ variant = 'global' }: ColorBandBackgroundProps) {
  const isHero = variant === 'hero'
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.color-band',
        { xPercent: isHero ? -10 : -30, opacity: 0, scaleX: isHero ? 0.9 : 0.8 },
        {
          xPercent: 0,
          opacity: isHero ? 0.85 : 0.6,
          scaleX: 1,
          duration: 2,
          ease: 'power3.out',
          stagger: 0.15,
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isHero])

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none -z-10 overflow-hidden',
        isHero ? 'absolute inset-0' : 'fixed inset-0',
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: isHero
            ? 'radial-gradient(circle at 15% 25%, rgba(93,91,255,0.4), transparent 45%), radial-gradient(circle at 70% 10%, rgba(105,215,255,0.25), transparent 50%)'
            : 'radial-gradient(circle at 20% 20%, rgba(93,91,255,0.3), transparent 50%), radial-gradient(circle at 80% 0%, rgba(105,215,255,0.15), transparent 45%)',
        }}
      />
      {bands.map((band, index) => (
        <div
          key={band.colors.join('-')}
          className={cn(
            'color-band absolute origin-left rounded-full opacity-0 -skew-y-3',
            band.blur,
            isHero ? 'mix-blend-screen' : 'mix-blend-lighten',
          )}
          style={{
            backgroundImage: `linear-gradient(115deg, ${band.colors[0]}, ${band.colors[1]})`,
            height: isHero ? '28rem' : '45vh',
            width: isHero ? '140%' : '70vw',
            top: isHero ? `${-12 + index * 16}%` : `${10 + index * 18}%`,
            left: isHero ? `${-30 + index * 8}%` : `${-10 + index * 5}%`,
          }}
        />
      ))}
      {isHero ? (
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background:
              'linear-gradient(to top, rgba(3,6,22,0.95), rgba(3,6,22,0.4) 35%, transparent)',
          }}
        />
      ) : (
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: 'linear-gradient(to top, #030616, transparent)' }} />
      )}
    </div>
  )
}
