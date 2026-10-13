import React, { useState } from 'react';
import {
  GraduationCap,
  AlertTriangle,
  DollarSign,
  MessageSquare,
  ShieldCheck,
  LifeBuoy,
  PhoneCall,
  AlertOctagon,
  ExternalLink,
  ClipboardList,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
  Building2,
  CheckCircle2,
  XCircle,
  Camera,
  Lock
} from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────

interface Props {
  onStartScan?: () => void;
  onGoToCompanyCheck?: () => void;
}

type ActiveTab =
  | 'all'
  | 'warning-signs'
  | 'advance-fees'
  | 'fake-messages'
  | 'safe-practices'
  | 'evidence'
  | 'emergency';

// ─────────────────────────────────────────────────────────
// Interactive Scam Example Data
// ─────────────────────────────────────────────────────────

interface ScamExample {
  id: string;
  title: string;
  channel: string;
  channelClass: string;
  scamType: string;
  message: string;
  sender?: string;
  redFlags: string[];
  whatHappened: string;
  lessonsLearned: string[];
}

const SCAM_EXAMPLES: ScamExample[] = [
  {
    id: 'example-1',
    title: 'The "TCS Remote Intern" Task Scam',
    channel: 'WhatsApp Message',
    channelClass: 'whatsapp',
    scamType: 'Task Deposit Scam',
    sender: '+91 98765 XXXXX',
    message:
      '"Hello! I am Priya, HR Executive at TCS (Tata Consultancy Services). We are hiring remote interns for Data Entry — ₹800 per task, paid daily! No experience needed. First, complete a paid trial task by depositing ₹1,500 into our vendor account. You will earn ₹3,000 back within 2 hours. Join our Telegram group: t.me/tcs_intern_tasks"',
    redFlags: [
      '❌ TCS would never recruit via an anonymous personal WhatsApp number',
      '❌ "No experience needed" for a data entry role paying ₹800/task is unrealistic',
      '❌ Asks you to deposit ₹1,500 as a "trial task" — this is the advance-fee trap',
      '❌ Directs you to Telegram to avoid leaving a traceable record',
      '❌ Promises ₹3,000 back within 2 hours — classic lure language'
    ],
    whatHappened:
      'Riya (fictional student, 2nd year BCA) paid ₹1,500 for the "trial task". She received more tasks requiring bigger deposits — ₹3,000, then ₹8,000. When she tried to withdraw earnings, the platform froze her account until she paid a "tax clearance fee". Total loss: ₹14,500.',
    lessonsLearned: [
      'No legitimate company ever asks you to pay to start working',
      'TCS recruitment happens only at tcs.com/careers — never WhatsApp',
      'Any "earn by paying first" model is always a scam'
    ]
  },
  {
    id: 'example-2',
    title: 'The "Amazon Summer Intern — Google Form" Scam',
    channel: 'Unsolicited Email',
    channelClass: 'email',
    scamType: 'Domain Impersonation + Fee',
    sender: 'amazon.internship.2026@gmail.com',
    message:
      '"Subject: URGENT — Amazon Summer Internship 2026 Selection\n\nDear Candidate,\n\nYou have been selected for the Software Development Intern role at Amazon India (stipend ₹80,000/month). Please fill this Google Form and submit ₹1,200 as a one-time registration fee within 24 hours to confirm your seat. Offer expires: TODAY.\n\n— Rahul Singh, Campus Recruitment Head, Amazon"',
    redFlags: [
      '❌ Amazon uses @amazon.com for official communication — never @gmail.com',
      '❌ Amazon internship offers go through amazon.jobs — never a Google Form',
      '❌ ₹1,200 "registration fee" — Amazon pays you, you never pay them',
      '❌ "24 hours to confirm" is engineered pressure to stop you from verifying',
      '❌ No mention of a job ID, interview process, or official offer letter number'
    ],
    whatHappened:
      'Aakash (fictional student, final year CS) paid ₹1,200 via UPI. The scammer then demanded ₹3,500 for a "background verification certificate". When Aakash refused, all contact went silent. He checked amazon.jobs — no such role existed.',
    lessonsLearned: [
      'Check every recruiter email domain: official Amazon emails only end in @amazon.com',
      'Always search amazon.jobs to verify an internship role actually exists',
      'Never pay any fee to receive a job offer — report immediately'
    ]
  },
  {
    id: 'example-3',
    title: 'The "Infosys Laptop Deposit" Equipment Scam',
    channel: 'Email + WhatsApp Follow-up',
    channelClass: 'email',
    scamType: 'Fake Equipment Deposit',
    sender: 'infosys-hr-recruitment@infosys-careers-india.com',
    message:
      '"Congratulations on your selection to Infosys Digital Internship Program!\n\nWe will be shipping you a company MacBook Pro for remote work. As per company policy, a refundable security deposit of ₹7,500 is required via NEFT to our logistics partner. This amount will be credited back to your salary in Month 1.\n\nTransfer details: Account Name: TechShip Logistics Pvt Ltd\nAccount No: XXXX1234  IFSC: HDFC0001234"',
    redFlags: [
      '❌ Email domain is "infosys-careers-india.com" — NOT infosys.com (lookalike domain!)',
      '❌ No legitimate company charges a deposit for company equipment',
      '❌ Payment goes to a third-party "logistics partner" — not Infosys itself',
      '❌ "Refundable in Month 1" is a classic false promise used in advance-fee fraud',
      '❌ No offer letter ID, joining date, or manager contact provided'
    ],
    whatHappened:
      'Sneha (fictional student, recent MBA grad) transferred ₹7,500. The "recruiter" followed up on WhatsApp with a request for ₹2,000 more for "customs clearance". The laptop never arrived. The domain infosys-careers-india.com was registered 6 days prior.',
    lessonsLearned: [
      'Always verify the exact domain — infosys.com vs infosys-careers-india.com are very different',
      'Use the Company Check tool to spot lookalike domains instantly',
      'Infosys equipment ships directly from the company — zero cost to you'
    ]
  }
];

// ─────────────────────────────────────────────────────────
// Scam Example Card (collapsible interactive)
// ─────────────────────────────────────────────────────────

const ScamExampleCard: React.FC<{ example: ScamExample; onGoToCompanyCheck?: () => void }> = ({
  example,
  onGoToCompanyCheck
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`scam-example-card ${expanded ? 'expanded' : ''}`}>
      <button
        className="scam-example-trigger"
        onClick={() => setExpanded(p => !p)}
        aria-expanded={expanded}
      >
        <div className="scam-trigger-left">
          <span className={`msg-source ${example.channelClass}`}>{example.channel}</span>
          <span className="scam-example-type">{example.scamType}</span>
        </div>
        <div className="scam-trigger-right">
          <span className="scam-example-title">{example.title}</span>
          {expanded ? <ChevronUp size={18} className="electric-icon" /> : <ChevronDown size={18} className="text-muted-icon" />}
        </div>
      </button>

      {expanded && (
        <div className="scam-example-body animate-fade-in">
          {/* Fake Message Bubble */}
          <div className="scam-msg-section">
            <span className="scam-section-label">
              <MessageSquare size={13} /> Fake Message Received
            </span>
            {example.sender && (
              <p className="email-meta">
                From: <strong className="red-text">{example.sender}</strong>
              </p>
            )}
            <div className="chat-bubble">
              <p style={{ whiteSpace: 'pre-line' }}>{example.message}</p>
            </div>
          </div>

          {/* Red Flags */}
          <div className="scam-analysis-section">
            <span className="scam-section-label">
              <AlertTriangle size={13} /> Red Flags Breakdown
            </span>
            <div className="breakdown-points">
              {example.redFlags.map((flag, i) => (
                <span key={i} className="point red">{flag}</span>
              ))}
            </div>
          </div>

          {/* What Actually Happened */}
          <div className="scam-story-box">
            <span className="scam-section-label">
              <BookOpen size={13} /> What Actually Happened (Fictional Example)
            </span>
            <p className="scam-story-text">{example.whatHappened}</p>
          </div>

          {/* Key Lessons */}
          <div className="scam-lessons-box">
            <span className="scam-section-label">
              <CheckCircle2 size={13} /> Key Lessons
            </span>
            <ul className="scam-lessons-list">
              {example.lessonsLearned.map((lesson, i) => (
                <li key={i}>
                  <CheckCircle2 size={13} className="text-green" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA — Company Check */}
          {onGoToCompanyCheck && (
            <div className="scam-example-cta">
              <button className="scam-cta-btn" onClick={onGoToCompanyCheck}>
                <Building2 size={15} />
                <span>Check a Company's Domain — Use Company Check Tool</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Evidence Checklist items
// ─────────────────────────────────────────────────────────

const EVIDENCE_ITEMS = [
  {
    icon: <Camera size={16} className="electric-icon" />,
    title: 'Screenshot all chat conversations',
    detail: 'Include timestamps visible in every screenshot. Capture both the chat thread AND the contact info/profile page.'
  },
  {
    icon: <Lock size={16} className="electric-icon" />,
    title: "Save the sender's phone number and profile photo",
    detail: 'Copy and note the exact WhatsApp/Telegram number, username, and profile photo before blocking.'
  },
  {
    icon: <ClipboardList size={16} className="electric-icon" />,
    title: 'Note the UPI ID, bank account number, or wallet address',
    detail: "This is the most critical piece of evidence for the cybercrime helpline to freeze the fraudster's account."
  },
  {
    icon: <CheckCircle2 size={16} className="electric-icon" />,
    title: 'Save payment receipts and transaction IDs',
    detail: 'Screenshot your UPI app showing the exact amount, date/time, UTR number, and recipient details.'
  },
  {
    icon: <MessageSquare size={16} className="electric-icon" />,
    title: 'Export or screenshot email headers',
    detail: 'In Gmail: click the three-dot menu → "Show original". This reveals the true sending IP and domain.'
  },
  {
    icon: <ExternalLink size={16} className="electric-icon" />,
    title: 'Record all website / form URLs involved',
    detail: 'Copy the full URLs of any fake portals, Google Forms, or job postings the scammer shared with you.'
  },
  {
    icon: <Building2 size={16} className="electric-icon" />,
    title: 'Do a WHOIS lookup on suspicious domains',
    detail: 'Visit whois.domaintools.com and search the fake company domain. Note the registration date and registrar.'
  },
  {
    icon: <AlertTriangle size={16} className="electric-icon" />,
    title: 'Save offer letters, fake ID cards, or documents received',
    detail: 'Keep a copy of anything the scammer sent, even if it looks official — these help authorities trace the fraud ring.'
  }
];

// ─────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────

export const StudentSafetyHub: React.FC<Props> = ({ onStartScan, onGoToCompanyCheck }) => {
  const [activeCategory, setActiveCategory] = useState<ActiveTab>('all');
  const [evidenceChecked, setEvidenceChecked] = useState<Record<number, boolean>>({});

  const toggleEvidence = (idx: number) => {
    setEvidenceChecked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const evidenceCount = Object.values(evidenceChecked).filter(Boolean).length;

  return (
    <div className="safety-hub-container animate-fade-in">

      {/* ── Hero Banner ─────────────────────────────────── */}
      <div className="hub-hero">
        <div className="hub-hero-badge">
          <GraduationCap size={16} className="electric-icon" />
          <span>STUDENT PROTECTION CENTER</span>
        </div>
        <h2>Student Safety Hub</h2>
        <p>
          Your complete defense guide against predatory internship fees, fake recruiters on WhatsApp/Telegram,
          lookalike domains, and identity-harvesting schemes targeting college students and fresh graduates.
        </p>

        {/* Helpline Alert Strip */}
        <div className="hub-helpline-strip">
          <PhoneCall size={16} className="electric-icon" />
          <span>
            <strong>India Cybercrime Helpline:</strong> Dial{' '}
            <strong className="helpline-num-highlight">1930</strong> immediately after financial fraud (24/7, toll-free) ·{' '}
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hub-helpline-link"
            >
              cybercrime.gov.in <ExternalLink size={12} />
            </a>
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="hub-nav-pills">
          {(
            [
              { id: 'all', label: 'All Guides', icon: null },
              { id: 'warning-signs', label: 'Warning Signs', icon: <AlertTriangle size={14} /> },
              { id: 'advance-fees', label: 'Advance-Fee Scams', icon: <DollarSign size={14} /> },
              { id: 'fake-messages', label: 'Fake Messages', icon: <MessageSquare size={14} /> },
              { id: 'safe-practices', label: 'Safe Practices', icon: <ShieldCheck size={14} /> },
              { id: 'evidence', label: 'Evidence Checklist', icon: <ClipboardList size={14} /> },
              { id: 'emergency', label: 'After a Scam', icon: <LifeBuoy size={14} />, emergency: true }
            ] as { id: ActiveTab; label: string; icon: React.ReactNode; emergency?: boolean }[]
          ).map(tab => (
            <button
              key={tab.id}
              className={`hub-pill ${tab.emergency ? 'pill-emergency' : ''} ${activeCategory === tab.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SECTION 1 — WARNING SIGNS
      ══════════════════════════════════════════════════ */}
      {(activeCategory === 'all' || activeCategory === 'warning-signs') && (
        <section className="hub-section">
          <div className="hub-section-header">
            <div className="hub-header-icon red">
              <AlertOctagon size={22} />
            </div>
            <div>
              <h3>7 Common Fake Internship Warning Signs</h3>
              <p>Dead giveaways that an internship opportunity is predatory or fraudulent.</p>
            </div>
          </div>

          <div className="hub-cards-grid">
            {[
              {
                n: 1,
                title: 'Selected Without an Interview',
                body: 'You receive an "Offer Letter" within minutes of applying, or with no technical round, coding test, or video call at all.',
                why: 'Scammers skip screening so they can jump straight to requesting money before you do any research.'
              },
              {
                n: 2,
                title: '"No Skills Required" & Astronomical Pay',
                body: 'Jobs advertising "typing captions", "liking YouTube videos", or "rating hotels" for ₹3,000–₹5,000 per day stipend.',
                why: 'These are entry points for task-deposit schemes. The "job" exists only to trap you into progressive upfront payments.'
              },
              {
                n: 3,
                title: 'Big-Brand Name, Free Webmail',
                body: 'A recruiter claiming to be from Google, Amazon, or TCS contacts you from a @gmail.com, @yahoo.com, or @outlook.com address.',
                why: 'Anyone can create a Gmail account named "amazon.recruitment.hr" in 30 seconds. Real enterprise emails always end in @company.com.'
              },
              {
                n: 4,
                title: 'Sensitive Documents Before Any Interview',
                body: 'Asking for your Aadhaar card, PAN card, passport, bank details, or OTP before you have had even a single conversation.',
                why: 'Identity theft rings use student KYC to open fraudulent bank accounts, take loans, and commit SIM-swap fraud.'
              },
              {
                n: 5,
                title: '"Accept Within 2 Hours" Pressure',
                body: 'Artificial panic: "only 3 seats left", "offer expires today", "HR will cancel your selection if not confirmed".',
                why: 'Pressure stops you from calling your college, parents, or a friend who might spot the scam immediately.'
              },
              {
                n: 6,
                title: 'Lookalike / Typosquatted Domains',
                body: 'Email from hr@infosys-careers-india.com, hr@amazon-hr-portal.com, or tcs-hiring-portal.in instead of the real corporate domain.',
                why: 'Fake domains can be registered for under ₹500. They look real at a glance but are completely controlled by fraudsters.'
              },
              {
                n: 7,
                title: 'Recruitment Exclusively on Telegram / WhatsApp',
                body: 'All communication happens on private messaging apps with no verifiable email thread, official portal, or offer letter reference number.',
                why: 'Anonymous apps leave no legal paper trail and make it easy for scammers to vanish completely after taking money.'
              }
            ].map(card => (
              <div key={card.n} className="hub-card danger">
                <div className="card-badge red">Red Flag {card.n}</div>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
                <div className="card-takeaway">
                  <strong>Why Scammers Do This:</strong> {card.why}
                </div>
              </div>
            ))}
          </div>

          {/* CTA — Scan an Offer */}
          {onStartScan && (
            <div className="hub-section-cta">
              <Zap size={16} className="electric-icon" />
              <span>Received a suspicious offer?</span>
              <button className="hub-cta-action-btn" onClick={onStartScan}>
                <Search size={15} />
                Scan It with JobGuard
              </button>
            </div>
          )}
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          SECTION 2 — ADVANCE-FEE SCAMS
      ══════════════════════════════════════════════════ */}
      {(activeCategory === 'all' || activeCategory === 'advance-fees') && (
        <section className="hub-section">
          <div className="hub-section-header">
            <div className="hub-header-icon orange">
              <DollarSign size={22} />
            </div>
            <div>
              <h3>The Golden Rule & Advance-Fee Scams</h3>
              <p>Legitimate employers PAY YOU. They never ask you to pay them first.</p>
            </div>
          </div>

          <div className="golden-rule-banner">
            <div className="golden-rule-text">
              <span className="golden-tag">THE UNIVERSAL RULE</span>
              <h3>Never Pay for an Internship or Job. Ever.</h3>
              <p>
                No genuine company charges a registration fee, interview security deposit, training kit fee,
                ID card charge, or equipment courier fee. Any demand for upfront money — regardless of
                how "refundable" they claim it is — is a scam. <strong>100% of the time.</strong>
              </p>
            </div>
          </div>

          <div className="fee-traps-grid">
            {[
              {
                title: '1. The "Training & Kit Fee" Trap',
                pitch: '"Congratulations on your selection! To begin your internship, pay ₹2,999 for our mandatory online training module and welcome kit."',
                reality: 'You receive useless PDFs or recycled video links, and there is no real internship at the end. The "company" disappears after payment.'
              },
              {
                title: '2. The "Laptop Security Deposit"',
                pitch: '"We are shipping you a company MacBook for remote work. Please send a refundable security deposit of ₹7,500 to our logistics partner before dispatch."',
                reality: 'No laptop is ever shipped. Your payment goes to a fraudulent account. The moment you transfer, the recruiter blocks you.'
              },
              {
                title: '3. The "Background Check & ID Card" Fee',
                pitch: '"Pay ₹950 to our third-party verification partner for your police verification report and corporate ID card issuance."',
                reality: 'Legitimate companies conduct background checks entirely at their own expense, through certified corporate agencies — never asking candidates to pay.'
              },
              {
                title: '4. The Fake Cheque Equipment Scam',
                pitch: '"We are sending you a ₹15,000 welcome cheque. Deposit it, keep ₹5,000 for your stipend, and transfer ₹10,000 to our approved home-office vendor."',
                reality: 'The cheque bounces 3–5 banking days later. Your bank reverses the credit. Your wired ₹10,000 is gone permanently — with no recourse.'
              },
              {
                title: '5. The "Tax Clearance" Withdrawal Block',
                pitch: '"Your task earnings of ₹12,000 are ready to withdraw. First pay ₹1,200 as a government tax clearance fee to release your balance."',
                reality: "You have done tasks and earned nothing real. The platform is fake. The \"tax fee\" is the scam's final extraction before the site vanishes."
              },
              {
                title: '6. The "Premium Membership" Job Portal Scam',
                pitch: '"Pay ₹499 to unlock premium recruiter contacts and apply to 500+ verified internships on our platform."',
                reality: 'The portal is not verified. The "recruiter contacts" are fake or recycled. Genuine job portals like LinkedIn, Internshala, or Naukri are free to apply on.'
              }
            ].map(card => (
              <div key={card.title} className="fee-card">
                <h4>{card.title}</h4>
                <p className="fee-scenario">
                  <strong>The Pitch:</strong> {card.pitch}
                </p>
                <p className="fee-reality">
                  <strong>The Reality:</strong> {card.reality}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          SECTION 3 — FAKE RECRUITER MESSAGES
      ══════════════════════════════════════════════════ */}
      {(activeCategory === 'all' || activeCategory === 'fake-messages') && (
        <section className="hub-section">
          <div className="hub-section-header">
            <div className="hub-header-icon blue">
              <MessageSquare size={22} />
            </div>
            <div>
              <h3>Interactive Scam Message Examples</h3>
              <p>
                Three fictional but realistic scam scenarios. Click each to expand the full message,
                red flag breakdown, and key lessons.
              </p>
            </div>
          </div>

          <div className="scam-examples-disclaimer">
            <AlertTriangle size={15} className="electric-icon" />
            <span>
              All company names, recruiter names, and student names below are <strong>fictional examples for educational purposes only</strong>. They do not imply these companies engage in fraudulent practices.
            </span>
          </div>

          <div className="scam-examples-list">
            {SCAM_EXAMPLES.map(ex => (
              <ScamExampleCard
                key={ex.id}
                example={ex}
                onGoToCompanyCheck={onGoToCompanyCheck}
              />
            ))}
          </div>

          {/* Anatomy Guide */}
          <div className="anatomy-guide-card">
            <div className="anatomy-guide-header">
              <Zap size={18} className="electric-icon" />
              <h4>Anatomy of Any Fake Recruiter Message</h4>
            </div>
            <div className="anatomy-grid">
              {[
                { label: 'Overly Casual Opening', eg: '"Hello dear!" / "Hi buddy!"', note: 'Corporate HR uses formal, professional salutations.' },
                { label: 'Vague Company Reference', eg: '"We found your profile online"', note: 'Real recruiters specify exactly where they found you (LinkedIn, Naukri, campus fair).' },
                { label: 'No-Skill High Pay', eg: '"₹5,000/day for simple tasks"', note: 'Legitimate intern stipends range ₹5,000–₹25,000/month — not per day.' },
                { label: 'Messaging App Redirect', eg: '"Join our Telegram: t.me/xyz"', note: 'Authentic companies communicate via official email with traceable records.' },
                { label: 'Time-Bomb Language', eg: '"Respond within 1 hour or lose offer"', note: 'Pressure prevents you from verifying — a clear psychological manipulation tactic.' },
                { label: 'Upfront Payment Request', eg: '"Pay ₹999 to activate your account"', note: 'This single line alone makes any opportunity 100% fraudulent. Stop and report.' }
              ].map((item, i) => (
                <div key={i} className="anatomy-item">
                  <span className="anatomy-label">{item.label}</span>
                  <code className="anatomy-eg">e.g. {item.eg}</code>
                  <span className="anatomy-note">{item.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          SECTION 4 — SAFE JOB-SEARCH PRACTICES
      ══════════════════════════════════════════════════ */}
      {(activeCategory === 'all' || activeCategory === 'safe-practices') && (
        <section className="hub-section">
          <div className="hub-section-header">
            <div className="hub-header-icon green">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3>Student Playbook: 8 Safe Job-Search Practices</h3>
              <p>Follow these standard hygiene rules every time you apply for a job or internship.</p>
            </div>
          </div>

          <div className="practices-grid">
            {[
              {
                n: 1,
                title: 'Apply on Official Portals Only',
                body: 'When you see a job on LinkedIn, Instagram, or WhatsApp — go directly to the company\'s official website and confirm that the job ID appears on their /careers page before applying or responding.'
              },
              {
                n: 2,
                title: 'Insist on a Live Video Interview',
                body: 'Authentic companies always conduct live video interviews with cameras turned on. Never accept an offer based solely on WhatsApp text questionnaires, Telegram chats, or voice notes.'
              },
              {
                n: 3,
                title: 'Verify the Recruiter on LinkedIn',
                body: 'Search the recruiter\'s full name on LinkedIn. Check if they have an active profile, consistent work history, and verifiable connections to other employees at that company.'
              },
              {
                n: 4,
                title: 'Inspect Email Domains Carefully',
                body: 'Look closely at the sender\'s domain. Watch for tricks like hr@google-jobs.co vs hr@google.com — or tcs-hr-portal.in vs tcs.com. Use the Company Check tool for pattern analysis.'
              },
              {
                n: 5,
                title: 'Watermark Every Document You Share',
                body: 'Before sharing your Aadhaar or PAN copy, add a visible watermark: "FOR JOB APPLICATION TO [COMPANY NAME] ONLY — [DATE]". This prevents re-use for other fraudulent activities.'
              },
              {
                n: 6,
                title: 'Ask for a Formal Signed Offer Letter',
                body: 'Legitimate offer letters come on official company letterhead with a CIN (Corporate Identification Number), physical address, reporting manager, joining date, and HR contact number.'
              },
              {
                n: 7,
                title: 'Use Only Trusted Job Platforms',
                body: 'Stick to verified platforms: LinkedIn, Internshala, Naukri, Glassdoor, or the company\'s own careers portal. Avoid applying to job listings shared on random Telegram groups or Instagram DMs.'
              },
              {
                n: 8,
                title: 'Show Suspicious Offers to a Trusted Person',
                body: 'Before agreeing to anything, share the offer with a professor, parent, senior colleague, or friend. A fresh pair of eyes catches red flags you might miss under excitement or pressure.'
              }
            ].map(p => (
              <div key={p.n} className="practice-card">
                <div className="practice-num">{p.n}</div>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>

          {/* Trusted Platforms Row */}
          <div className="trusted-platforms-card">
            <div className="trusted-platforms-header">
              <CheckCircle2 size={18} className="electric-icon" />
              <h4>Student-Trusted Job & Internship Platforms (India)</h4>
            </div>
            <div className="trusted-platforms-grid">
              {[
                { name: 'Internshala', url: 'https://internshala.com', note: 'India\'s largest student internship platform' },
                { name: 'LinkedIn', url: 'https://linkedin.com/jobs', note: 'Best for corporate and startup roles globally' },
                { name: 'Naukri.com', url: 'https://naukri.com', note: 'Leading Indian job board for fresher roles' },
                { name: 'Glassdoor', url: 'https://glassdoor.co.in', note: 'Read company reviews before applying' },
                { name: 'Handshake', url: 'https://joinhandshake.com', note: 'Campus-focused early career platform' },
                { name: 'IIT/NIT Campus Portal', url: '#', note: 'Your college\'s official placement cell website' }
              ].map(pl => (
                <div key={pl.name} className="platform-chip">
                  <CheckCircle2 size={13} className="text-green" />
                  <div>
                    <strong>{pl.name}</strong>
                    <span>{pl.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {onGoToCompanyCheck && (
            <div className="hub-section-cta">
              <Building2 size={16} className="electric-icon" />
              <span>Suspicious recruiter email or domain?</span>
              <button className="hub-cta-action-btn" onClick={onGoToCompanyCheck}>
                <Search size={15} />
                Verify with Company Check Tool
              </button>
            </div>
          )}
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          SECTION 5 — EVIDENCE COLLECTION CHECKLIST
      ══════════════════════════════════════════════════ */}
      {(activeCategory === 'all' || activeCategory === 'evidence') && (
        <section className="hub-section">
          <div className="hub-section-header">
            <div className="hub-header-icon blue">
              <ClipboardList size={22} />
            </div>
            <div>
              <h3>Evidence Collection Checklist</h3>
              <p>
                If you think you are being targeted by a scam — collect this evidence BEFORE blocking or deleting anything.
                Strong evidence dramatically increases the chance of the cybercrime helpline freezing the fraudster's account.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="evidence-progress-bar-wrap">
            <div className="evidence-progress-meta">
              <span>Evidence collected: <strong>{evidenceCount} / {EVIDENCE_ITEMS.length}</strong></span>
              {evidenceCount === EVIDENCE_ITEMS.length && (
                <span className="evidence-complete-badge">
                  <CheckCircle2 size={13} /> Ready to Report
                </span>
              )}
            </div>
            <div className="evidence-progress-track">
              <div
                className="evidence-progress-fill"
                style={{ width: `${(evidenceCount / EVIDENCE_ITEMS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="evidence-checklist-items">
            {EVIDENCE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`evidence-item ${evidenceChecked[idx] ? 'evidence-done' : ''}`}
                onClick={() => toggleEvidence(idx)}
                role="checkbox"
                aria-checked={!!evidenceChecked[idx]}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && toggleEvidence(idx)}
              >
                <div className="evidence-checkbox">
                  {evidenceChecked[idx]
                    ? <CheckCircle2 size={20} className="text-green" />
                    : <div className="evidence-empty-box" />}
                </div>
                <div className="evidence-item-content">
                  <div className="evidence-item-header">
                    {item.icon}
                    <strong>{item.title}</strong>
                  </div>
                  <span className="evidence-item-detail">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="evidence-tip-box">
            <AlertTriangle size={15} className="text-orange" />
            <p>
              <strong>Critical timing:</strong> Reporting to the{' '}
              <strong className="helpline-num-highlight">1930 Cybercrime Helpline</strong> within the{' '}
              first 1–4 hours of a fraudulent transfer gives authorities the best window to freeze the
              fraudster's account before money is moved. Do NOT wait.
            </p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          SECTION 6 — WHAT TO DO AFTER A SCAM
      ══════════════════════════════════════════════════ */}
      {(activeCategory === 'all' || activeCategory === 'emergency') && (
        <section className="hub-section emergency-section">
          <div className="hub-section-header">
            <div className="hub-header-icon emergency">
              <LifeBuoy size={22} />
            </div>
            <div>
              <h3>What To Do If You Were Targeted or Scammed</h3>
              <p>Immediate steps to minimise financial damage and protect your identity.</p>
            </div>
          </div>

          {/* India 1930 Highlight Banner */}
          <div className="emergency-1930-banner">
            <div className="banner-1930-left">
              <PhoneCall size={28} className="electric-icon" />
              <div>
                <span className="banner-1930-label">INDIA FINANCIAL CYBER FRAUD HELPLINE</span>
                <div className="banner-1930-number">1930</div>
                <span className="banner-1930-sub">24/7 · Toll-free · Operates in all states</span>
              </div>
            </div>
            <div className="banner-1930-right">
              <p>
                Call <strong>1930</strong> immediately if you have transferred money to a scammer via UPI, net banking, wallet, or cheque. Operated by MHA (Ministry of Home Affairs), this helpline coordinates directly with banks to freeze fraudulent accounts — <strong>time is critical</strong>.
              </p>
              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="helpline-link"
              >
                <span>File an Online Report: cybercrime.gov.in</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Steps */}
          <div className="emergency-steps-grid">
            {[
              {
                step: 'STEP 1 · IMMEDIATE (within minutes)',
                stepClass: 'step-1',
                title: 'Call 1930 & Contact Your Bank',
                body: 'Call the national cybercrime helpline 1930. Simultaneously call your bank\'s 24/7 fraud line and request a transaction reversal / UPI dispute. Ask them to freeze the recipient account. Share the UTR / transaction reference number.'
              },
              {
                step: 'STEP 2 · EVIDENCE (before blocking)',
                stepClass: 'step-2',
                title: 'Preserve All Evidence First',
                body: 'Before blocking the scammer: screenshot all chats, save the phone number/UPI ID, take photos of payment receipts, export email headers, and note all URLs. Check the Evidence Checklist tab for the full list.'
              },
              {
                step: 'STEP 3 · REPORT ONLINE',
                stepClass: 'step-3',
                title: 'File a Complaint at cybercrime.gov.in',
                body: 'Visit cybercrime.gov.in → "Report Cybercrime" → "Financial Fraud". You will need: scammer\'s number/UPI ID, transaction details, and screenshots. Filing within 48 hours is critical for account freezing.'
              },
              {
                step: 'STEP 4 · LOCAL POLICE',
                stepClass: 'step-4',
                title: 'File an FIR at Your Nearest Police Station',
                body: 'Bring all printed evidence: screenshots, payment receipts, conversation logs. Ask for an FIR under Section 318(4) BNS (cheating) and IT Act Section 66D. Get the FIR copy for your bank\'s chargeback process.'
              },
              {
                step: 'STEP 5 · PROTECT IDENTITY',
                stepClass: 'step-5',
                title: 'Secure Your Accounts & Documents',
                body: 'If you shared Aadhaar or PAN with the scammer: alert UIDAI (1947) and the Income Tax helpline (1800-103-0025). Change passwords on all accounts, enable 2FA, and alert your college placement cell so they can warn other students.'
              },
              {
                step: 'STEP 6 · WARN OTHERS',
                stepClass: 'step-6',
                title: 'Report the Scam Account & Warn Peers',
                body: 'Report the WhatsApp/Telegram number (use the in-app "Report" feature) and any fake domain to cybercrime.gov.in. Share the scammer\'s information with your college group chat or placement officer so other students are not targeted.'
              }
            ].map(card => (
              <div key={card.step} className={`emergency-card ${card.stepClass}`}>
                <div className="step-badge">{card.step}</div>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </div>
            ))}
          </div>

          {/* Identity Protection Note */}
          <div className="identity-protection-note">
            <XCircle size={18} className="text-red" />
            <div>
              <strong>If You Shared Aadhaar / PAN / Bank Details</strong>
              <p>
                This is identity theft territory. Immediately: (1) Call UIDAI helpline <strong>1947</strong> to lock your biometric Aadhaar.
                (2) Visit your bank in person to flag potential misuse of your account. (3) Check your CIBIL credit report for unauthorized loans at
                {' '}<a href="https://www.cibil.com" target="_blank" rel="noopener noreferrer" className="helpline-link">cibil.com</a>.
                (4) File a complaint with your state cybercrime police station.
              </p>
            </div>
          </div>

          {/* Official Helplines */}
          <div className="official-helplines-card">
            <div className="helplines-header">
              <PhoneCall size={20} className="electric-icon" />
              <h4>Official Cybercrime Reporting Portals & Helplines</h4>
            </div>

            <div className="helplines-list">
              <div className="helpline-item">
                <div className="helpline-region">
                  <span className="country-badge">INDIA</span>
                  <strong>National Cybercrime Reporting Portal — MHA</strong>
                </div>
                <div className="helpline-actions">
                  <span className="helpline-number">
                    Dial <strong>1930</strong> (24/7, financial fraud)
                  </span>
                  <a
                    href="https://cybercrime.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="helpline-link"
                  >
                    <span>cybercrime.gov.in</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              <div className="helpline-item">
                <div className="helpline-region">
                  <span className="country-badge">INDIA</span>
                  <strong>UIDAI Aadhaar Helpline (identity protection)</strong>
                </div>
                <div className="helpline-actions">
                  <span className="helpline-number">Dial <strong>1947</strong></span>
                  <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    <span>uidai.gov.in</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              <div className="helpline-item">
                <div className="helpline-region">
                  <span className="country-badge">USA</span>
                  <strong>FBI Internet Crime Complaint Center (IC3)</strong>
                </div>
                <div className="helpline-actions">
                  <a href="https://www.ic3.gov" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    <span>ic3.gov</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              <div className="helpline-item">
                <div className="helpline-region">
                  <span className="country-badge">UK</span>
                  <strong>Action Fraud Police Service</strong>
                </div>
                <div className="helpline-actions">
                  <span className="helpline-number">Dial <strong>0300 123 2040</strong></span>
                  <a href="https://www.actionfraud.police.uk" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    <span>actionfraud.police.uk</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
