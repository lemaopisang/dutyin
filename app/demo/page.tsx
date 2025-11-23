import { DemoExperience } from '@/components/demo/demo-experience'

export default function DemoPage() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs uppercase text-gray-500">Demo flow</p>
        <h1 className="text-4xl font-semibold text-gray-900">Upload → Orchestrate → Results</h1>
        <p className="mt-2 text-sm text-gray-600">Run the Smart Meeting Follow-Up Machine on a sample transcript.</p>
      </header>
      <DemoExperience />
    </div>
  )
}
