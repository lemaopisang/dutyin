'use client'

import { AuthLayout } from '@/components/auth/auth-layout'
import { SignUpForm } from '@/components/auth/sign-up-form'
import { toast } from 'sonner'

export default function SignUpPage() {
  async function handleSignUpAction(data: { email: string; password: string; workspace?: string; agree: boolean }) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success(`Workspace ${data.workspace || 'Demo'} created for ${data.email}`)
  }

  return (
    <AuthLayout title="Create your workspace" subtitle="Launch the Smart Meeting Follow-Up Machine with your team in minutes.">
      <SignUpForm onSignUpAction={handleSignUpAction} />
    </AuthLayout>
  )
}
