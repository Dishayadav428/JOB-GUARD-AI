import React, { useState } from 'react';
import { 
  MessageChannel, 
  MessageScanResult, 
  HighlightedPhrase 
} from '../types';
import { analyzeRecruiterMessage } from '../detector';
import { 
  MessageSquare, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Shield, 
  Copy, 
  Check, 
  Info, 
  Calculator, 
  Search,
  AlertOctagon
} from 'lucide-react';

interface Props {
  onScanComplete?: (result: MessageScanResult) => void;
}

const MESSAGE_PRESETS: { label: string; channel: MessageChannel; tag: string; text: string }[] = [
  {
    label: 'Telegram Task & Deposit Scam',
    channel: 'telegram',
    tag: 'Critical Scam',
    text: `Hello dear! I am HR Stephanie from Global Media. We found your profile on job portal. 
We offer simple part time online work from home! Earn ₹3,000 to ₹5,000 daily payout by rating hotels and like youtube videos. 
Only 3 slots left today, hurry up! Deposit ₹1,500 refundable deposit to activate your employee kit. 
Connect with manager immediately at: t.me/official_hr_task_admin`
  },
  {
    label: 'Fake Amazon HR (Email / Google Form)',
    channel: 'email',
    tag: 'High Risk',
    text: `Subject: Urgent Job Offer - Amazon Summer Intern 2026
From: amazon.careers.recruiter.in@gmail.com

Congratulations! Selected immediately for Amazon Software Developer Intern. 
Stipend: ₹85,000/month. Offer expires in 24 hours if not accepted. 
Send your resume and send Aadhaar card, bank details for payroll immediately. 
Fill Google Form to confirm seat: forms.gle/amazon_intern_kyc`
  },
  {
    label: 'SMS Urgent Job with Shortlink',
    channel: 'sms',
    tag: 'High Risk',
    text: `URGENT REQUIREMENT: Daily income ₹4,000 to ₹8,000. Easy typing work from mobile 2-3 hours daily. No skills needed. Selected candidates get immediate joining bonus. Limited seats left! Apply now: bit.ly/easy-job-apply-now`
  },
  {
    label: 'Genuine Recruiter Message',
    channel: 'linkedin',
    tag: 'Likely Safe',
    text: `Hi Alex, I came across your GitHub and LinkedIn profile and was impressed by your React projects. 
We have an open Junior Frontend Developer position at Acme Cloud Technologies. 
Would you be open to an initial 20-minute video conversation this Thursday? 
You can view the full role description and apply directly on our corporate careers portal: https://acmecloud.io/careers/job-frontend-102. 
Best regards, Sarah Jenkins, Talent Acquisition Lead.`
  }
];

export const MessageScanner: React.FC<Props> = ({ onScanComplete }) => {
  const [channel, setChannel] = useState<MessageChannel>('whatsapp');
  const [messageText, setMessageText] = useState('');
  const [scanResult, setScanResult] = useState<MessageScanResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) {
      setValidationError('Please paste or type a recruiter message to scan.');
      return;
    }
    if (messageText.trim().length < 15) {
      setValidationError('Message is too short. Please provide at least 15 characters of the message.');
      return;
    }

    setValidationError(null);
    const result = analyzeRecruiterMessage(messageText, channel);
    setScanResult(result);
    if (onScanComplete) {
      onScanComplete(result);
    }
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const loadPreset = (preset: typeof MESSAGE_PRESETS[0]) => {
    setChannel(preset.channel);
    setMessageText(preset.text);
    setValidationError(null);
    setScanResult(null);
  };

  const handleCopyReport = async () => {
    if (!scanResult) return;
    const reportText = `=== JobGuard Recruiter Message Scan Report ===
Channel: ${scanResult.channel.toUpperCase()}
Risk Score: ${scanResult.score}/100 (${scanResult.riskLabel.toUpperCase()} RISK)
Summary: ${scanResult.summary}

--- Detected Warning Triggers (${scanResult.highlightedPhrases.length}) ---
${scanResult.highlightedPhrases.map(p => `• [${p.categoryLabel} | +${p.points} pts] "${p.text}": ${p.reason}`).join('\n')}

--- Explainable Scoring Breakdown ---
${scanResult.scoreBreakdown.map(sb => `• [${sb.category}] ${sb.ruleName}: +${sb.points} pts`).join('\n')}
Total Calculated Score: ${scanResult.score}/100

--- Safety Advice ---
${scanResult.safetyAdvice.map((sa, i) => `${i + 1}. ${sa}`).join('\n')}

--- Disclaimer ---
${scanResult.disclaimer}
==============================================`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(reportText);
      } else {
        throw new Error('Fallback needed');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = reportText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper to render message with highlighted spans
  const renderHighlightedMessage = (text: string, phrases: HighlightedPhrase[]) => {
    if (!phrases || phrases.length === 0) {
      return <span>{text}</span>;
    }

    // Build regex to match all phrases safely
    const escapedPhrases = phrases.map(p => p.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const combinedRegex = new RegExp(`(${escapedPhrases.join('|')})`, 'gi');

    const parts = text.split(combinedRegex);

    return parts.map((part, index) => {
      const matchedPhrase = phrases.find(p => p.text.toLowerCase() === part.toLowerCase());
      if (matchedPhrase) {
        let badgeColorClass = 'mark-other';
        if (matchedPhrase.category === 'advance_fees') badgeColorClass = 'mark-advance-fee';
        else if (matchedPhrase.category === 'unrealistic_salary') badgeColorClass = 'mark-salary';
        else if (matchedPhrase.category === 'urgent_pressure') badgeColorClass = 'mark-urgency';
        else if (matchedPhrase.category === 'suspicious_link') badgeColorClass = 'mark-link';
        else if (matchedPhrase.category === 'sensitive_data') badgeColorClass = 'mark-data';

        return (
          <mark 
            key={index} 
            className={`phrase-mark ${badgeColorClass}`}
            title={`[+${matchedPhrase.points} pts] ${matchedPhrase.categoryLabel}: ${matchedPhrase.reason}`}
          >
            {part}
            <span className="mark-badge-chip">+{matchedPhrase.points} pts</span>
          </mark>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const getRiskMeta = (label: 'Low' | 'Medium' | 'High') => {
    switch (label) {
      case 'High':
        return {
          text: '#f43f5e',
          bg: 'rgba(244, 63, 94, 0.12)',
          border: 'rgba(244, 63, 94, 0.4)',
          badgeText: 'HIGH RISK MESSAGE',
          badgeClass: 'badge-risk-high',
          icon: <ShieldAlert size={26} className="text-red" />
        };
      case 'Medium':
        return {
          text: '#fbbf24',
          bg: 'rgba(251, 191, 36, 0.12)',
          border: 'rgba(251, 191, 36, 0.4)',
          badgeText: 'MEDIUM RISK MESSAGE',
          badgeClass: 'badge-risk-medium',
          icon: <Shield size={26} className="text-orange" />
        };
      case 'Low':
      default:
        return {
          text: '#10b981',
          bg: 'rgba(16, 185, 129, 0.12)',
          border: 'rgba(16, 185, 129, 0.4)',
          badgeText: 'LOW RISK MESSAGE',
          badgeClass: 'badge-risk-low',
          icon: <ShieldCheck size={26} className="text-green" />
        };
    }
  };

  return (
    <div className="message-scanner-wrapper animate-fade-in">
      {/* Header Banner */}
      <div className="msg-scanner-header">
        <div className="header-icon-badge">
          <MessageSquare size={26} className="electric-icon" />
        </div>
        <div>
          <h2>Recruiter Message Scanner</h2>
          <p>
            Paste cold WhatsApp invites, emails, SMS texts, or LinkedIn InMails to automatically 
            detect advance fees, unrealistic salaries, urgency, suspicious links, and sensitive KYC demands with in-text phrase highlighting.
          </p>
        </div>
      </div>

      {/* Preset Demo Selection */}
      <div className="preset-card">
        <div className="preset-header">
          <Sparkles size={16} className="electric-icon" />
          <span>Quick Demo Message Presets:</span>
        </div>
        <div className="preset-buttons">
          {MESSAGE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              className="preset-chip"
              onClick={() => loadPreset(preset)}
            >
              <span className="preset-name">{preset.label}</span>
              <span className={`chip-tag ${preset.tag.includes('Scam') ? 'tag-danger' : preset.tag.includes('High') ? 'tag-warn' : 'tag-safe'}`}>
                {preset.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Message Scanner Form */}
      <form onSubmit={handleScan} className="msg-scanner-form">
        {/* Channel Selector */}
        <div className="channel-select-group">
          <label className="channel-label">Message Received Via:</label>
          <div className="channel-pills">
            {(['whatsapp', 'email', 'sms', 'linkedin', 'telegram', 'other'] as MessageChannel[]).map(ch => (
              <button
                key={ch}
                type="button"
                className={`channel-pill-btn ${channel === ch ? 'active' : ''}`}
                onClick={() => setChannel(ch)}
              >
                <span>{ch.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="form-group full-width">
          <label htmlFor="messageText">
            <span>Paste Recruiter Message Text <span className="required-star">*</span></span>
          </label>
          <textarea
            id="messageText"
            rows={6}
            placeholder="Paste the WhatsApp chat, Telegram invite, email text, or SMS here to highlight suspicious phrases and compute an explainable scam risk score..."
            value={messageText}
            onChange={e => {
              setMessageText(e.target.value);
              if (validationError) setValidationError(null);
            }}
            className={validationError ? 'input-error' : ''}
          />
          <div className="textarea-footer">
            <span className="char-count">{messageText.length} characters</span>
            {validationError && (
              <span className="error-text">
                <AlertOctagon size={13} /> {validationError}
              </span>
            )}
          </div>
        </div>

        <button type="submit" className="scan-submit-btn">
          <Search size={18} />
          <span>Scan Recruiter Message for Fraud Markers</span>
        </button>
      </form>

      {/* SCAN RESULTS DISPLAY */}
      {scanResult && (
        <div className="msg-result-card animate-fade-in">
          {(() => {
            const riskMeta = getRiskMeta(scanResult.riskLabel);
            return (
              <>
                {/* Result Top Gauge Header */}
                <div 
                  className="result-header" 
                  style={{ borderColor: riskMeta.border, backgroundColor: riskMeta.bg }}
                >
                  <div className="score-meter-wrap">
                    <div className="score-circle" style={{ borderColor: riskMeta.text }}>
                      <span className="score-num" style={{ color: riskMeta.text }}>{scanResult.score}</span>
                      <span className="score-label">/ 100 Risk</span>
                    </div>
                    <div className="score-info">
                      <div className="risk-label-row">
                        <span className={`risk-pill-label ${riskMeta.badgeClass}`}>
                          {riskMeta.badgeText}
                        </span>
                        <span className="score-subtext">Channel: {scanResult.channel.toUpperCase()}</span>
                      </div>
                      <p className="result-summary">{scanResult.summary}</p>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button className="secondary-btn" onClick={handleCopyReport}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copied ? 'Report Copied!' : 'Copy Analysis'}</span>
                    </button>
                    <button 
                      className="primary-btn" 
                      onClick={() => {
                        setScanResult(null);
                        setMessageText('');
                      }}
                    >
                      Scan Another
                    </button>
                  </div>
                </div>

                {/* VISUAL PHRASE HIGHLIGHTER CONTAINER */}
                <div className="phrase-highlighter-card">
                  <div className="highlighter-header">
                    <h4>Pasted Message with Highlighted Red Flags</h4>
                    <span className="highlighter-meta">{scanResult.highlightedPhrases.length} Trigger Phrases Flagged</span>
                  </div>

                  {/* Highlights Legend */}
                  <div className="highlight-legend">
                    <span className="legend-item"><span className="legend-dot dot-fee"></span> Advance Fee</span>
                    <span className="legend-item"><span className="legend-dot dot-salary"></span> Unrealistic Salary</span>
                    <span className="legend-item"><span className="legend-dot dot-urgency"></span> Urgent Pressure</span>
                    <span className="legend-item"><span className="legend-dot dot-link"></span> Suspicious Link</span>
                    <span className="legend-item"><span className="legend-dot dot-data"></span> Sensitive Data</span>
                  </div>

                  {/* Highlighted Text Box */}
                  <div className="highlighted-text-box">
                    {renderHighlightedMessage(scanResult.originalMessage, scanResult.highlightedPhrases)}
                  </div>
                </div>

                {/* EXPLAINABLE SCORING BREAKDOWN */}
                <div className="explainable-score-card">
                  <div className="explainable-header">
                    <div className="explainable-title-row">
                      <Calculator size={20} className="electric-icon" />
                      <h4>Explainable Scoring Formula</h4>
                    </div>
                    <span className="formula-tag">Deterministic Sum: {scanResult.score}/100</span>
                  </div>
                  <p className="explainable-desc">
                    Unlike black-box algorithms, JobGuard's score is transparently calculated from explicit point contributions:
                  </p>

                  <div className="score-breakdown-table">
                    <div className="breakdown-table-header">
                      <span>Category</span>
                      <span>Trigger Pattern</span>
                      <span>Contribution</span>
                    </div>
                    {scanResult.scoreBreakdown.length === 0 ? (
                      <div className="breakdown-empty-row">
                        <span>No suspicious triggers detected. Score remains at baseline (0 pts).</span>
                      </div>
                    ) : (
                      scanResult.scoreBreakdown.map((item, idx) => (
                        <div key={idx} className="breakdown-table-row">
                          <span className="breakdown-col-category">{item.category}</span>
                          <span className="breakdown-col-rule">
                            <strong>{item.ruleName}</strong>
                            <small>{item.description}</small>
                          </span>
                          <span className="breakdown-col-points text-red">+{item.points} pts</span>
                        </div>
                      ))
                    )}
                    <div className="breakdown-table-footer">
                      <span>Total Calculated Score</span>
                      <span>Sum of weights capped at 100</span>
                      <strong className="text-electric">{scanResult.score} / 100</strong>
                    </div>
                  </div>
                </div>

                {/* ACTIONABLE SAFETY ADVICE */}
                <div className="recommendation-box">
                  <div className="section-title-row">
                    <ShieldCheck size={20} className="electric-icon" />
                    <h3>Safety Advice & Recommended Next Steps</h3>
                  </div>
                  <ul className="recommendations-list">
                    {scanResult.safetyAdvice.map((advice, i) => (
                      <li key={i} className="rec-item">
                        <span className="rec-number">{i + 1}</span>
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DISCLAIMER NOTICE */}
                <div className="disclaimer-alert-card">
                  <Info size={18} className="electric-icon flex-shrink-0" />
                  <div>
                    <strong>Evaluation Disclaimer</strong>
                    <p>{scanResult.disclaimer}</p>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
