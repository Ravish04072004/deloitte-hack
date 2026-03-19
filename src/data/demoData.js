export const DEMO_CASE = {
  id: 'case-001',
  title: 'Sharma v. HDFC Bank Ltd.',
  number: 'CRL.REV.P 412/2024',
  court: 'Delhi High Court',
  sections: ['IPC 420', 'IPC 66C', 'IPC 43A'],
  status: 'Arguments Stage',
  domain: 'Cyber Law',
  filed: '14 Aug 2024',
  petitioner: 'Anuj Sharma',
  respondent: 'HDFC Bank Ltd.',
  counsel: 'Adv. Rajesh Malhotra',
  oppCounsel: 'Cyril Amarchand Mangaldas',
};

export const RECENT_CASES = [
  {
    id: 'case-001',
    title: 'Sharma v. HDFC Bank Ltd.',
    domain: 'Cyber Law',
    court: 'Delhi HC',
    status: 'Arguments Stage',
    statusColor: '#f59e0b',
    docs: 7,
    lastActivity: '2 hours ago',
  },
  {
    id: 'case-002',
    title: 'State v. Rajan Kapoor',
    domain: 'Criminal',
    court: 'Sessions Court, Mumbai',
    status: 'Judgment Pending',
    statusColor: '#ef4444',
    docs: 12,
    lastActivity: 'Yesterday',
  },
  {
    id: 'case-003',
    title: 'TechCorp India Pvt Ltd v. Nair',
    domain: 'IP & Patent',
    court: 'High Court of Kerala',
    status: 'Hearing Scheduled',
    statusColor: '#3b82f6',
    docs: 5,
    lastActivity: '3 days ago',
  },
  {
    id: 'case-004',
    title: 'Union of India v. Mehrotra Constructions',
    domain: 'Taxation',
    court: 'ITAT Delhi',
    status: 'Evidence Stage',
    statusColor: '#8b5cf6',
    docs: 19,
    lastActivity: '1 week ago',
  },
];

export const WORKSPACE_CHAT = [
  {
    role: 'user',
    text: 'Summarize the key facts of this case and what sections apply.',
    time: '10:14 AM',
  },
  {
    role: 'ai',
    text: `**Case Summary - Sharma v. HDFC Bank Ltd. (CRL.REV.P 412/2024)**\n\nThe petitioner, Anuj Sharma, alleges that Rs.3.8 lakhs were fraudulently transferred from his HDFC savings account via unauthorized OTP-based transactions between 12-14 July 2023. The petitioner contends that the bank failed to implement adequate Two-Factor Authentication controls per RBI Circular RBI/2021-22/91.\n\n**Applicable Sections:**\n- **IPC Section 420** - Cheating and dishonestly inducing delivery of property\n- **IT Act Section 66C** - Identity theft (fraudulent use of electronic signature/password)\n- **IT Act Section 43A** - Compensation for failure to protect data (civil liability on HDFC Bank)\n\n**Key Factual Disputes:**\n1. Whether the OTP was shared voluntarily or intercepted via SIM-swap attack\n2. Whether HDFC Bank followed RBI's mandated fraud detection protocols\n3. Jurisdiction - whether Sessions Court or Cyber Cell has primary cognizance\n\n*Sources: [FIR_Copy.pdf, pg 2] [Client_Statement.pdf, pg 1-3] [RBI_Circular_2022.pdf]*`,
    time: '10:14 AM',
    citations: ['FIR_Copy.pdf', 'Client_Statement.pdf', 'RBI_Circular_2022.pdf'],
  },
  {
    role: 'user',
    text: 'Find precedents where the bank was held liable in similar SIM-swap fraud cases.',
    time: '10:17 AM',
  },
  {
    role: 'ai',
    text: `**Precedent Analysis - Bank Liability in SIM-Swap Fraud**\n\nFound **4 directly relevant precedents** via Indian Kanoon:\n\n| Case | Court | Year | Outcome |\n|------|-------|------|---------|\n| Umashankar Sivasubramanian v. ICICI Bank | Madras HC | 2023 | Bank liable - Rs.5.4L refund ordered |\n| Shri Krishna Prasad v. SBI | NCDRC | 2022 | Partial liability - 70% refund |\n| Kesavananda v. Axis Bank | Kerala HC | 2023 | Dismissed - OTP voluntarily shared |\n| Ramesh Gupta v. Kotak Mahindra | Delhi HC | 2024 | Landmark - Bank liable for Section 43A data protection failure |\n\n**Strongest Precedent for Your Case:**\n*Ramesh Gupta v. Kotak Mahindra (2024 SCC OnLine Del 1847)* - Delhi HC held that banks cannot shift liability when internal fraud monitoring systems fail to flag anomalous transactions. Directly analogous to HDFC's alleged protocol failure here.\n\n*Cyber Law Extension active - 10,247 precedents indexed*`,
    time: '10:17 AM',
    citations: ['Ramesh_Gupta_v_Kotak.pdf', 'Kesavananda_v_Axis.pdf'],
    extensionActive: 'Cyber Law',
  },
  {
    role: 'user',
    text: 'Draft an argument outline for the next hearing.',
    time: '10:22 AM',
  },
  {
    role: 'ai',
    text: `**Argument Outline - Sharma v. HDFC Bank (Next Hearing: Arguments Stage)**\n\n**Prayer:** Direction to HDFC Bank to refund Rs.3.8L with 9% interest + compensation under Section 43A IT Act\n\n---\n\n**I. Threshold: Jurisdiction & Cognizance**\n-> Cyber Cells under Section 78 IT Act have cognizance; Sessions Court retains concurrent jurisdiction per *Shreya Singhal v. UoI (2015) 5 SCC 1*\n\n**II. Primary Argument: Bank's Vicarious Liability**\n-> HDFC failed RBI Circular No. RBI/2021-22/91 mandate for real-time fraud alerts\n-> Apply *Ramesh Gupta v. Kotak* - systemic failure != customer negligence\n-> Section 43A: "reasonable security practices" threshold not met\n\n**III. Alternative: Section 420 IPC Cheating**\n-> SIM-swap orchestrated by third party; bank's failure enabled execution\n-> Distinguish *Kesavananda* (OTP voluntarily shared) - here: telecom compromise, not customer fault\n\n**IV. Quantum of Relief**\n-> Rs.3.8L principal + 9% simple interest from 14-Jul-2023\n-> Rs.50,000 compensation for mental harassment (NCDRC precedents)\n-> Exemplary costs against HDFC for systemic negligence`,
    time: '10:22 AM',
    citations: ['Shreya_Singhal_2015.pdf'],
    extensionActive: 'Cyber Law',
  },
];

export const CASE_DOCUMENTS = [
  { id: 'd1', name: 'FIR_Copy.pdf', type: 'FIR', size: '340 KB', uploadedAt: '14 Aug 2024', aiProcessed: true },
  { id: 'd2', name: 'Client_Statement.pdf', type: 'Client Statement', size: '128 KB', uploadedAt: '15 Aug 2024', aiProcessed: true },
  { id: 'd3', name: 'Bank_Transaction_Records.pdf', type: 'Evidence', size: '2.1 MB', uploadedAt: '15 Aug 2024', aiProcessed: true },
  { id: 'd4', name: 'RBI_Circular_2022.pdf', type: 'Regulation', size: '480 KB', uploadedAt: '16 Aug 2024', aiProcessed: true },
  { id: 'd5', name: 'HDFC_Reply_Notice.pdf', type: 'Reply', size: '220 KB', uploadedAt: '20 Aug 2024', aiProcessed: true },
  { id: 'd6', name: 'Ramesh_Gupta_v_Kotak.pdf', type: 'Precedent', size: '1.8 MB', uploadedAt: 'Auto-fetched', aiProcessed: true, autoFetched: true },
  { id: 'd7', name: 'Kesavananda_v_Axis.pdf', type: 'Precedent', size: '940 KB', uploadedAt: 'Auto-fetched', aiProcessed: true, autoFetched: true },
];

export const GRAPH_NODES = [
  { id: 'case-001', label: 'Sharma v. HDFC Bank', type: 'case', group: 'current' },
  { id: 'doc-fir', label: 'FIR Copy', type: 'document', group: 'doc' },
  { id: 'doc-stmt', label: 'Client Statement', type: 'document', group: 'doc' },
  { id: 'doc-txn', label: 'Bank Transactions', type: 'document', group: 'doc' },
  { id: 'doc-rbi', label: 'RBI Circular 2022', type: 'document', group: 'regulation' },
  { id: 'prec-ramesh', label: 'Ramesh Gupta v. Kotak (2024)', type: 'precedent', group: 'precedent' },
  { id: 'prec-kesav', label: 'Kesavananda v. Axis (2023)', type: 'precedent', group: 'precedent' },
  { id: 'prec-uma', label: 'Umashankar v. ICICI (2023)', type: 'precedent', group: 'precedent' },
  { id: 'prec-shreya', label: 'Shreya Singhal v. UoI (2015)', type: 'precedent', group: 'precedent' },
  { id: 'sec-420', label: 'IPC Section 420', type: 'section', group: 'section' },
  { id: 'sec-66c', label: 'IT Act Section 66C', type: 'section', group: 'section' },
  { id: 'sec-43a', label: 'IT Act Section 43A', type: 'section', group: 'section' },
  { id: 'case-002', label: 'State v. Rajan Kapoor', type: 'case', group: 'related' },
  { id: 'case-005', label: 'Verma v. PNB (2023)', type: 'case', group: 'related' },
];

export const GRAPH_EDGES = [
  { source: 'case-001', target: 'doc-fir' },
  { source: 'case-001', target: 'doc-stmt' },
  { source: 'case-001', target: 'doc-txn' },
  { source: 'case-001', target: 'doc-rbi' },
  { source: 'case-001', target: 'prec-ramesh', label: 'relies on' },
  { source: 'case-001', target: 'prec-kesav', label: 'distinguishes' },
  { source: 'case-001', target: 'prec-uma', label: 'analogous' },
  { source: 'case-001', target: 'sec-420' },
  { source: 'case-001', target: 'sec-66c' },
  { source: 'case-001', target: 'sec-43a' },
  { source: 'prec-ramesh', target: 'sec-43a', label: 'interprets' },
  { source: 'prec-ramesh', target: 'prec-shreya', label: 'cites' },
  { source: 'case-002', target: 'sec-420' },
  { source: 'case-005', target: 'sec-43a' },
  { source: 'case-005', target: 'prec-uma' },
];

export const ANALYSIS_JUDGMENT = {
  title: 'Ramesh Gupta v. Kotak Mahindra Bank Ltd.',
  citation: '2024 SCC OnLine Del 1847',
  court: 'High Court of Delhi',
  bench: 'Honourable Justice Suresh Kumar Kait',
  date: '22 February 2024',
  outcome: 'ALLOWED',
  coreIssue:
    'Whether a bank can be held liable under Section 43A of the IT Act 2000 for failing to implement reasonable security practices that enabled unauthorized digital transactions via a SIM-swap attack orchestrated by a third party.',
  petitioner: {
    name: 'Ramesh Gupta',
    role: 'Account holder, victim of SIM-swap fraud resulting in Rs.6.2L unauthorized transfer',
  },
  respondent: {
    name: 'Kotak Mahindra Bank Ltd.',
    role: 'Respondent bank alleged to have failed fraud detection protocols',
  },
  history:
    'Single-judge bench. Originated from complaint before Banking Ombudsman (dismissed). Writ filed directly under Article 226.',
  petitionerArgs: [
    {
      arg: "Bank's real-time fraud monitoring failed to flag 11 rapid sequential transactions within 4 minutes",
      support: 'Kotak Internal Audit Report (Exh. P-3)',
    },
    {
      arg: 'SIM-swap executed via telecom provider - petitioner never shared OTP voluntarily',
      support: 'Airtel Forensic Report (Exh. P-7)',
    },
    {
      arg: 'Section 43A liability is strict - "reasonable security practices" is an objective standard the bank failed',
      support: 'Information Technology (Reasonable Security Practices) Rules, 2011',
    },
  ],
  respondentArgs: [
    {
      arg: 'OTP-based authentication is industry-standard and was functioning correctly',
      support: 'NPCI Circular 2020-21/47',
    },
    {
      arg: 'Bank cannot be held liable for failure of third-party telecom infrastructure',
      support: 'Kesavananda v. Axis Bank (2023)',
    },
    {
      arg: 'Petitioner failed to report fraud within the 3-day RBI window, disentitling to full relief',
      support: 'RBI Master Direction on Digital Payments, 2022',
    },
  ],
  legalFramework: [
    {
      section: 'IT Act Section 43A',
      description: 'Compensation for failure to protect sensitive personal data',
      application: 'Primary liability provision - breach of reasonable security practices',
    },
    {
      section: 'IPC Section 420',
      description: 'Cheating and dishonest inducement',
      application: 'Applied to third-party fraudsters; bank held vicariously for enabling conditions',
    },
    {
      section: 'IT Act Section 66C',
      description: 'Punishment for identity theft',
      application: 'Referenced for establishing offense; civil liability under Section 43A runs in parallel',
    },
  ],
  precedentsCited: [
    {
      name: 'Umashankar Sivasubramanian v. ICICI Bank',
      year: '2023',
      court: 'Madras HC',
      how: 'Relied upon - banks cannot outsource liability to telecom failure',
    },
    {
      name: 'Shreya Singhal v. UoI',
      year: '2015',
      court: 'Supreme Court',
      how: 'Cited for constitutional validity of IT Act provisions',
    },
    {
      name: 'Kesavananda v. Axis Bank',
      year: '2023',
      court: 'Kerala HC',
      how: 'Distinguished - OTP voluntarily shared vs. SIM-swap are materially different',
    },
  ],
  reasoning: [
    'The court drew a clear distinction between customer negligence (voluntary OTP sharing) and systemic vulnerability exploitation (SIM-swap). The latter places the burden squarely on the bank\'s fraud monitoring infrastructure.',
    "HDFC's failure to implement velocity checks - a baseline requirement under RBI Circular RBI/2021-22/91 - constituted a breach of 'reasonable security practices' under Section 43A.",
    'The 3-day reporting window defense was rejected; the petitioner reported within 6 hours of discovering the fraud, which the court found satisfactory.',
  ],
  finalJudgment: {
    outcome: 'Allowed',
    directives: [
      'Kotak Mahindra Bank directed to refund Rs.6.2L with 9% interest from date of fraud',
      'Rs.75,000 compensation awarded for mental harassment and litigation costs',
      'Bank directed to implement transaction velocity checks within 60 days per RBI mandate',
    ],
    orders: 'Writ petition allowed. Respondent to comply within 8 weeks.',
  },
};

export const CONVERTER_DATA = [
  {
    ipc: 'IPC Section 420',
    ipcTitle: 'Cheating',
    bns: 'BNS Section 318',
    bnsTitle: 'Cheating',
    change: 'Minor',
    diff: "Imprisonment enhanced from 7 to 10 years. 'Dishonestly' defined explicitly in BNS Section 318(1).",
  },
  {
    ipc: 'IPC Section 302',
    ipcTitle: 'Punishment for Murder',
    bns: 'BNS Section 103',
    bnsTitle: 'Murder',
    change: 'Cosmetic',
    diff: 'Death penalty and life imprisonment retained. Section numbering changed only.',
  },
  {
    ipc: 'IPC Section 376',
    ipcTitle: 'Punishment for Rape',
    bns: 'BNS Section 64',
    bnsTitle: 'Punishment for Rape',
    change: 'Significant',
    diff: 'New aggravated provisions added. Minimum sentence raised from 7 to 10 years. Marital rape exception partially modified.',
  },
  {
    ipc: 'IPC Section 499',
    ipcTitle: 'Defamation',
    bns: 'BNS Section 356',
    bnsTitle: 'Defamation',
    change: 'Minor',
    diff: 'Exceptions largely retained. Digital defamation explicitly included in Explanation 4.',
  },
  {
    ipc: 'IPC Section 124A',
    ipcTitle: 'Sedition',
    bns: '-',
    bnsTitle: 'REPEALED',
    change: 'Removed',
    diff: 'Sedition removed from BNS. Replaced by BNS Section 152 (Acts endangering sovereignty) with narrower scope.',
  },
  {
    ipc: 'IPC Section 66C (IT Act)',
    ipcTitle: 'Identity Theft',
    bns: 'BNS Section 319',
    bnsTitle: 'Cheating by Personation',
    change: 'Absorbed',
    diff: 'IT Act Section 66C remains operative. BNS Section 319 now explicitly covers digital identity fraud scenarios.',
  },
];

export const VOICE_TRANSCRIPT = [
  {
    time: '0:12',
    speaker: 'Client',
    text: 'So basically on July 12th, I got an OTP on my phone, I never shared it with anyone, but within minutes Rs.3.8 lakhs was gone from my HDFC account.',
  },
  { time: '0:28', speaker: 'Lawyer', text: 'Did you receive any call before the OTP came?' },
  {
    time: '0:34',
    speaker: 'Client',
    text: 'Yes, someone called pretending to be from Airtel, said my SIM needed KYC update. I gave them my... actually I only confirmed my registered email, nothing else.',
  },
  {
    time: '0:52',
    speaker: 'Lawyer',
    text: "That's a SIM-swap attack. They ported your number. When did you report this to the bank?",
  },
  {
    time: '1:04',
    speaker: 'Client',
    text: "The same day, maybe 3-4 hours after I realized. I have the complaint receipt. They said they would investigate but after 2 months they just said the transactions were authorized.",
  },
  {
    time: '1:22',
    speaker: 'Lawyer',
    text: 'Do you have the Airtel call records? And do you still have those bank SMS alerts from July 12th?',
  },
  {
    time: '1:31',
    speaker: 'Client',
    text: 'Yes, I have everything. Screenshots, SMS, even the Airtel complaint number they gave me.',
  },
];

export const VOICE_AI_EXTRACTION = {
  keyFacts: [
    'Unauthorized transfer of Rs.3.8 lakhs on 12 July from HDFC account',
    'SIM-swap attack via impersonation of Airtel KYC agent',
    'Fraud reported to bank within 3-4 hours (within RBI 3-day window)',
    "Bank responded after 2 months claiming transactions were 'authorized'",
    'Client has: bank SMS alerts, Airtel complaint number, screenshots',
  ],
  legalIssues: [
    'SIM-swap fraud - IT Act Section 66C',
    'Bank liability under Section 43A (failure of fraud detection)',
    'Possible IPC Section 420 against fraudsters',
  ],
  documentsNeeded: [
    'Airtel call records from 12 July 2023',
    "Bank's written rejection letter",
    'All bank SMS alerts from 12 July',
    'HDFC complaint acknowledgment receipt',
  ],
  nextSteps: [
    'File formal complaint at Cyber Crime Cell',
    'Send legal notice to HDFC under Section 43A IT Act',
    "Apply for call detail records (CDR) via court order if Airtel doesn't provide voluntarily",
  ],
};

export const IMPACT_STATS = [
  { label: 'Judgment Read Time', before: '2-4 hrs', after: '15 min', improvement: '87%' },
  { label: 'Case Research Time', before: '8-10 hrs', after: '1-2 hrs', improvement: '80%' },
  { label: 'Precedent Accuracy', before: '65%', after: '95%+', improvement: '+30pp' },
  { label: 'Cases Handled', before: '8-10', after: '30-40', improvement: '3-4x' },
];
