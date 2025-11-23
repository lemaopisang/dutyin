import { ActionItem, Decision, FollowUp, MeetingResults, MeetingSummary, Owner, TimelineEvent, TranscriptLine } from './types'

export const workspaceOwners: Owner[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex@orion.studio' },
  { id: '2', name: 'Priya Desai', email: 'priya@orion.studio' },
  { id: '3', name: 'Morgan Lee', email: 'morgan@orion.studio' },
]

export const sampleTranscript: TranscriptLine[] = [
  {
    id: 'l1',
    time: '00:00:12',
    speaker: 'Alex',
    text: 'Thanks for joining. Today we need to finalize the navigation redesign milestones.',
  },
  {
    id: 'l2',
    time: '00:01:02',
    speaker: 'Priya',
    text: "We validated with five customers. They want faster access to project health and a clearer action list.",
  },
  {
    id: 'l3',
    time: '00:03:45',
    speaker: 'Morgan',
    text: 'I can update the Jira workflow to include the new QA lane by Friday.',
  },
  {
    id: 'l4',
    time: '00:05:10',
    speaker: 'Alex',
    text: 'Let us lock the beta launch target for March 18 so marketing can prep the teaser campaign.',
  },
]

export const sampleSummary: MeetingSummary = {
  short: 'Navigation redesign aligns on faster project health visibility and new QA workflow before March launch.',
  medium:
    'The product team synced on the navigation redesign. Research confirmed customers need quicker access to health metrics, so design will adjust the left rail. Engineering owns the QA workflow update by Friday, and marketing needs a locked beta date of March 18 to begin campaign prep.',
  long:
    'After reviewing research interviews, the group agreed to refine the navigation to highlight high-signal widgets. Morgan will reconfigure the Jira pipeline with a QA lane to prevent backlog surprises. Alex requested final specs by next Tuesday so the March 18 beta launches with actionable onboarding. Follow-ups include sharing the new component spec sheet and verifying analytics tracking changes.',
}

export const sampleActionItems: ActionItem[] = [
  {
    id: 'ai-1',
    title: 'Ship updated navigation spec doc',
    owner: workspaceOwners[0],
    deadline: new Date().toISOString(),
    status: 'open',
    confidence: 0.84,
    sourceSnippet: 'We validated with five customers... faster access to project health and a clearer action list.',
    rationale: 'Mentioned directly as next deliverable during research recap.',
  },
  {
    id: 'ai-2',
    title: 'Add QA lane inside Orion Jira workflow',
    owner: workspaceOwners[2],
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    confidence: 0.9,
    sourceSnippet: 'I can update the Jira workflow to include the new QA lane by Friday.',
    rationale: 'Explicit owner and timeline captured verbatim.',
  },
  {
    id: 'ai-3',
    title: 'Confirm March 18 beta campaign assets',
    owner: workspaceOwners[1],
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    confidence: 0.72,
    sourceSnippet: 'Let us lock the beta launch target for March 18 so marketing can prep the teaser.',
    rationale: 'Implicit marketing follow-up to support the launch date.',
  },
]

export const sampleDecisions: Decision[] = [
  {
    id: 'd1',
    text: 'Beta launch locked for March 18 with feature freeze one week prior.',
    participants: ['Alex', 'Priya', 'Morgan'],
  },
]

export const sampleTimeline: TimelineEvent[] = [
  {
    id: 't1',
    timestamp: '2025-02-04T09:00:00Z',
    description: 'Research results recap + scope alignment',
    type: 'note',
  },
  {
    id: 't2',
    timestamp: '2025-02-04T09:23:00Z',
    description: 'QA workflow ownership assigned to Morgan',
    type: 'action',
  },
]

export const sampleFollowUps: FollowUp[] = [
  {
    id: 'f1',
    channel: 'email',
    recipient: 'design-team@orion.studio',
    content: 'Sharing the navigation redesign doc and next milestones. Pending QA lane confirmation.',
    status: 'draft',
  },
  {
    id: 'f2',
    channel: 'slack',
    recipient: '#marketing-sync',
    content: 'Heads-up on March 18 beta; prepping launch tasks after product sign-off.',
    status: 'scheduled',
  },
]

export const sampleResults: MeetingResults = {
  meetingId: 'mtg-42',
  summary: sampleSummary,
  actionItems: sampleActionItems,
  decisions: sampleDecisions,
  timeline: sampleTimeline,
  followUps: sampleFollowUps,
}
