'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const tabs = ['Users', 'Roles & Permissions', 'Billing', 'Data Retention']

export function AdminSettings({ isAdmin = true }: { isAdmin?: boolean }) {
  const [activeTab, setActiveTab] = useState(tabs[0])
  const [users, setUsers] = useState([
    { id: '1', name: 'Alex Rivera', role: 'Admin' },
    { id: '2', name: 'Priya Desai', role: 'Editor' },
  ])

  if (!isAdmin) {
    return <Card>You do not have permission to view admin settings.</Card>
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`rounded-full px-4 py-1 text-sm ${activeTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <Card>
        {activeTab === 'Users' && (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <select className="rounded-full border border-gray-200 px-3 py-1 text-sm" value={user.role} onChange={(e) => setUsers((prev) => prev.map((item) => (item.id === user.id ? { ...item, role: e.target.value } : item)))}>
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </div>
            ))}
            <Button variant="secondary">Invite teammate</Button>
          </div>
        )}
        {activeTab === 'Roles & Permissions' && (
          <div className="space-y-4 text-sm">
            <p>Toggle granular permissions.</p>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked /> Manage billing
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked /> Export data
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Delete transcripts
            </label>
          </div>
        )}
        {activeTab === 'Billing' && (
          <div className="space-y-3 text-sm">
            <p>Plan: Team · $79/mo</p>
            <Button variant="secondary">Update payment method</Button>
          </div>
        )}
        {activeTab === 'Data Retention' && (
          <div className="space-y-3 text-sm">
            <label className="block">Retention period
              <select className="mt-2 rounded-lg border border-gray-200 px-3 py-2">
                <option>90 days</option>
                <option>180 days</option>
                <option>365 days</option>
              </select>
            </label>
            <Button variant="secondary">Apply policy</Button>
          </div>
        )}
      </Card>
    </section>
  )
}
