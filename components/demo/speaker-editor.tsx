'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TranscriptLine } from '@/lib/types'
import { Search, Trash2 } from 'lucide-react'

export function SpeakerEditor({
  transcriptLines,
  onSaveAction,
}: {
  transcriptLines: TranscriptLine[]
  onSaveAction: (lines: TranscriptLine[]) => void
}) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [lines, setLines] = useState(transcriptLines)
  const [metadata, setMetadata] = useState({ date: new Date().toISOString().slice(0, 10), language: 'English', timezone: 'UTC' })

  const filtered = useMemo(() => {
    if (!query) return lines
    return lines.filter((line) => line.text.toLowerCase().includes(query.toLowerCase()))
  }, [query, lines])

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const copy = new Set(prev)
      if (copy.has(id)) {
        copy.delete(id)
      } else {
        copy.add(id)
      }
      return copy
    })
  }

  function removeSelected() {
    setLines((prev) => prev.filter((line) => !selected.has(line.id)))
    setSelected(new Set())
  }

  function updateSpeaker(id: string, speaker: string) {
    setLines((prev) => prev.map((line) => (line.id === id ? { ...line, speaker } : line)))
  }

  function updateText(id: string, text: string) {
    setLines((prev) => prev.map((line) => (line.id === id ? { ...line, text } : line)))
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Edit speakers</h3>
            <p className="text-sm text-gray-500">Normalize labels and redact sensitive lines.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={removeSelected} disabled={!selected.size}>
              <Trash2 className="mr-2 h-4 w-4" /> Remove
            </Button>
            <Button onClick={() => onSaveAction(lines)}>Save changes</Button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            placeholder="Search transcript"
            className="w-full bg-transparent text-sm focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mt-4 max-h-96 space-y-3 overflow-y-auto pr-2">
          {filtered.map((line) => (
            <div
              key={line.id}
              className={`rounded-2xl border px-4 py-3 ${selected.has(line.id) ? 'border-gray-900 bg-gray-900/5' : 'border-gray-100 bg-white'}`}
              onClick={() => toggleSelect(line.id)}
            >
              <div className="flex items-center gap-2">
                <Input
                  value={line.speaker ?? 'Speaker'}
                  onChange={(e) => updateSpeaker(line.id, e.target.value)}
                  className="h-9 w-32 border-transparent bg-gray-50 text-xs"
                />
                <p className="text-[11px] text-gray-500">{line.time}</p>
              </div>
              <Textarea
                value={line.text}
                onChange={(e) => updateText(line.id, e.target.value)}
                className="mt-2 border-transparent bg-transparent text-sm"
                style={{ minHeight: 60 }}
              />
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="text-xl font-semibold text-gray-900">Meeting metadata</h3>
        <div className="mt-4 space-y-4 text-sm">
          <label className="space-y-1">
            <span className="text-gray-600">Date</span>
            <Input type="date" value={metadata.date} onChange={(e) => setMetadata((prev) => ({ ...prev, date: e.target.value }))} />
          </label>
          <label className="space-y-1">
            <span className="text-gray-600">Language</span>
            <Input value={metadata.language} onChange={(e) => setMetadata((prev) => ({ ...prev, language: e.target.value }))} />
          </label>
          <label className="space-y-1">
            <span className="text-gray-600">Timezone</span>
            <Input value={metadata.timezone} onChange={(e) => setMetadata((prev) => ({ ...prev, timezone: e.target.value }))} />
          </label>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500">
            {selected.size} lines selected · {lines.length} total
          </div>
        </div>
      </Card>
    </section>
  )
}
