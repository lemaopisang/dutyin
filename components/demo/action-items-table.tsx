'use client'

import { useMemo, useState } from 'react'
import { ActionItem, Owner } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDeadline, confidenceToLabel } from '@/lib/utils'
import { toast } from 'sonner'
import { Download, Filter, CalendarCheck, Send, Trello } from 'lucide-react'

const sorters = {
  deadline: (a: ActionItem, b: ActionItem) => (a.deadline ?? '').localeCompare(b.deadline ?? ''),
  confidence: (a: ActionItem, b: ActionItem) => b.confidence - a.confidence,
  owner: (a: ActionItem, b: ActionItem) => (a.owner?.name ?? '').localeCompare(b.owner?.name ?? ''),
}

type SortKey = keyof typeof sorters

type ActionItemsTableProps = {
  items: ActionItem[]
  owners: Owner[]
  onUpdateActionItemAction: (item: ActionItem) => Promise<void>
  onBulkActionAction: (action: string, ids: string[]) => Promise<void>
}

export function ActionItemsTable({ items, owners, onUpdateActionItemAction, onBulkActionAction }: ActionItemsTableProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'done'>('all')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [sortKey, setSortKey] = useState<SortKey>('deadline')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    return [...items]
      .filter((item) => (statusFilter === 'all' ? true : item.status === statusFilter))
      .filter((item) => (ownerFilter === 'all' ? true : item.owner?.id === ownerFilter))
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      .sort(sorters[sortKey])
  }, [items, ownerFilter, search, sortKey, statusFilter])

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

  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((item) => item.id)))
    }
  }

  async function exportCsv() {
    const header = ['Title', 'Owner', 'Deadline', 'Status', 'Confidence', 'Source']
    const rows = filtered.map((item) => [
      item.title,
      item.owner?.name ?? 'Unassigned',
      formatDeadline(item.deadline),
      item.status,
      item.confidence.toFixed(2),
      item.sourceSnippet,
    ])
    const csv = [header, ...rows]
      .map((cols) => cols.map((col) => `"${col.replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'action-items.csv'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Exported CSV with source snippets')
  }

  async function handleBulk(action: string) {
    await onBulkActionAction(action, Array.from(selected))
    toast.success(`${action} triggered for ${selected.size} items`)
    setSelected(new Set())
  }

  async function handleSingle(action: string, id: string) {
    await onBulkActionAction(action, [id])
    toast.success(`${action} triggered`)
  }

  async function handleInlineUpdate(item: ActionItem, field: Partial<ActionItem>) {
    const updated = { ...item, ...field }
    await onUpdateActionItemAction(updated)
    toast.success('Action item updated')
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <Filter className="h-4 w-4" />
          <select
            className="rounded-full border border-gray-200 px-3 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          >
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="done">Done</option>
          </select>
          <select className="rounded-full border border-gray-200 px-3 py-1" value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)}>
            <option value="all">All owners</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name}
              </option>
            ))}
          </select>
          <select className="rounded-full border border-gray-200 px-3 py-1" value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
            <option value="deadline">Deadline</option>
            <option value="confidence">Confidence</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-40" />
          <Button variant="secondary" onClick={exportCsv} className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>
      {selected.size > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
          <span>{selected.size} selected</span>
          <Button variant="ghost" className="text-gray-900" onClick={() => handleBulk('Assign owners')}>
            Assign owner
          </Button>
          <Button variant="ghost" className="text-gray-900" onClick={() => handleBulk('Set deadline')}>
            Set deadline
          </Button>
          <Button variant="ghost" className="text-gray-900" onClick={() => handleBulk('Export to tracker')}>
            Push to external tracker
          </Button>
        </div>
      )}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-2">
                <Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={() => toggleAll()} />
              </th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Owner</th>
              <th className="px-3 py-2">Deadline</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Confidence</th>
              <th className="px-3 py-2">Source snippet</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="px-3 py-3">
                  <Checkbox checked={selected.has(item.id)} onCheckedChange={() => toggleSelect(item.id)} />
                </td>
                <td className="px-3 py-3">
                  <input
                    value={item.title}
                    onChange={(e) => handleInlineUpdate(item, { title: e.target.value })}
                    className="w-full rounded-lg border border-transparent px-2 py-1 text-sm focus:border-gray-300 focus:outline-none"
                  />
                </td>
                <td className="px-3 py-3">
                  <select
                    className="rounded-lg border border-gray-200 px-2 py-1 text-sm"
                    value={item.owner?.id ?? ''}
                    onChange={(e) => {
                      const owner = owners.find((o) => o.id === e.target.value)
                      handleInlineUpdate(item, { owner })
                    }}
                  >
                    <option value="">Unassigned</option>
                    {owners.map((owner) => (
                      <option key={owner.id} value={owner.id}>
                        {owner.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-3">
                  <input
                    type="date"
                    value={item.deadline?.slice(0, 10) ?? ''}
                    onChange={(e) => handleInlineUpdate(item, { deadline: e.target.value })}
                    className="rounded-lg border border-gray-200 px-2 py-1 text-sm"
                  />
                </td>
                <td className="px-3 py-3">
                  <select
                    className="rounded-lg border border-gray-200 px-2 py-1 text-sm"
                    value={item.status}
                    onChange={(e) => handleInlineUpdate(item, { status: e.target.value as ActionItem['status'] })}
                  >
                    <option value="open">Open</option>
                    <option value="done">Done</option>
                  </select>
                </td>
                <td className="px-3 py-3 text-sm">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {confidenceToLabel(item.confidence)} · {(item.confidence * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="px-3 py-3 text-xs text-gray-500">{item.sourceSnippet}</td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Button variant="ghost" className="flex items-center gap-1" onClick={() => handleSingle('Push Trello', item.id)}>
                      <Trello className="h-3.5 w-3.5" /> Trello
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-1" onClick={() => handleSingle('Calendar event', item.id)}>
                      <CalendarCheck className="h-3.5 w-3.5" /> Calendar
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-1" onClick={() => handleSingle('Send reminder', item.id)}>
                      <Send className="h-3.5 w-3.5" /> Reminder
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
