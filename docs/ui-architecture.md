# Smart Meeting Follow-Up Machine — UI Architecture

## Routes & Layout

- `/` (Landing): hero, email capture, feature explainers, pricing, CTA.
- `/demo`: wizard-like flow to upload/paste transcript, preprocess, simulate agent orchestration, and show results.
- `/auth/signup` (placeholder for future auth work) routed via shared AuthLayout.

Global layout (`app/layout.tsx`) wraps children with font, theme, and global components (sticky email strip, toasts, modals hook containers).

## Component Map

- **Landing**: `HeroSection`, `EmailStrip`, `HowItWorks`, `Pricing`, `IntegrationsPreview`, `FooterCTA`.
- **Demo Flow**: `UploadPage`, `SpeakerEditor`, `ProcessingModal`, `MeetingResults`, `ActionItemsTable`, `FollowUpComposer`.
- **Shared**: `Navbar`, `Button`, `Card`, `Tabs`, `EmptyState`, `ErrorBanner`, `Tooltip`, `ConfirmationModal`.

Components live under `components/` with domain folders (e.g., `components/landing/HeroSection.tsx`). Assemblies and data mocks will live in route files inside `app/`.

## State & Data Flow

1. Landing page is mostly static with minimal client state (form validation via `react-hook-form` + `zod`).
2. Demo route uses a client-side state machine:
   - `UploadPage` emits `{ jobId, preview }`.
   - `SpeakerEditor` returns normalized transcript lines.
   - `ProcessingModal` subscribes to a mocked status stream (Observable or `EventSource` polyfill) and completes with aggregated agent outputs.
   - Results stored in a `useReducer` store that feeds `MeetingResults`, `ActionItemsTable`, `FollowUpComposer`.
3. Action item edits trigger optimistic updates + `toast` feedback. Bulk actions simulate network latency and integrate with mock connectors.

## Visual System

- Tailwind v4 (already configured) + CSS variables defined in `globals.css`.
- Use `clsx` + `tailwind-merge` for class composition.
- Iconography via `lucide-react`.
- Animations via `framer-motion` (hero entrance, modal transitions) and CSS keyframes (agent loop illustration).
- Charts via `recharts` (Analytics preview cards).

## Accessibility & Responsiveness

- All interactive components keyboard navigable; focus ring utility classes included.
- Use semantic landmarks (`header`, `main`, `section`, `nav`), ARIA attributes for live regions (processing updates, form errors).
- Responsive grid utilities: breakpoints at `md`, `lg`. Mobile-first stacking.

## Data Contracts (TypeScript)

```ts
export type ActionItem = {
  id: string
  title: string
  owner?: { id: string; name: string; email: string }
  deadline?: string
  status: 'open' | 'done'
  confidence: number
  sourceSnippet: string
  rationale?: string
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
  decisions: { id: string; text: string; participants: string[] }[]
  timeline: { id: string; timestamp: string; description: string }[]
  followUps: { id: string; channel: 'email' | 'slack'; content: string; recipient: string }[]
}
```

## Dependency Plan

- `lucide-react` — icons.
- `framer-motion` — animations.
- `react-hook-form` + `zod` — forms + validation.
- `@tanstack/react-query` — handle async demo actions + caching.
- `rxjs` — Observable stream for ProcessingModal.
- `recharts` — analytics visualizations.
- `sonner` — toast notifications.
- `date-fns` — deadline formatting.
- Utility: `clsx`, `tailwind-merge`.

## Next Steps

1. Install dependencies.
2. Build shared primitives (Button, Card, IconBadge, Skeleton, Tabs).
3. Create landing sections and compose on `/`.
4. Build `/demo` route with upload → preprocess → orchestration → results.
5. Wire sample data + mock async flows.
6. Add README instructions + run lint/build.
