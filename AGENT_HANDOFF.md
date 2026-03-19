# Agent Handoff: Deloitte Hack Frontend

## 1) What this app currently is
This is a React single-page legal assistant prototype with:
- A dashboard-first workflow
- Case workspace chat UI
- Upload, graph, converter, analysis, voice, and extensions pages
- A guided product tour overlay on the Dashboard
- Glassmorphism styling pass applied across core pages

The project is frontend-only right now (no backend/API wiring).

## 2) Tech stack
- React 19
- React Router DOM 7
- D3 7 (graph visualization)
- CRA / react-scripts 5
- CSS-in-JSX style blocks in pages + shared `src/index.css`

Key files:
- `src/App.js` (routing)
- `src/index.css` (global design system + shared styles)
- `src/context/DemoContext.jsx` (onboarding/tour persistence)

## 3) Current route map
Defined in `src/App.js`:

Main app routes:
- `/` -> Dashboard
- `/workspace`
- `/upload`
- `/graph`
- `/extensions`
- `/converter`
- `/analysis`
- `/voice`

Demo routes still present (legacy/demo content):
- `/demo/workspace`
- `/demo/extensions`
- `/demo/calendar`
- `/demo/dashboard`
- `/demo/graph`
- `/demo/converter`
- `/demo/voice`
- `/demo/analysis`

Behavior note:
- `/demo` redirects to `/`
- Unknown routes redirect to `/`

## 4) Main product behavior by page

### Dashboard (`src/pages/Dashboard.jsx`)
- Primary home page
- Sidebar navigation
- Hero search/input area
- Suggestion chips
- Recent case gallery cards
- Guided tour overlay:
  - Step-by-step highlight of real dashboard elements
  - Dynamic spotlight box + contextual floating tour card
  - Quick Tour button
  - Skip/Back/Next/Finish controls
  - Closes and marks onboarding complete

### Workspace (`src/pages/Workspace.jsx`)
- 3-column layout:
  - Left: case/doc tree
  - Middle: chat history + input
  - Right: case connection preview and quick action buttons
- Mock data, static interaction scaffolding

### Extensions (`src/pages/Extensions.jsx`)
Now aligned with requested functionality:
- Domain chat extensions:
  - Cyber Law Assistant
  - Taxation Assistant
  - IP & Patent Assistant
  - Corporate Law Assistant
  - Environmental Law Assistant
- Productivity extension:
  - Google Calendar
- Install/remove toggles with persistence in localStorage
- Default installed on first run:
  - `cyber-law`
  - `google-calendar`

### Upload (`src/pages/Upload.jsx`)
- Simulated ingestion flow
- Document type selection + options
- Mock progress area

### Graph (`src/pages/Graph.jsx`)
- D3 force-directed graph with drag + zoom
- Sidebar filters (visual only)

### Converter (`src/pages/Converter.jsx`)
- IPC vs BNS side-by-side mapping view
- Static sample for section conversion UX

### Analysis (`src/pages/Analysis.jsx`)
- Split layout:
  - Left PDF reading pane with highlights
  - Right structured editable sections

### Voice (`src/pages/Voice.jsx`)
- Voice dictation mock panel
- Live transcript area and AI suggestions panel

## 5) Styling/design system state
A broad glassmorphism pass was applied while retaining original color palette.

Global style source:
- `src/index.css`

Important CSS variables added/used:
- `--glass-surface`
- `--glass-elevated`
- `--glass-border`
- `--glass-shadow`

Design characteristics:
- Glassy nav/sidebars/cards
- Soft borders and depth shadows
- Subtle radial background accents
- Better hover and focus transitions
- Scrollbar styling

## 6) App state and persistence keys

In `src/context/DemoContext.jsx`:
- `app_onboarding_done` (localStorage)
  - controls whether onboarding is considered complete
  - currently used by dashboard tour state

In `src/pages/Extensions.jsx`:
- `app_chat_extensions` (localStorage)
  - array of installed extension IDs

## 7) Legacy/demo code status
- `src/pages/demos/*` pages still exist and are routable directly.
- They are not the main onboarding path anymore.
- If you want a cleaner codebase, candidates for cleanup:
  - remove demo page imports and routes from `src/App.js`
  - delete `src/pages/demos/*`
  - optionally delete `src/pages/DemoLanding.jsx` if unused

## 8) Known implementation notes / rough edges
- This is largely UI prototype logic (no backend/data fetching).
- Some components still use large inline style blocks.
- There is no centralized data/config module for all feature metadata.
- Environment may show CRA deprecation warnings from tooling (non-blocking).

Repo root currently includes odd files likely from earlier command artifacts:
- `frontend@0.1.0`
- `npm`
- `react-scripts`

These should be reviewed and removed if unintended.

## 9) How to run
- `npm install`
- `npm start`

Useful checks:
- `npm run build`
- `npm run lint`

## 10) Suggested change strategy for next agent
If suggesting/implementing improvements, prioritize:
1. Route/content cleanup of legacy demo pages
2. Extract repeated inline styles into reusable classes/components
3. Add responsive/mobile breakpoints for all page layouts
4. Wire extension selection into workspace chat behavior
5. Introduce data/config layer for page content and card metadata
6. Add backend API hooks and real state management when ready

## 11) Fast file index (change hotspots)
- Routing and route cleanup: `src/App.js`
- Dashboard + guided tour logic: `src/pages/Dashboard.jsx`
- Extensions data/persistence: `src/pages/Extensions.jsx`
- Global look and feel: `src/index.css`
- Shared onboarding context: `src/context/DemoContext.jsx`
- Major feature pages:
  - `src/pages/Workspace.jsx`
  - `src/pages/Upload.jsx`
  - `src/pages/Graph.jsx`
  - `src/pages/Converter.jsx`
  - `src/pages/Analysis.jsx`
  - `src/pages/Voice.jsx`
