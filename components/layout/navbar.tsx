'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
  { href: '/#how-it-works', label: 'Workflow' },
  { href: '/#demo', label: 'Live demo' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#integrations', label: 'Integrations' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(4,7,18,0.9)] text-slate-100 shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:py-5">
        <Link href="/" aria-label="Dutyin home">
          <Image src="/DutyIn_logo.webp" alt="Dutyin" width={40} height={40} priority />
        </Link>
        <nav className={cn('hidden items-center gap-8 text-sm text-slate-300 md:flex')}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="link-underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild className="text-slate-100">
            <Link href="/demo">Try Demo</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Get started</Link>
          </Button>
        </div>
        <button
          className="flex flex-col gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-white md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>
      </div>
      {isOpen && (
        <div className="border-t border-white/10 bg-[rgba(5,8,20,0.95)] px-6 py-4 text-slate-100 shadow md:hidden">
          <div className="flex flex-col gap-4 text-sm text-slate-200">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="link-underline" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Button asChild>
              <Link href="/demo">Try Demo</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
