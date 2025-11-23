export type Owner = {
  id: string
  name: string
  email: string
}

export type ActionItem = {
  id: string
  title: string
  owner?: Owner
  deadline?: string
  status: 'open' | 'done'
  confidence: number
  sourceSnippet: string
  rationale?: string
}

export type Decision = {
  id: string
  text: string
  participants: string[]
}

export type TimelineEvent = {
  id: string
  timestamp: string
  description: string
  type?: 'milestone' | 'note' | 'action'
}

export type FollowUp = {
  id: string
  channel: 'email' | 'slack'
  content: string
  recipient: string
  status?: 'draft' | 'scheduled' | 'sent'
}

export type MeetingSummary = {
  short: string
  medium: string
  long: string
}

export type MeetingResults = {
  meetingId: string
  summary: MeetingSummary
  actionItems: ActionItem[]
  decisions: Decision[]
  timeline: TimelineEvent[]
  followUps: FollowUp[]
}

export type TranscriptLine = {
  id: string
  time?: string
  speaker?: string
  text: string
}

export type ProcessResponse = {
  jobId: string
  preview: string
}

export type StatusEvent = {
  agent: 'Summary' | 'ActionItems' | 'Calendar' | 'FollowUp' | 'Tracker'
  status: 'pending' | 'running' | 'done' | 'error'
  message?: string
}
