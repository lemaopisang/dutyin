import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import { QueryProvider } from '@/components/providers/query-provider'
import { ToasterProvider } from '@/components/providers/toaster-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { EmailStripContainer } from '@/components/landing/email-strip-container'
import './globals.css'

const font = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Smart Meeting Follow-Up Machine',
  description: 'Multi-agent meeting assistant that summarizes, assigns, and tracks follow-ups.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
  <body className={`${font.className} bg-[#030616] text-slate-100`}>
        <QueryProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl rounded-4xl border border-white/5 bg-[rgba(7,11,26,0.65)] px-6 pb-12 pt-10 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur">
            {children}
          </main>
          <Footer />
          <EmailStripContainer />
          <ToasterProvider />
        </QueryProvider>
      </body>
    </html>
  )
}