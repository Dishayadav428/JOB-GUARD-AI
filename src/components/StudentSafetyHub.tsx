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
  ExternalLink
} from 'lucide-react';

export const StudentSafetyHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'warning-signs' | 'advance-fees' | 'fake-messages' | 'safe-practices' | 'emergency'>('all');

  return (
    <div className="safety-hub-container animate-fade-in">
      {/* Hero Banner */}
      <div className="hub-hero">
        <div className="hub-hero-badge">
          <GraduationCap size={16} className="electric-icon" />
          <span>STUDENT CAREER PROTECTION ESSENTIALS</span>
        </div>
        <h2>Student Safety Hub</h2>
        <p>
          Your ultimate defense guide against predatory internship fees, fake recruiters on WhatsApp/Telegram, 
          and identity harvesting schemes targeting college students and recent grads.
        </p>

        {/* Category Filter Pills */}
        <div className="hub-nav-pills">
          <button 
            className={`hub-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Guides
          </button>
          <button 
            className={`hub-pill ${activeCategory === 'warning-signs' ? 'active' : ''}`}
            onClick={() => setActiveCategory('warning-signs')}
          >
            <AlertTriangle size={14} />
            <span>Warning Signs</span>
          </button>
          <button 
            className={`hub-pill ${activeCategory === 'advance-fees' ? 'active' : ''}`}
            onClick={() => setActiveCategory('advance-fees')}
          >
            <DollarSign size={14} />
            <span>Advance-Fee Scams</span>
          </button>
          <button 
            className={`hub-pill ${activeCategory === 'fake-messages' ? 'active' : ''}`}
            onClick={() => setActiveCategory('fake-messages')}
          >
            <MessageSquare size={14} />
            <span>Fake Messages</span>
          </button>
          <button 
            className={`hub-pill ${activeCategory === 'safe-practices' ? 'active' : ''}`}
            onClick={() => setActiveCategory('safe-practices')}
          >
            <ShieldCheck size={14} />
            <span>Safe Practices</span>
          </button>
          <button 
            className={`hub-pill pill-emergency ${activeCategory === 'emergency' ? 'active' : ''}`}
            onClick={() => setActiveCategory('emergency')}
          >
            <LifeBuoy size={14} />
            <span>After a Scam</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: COMMON FAKE INTERNSHIP WARNING SIGNS */}
      {(activeCategory === 'all' || activeCategory === 'warning-signs') && (
        <section className="hub-section">
          <div className="hub-section-header">
            <div className="hub-header-icon red">
              <AlertOctagon size={22} />
            </div>
            <div>
              <h3>5 Common Fake Internship Warning Signs</h3>
              <p>Dead giveaways that an internship opportunity is predatory or fraudulent.</p>
            </div>
          </div>

          <div className="hub-cards-grid">
            <div className="hub-card danger">
              <div className="card-badge red">Red Flag 1</div>
              <h4>Selected Without an Interview</h4>
              <p>
                You receive an "Offer Letter" within minutes of applying, or without any technical round, code test, or video call.
              </p>
              <div className="card-takeaway">
                <strong>Why Scammers Do This:</strong> Real employers invest time to evaluate candidates. Scammers skip straight to offers so they can request money.
              </div>
            </div>

            <div className="hub-card danger">
              <div className="card-badge red">Red Flag 2</div>
              <h4>Vague or "No Skills Required" Work</h4>
              <p>
                Jobs advertising "typing captchas", "liking YouTube videos", or "rating 5-star hotels" for thousands in daily stipends.
              </p>
              <div className="card-takeaway">
                <strong>Why Scammers Do This:</strong> They target students seeking flexible income, then trap them in task-deposit schemes.
              </div>
            </div>

            <div className="hub-card danger">
              <div className="card-badge red">Red Flag 3</div>
              <h4>Free Webmail for "Big Tech" Recruiting</h4>
              <p>
                A recruiter claiming to represent Google, Amazon, Microsoft, or TCS emails you from a <code>@gmail.com</code> or <code>@outlook.com</code> address.
              </p>
              <div className="card-takeaway">
                <strong>Why Scammers Do This:</strong> Anyone can create a free Gmail account with a corporate name in 30 seconds.
              </div>
            </div>

            <div className="hub-card danger">
              <div className="card-badge red">Red Flag 4</div>
              <h4>Demanding Sensitive Documents Immediately</h4>
              <p>
                Asking for your Aadhaar card, PAN card, passport copy, bank account, or OTP before you've even had an interview.
              </p>
              <div className="card-takeaway">
                <strong>Why Scammers Do This:</strong> Identity theft rings use student KYC documents to open fraudulent bank accounts or obtain loans.
              </div>
            </div>

            <div className="hub-card danger">
              <div className="card-badge red">Red Flag 5</div>
              <h4>Urgent "Accept Within 2 Hours" Deadlines</h4>
              <p>
                Artificial pressure insisting that "only 3 slots remain" and you must submit a deposit or sign within hours.
              </p>
              <div className="card-takeaway">
                <strong>Why Scammers Do This:</strong> Panic stops you from showing the offer to your professors, parents, or seniors.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: ADVANCE-FEE SCAMS */}
      {(activeCategory === 'all' || activeCategory === 'advance-fees') && (
        <section className="hub-section">
          <div className="hub-section-header">
            <div className="hub-header-icon orange">
              <DollarSign size={22} />
            </div>
            <div>
              <h3>The Golden Rule & Advance-Fee Scams</h3>
              <p>Legitimate employers PAY YOU. They never ask you to pay them.</p>
            </div>
          </div>

          <div className="golden-rule-banner">
            <div className="golden-rule-text">
              <span className="golden-tag">THE UNIVERSAL RULE</span>
              <h3>Never Pay for an Internship or Job. Ever.</h3>
              <p>
                No genuine company charges an application fee, interview security deposit, training kit fee, or equipment courier charge.
                Any demand for upfront money—regardless of how "refundable" they promise it is—is a scam.
              </p>
            </div>
          </div>

          <div className="fee-traps-grid">
            <div className="fee-card">
              <h4>1. The "Training & Kit Fee" Trap</h4>
              <p className="fee-scenario">
                <strong>The Pitch:</strong> "Congratulations on your selection! To begin your internship, pay ₹2,999 for our mandatory training module and welcome kit."
              </p>
              <p className="fee-reality">
                <strong>The Reality:</strong> You receive useless video links or copy-pasted PDFs, and there is no real internship or placement at the end.
              </p>
            </div>

            <div className="fee-card">
              <h4>2. The "Laptop Security Deposit"</h4>
              <p className="fee-scenario">
                <strong>The Pitch:</strong> "We are shipping you a company MacBook or laptop. Send a refundable security deposit of ₹5,000 / $200 before dispatch."
              </p>
              <p className="fee-reality">
                <strong>The Reality:</strong> No laptop is ever shipped. Once the money is sent via UPI or crypto, the recruiter blocks you.
              </p>
            </div>

            <div className="fee-card">
              <h4>3. The "Background Check & ID Card" Fee</h4>
              <p className="fee-scenario">
                <strong>The Pitch:</strong> "Pay ₹950 to our third-party verification partner for your police verification report and company ID card."
              </p>
              <p className="fee-reality">
                <strong>The Reality:</strong> Legitimate companies conduct background checks at their own expense through verified corporate agencies.
              </p>
            </div>

            <div className="fee-card">
              <h4>4. The Fake Cheque Equipment Scam</h4>
              <p className="fee-scenario">
                <strong>The Pitch:</strong> "We will send you a digital check for $2,500. Deposit it, keep $500 for your stipend, and wire $2,000 to our approved home-office vendor."
              </p>
              <p className="fee-reality">
                <strong>The Reality:</strong> The check bounces days later. The bank takes back the full $2,500 from your account, and your wired money is gone forever.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: FAKE RECRUITER MESSAGES */}
      {(activeCategory === 'all' || activeCategory === 'fake-messages') && (
        <section className="hub-section">
          <div className="hub-section-header">
            <div className="hub-header-icon blue">
              <MessageSquare size={22} />
            </div>
            <div>
              <h3>Anatomy of Fake Recruiter Messages</h3>
              <p>Learn how to spot real scam messages received on WhatsApp, Telegram, and SMS.</p>
            </div>
          </div>

          <div className="message-breakdown-grid">
            {/* Telegram Task Example */}
            <div className="message-card">
              <div className="message-header-bar">
                <span className="msg-source telegram">Telegram / WhatsApp Outreach</span>
                <span className="scam-type-pill">Task Rating Scam</span>
              </div>
              <div className="chat-bubble">
                <p>
                  "Hello dear! I am HR Jessica from Global Media. We found your resume online. 
                  We offer part-time remote work. Just like YouTube videos and rate hotels on Google Maps. 
                  Earn ₹3,000 - ₹5,000 daily! Daily payouts. Click link to chat with receptionist on Telegram: t.me/task_hr_manager"
                </p>
              </div>
              <div className="breakdown-points">
                <span className="point red">❌ "Hello dear" and broken corporate English</span>
                <span className="point red">❌ Claims to have "found your resume" without specifying where</span>
                <span className="point red">❌ Astronomical pay for trivial clicks</span>
                <span className="point red">❌ Directs you into an anonymous Telegram channel</span>
              </div>
            </div>

            {/* Impersonation Email Example */}
            <div className="message-card">
              <div className="message-header-bar">
                <span className="msg-source email">Unsolicited Email Offer</span>
                <span className="scam-type-pill">Domain Impersonation</span>
              </div>
              <div className="chat-bubble">
                <p className="email-meta">From: <strong>amazon.recruitment.india@gmail.com</strong></p>
                <p>
                  "Subject: Urgent Job Offer - Amazon Summer Intern 2026<br/><br/>
                  Congratulations! You have been shortlisted for the Software Engineer Intern role at Amazon. 
                  Your monthly stipend will be ₹80,000. Please fill out this Google Form and submit ₹1,200 registration fee within 24 hours to confirm your seat."
                </p>
              </div>
              <div className="breakdown-points">
                <span className="point red">❌ Top corporation using public @gmail.com</span>
                <span className="point red">❌ Official job offers NEVER sent via Google Forms</span>
                <span className="point red">❌ Demand for registration fee</span>
                <span className="point red">❌ High pressure "confirm within 24 hours"</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: SAFE JOB-SEARCH PRACTICES */}
      {(activeCategory === 'all' || activeCategory === 'safe-practices') && (
        <section className="hub-section">
          <div className="hub-section-header">
            <div className="hub-header-icon green">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3>Student Playbook: 6 Safe Job-Search Practices</h3>
              <p>Follow these standard hygiene rules every time you apply for a job or internship.</p>
            </div>
          </div>

          <div className="practices-grid">
            <div className="practice-card">
              <div className="practice-num">1</div>
              <h4>Apply on Official Portals</h4>
              <p>Whenever you see a job on LinkedIn, Indeed, or Instagram, go directly to the company's official website and verify that the job ID exists on their <code>/careers</code> page.</p>
            </div>

            <div className="practice-card">
              <div className="practice-num">2</div>
              <h4>Insist on Video / In-Person Interviews</h4>
              <p>Authentic companies always conduct live video interviews with cameras turned on. Never accept a job offer based solely on questionnaire text chats or Telegram forms.</p>
            </div>

            <div className="practice-card">
              <div className="practice-num">3</div>
              <h4>Verify the Recruiter on LinkedIn</h4>
              <p>Search the recruiter's name on LinkedIn. Check if they have an active network, verified company affiliation, and endorsements from other employees at that firm.</p>
            </div>

            <div className="practice-card">
              <div className="practice-num">4</div>
              <h4>Inspect Email Headers & Domains</h4>
              <p>Look closely at the sender's email domain. Watch out for hyphenated tricks like <code>hr@google-careers.com</code> or <code>tcs-jobs-portal.in</code> instead of official corporate domains.</p>
            </div>

            <div className="practice-card">
              <div className="practice-num">5</div>
              <h4>Keep Your Documents Watermarked</h4>
              <p>When submitting resume/identity copies, add a transparent watermark: <em>"FOR JOB APPLICATION TO [COMPANY NAME] ONLY"</em> to prevent unauthorized re-use.</p>
            </div>

            <div className="practice-card">
              <div className="practice-num">6</div>
              <h4>Ask for a Formal Signed Offer Letter</h4>
              <p>Legitimate offer letters come on official company letterhead, detailing corporate identification numbers (CIN), physical addresses, reporting managers, and HR contact lines.</p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: WHAT TO DO AFTER A SUSPECTED SCAM */}
      {(activeCategory === 'all' || activeCategory === 'emergency') && (
        <section className="hub-section emergency-section">
          <div className="hub-section-header">
            <div className="hub-header-icon emergency">
              <LifeBuoy size={22} />
            </div>
            <div>
              <h3>What To Do If You Were Targeted or Scammed</h3>
              <p>Immediate steps to minimize financial damage and protect your identity.</p>
            </div>
          </div>

          <div className="emergency-steps-grid">
            <div className="emergency-card step-1">
              <div className="step-badge">STEP 1 • IMMEDIATE</div>
              <h4>Freeze Accounts & Contact Your Bank</h4>
              <p>
                If you transferred money via UPI, net banking, or debit card, call your bank's 24/7 fraud helpline immediately. 
                Request a chargeback and freeze the compromised cards/accounts.
              </p>
            </div>

            <div className="emergency-card step-2">
              <div className="step-badge">STEP 2 • EVIDENCE</div>
              <h4>Preserve All Evidence</h4>
              <p>
                Take full screenshots of chat transcripts, phone numbers, UPI IDs, payment receipts, email headers, and the scammer's profile before they delete or unsend messages.
              </p>
            </div>

            <div className="emergency-card step-3">
              <div className="step-badge">STEP 3 • REPORT</div>
              <h4>File an Official Cybercrime Report</h4>
              <p>
                Report the fraud incident to official government authorities. In many jurisdictions, reporting within the first 2–4 hours drastically increases the chance of freezing the fraudster's account.
              </p>
            </div>
          </div>

          {/* Official Emergency Helplines Card */}
          <div className="official-helplines-card">
            <div className="helplines-header">
              <PhoneCall size={20} className="electric-icon" />
              <h4>Official Cybercrime Reporting Portals & Helplines</h4>
            </div>

            <div className="helplines-list">
              <div className="helpline-item">
                <div className="helpline-region">
                  <span className="country-badge">INDIA</span>
                  <strong>National Cyber Crime Reporting Portal</strong>
                </div>
                <div className="helpline-actions">
                  <span className="helpline-number">Dial <strong>1930</strong> (24/7 Toll-Free)</span>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    <span>cybercrime.gov.in</span>
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
