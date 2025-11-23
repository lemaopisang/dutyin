# Smart Meeting Follow-Up Machine

Landing + demo experience for the multi-agent meeting assistant described in `AGENTS.MD`. Upload or paste a transcript, simulate orchestration (Summary, Action Items, Calendar, Follow-ups, Tracker), and explore the editable results UI.

## ✨ Feature Highlights

- **Hero + Landing stack:** animated hero, sticky email capture, How It Works, integrations, pricing, and CTA footer.
- **Demo flow (`/demo`):** Upload (file/paste/connect) → Speaker editor (search, redact, metadata) → Processing modal with live agent stream → Results tabs (summary, action items, decisions, timeline, follow-ups).
- **Editable action items:** Sort/search/filter, inline edits, CSV export, Trello/calendar/reminder buttons, bulk actions, and confidence badges with rationale.
- **Follow-up composer:** channel selector (email/Slack), template placeholders, preview panel, schedule send.
- **Auth preview (`/auth/signup`):** Auth layout, OAuth buttons, password strength meter, terms checkbox, and demo CTA.
- **Reusable primitives:** Buttons, cards, tabs, modal, skeleton, Empty/Error states, admin/integrations/analytics dashboards for future routes.

## 🧱 Tech Stack

- **Next.js 16 / App Router** with TypeScript
- **Tailwind CSS v4 preview** styling & custom components
- **Framer Motion, Radix UI, Lucide** for motion + accessibility
- **React Hook Form + Zod** form validation
- **TanStack Query + RxJS** to simulate orchestration streams
- **Recharts** for analytics previews
- **Sonner** for toasts

## 🚀 Local Development

```bash
npm install
npm run dev
# visit http://localhost:3000 and http://localhost:3000/demo
```

Additional scripts:

- `npm run lint` – ESLint (Next+TypeScript rules)
- `npm run build` / `npm run start` – production build + serve

## 🗺️ Key Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page with hero, email strip, process overview, pricing |
| `/demo` | End-to-end transcript → agents → results flow |
| `/auth/signup` | Auth layout + Sign-up form mock |

## 📦 Important Modules

- `components/landing/*` – marketing sections
- `components/demo/*` – upload wizard, editor, modal, results, table, composer
- `components/shared/states.tsx` – Empty/Error/Tooltip/Confirmation utilities
- `components/auth/*` – Auth layout & form
- `lib/types.ts`, `lib/mock-data.ts`, `lib/utils.ts` – shared contracts, sample data, helpers

## ✅ Acceptance Checklist

- Responsive layouts down to 360px
- Keyboard-accessible buttons/inputs/tabs
- Aria-live regions for form states and orchestration status
- Sample data seeded from `lib/mock-data.ts`
- Reusable UI primitives (buttons, cards, tabs, modal, checkbox, avatar, skeleton)

## 📚 Next Steps

- Wire real transcript ingestion + diarization backend
- Persist meeting results + integrate with Trello/Asana APIs
- Expand analytics, admin, and billing pages into full routes
- Add Playwright / Vitest coverage for Upload → Process → Results flow
