import React, { useState } from 'react';
import { Mail, CheckCircle2, XCircle, AlertTriangle, Search } from 'lucide-react';

export const EmailVerifier: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [claimedCompany, setClaimedCompany] = useState('');
  const [result, setResult] = useState<any | null>(null);

  const freeProviders = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
    'mail.com', 'zoho.com', 'protonmail.com', 'yandex.com', 'aol.com',
    'gmx.com', 'fastmail.com'
  ];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail.includes('@')) return;

    const [user, domain] = cleanEmail.split('@');
    const isFree = freeProviders.includes(domain);
    const companyClean = claimedCompany.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

    let verdict = 'normal';
    let risk = 'Low';
    let points: string[] = [];

    if (isFree) {
      if (companyClean.length > 2) {
        verdict = 'scam';
        risk = 'Critical';
        points.push(`Corporate impersonation: Claiming to represent "${claimedCompany}", but using a public @${domain} account.`);
      } else {
        verdict = 'warning';
        risk = 'Moderate';
        points.push(`Email uses a free webmail service (@${domain}). Official corporate recruiters use company domains.`);
      }
    } else {
      if (companyClean.length > 2) {
        if (domain.includes(companyClean)) {
          verdict = 'legit';
          risk = 'Safe';
          points.push(`The domain "@${domain}" contains the company name "${claimedCompany}".`);
        } else {
          verdict = 'warning';
          risk = 'Caution';
          points.push(`Domain "@${domain}" does not match the company name "${claimedCompany}". Inspect if this is an external recruiting agency or an impersonation domain.`);
        }
      } else {
        verdict = 'legit';
        risk = 'Normal';
        points.push(`Email uses a custom enterprise domain (@${domain}).`);
      }
    }

    // Check for hyphens or deceptive additions like -careers, -jobs, -hr
    if (domain.includes('-careers') || domain.includes('-jobs') || domain.includes('-hr') || domain.includes('-recruiting')) {
      points.push(`⚠️ Suspicious domain pattern: "${domain}" contains hyphenated recruitment terms commonly used by phishing domains (e.g., google-jobs.com instead of google.com).`);
      if (verdict === 'legit') verdict = 'warning';
    }

    setResult({
      email: cleanEmail,
      user,
      domain,
      verdict,
      risk,
      points,
    });
  };

  return (
    <div className="verifier-container">
      <div className="verifier-header">
        <Mail className="section-icon text-indigo" size={26} />
        <div>
          <h2>Recruiter Email & Domain Authenticity Checker</h2>
          <p>Quickly verify if an email address belongs to a legitimate corporate domain or a free webmail impersonator.</p>
        </div>
      </div>

      <form onSubmit={handleVerify} className="verifier-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Recruiter Email Address</label>
            <input
              type="email"
              placeholder="e.g. google.careers.hr@gmail.com"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Claimed Company Name</label>
            <input
              type="text"
              placeholder="e.g. Google, Amazon, Microsoft"
              value={claimedCompany}
              onChange={e => setClaimedCompany(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="scan-submit-btn">
          <Search size={18} />
          <span>Verify Email Domain</span>
        </button>
      </form>

      {result && (
        <div className={`verifier-result-box ver-result-${result.verdict} animate-fade-in`}>
          <div className="ver-status-row">
            {result.verdict === 'scam' && <XCircle size={28} className="text-red" />}
            {result.verdict === 'warning' && <AlertTriangle size={28} className="text-orange" />}
            {result.verdict === 'legit' && <CheckCircle2 size={28} className="text-green" />}
            <div>
              <div className="ver-badge">Risk Assessment: {result.risk}</div>
              <h3>Domain Analysis for @{result.domain}</h3>
            </div>
          </div>

          <div className="ver-details-list">
            {result.points.map((pt: string, idx: number) => (
              <div key={idx} className="ver-detail-item">
                <span>{pt}</span>
              </div>
            ))}
          </div>

          <div className="ver-guidance">
            <strong>Pro Tip:</strong> Genuine HR recruiters from Fortune 500 or established firms never email from Gmail, Yahoo, or ProtonMail. Always check MX records and company careers pages directly.
          </div>
        </div>
      )}
    </div>
  );
};
