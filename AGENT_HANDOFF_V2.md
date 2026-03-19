# Agent Handoff: LegalMind AI — Demo UI Expressiveness Overhaul

## Context
This is a demo-only React prototype for **LegalMind AI** — an agentic legal intelligence platform built for Indian law firms. The purpose of this UI is to **sell the vision** at a hackathon (Hacksplosion 2026, Deloitte). Every screen must feel alive, data-rich, and tell a coherent story. The current build has pages that are mostly scaffolding with placeholder text. The goal of this pass is to make the entire demo immersive, realistic, and impressive without needing a backend.

---

## Core Directive: One Narrative Thread

**Introduce a single persistent demo case across ALL pages:**

> **"Cyber Fraud — Sharma v. HDFC Bank Ltd."**
> - Court: Delhi High Court
> - Case No.: CRL.REV.P 412/2024
> - Sections: IPC 420, IPC 66C (IT Act 2000), IPC 43A
> - Status: **Arguments Stage** | Filed: 14-Aug-2024
> - Petitioner Counsel: Adv. Rajesh Malhotra
> - Respondent: HDFC Bank Ltd. (represented by Cyril Amarchand Mangaldas)

This same case must appear on the Dashboard (as active case), pre-loaded in Workspace, the subject of Analysis, referenced in the Graph, and the source of the Converter demo.

---

## Step 1: Create Central Mock Data File

**Create: `src/data/demoData.js`**

This file centralizes ALL demo content so pages don't have scattered hardcoded strings.

```js
// src/data/demoData.js

export const DEMO_CASE = {
  id: "case-001",
  title: "Sharma v. HDFC Bank Ltd.",
  number: "CRL.REV.P 412/2024",
  court: "Delhi High Court",
  sections: ["IPC 420", "IPC 66C", "IPC 43A"],
  status: "Arguments Stage",
  domain: "Cyber Law",
  filed: "14 Aug 2024",
  petitioner: "Anuj Sharma",
  respondent: "HDFC Bank Ltd.",
  counsel: "Adv. Rajesh Malhotra",
  oppCounsel: "Cyril Amarchand Mangaldas",
};

export const RECENT_CASES = [
  { id: "case-001", title: "Sharma v. HDFC Bank Ltd.", domain: "Cyber Law", court: "Delhi HC", status: "Arguments Stage", statusColor: "#f59e0b", docs: 7, lastActivity: "2 hours ago" },
  { id: "case-002", title: "State v. Rajan Kapoor", domain: "Criminal", court: "Sessions Court, Mumbai", status: "Judgment Pending", statusColor: "#ef4444", docs: 12, lastActivity: "Yesterday" },
  { id: "case-003", title: "TechCorp India Pvt Ltd v. Nair", domain: "IP & Patent", court: "High Court of Kerala", status: "Hearing Scheduled", statusColor: "#3b82f6", docs: 5, lastActivity: "3 days ago" },
  { id: "case-004", title: "Union of India v. Mehrotra Constructions", domain: "Taxation", court: "ITAT Delhi", status: "Evidence Stage", statusColor: "#8b5cf6", docs: 19, lastActivity: "1 week ago" },
];

export const WORKSPACE_CHAT = [
  {
    role: "user",
    text: "Summarize the key facts of this case and what sections apply.",
    time: "10:14 AM",
  },
  {
    role: "ai",
    text: `**Case Summary — Sharma v. HDFC Bank Ltd. (CRL.REV.P 412/2024)**

The petitioner, Anuj Sharma, alleges that ₹3.8 lakhs were fraudulently transferred from his HDFC savings account via unauthorized OTP-based transactions between 12–14 July 2023. The petitioner contends that the bank failed to implement adequate Two-Factor Authentication controls per RBI Circular RBI/2021-22/91.

**Applicable Sections:**
- **IPC § 420** — Cheating and dishonestly inducing delivery of property
- **IT Act § 66C** — Identity theft (fraudulent use of electronic signature/password)
- **IT Act § 43A** — Compensation for failure to protect data (civil liability on HDFC Bank)

**Key Factual Disputes:**
1. Whether the OTP was shared voluntarily or intercepted via SIM-swap attack
2. Whether HDFC Bank followed RBI's mandated fraud detection protocols
3. Jurisdiction — whether Sessions Court or Cyber Cell has primary cognizance

*Sources: [FIR_Copy.pdf, pg 2] [Client_Statement.pdf, pg 1–3] [RBI_Circular_2022.pdf]*`,
    time: "10:14 AM",
    citations: ["FIR_Copy.pdf", "Client_Statement.pdf", "RBI_Circular_2022.pdf"],
  },
  {
    role: "user",
    text: "Find precedents where the bank was held liable in similar SIM-swap fraud cases.",
    time: "10:17 AM",
  },
  {
    role: "ai",
    text: `**Precedent Analysis — Bank Liability in SIM-Swap Fraud**

Found **4 directly relevant precedents** via Indian Kanoon:

| Case | Court | Year | Outcome |
|------|-------|------|---------|
| Umashankar Sivasubramanian v. ICICI Bank | Madras HC | 2023 | Bank liable — ₹5.4L refund ordered |
| Shri Krishna Prasad v. SBI | NCDRC | 2022 | Partial liability — 70% refund |
| Kesavananda v. Axis Bank | Kerala HC | 2023 | Dismissed — OTP voluntarily shared |
| Ramesh Gupta v. Kotak Mahindra | Delhi HC | 2024 | **Landmark** — Bank liable for § 43A data protection failure |

**Strongest Precedent for Your Case:**
*Ramesh Gupta v. Kotak Mahindra (2024 SCC OnLine Del 1847)* — Delhi HC held that banks cannot shift liability when internal fraud monitoring systems fail to flag anomalous transactions. Directly analogous to HDFC's alleged protocol failure here.

*Cyber Law Extension active — 10,247 precedents indexed*`,
    time: "10:17 AM",
    citations: ["Ramesh_Gupta_v_Kotak.pdf", "Kesavananda_v_Axis.pdf"],
    extensionActive: "Cyber Law",
  },
  {
    role: "user",
    text: "Draft an argument outline for the next hearing.",
    time: "10:22 AM",
  },
  {
    role: "ai",
    text: `**Argument Outline — Sharma v. HDFC Bank (Next Hearing: Arguments Stage)**

**Prayer:** Direction to HDFC Bank to refund ₹3.8L with 9% interest + compensation under § 43A IT Act

---

**I. Threshold: Jurisdiction & Cognizance**
→ Cyber Cells under § 78 IT Act have cognizance; Sessions Court retains concurrent jurisdiction per *Shreya Singhal v. UoI (2015) 5 SCC 1*

**II. Primary Argument: Bank's Vicarious Liability**
→ HDFC failed RBI Circular No. RBI/2021-22/91 mandate for real-time fraud alerts
→ Apply *Ramesh Gupta v. Kotak* — systemic failure ≠ customer negligence
→ § 43A: "reasonable security practices" threshold not met

**III. Alternative: § 420 IPC Cheating**
→ SIM-swap orchestrated by third party; bank's failure enabled execution
→ Distinguish *Kesavananda* (OTP voluntarily shared) — here: telecom compromise, not customer fault

**IV. Quantum of Relief**
→ ₹3.8L principal + 9% simple interest from 14-Jul-2023
→ ₹50,000 compensation for mental harassment (NCDRC precedents)
→ Exemplary costs against HDFC for systemic negligence`,
    time: "10:22 AM",
    citations: ["Shreya_Singhal_2015.pdf"],
    extensionActive: "Cyber Law",
  },
];

export const CASE_DOCUMENTS = [
  { id: "d1", name: "FIR_Copy.pdf", type: "FIR", size: "340 KB", uploadedAt: "14 Aug 2024", aiProcessed: true },
  { id: "d2", name: "Client_Statement.pdf", type: "Client Statement", size: "128 KB", uploadedAt: "15 Aug 2024", aiProcessed: true },
  { id: "d3", name: "Bank_Transaction_Records.pdf", type: "Evidence", size: "2.1 MB", uploadedAt: "15 Aug 2024", aiProcessed: true },
  { id: "d4", name: "RBI_Circular_2022.pdf", type: "Regulation", size: "480 KB", uploadedAt: "16 Aug 2024", aiProcessed: true },
  { id: "d5", name: "HDFC_Reply_Notice.pdf", type: "Reply", size: "220 KB", uploadedAt: "20 Aug 2024", aiProcessed: true },
  { id: "d6", name: "Ramesh_Gupta_v_Kotak.pdf", type: "Precedent", size: "1.8 MB", uploadedAt: "Auto-fetched", aiProcessed: true, autoFetched: true },
  { id: "d7", name: "Kesavananda_v_Axis.pdf", type: "Precedent", size: "940 KB", uploadedAt: "Auto-fetched", aiProcessed: true, autoFetched: true },
];

export const GRAPH_NODES = [
  // Case node (center)
  { id: "case-001", label: "Sharma v. HDFC Bank", type: "case", group: "current" },
  // Documents
  { id: "doc-fir", label: "FIR Copy", type: "document", group: "doc" },
  { id: "doc-stmt", label: "Client Statement", type: "document", group: "doc" },
  { id: "doc-txn", label: "Bank Transactions", type: "document", group: "doc" },
  { id: "doc-rbi", label: "RBI Circular 2022", type: "document", group: "regulation" },
  // Precedents
  { id: "prec-ramesh", label: "Ramesh Gupta v. Kotak (2024)", type: "precedent", group: "precedent" },
  { id: "prec-kesav", label: "Kesavananda v. Axis (2023)", type: "precedent", group: "precedent" },
  { id: "prec-uma", label: "Umashankar v. ICICI (2023)", type: "precedent", group: "precedent" },
  { id: "prec-shreya", label: "Shreya Singhal v. UoI (2015)", type: "precedent", group: "precedent" },
  // Sections
  { id: "sec-420", label: "IPC § 420", type: "section", group: "section" },
  { id: "sec-66c", label: "IT Act § 66C", type: "section", group: "section" },
  { id: "sec-43a", label: "IT Act § 43A", type: "section", group: "section" },
  // Related cases
  { id: "case-002", label: "State v. Rajan Kapoor", type: "case", group: "related" },
  { id: "case-005", label: "Verma v. PNB (2023)", type: "case", group: "related" },
];

export const GRAPH_EDGES = [
  { source: "case-001", target: "doc-fir" },
  { source: "case-001", target: "doc-stmt" },
  { source: "case-001", target: "doc-txn" },
  { source: "case-001", target: "doc-rbi" },
  { source: "case-001", target: "prec-ramesh", label: "relies on" },
  { source: "case-001", target: "prec-kesav", label: "distinguishes" },
  { source: "case-001", target: "prec-uma", label: "analogous" },
  { source: "case-001", target: "sec-420" },
  { source: "case-001", target: "sec-66c" },
  { source: "case-001", target: "sec-43a" },
  { source: "prec-ramesh", target: "sec-43a", label: "interprets" },
  { source: "prec-ramesh", target: "prec-shreya", label: "cites" },
  { source: "case-002", target: "sec-420" },
  { source: "case-005", target: "sec-43a" },
  { source: "case-005", target: "prec-uma" },
];

export const ANALYSIS_JUDGMENT = {
  title: "Ramesh Gupta v. Kotak Mahindra Bank Ltd.",
  citation: "2024 SCC OnLine Del 1847",
  court: "High Court of Delhi",
  bench: "Honourable Justice Suresh Kumar Kait",
  date: "22 February 2024",
  outcome: "ALLOWED",
  coreIssue: "Whether a bank can be held liable under Section 43A of the IT Act 2000 for failing to implement reasonable security practices that enabled unauthorized digital transactions via a SIM-swap attack orchestrated by a third party.",
  petitioner: { name: "Ramesh Gupta", role: "Account holder, victim of SIM-swap fraud resulting in ₹6.2L unauthorized transfer" },
  respondent: { name: "Kotak Mahindra Bank Ltd.", role: "Respondent bank alleged to have failed fraud detection protocols" },
  history: "Single-judge bench. Originated from complaint before Banking Ombudsman (dismissed). Writ filed directly under Article 226.",
  petitionerArgs: [
    { arg: "Bank's real-time fraud monitoring failed to flag 11 rapid sequential transactions within 4 minutes", support: "Kotak Internal Audit Report (Exh. P-3)" },
    { arg: "SIM-swap executed via telecom provider — petitioner never shared OTP voluntarily", support: "Airtel Forensic Report (Exh. P-7)" },
    { arg: "§ 43A liability is strict — 'reasonable security practices' is an objective standard the bank failed", support: "Information Technology (Reasonable Security Practices) Rules, 2011" },
  ],
  respondentArgs: [
    { arg: "OTP-based authentication is industry-standard and was functioning correctly", support: "NPCI Circular 2020-21/47" },
    { arg: "Bank cannot be held liable for failure of third-party telecom infrastructure", support: "Kesavananda v. Axis Bank (2023)" },
    { arg: "Petitioner failed to report fraud within the 3-day RBI window, disentitling to full relief", support: "RBI Master Direction on Digital Payments, 2022" },
  ],
  legalFramework: [
    { section: "IT Act § 43A", description: "Compensation for failure to protect sensitive personal data", application: "Primary liability provision — breach of reasonable security practices" },
    { section: "IPC § 420", description: "Cheating and dishonest inducement", application: "Applied to third-party fraudsters; bank held vicariously for enabling conditions" },
    { section: "IT Act § 66C", description: "Punishment for identity theft", application: "Referenced for establishing offense; civil liability under § 43A runs in parallel" },
  ],
  precedentsCited: [
    { name: "Umashankar Sivasubramanian v. ICICI Bank", year: "2023", court: "Madras HC", how: "Relied upon — banks cannot outsource liability to telecom failure" },
    { name: "Shreya Singhal v. UoI", year: "2015", court: "Supreme Court", how: "Cited for constitutional validity of IT Act provisions" },
    { name: "Kesavananda v. Axis Bank", year: "2023", court: "Kerala HC", how: "Distinguished — OTP voluntarily shared vs. SIM-swap are materially different" },
  ],
  reasoning: [
    "The court drew a clear distinction between customer negligence (voluntary OTP sharing) and systemic vulnerability exploitation (SIM-swap). The latter places the burden squarely on the bank's fraud monitoring infrastructure.",
    "HDFC's failure to implement velocity checks — a baseline requirement under RBI Circular RBI/2021-22/91 — constituted a breach of 'reasonable security practices' under § 43A.",
    "The 3-day reporting window defense was rejected; the petitioner reported within 6 hours of discovering the fraud, which the court found satisfactory.",
  ],
  finalJudgment: {
    outcome: "Allowed",
    directives: ["Kotak Mahindra Bank directed to refund ₹6.2L with 9% interest from date of fraud", "₹75,000 compensation awarded for mental harassment and litigation costs", "Bank directed to implement transaction velocity checks within 60 days per RBI mandate"],
    orders: "Writ petition allowed. Respondent to comply within 8 weeks.",
  },
};

export const CONVERTER_DATA = [
  { ipc: "IPC § 420", ipcTitle: "Cheating", bns: "BNS § 318", bnsTitle: "Cheating", change: "Minor", diff: "Imprisonment enhanced from 7 to 10 years. 'Dishonestly' defined explicitly in BNS §318(1)." },
  { ipc: "IPC § 302", ipcTitle: "Punishment for Murder", bns: "BNS § 103", bnsTitle: "Murder", change: "Cosmetic", diff: "Death penalty and life imprisonment retained. Section numbering changed only." },
  { ipc: "IPC § 376", ipcTitle: "Punishment for Rape", bns: "BNS § 64", bnsTitle: "Punishment for Rape", change: "Significant", diff: "New aggravated provisions added. Minimum sentence raised from 7 to 10 years. Marital rape exception partially modified." },
  { ipc: "IPC § 499", ipcTitle: "Defamation", bns: "BNS § 356", bnsTitle: "Defamation", change: "Minor", diff: "Exceptions largely retained. Digital defamation explicitly included in Explanation 4." },
  { ipc: "IPC § 124A", ipcTitle: "Sedition", bns: "—", bnsTitle: "REPEALED", change: "Removed", diff: "Sedition removed from BNS. Replaced by BNS § 152 (Acts endangering sovereignty) with narrower scope." },
  { ipc: "IPC § 66C (IT Act)", ipcTitle: "Identity Theft", bns: "BNS § 319", bnsTitle: "Cheating by Personation", change: "Absorbed", diff: "IT Act § 66C remains operative. BNS § 319 now explicitly covers digital identity fraud scenarios." },
];

export const VOICE_TRANSCRIPT = [
  { time: "0:12", speaker: "Client", text: "So basically on July 12th, I got an OTP on my phone, I never shared it with anyone, but within minutes ₹3.8 lakhs was gone from my HDFC account." },
  { time: "0:28", speaker: "Lawyer", text: "Did you receive any call before the OTP came?" },
  { time: "0:34", speaker: "Client", text: "Yes, someone called pretending to be from Airtel, said my SIM needed KYC update. I gave them my... actually I only confirmed my registered email, nothing else." },
  { time: "0:52", speaker: "Lawyer", text: "That's a SIM-swap attack. They ported your number. When did you report this to the bank?" },
  { time: "1:04", speaker: "Client", text: "The same day, maybe 3-4 hours after I realized. I have the complaint receipt. They said they would investigate but after 2 months they just said the transactions were authorized." },
  { time: "1:22", speaker: "Lawyer", text: "Do you have the Airtel call records? And do you still have those bank SMS alerts from July 12th?" },
  { time: "1:31", speaker: "Client", text: "Yes, I have everything. Screenshots, SMS, even the Airtel complaint number they gave me." },
];

export const VOICE_AI_EXTRACTION = {
  keyFacts: [
    "Unauthorized transfer of ₹3.8 lakhs on 12 July from HDFC account",
    "SIM-swap attack via impersonation of Airtel KYC agent",
    "Fraud reported to bank within 3–4 hours (within RBI 3-day window)",
    "Bank responded after 2 months claiming transactions were 'authorized'",
    "Client has: bank SMS alerts, Airtel complaint number, screenshots",
  ],
  legalIssues: ["SIM-swap fraud — IT Act § 66C", "Bank liability under § 43A (failure of fraud detection)", "Possible IPC § 420 against fraudsters"],
  documentsNeeded: ["Airtel call records from 12 July 2023", "Bank's written rejection letter", "All bank SMS alerts from 12 July", "HDFC complaint acknowledgment receipt"],
  nextSteps: ["File formal complaint at Cyber Crime Cell", "Send legal notice to HDFC under § 43A IT Act", "Apply for call detail records (CDR) via court order if Airtel doesn't provide voluntarily"],
};

export const IMPACT_STATS = [
  { label: "Judgment Read Time", before: "2–4 hrs", after: "15 min", improvement: "87%" },
  { label: "Case Research Time", before: "8–10 hrs", after: "1–2 hrs", improvement: "80%" },
  { label: "Precedent Accuracy", before: "65%", after: "95%+", improvement: "+30pp" },
  { label: "Cases Handled", before: "8–10", after: "30–40", improvement: "3–4x" },
];
```

---

## Step 2: Page-by-Page Changes

---

### `src/pages/Dashboard.jsx`

**Goal: Command center feel — alive, data-rich, impressive at first glance**

Changes:
1. **Import `RECENT_CASES`, `IMPACT_STATS` from `demoData.js`** and use them to render the case cards.
2. **Add an animated stats bar** directly below the hero header with 4 counters that count up on mount:
   - "1,247 Judgments Processed" | "3,891 Precedents Indexed" | "142 Active Cases" | "₹2.3Cr Lawyer Hours Saved"
   - Use `useEffect` + `setInterval` to animate each counter from 0 to target over 2 seconds.
3. **Recent cases gallery**: Render cards from `RECENT_CASES` with:
   - Domain color-coded badge (Cyber Law = indigo, Criminal = red, IP = blue, Taxation = purple)
   - Status pill with appropriate color from `statusColor`
   - Document count, last activity timestamp
   - Hover: show quick-action buttons ("Open Workspace", "View Graph", "Analyze")
4. **Hero search input**: Replace placeholder with realistic suggestion chips:
   - "Find precedents for § 66C SIM-swap cases"
   - "Summarize Sharma v. HDFC Bank arguments"
   - "Convert IPC 420 to BNS equivalent"
   - "Show case relationship graph"
   - Clicking a chip fills the input (visual only)
5. **Sidebar**: Add active case indicator under navigation — small card showing current active case "Sharma v. HDFC Bank · Arguments Stage · Delhi HC"
6. **Add workflow steps section**: A horizontal card row showing the typical 5-step workflow with icons (Create Case → Upload Docs → AI Analysis → Chat & Research → Draft & Export), each step briefly described.

---

### `src/pages/Workspace.jsx`

**Goal: Show a real legal AI conversation — this is the flagship feature demo**

Changes:
1. **Import `WORKSPACE_CHAT`, `CASE_DOCUMENTS`, `DEMO_CASE` from `demoData.js`**
2. **Left panel — Document Tree**:
   - Render `CASE_DOCUMENTS` as a file tree grouped by type (FIR, Evidence, Precedent, Regulation)
   - Auto-fetched documents should show a "⚡ Auto-fetched" badge in a different color (amber)
   - Active document highlight when clicked
3. **Middle panel — Chat**:
   - Render `WORKSPACE_CHAT` messages on mount
   - AI messages should show:
     - A glowing "LegalMind AI" avatar
     - Inline citation chips at the bottom of each message (click does nothing, visual only)
     - If `extensionActive` is set on a message, show a small purple "Cyber Law Active" badge
     - Markdown-style rendering: bold text, tables, bullet lists (use a small utility function or dangerouslySetInnerHTML with sanitized HTML)
   - Add a typing animation when the page first loads (simulate AI responding to the 3rd message with a 2s delay + typing indicator)
   - Input box: pre-fill with "What is the strongest counter-argument HDFC Bank will likely raise?"
4. **Right panel — Case Intelligence**:
   - Show the active case name and status at the top
   - List active extensions with toggle indicators (Cyber Law extension = ON, shown in green)
   - "Related Cases" section: show 2 cards (Verma v. PNB, Umashankar v. ICICI) with similarity % badge
   - "Quick Actions" buttons: "Generate Hearing Brief", "Export as PDF", "Add to Knowledge Graph", "Voice Dictate Note"
5. **Header**: Show case name "Sharma v. HDFC Bank Ltd. — CRL.REV.P 412/2024" with court name and status badge

---

### `src/pages/Analysis.jsx`

**Goal: Show the 7-agent structured judgment output — this is a core differentiator**

Changes:
1. **Import `ANALYSIS_JUDGMENT` from `demoData.js`**
2. **Left pane — "PDF Viewer"**:
   - Display a realistic fake PDF look: dark background, white text block sections, a document header
   - Show highlight overlays on certain text blocks (use colored `span` elements with yellow/green background) simulating text that the AI has extracted
   - Add page navigation "Page 1 of 23" with prev/next buttons (static)
   - Title: "Ramesh Gupta v. Kotak Mahindra Bank Ltd. — Delhi HC, 2024"
3. **Right pane — Structured Analysis**:
   - Use data from `ANALYSIS_JUDGMENT` to render ALL sections:
     - **Header card**: Case title, citation, court, bench, date, outcome badge (green "ALLOWED" pill)
     - **🎯 Core Issue**: paragraph text
     - **👥 Parties & Background**: two-column petitioner/respondent cards, case history below
     - **📋 Petitioner's Arguments**: numbered list, each with argument text + "Supported by:" citation chip
     - **📋 Respondent's Arguments**: same format, different color scheme (red-ish)
     - **⚖️ Legal Framework Applied**: rendered as a proper table with Section | Description | Application columns
     - **📚 Precedents Cited**: table with Case Name | Year | Court | How Applied
     - **🧠 Court's Reasoning**: bullet list
     - **⚖️ Final Judgment**: outcome badge + directives list + orders text
   - Each section is a collapsible card with a section header
   - Add "Agent Processing Stats" footer bar: "7 agents · 2m 14s · 23 pages analyzed · 3 precedents extracted"
4. **Top bar**: Show "Side-by-Side View" | "Edit Analysis" | "Export PDF" | "Export DOCX" | "Add to Case" buttons (visual only)
5. **Add "Regenerate Section" icon** (⟳) on hover of each section card (no functionality needed, just shows it's interactive)

---

### `src/pages/Graph.jsx`

**Goal: Make the D3 graph tell the story of case relationships visually**

Changes:
1. **Import `GRAPH_NODES`, `GRAPH_EDGES` from `demoData.js`** and feed them into the D3 force simulation
2. **Node styling by type**:
   - `current` case: large gold/amber node, pulsing animation ring
   - `doc`: medium blue nodes
   - `precedent`: green nodes
   - `section`: orange hexagon-style (or just orange circle)
   - `related` cases: small purple nodes
3. **Edge styling**:
   - Edges with `label` show the label on hover as a tooltip
   - "relies on" edges: solid green
   - "distinguishes" edges: dashed red
   - "cites" edges: solid gray
   - Default edges: thin gray
4. **Clickable nodes**: On click, show a small info card (positioned near the node) with:
   - For precedents: case name, court, year, outcome in 1 line
   - For sections: section number and description
   - For documents: document name and type
5. **Legend**: Bottom-left corner showing node type → color mapping
6. **Sidebar filters**: Make the domain/court/year filters actually toggle node visibility (filter `GRAPH_NODES` by type)
7. **Header**: "Case Knowledge Graph · Sharma v. HDFC Bank · 15 nodes · 14 edges"

---

### `src/pages/Upload.jsx`

**Goal: Make the AI ingestion pipeline feel cinematic and powerful**

Changes:
1. **Multi-step upload flow** with animated state transitions:
   - **Step 1 — Drop Zone**: Large drag-and-drop area with document type selector (FIR / Judgment / Evidence / Petition / Client Statement). Add an "Upload Sample Judgment" button that auto-selects a pre-configured file name ("Ramesh_Gupta_v_Kotak_2024.pdf") and skips to processing.
   - **Step 2 — Processing Pipeline** (triggered on "Process Document" click): Show the 7-agent pipeline as a vertical stepper with animated progression:
     ```
     ✅ Issue Identification Agent         — Completed in 0.8s
     ✅ Parties & Background Agent         — Completed in 0.6s
     ✅ Argument Extraction Agent          — Completed in 1.2s
     ✅ Counter-Argument Agent             — Completed in 1.1s
     ⏳ Legal Framework Agent              — Analyzing...
     ⬜ Precedent Analysis Agent           — Waiting
     ⬜ Reasoning & Judgment Agent         — Waiting
     ```
     Each agent completes with a 600ms stagger delay using `setTimeout`. Agent items animate from gray → amber (running) → green (done).
   - **Step 3 — Results Summary**: After all agents complete, show:
     - "✅ Analysis Complete — 23 pages processed in 2m 14s"
     - 3 extracted insights cards: "3 Legal Sections Identified", "4 Precedents Auto-Fetched", "Knowledge Graph Updated (+7 connections)"
     - "View Full Analysis →" button navigating to `/analysis`
2. **Remove/replace** the current static progress bar with the stepper above.

---

### `src/pages/Converter.jsx`

**Goal: Show the IPC→BNS tool as a practical, visually rich lookup interface**

Changes:
1. **Import `CONVERTER_DATA` from `demoData.js`**
2. **Main layout**: Two-column side-by-side comparison table:
   - Left column: IPC section with section number, title, short description
   - Right column: Mapped BNS equivalent (or "REPEALED" badge if applicable)
   - Middle: Change type badge — "Minor" (yellow), "Significant" (red), "Cosmetic" (gray), "Removed" (dark red), "Absorbed" (blue)
   - Expandable row: clicking a row shows the `diff` text as a highlighted diff card
3. **Search bar**: pre-filled with "IPC 420" with a search button — typing filters the table (visual filtering on `CONVERTER_DATA`)
4. **Change type highlighted**: "REPEALED" rows (§ 124A Sedition) should have a distinct red strikethrough style on the IPC side
5. **"Document Conversion" tab** (static): Show a text area with a sample charge sheet containing IPC references, and a "Convert Document" button that after a 1.5s fake delay shows the same text with IPC references swapped to BNS in green highlight
6. **Top stats**: "545 IPC Sections Mapped → BNS 2023 | 23 Sections Repealed | 12 Sections Merged | 8 New Sections"

---

### `src/pages/Extensions.jsx`

**Goal: Make extensions feel like a real marketplace with clear value proposition**

Changes:
1. **Extension catalog cards** — each card should have:
   - Domain icon (emoji or SVG)
   - Name and subtitle
   - Stats: "10,247 precedents" / "IT Act 2000 + Cyber Crime DB" / "Updated: March 2026"
   - Feature bullet list (3 features per extension)
   - Sample query preview: a small chat bubble showing an example input → output teaser
   - Install/Remove button (existing localStorage persistence kept)
2. **Extensions list** (update the 5 domain extensions):
   - **Cyber Law Assistant** (default installed): 10,247 cyber crime precedents, IT Act 2000, SIM-swap & phishing case law, Digital Evidence Act
   - **Taxation Law Module**: Income Tax Act, GST Tribunal decisions, Tax evasion precedents, 8,440 cases
   - **IP & Patent Specialist**: Patent disputes, Trademark infringement, Copyright case law, 5,109 cases
   - **Corporate Law Suite**: Companies Act 2013, M&A legal frameworks, SEBI regulations, 6,782 cases
   - **Criminal Law Pro**: IPC/BNS comprehensive, Bail jurisprudence, Evidence Act, 22,000+ cases
3. **"Active in Workspace" indicator**: If an extension is installed (in localStorage), show a small green "Active" pill on the card
4. **Top section**: Add a "Currently Active" horizontal strip showing installed extensions as compact chips with domain color

---

### `src/pages/Voice.jsx`

**Goal: Show the meeting recorder as a game-changing feature for client consultations**

Changes:
1. **Import `VOICE_TRANSCRIPT`, `VOICE_AI_EXTRACTION` from `demoData.js`**
2. **Two tabs**: "Voice Assistant" and "Meeting Recorder" — default to Meeting Recorder tab
3. **Meeting Recorder tab**:
   - Top: Large "● RECORDING" indicator with a pulsing red dot + fake waveform (animated CSS bars of varying heights)
   - "00:01:34 | Client: Anuj Sharma | Case: Sharma v. HDFC Bank" metadata strip
   - **Left half**: Live transcript — render `VOICE_TRANSCRIPT` entries one by one with a 400ms stagger on mount, alternating speaker colors (Client = blue, Lawyer = green)
   - **Right half**: "AI Extraction Panel" that also fills in progressively:
     - **Key Facts Identified**: bullet list from `VOICE_AI_EXTRACTION.keyFacts`
     - **Legal Issues Flagged**: chips from `VOICE_AI_EXTRACTION.legalIssues`
     - **Documents to Collect**: checklist from `VOICE_AI_EXTRACTION.documentsNeeded`
     - **Suggested Next Steps**: numbered list from `VOICE_AI_EXTRACTION.nextSteps`
   - Bottom: "Stop Recording & Generate Summary" button → on click, shows a toast "Meeting Summary Generated · Added to Sharma v. HDFC Bank"
4. **Voice Assistant tab**:
   - Microphone button (large, centered)
   - Pre-filled example commands shown as chips: "Show latest SC judgment on § 420", "Summarize respondent reply", "Find SIM-swap precedents"
   - Below the mic: a "Recent Commands" log showing 3 voice queries with their AI responses in brief

---

## Step 3: Global Styling Enhancements (`src/index.css`)

Add/update the following:
1. **Animated counter class**: `.stat-counter` with a smooth number animation via CSS `@keyframes`
2. **Status badge variants**: `.badge-cyber`, `.badge-criminal`, `.badge-ip`, `.badge-tax`, `.badge-corporate` — each with appropriate background/text color
3. **Agent pipeline stepper**: `.pipeline-step`, `.pipeline-step.running`, `.pipeline-step.done` with transition animations
4. **Chat message styles**: `.chat-ai-message`, `.chat-user-message`, `.citation-chip`
5. **Typing indicator**: `.typing-indicator` with bouncing dots animation
6. **Diff highlight**: `.diff-added` (green background), `.diff-removed` (red strikethrough)
7. **Graph legend**: `.graph-legend` positioned bottom-left as an overlay on the SVG wrapper
8. **Waveform animation**: `.waveform-bar` with `@keyframes waveform { 0%, 100% { height: 4px; } 50% { height: 24px; } }` staggered across 8 bars

---

## Step 4: App.js — Remove Legacy Demo Routes

Delete all `/demo/*` routes from `src/App.js`:
- `/demo/workspace`, `/demo/extensions`, `/demo/calendar`, `/demo/dashboard`, `/demo/graph`, `/demo/converter`, `/demo/voice`, `/demo/analysis`
- Remove imports for `src/pages/demos/*` pages
- Delete `src/pages/demos/` directory entirely
- Delete `src/pages/DemoLanding.jsx` if it only served the demo routes

Keep: `/demo` redirect to `/` (can keep this one as a safety net)

---

## Step 5: Add Demo Mode Banner

In `src/App.js` or a shared layout wrapper, add a slim banner at the very top:

```jsx
<div style={{
  background: "linear-gradient(90deg, #6d28d9, #1d4ed8)",
  color: "white",
  textAlign: "center",
  fontSize: "12px",
  padding: "4px 0",
  letterSpacing: "0.05em",
}}>
  🚀 LEGALMIND AI — DEMO PROTOTYPE · Hacksplosion 2026 · Thapar Institute of Engineering and Technology
</div>
```

---

## Priority Order

Implement in this order:
1. `src/data/demoData.js` — all mock data first (everything else depends on it)
2. `src/pages/Analysis.jsx` — most visually impressive, showcases core USP
3. `src/pages/Workspace.jsx` — flagship feature, rich chat conversation
4. `src/pages/Dashboard.jsx` — first impression, animated stats
5. `src/pages/Upload.jsx` — 7-agent pipeline animation
6. `src/pages/Voice.jsx` — meeting recorder tab
7. `src/pages/Graph.jsx` — D3 data update + node styling
8. `src/pages/Converter.jsx` — IPC/BNS table
9. `src/pages/Extensions.jsx` — marketplace cards
10. `src/index.css` — styling additions
11. `src/App.js` — legacy route cleanup + demo banner

---

## Notes for the Agent

- This is **frontend-only**. No backend calls. All data comes from `demoData.js`.
- Do **not** break existing routing or localStorage persistence for extensions and onboarding.
- All animations should use CSS transitions or `setTimeout`-based state updates — no external animation libraries (keep bundle size clean).
- Markdown in chat messages: use a simple utility that converts `**text**` → `<strong>`, `- item` → `<li>`, and table pipes to `<table>`. Keep it minimal, no need for a full markdown library.
- The D3 graph in `Graph.jsx` already works — only update the data it's fed and add node coloring/click handlers.
- Maintain the existing glassmorphism CSS variables (`--glass-surface`, `--glass-elevated`, `--glass-border`, `--glass-shadow`).
