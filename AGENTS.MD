### Workflow + Next.js UI/UX prompts for the **Smart Meeting Follow-Up Machine** — ready to hand to devs or an AI UI generator.

---

## TL;DR

Website is required. Build a **Landing + Demo** MVP that takes a transcript, runs multi-agent orchestration (Summary, Action Items, Calendar, Follow-up, Tracker), and shows interactive results. This document includes a thorough end-to-end workflow and cut-and-paste Next.js component prompts for each UI section.

---

# 1 — Workflow (end-to-end)

1. **Entry / Landing**

   * Visitor lands → sees value prop, demo CTA, hero visual of multi-agent flow.
   * Goal: convert to demo try / signup / email capture.

2. **Auth / Onboarding**

   * Email + password / OAuth (Google/Microsoft).
   * Quick onboarding: choose use-case (team meetings, sales sync, design review).

3. **Project / Workspace Setup**

   * Create workspace (company/team) or personal workspace.
   * Invite teammates (optional).

4. **Input Methods**

   * Upload transcript file (.txt/.srt/.docx) OR paste raw transcript OR connect meeting provider (Zoom/Meet/Teams).
   * Optionally record audio + auto-transcribe.

5. **Pre-process**

   * Speaker diarization, normalization, preview, edit speaker labels, remove sensitive lines.

6. **Agent Orchestration**

   * **Summary Agent:** short/medium/long summaries.
   * **Action Items Agent:** tasks, owners, deadlines, priority, confidence.
   * **Decision Agent:** flags decisions and outcomes.
   * **Calendar Agent:** suggests events & deadlines.
   * **Follow-up Agent:** drafts follow-up messages.
   * **Tracker Agent:** creates tasks internally or integrates with Asana/Trello.
   * Sequence agents with retries/timeouts and optional human approval.

7. **Results UI**

   * Tabs: Summary | Action Items | Decisions | Timeline | Follow-ups.
   * Interactive action-items table: edit owner, set deadline, mark done, send reminder.
   * Confidence badge & source highlight (click to view context from transcript).

8. **Integrations & Actions**

   * Push tasks to Trello/Asana/Jira, create calendar events, send follow-up emails.
   * Webhooks / API for automation.

9. **Notifications & Tracking**

   * Reminders via email/Slack.
   * Dashboard: progress, overdue items, completion rate.

10. **Analytics & Audit**

    * Meeting metrics: action items count, avg time to close, owner responsiveness.
    * Exportable reports (CSV/PDF).

11. **Admin / Billing**

    * Workspace admin: user roles, billing, retention settings.

12. **Security & Compliance**

    * Data retention policy, encryption-in-transit/at-rest, privacy settings, redaction tools.

---

# 2 — Prompts for each UI/UX section (Next.js-ready)

> Each prompt below follows this concise pattern: **Title (filename) — Goal** then a single prompt block containing props, interactions, copy defaults, accessibility, and acceptance criteria. Drop these into your frontend task board or feed to an AI generator.

---

## 2.1 HeroSection (HeroSection.tsx)

**Goal:** Convert visitors — value prop + demo CTA + agent flow visual.

**Prompt:**
Build a Next.js React component `HeroSection` that renders a full-bleed hero with:

* Props: `{ title: string, subtitle: string, ctaPrimary: {text:string, href:string}, ctaSecondary?: {text:string, href:string}, visualDiagramSrc?: string }`
* Layout: left column: title (H1), subtitle (p), CTAs (primary filled button, secondary ghost). Right column: responsive SVG/PNG flow diagram (Summary → Action Items → Tracker).
* Copy (defaults):

  * title: `Never miss a meeting action item again.`
  * subtitle: `AI meeting assistant that summarizes, assigns, and tracks follow-ups automatically.`
  * primary CTA: `Try with Sample Transcript` (opens demo route `/demo`)
  * secondary CTA: `See How It Works` (scrolls to #how-it-works)
* States: loading skeleton for visual if diagram not loaded; mobile stacks with CTA under copy.
* Animations: subtle entrance animation for hero text and a looped micro-illustration of agent flow.
* Accessibility: H1 present, proper aria-label on CTA buttons, alt text for diagram.
* Acceptance: on click primary CTA navigates to `/demo`. On keyboard navigation, both CTAs reachable and announce via screen reader.

---

## 2.2 EmailStrip (EmailStrip.tsx)

**Goal:** Collect emails pre-signup for demo access.

**Prompt:**
Create `EmailStrip` sticky component with:

* Props: `{ placeholder: string, onSubmit: (email:string)=>Promise }`
* UI: single input, submit button, small checkbox `Notify me about product updates` (checked by default).
* Validation: client-side email format check; show inline error message.
* Success: replace form with confirmation “Check your inbox — demo access link sent.”
* Accessibility: label tied to input, error announced by ARIA-live region.
* Acceptance: onSubmit called with valid email; show spinner while submitting.

---

## 2.3 Auth Screens (AuthLayout + SignUpForm + OAuthButtons)

**Goal:** Fast sign-up / sign-in via email or Google/Microsoft.

**Prompt:**
Build `AuthLayout` and `SignUpForm` components:

* Props: SignUpForm `{ onSignUp: (data)=>Promise, providers?: string[] }`
* Fields: email, password, workspace name (optional). Show OAuth buttons: Google & Microsoft (simulate flow with placeholder URLs).
* UX: password strength meter, "Continue as demo" button that creates a temporary workspace without full signup.
* Copy: concise microcopy and legal checkbox `I agree to Terms`.
* Acceptance: form validation, show error messages; keyboard-friendly.

---

## 2.4 Dashboard (Dashboard.tsx)

**Goal:** Home for recent meetings, quick-start demo, stats.

**Prompt:**
Create `Dashboard`:

* Props: `{ userName: string, recentMeetings: Meeting[], metrics: {openTasks:number, closedTasksLast7Days:number} }`
* Show welcome banner, quick buttons: `New Meeting`, `Upload Transcript`, `Connect Calendar`.
* Show recent meeting cards with date, #action items, status pill (Open/Closed).
* Acceptance: clicking meeting navigates to `/meetings/[id]`. Empty-state: CTA to upload sample transcript.

---

## 2.5 UploadPage (UploadPage.tsx)

**Goal:** Let user provide transcript (file/paste/connect provider).

**Prompt:**
Build `UploadPage` with three input methods:

* File Upload (accept .txt,.srt,.docx,.json), Paste transcript textarea, Connect (buttons for Zoom/Google Meet/Teams linking).
* Props: `{ onProcess: (input)=>Promise<ProcessResponse> }` where `ProcessResponse` contains `{ jobId:string, preview:string }`
* UX: Show allowed file types, max file size; show progress bar; preview snippet once uploaded with “Edit speakers” button.
* Accessibility: label for file input, keyboard accessible buttons.
* Acceptance: onProcess returns jobId and preview snippet visible.

---

## 2.6 SpeakerEditor (SpeakerEditor.tsx)

**Goal:** Edit speaker labels, remove sensitive lines, set meeting metadata.

**Prompt:**
Create `SpeakerEditor` component:

* Props: `{ transcriptLines: {time?:string, speaker?:string, text:string}[], onSave: (cleaned)=>void }`
* Features: inline-edit speaker name (dropdown + free text), select lines and delete/merge, search within transcript.
* UI: two-pane: transcript + metadata panel (meeting date, language, timezone).
* Acceptance: onSave returns normalized transcript; show change count.

---

## 2.7 ProcessingModal (ProcessingModal.tsx)

**Goal:** Show orchestration progress and allow abort.

**Prompt:**
Create `ProcessingModal`:

* Props: `{ jobId:string, statusStream: Observable<StatusEvent>, onAbort:()=>void }`
* StatusEvent: `{ agent: 'Summary'|'ActionItems'|'Calendar'|'FollowUp', status: 'pending'|'running'|'done'|'error', message?:string }`
* UI: vertical list of agents with icons, spinner for running, green check for done, error pill for failures with retry button.
* Acceptance: user can abort job; updates reflect real-time status (simulate polling).

---

## 2.8 MeetingResults (MeetingResults.tsx)

**Goal:** Show final outputs with interactivity.

**Prompt:**
Build `MeetingResults` with tabs: `Summary | Action Items | Decisions | Timeline | Follow-ups`.

* Props: `{ meetingId:string, summary: {short:string, medium:string, long:string}, actionItems: ActionItem[], decisions: Decision[], timeline: TimelineEvent[], followUps: FollowUp[] }`
* `ActionItem` shape: `{ id, title, owner?: {id,name,email}, deadline?: string, status: 'open'|'done', confidence: number, sourceSnippet: string }`
* Interactions:

  * Inline edit title/owner/deadline/status.
  * Owner dropdown auto-suggest from workspace users.
  * Click sourceSnippet expands transcript context modal with jump-to-transcript.
  * Bulk actions: assign, set deadline, export, push to external tracker.
  * Confidence shown as badge; hover shows why (short rationale).
* Acceptance: edits persist to backend (simulate API), keyboard accessible table, mobile-friendly stacked layout.

---

## 2.9 ActionItemsTable (ActionItemsTable.tsx)

**Goal:** Editable, sortable, filterable table with export & integrations.

**Prompt:**
Create `ActionItemsTable`:

* Props: `{ items: ActionItem[], onUpdate: (item)=>Promise, onBulkAction: (action, ids)=>Promise }`
* Features: sort by deadline/confidence/owner, filter by owner/status, search, select multiple, export CSV.
* Integration buttons per row: `Push to Trello`, `Create Calendar Event`, `Send Reminder`.
* Acceptance: CSV export includes original source snippet, all columns.

---

## 2.10 FollowUpComposer (FollowUpComposer.tsx)

**Goal:** Auto-draft follow-up emails/messages editable by user.

**Prompt:**
Create `FollowUpComposer`:

* Props: `{ template: string, recipients: {name,email}[], meetingContext:string, onSend: (payload)=>Promise }`
* Features: editable rich-text area (basic formatting), placeholders ({{owner}}, {{task_list}}), preview, schedule send time, channel selector (email/slack).
* Acceptance: placeholders render in preview; send shows success toast.

---

## 2.11 Integrations (Integrations.tsx)

**Goal:** Manage connectors (Calendar, Slack, Trello, Asana, Gmail).

**Prompt:**
Build `Integrations` page:

* Props: `{ connectors: {type:string, connected:boolean, lastSync?:string}[] }`
* UI: grid of connector cards with connect button, status, scopes required, revoke.
* Flow: clicking Connect opens OAuth popup (mock), show steps and scopes.
* Acceptance: show connected status and last sync time.

---

## 2.12 Analytics (Analytics.tsx)

**Goal:** Show meeting metrics and owner performance.

**Prompt:**
Create `Analytics`:

* Props: `{ metrics: {period:string, meetings:number, avgActionItems:number, avgCloseTimeHours:number, overdueRate:number}, ownerStats: OwnerStat[] }`
* Charts: line for action items over time, bar for owner completion rate, table for top overdue tasks.
* Note: implement charts using a chart lib — wire placeholders for data.
* Acceptance: date-range filter updates metrics.

---

## 2.13 HowItWorks (HowItWorks.tsx)

**Goal:** Explain multi-agent orchestration simply and visually.

**Prompt:**
Create a content block `HowItWorks` with:

* Steps visual (icons + short captions): Upload → Preprocess → Summary Agent → Action Items Agent → Calendar/Follow-up → Track.
* Each step expandable with microcopy and example input/output.
* CTA: `Run a Demo` anchored to demo.
* Accessibility: semantic headings, alt text.

---

## 2.14 Pricing (Pricing.tsx)

**Goal:** Clear plans, feature matrix, CTA to upgrade.

**Prompt:**
Build `Pricing` component:

* Props: `{ plans: Plan[] }` where Plan `{id,name,price,features:string[],ctaText}`
* UI: 3-column pricing cards, feature comparison table, FAQ accordion.
* Acceptance: upgrade button triggers checkout modal.

---

## 2.15 AdminSettings (AdminSettings.tsx)

**Goal:** Manage users, billing, retention, roles.

**Prompt:**
Create `AdminSettings`:

* Tabs: Users, Roles & Permissions, Billing, Data Retention.
* Users table with invite, role change, revoke.
* Roles section editable with granular permissions toggles.
* Acceptance: only visible to admin role prop; changes saved.

---

## 2.16 Error & Empty States (reusable)

**Goal:** Good UX for nothing or errors.

**Prompt:**
Provide a set of reusable small components:

* `EmptyState` with image, message, CTA.
* `ErrorBanner` with retry button and error code.
* `Tooltip` and `ConfirmationModal` patterns.
* Copy examples for common errors: upload failed, processing failed, oauth declined.

---

## 2.17 Responsive & Accessibility Checklist

**Prompt (for README or component docs):**

* All pages responsive: desktop/tablet/mobile; layout stacks under 768px.
* Keyboard nav: tab order logical; focus visible.
* ARIA: form inputs labeled; dynamic content uses aria-live.
* Contrast: follow WCAG AA.
* Tests: unit tests for ActionItemsTable CRUD, integration test for Upload->Process->Results flow.

---

# 3 — Bonus: Micro-data shapes (copy-paste)

```ts
type ActionItem = {
  id: string;
  title: string;
  owner?: { id:string; name:string; email:string };
  deadline?: string; // ISO
  status: 'open'|'done';
  confidence: number; // 0-1
  sourceSnippet: string;
}

type MeetingResults = {
  meetingId: string;
  summary: { short:string; medium:string; long:string };
  actionItems: ActionItem[];
  decisions: { id:string; text:string; participants:string[] }[];
}
```

---

# 4 — Dev priorities (what to build first)

1. Landing + Email strip + Hero
2. Demo page: Upload sample transcript → Processing status → Results viewer (Summary + Action Items) — **MVP**
3. Auth + Workspace + Basic integrations (calendar)
4. Tracker & push-to-external integrations
5. Analytics, admin, billing

---

# 5 — Acceptance notes & extra tips

* Focus MVP on one clean demo flow: sample transcript → run agents → show summary & action items.
* Keep human-in-the-loop: let users edit owners/deadlines before pushing to external tools.
* Surface confidence & source snippet for transparency.
* Keep integrations optional: make core product valuable standalone.

---



*End of agents.MD*
