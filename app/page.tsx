import { HeroSection } from '@/components/landing/hero-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { IntegrationsPreview } from '@/components/landing/integrations-preview'
import { Pricing } from '@/components/landing/pricing'
import { FooterCTA } from '@/components/landing/footer-cta'

export default function Page() {
  return (
    <div className="space-y-16 pb-24">
  <HeroSection />
      <HowItWorks />
      <IntegrationsPreview /> 
      <Pricing />
      <FooterCTA />
    </div>
  )
}