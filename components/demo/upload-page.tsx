'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ProcessResponse } from '@/lib/types'
import { Upload, FileText, PlugZap } from 'lucide-react'

const allowedTypes = '.txt,.srt,.docx,.json'

export function UploadPage({
  onProcessAction,
  onEditAction,
}: {
  onProcessAction: (input: string) => Promise<ProcessResponse>
  onEditAction?: () => void
}) {
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  async function handleFile(files: FileList | null) {
    if (!files?.length) return
    const file = files[0]
    setProgress(20)
    const text = await file.text()
    setProgress(60)
  const result = await onProcessAction(text)
    setProgress(100)
    setPreview(result.preview)
  }

  async function handlePaste(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const text = formData.get('paste')?.toString() ?? ''
    if (!text) return
    setProgress(30)
  const result = await onProcessAction(text)
    setProgress(100)
    setPreview(result.preview)
    ev.currentTarget.reset()
  }

  function handleConnect(provider: string) {
    setPreview(`Connected to ${provider}. Pulling freshest transcript…`)
    setProgress(80)
    setTimeout(async () => {
  const result = await onProcessAction(`Connected provider: ${provider}`)
      setProgress(100)
      setPreview(result.preview)
    }, 800)
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Upload a transcript</h2>
        <p className="text-sm text-gray-600">Choose a file, paste raw text, or connect your meeting provider.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gray-100 p-3">
              <Upload className="h-5 w-5 text-gray-900" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">File Upload</p>
              <p className="text-xs text-gray-500">Allowed types {allowedTypes}</p>
            </div>
          </div>
          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 p-6 text-center">
            <input type="file" accept={allowedTypes} className="hidden" onChange={(e) => handleFile(e.target.files)} />
            <p className="text-sm font-medium text-gray-900">Drop file here or click to browse</p>
            <p className="text-xs text-gray-500">Max 25MB</p>
          </label>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gray-100 p-3">
              <FileText className="h-5 w-5 text-gray-900" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">Paste transcript</p>
              <p className="text-xs text-gray-500">Perfect for quick demos or rough notes.</p>
            </div>
          </div>
          <form className="mt-4 space-y-3" onSubmit={handlePaste}>
            <Textarea name="paste" rows={5} placeholder="Paste meeting transcript…" />
            <Button type="submit" className="w-full">
              Process transcript
            </Button>
          </form>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gray-100 p-3">
              <PlugZap className="h-5 w-5 text-gray-900" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">Connect provider</p>
              <p className="text-xs text-gray-500">Zoom, Google Meet, Microsoft Teams</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {['Zoom', 'Google Meet', 'Teams'].map((provider) => (
              <Button key={provider} variant="secondary" className="w-full" onClick={() => handleConnect(provider)}>
                Connect {provider}
              </Button>
            ))}
          </div>
        </Card>
      </div>
      {progress > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-gray-600">
            <p>Processing transcript</p>
            <p>{progress}%</p>
          </div>
          <div className="h-2 rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-gray-900" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      {preview && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <p className="text-xs uppercase text-gray-500">Preview snippet</p>
          <p className="mt-2 text-sm text-gray-800">{preview}</p>
          <Button className="mt-4" disabled={!preview || !onEditAction} onClick={() => onEditAction?.()}>
            Edit speakers
          </Button>
        </div>
      )}
    </section>
  )
}
