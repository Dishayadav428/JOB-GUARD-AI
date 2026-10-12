import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  Mail, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  Info,
  CheckSquare,
  Square,
  Sparkles,
  Briefcase,
  PhoneCall,
  CreditCard
} from 'lucide-react';

interface CompanyCheckState {
  companyName: string;
  websiteDomain: string;
  recruiterEmail: string;
}

const DEMO_PRESETS: { label: string; tag: string; data: CompanyCheckState }[] = [
  {
    label: 'Verified Corporate Match',
    tag: 'Safe Match',
    data: {
      companyName: 'Microsoft Corporation',
      websiteDomain: 'microsoft.com',
      recruiterEmail: 'careers@microsoft.com'
    }
  },
  {
    label: 'Enterprise Claim with Gmail',
    tag: 'Impersonation Risk',
    data: {
      companyName: 'Google',
      websiteDomain: 'google.com',
      recruiterEmail: 'google.talent.acquisition@gmail.com'
    }
  },
  {
    label: 'Lookalike Typosquatting Domain',
    tag: 'Phishing Risk',
    data: {
      companyName: 'Amazon',
      websiteDomain: 'amazon.com',
      recruiterEmail: 'hr@amazon-careers-portal.com'
    }
  }
];

const FREE_WEBMAIL_PROVIDERS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'mail.com', 'zoho.com', 'protonmail.com', 'yandex.com', 'aol.com',
  'gmx.com', 'fastmail.com'
];

interface ChecklistState {
  careersPageVerified: boolean;
  jobIdMatches: boolean;
  emailDomainMatches: boolean;
  notFreeWebmail: boolean;
  physicalAddressVerified: boolean;
  linkedinPageActive: boolean;
  noUpfrontFeeDemanded: boolean;
  noEquipmentPaymentDemanded: boolean;
}

export const CompanyCheck: React.FC = () => {
  const [inputs, setInputs] = useState<CompanyCheckState>({
    companyName: '',
    websiteDomain: '',
    recruiterEmail: ''
  });

  const [checklist, setChecklist] = useState<ChecklistState>({
    careersPageVerified: false,
    jobIdMatches: false,
    emailDomainMatches: false,
    notFreeWebmail: false,
    physicalAddressVerified: false,
    linkedinPageActive: false,
    noUpfrontFeeDemanded: false,
    noEquipmentPaymentDemanded: false,
  });

  // Extract clean domain from URL or domain string
  const cleanDomainString = (raw: string): string => {
    return raw
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0];
  };

  const handleInputChange = (field: keyof CompanyCheckState, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const loadPreset = (preset: CompanyCheckState) => {
    setInputs({ ...preset });
    // Initialize auto-checks based on preset
    const cleanWeb = cleanDomainString(preset.websiteDomain);
    const emailDom = preset.recruiterEmail.includes('@') ? preset.recruiterEmail.split('@')[1].toLowerCase() : '';
    const isFree = FREE_WEBMAIL_PROVIDERS.includes(emailDom);
    const isExactMatch = cleanWeb.length > 0 && emailDom === cleanWeb;

    setChecklist({
      careersPageVerified: cleanWeb.length > 0,
      jobIdMatches: false,
      emailDomainMatches: isExactMatch,
      notFreeWebmail: !isFree,
      physicalAddressVerified: false,
      linkedinPageActive: false,
      noUpfrontFeeDemanded: true,
      noEquipmentPaymentDemanded: true,
    });
  };

  const handleRunCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.companyName.trim() && !inputs.websiteDomain.trim() && !inputs.recruiterEmail.trim()) {
      return;
    }

    const cleanWeb = cleanDomainString(inputs.websiteDomain);
    const emailDom = inputs.recruiterEmail.includes('@') ? inputs.recruiterEmail.split('@')[1].toLowerCase() : '';
    const isFree = FREE_WEBMAIL_PROVIDERS.includes(emailDom);
    const isExactMatch = cleanWeb.length > 0 && emailDom === cleanWeb;

    setChecklist(prev => ({
      ...prev,
      emailDomainMatches: isExactMatch,
      notFreeWebmail: emailDom ? !isFree : false,
      careersPageVerified: cleanWeb.length > 0 ? prev.careersPageVerified : false
    }));
  };

  const toggleChecklistItem = (key: keyof ChecklistState) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Domain Consistency Insights
  const getDomainInsight = () => {
    const webDomain = cleanDomainString(inputs.websiteDomain);
    const emailDom = inputs.recruiterEmail.includes('@') 
      ? inputs.recruiterEmail.split('@')[1].toLowerCase().trim() 
      : '';

    if (!webDomain && !emailDom) return null;

    if (emailDom) {
      if (FREE_WEBMAIL_PROVIDERS.includes(emailDom)) {
        return {
          status: 'danger',
          title: 'Public Webmail Risk Detected',
          message: `The recruiter email is from a public provider (@${emailDom}). Legitimate corporate recruiters use institutional domains matching the company name.`,
          icon: <XCircle size={22} className="text-red" />
        };
      }

      if (webDomain) {
        if (webDomain === emailDom) {
          return {
            status: 'safe',
            title: 'Exact Email-Domain Consistency',
            message: `The recruiter's email domain (@${emailDom}) exactly matches the stated website (${webDomain}).`,
            icon: <CheckCircle2 size={22} className="text-green" />
          };
        }

        // Check for hyphenated lookalikes (e.g., google-careers.com)
        if (emailDom.includes('-') && (emailDom.includes('job') || emailDom.includes('career') || emailDom.includes('hr') || emailDom.includes('recruit'))) {
          return {
            status: 'danger',
            title: 'Potential Typosquatted / Lookalike Domain',
            message: `The email domain "@${emailDom}" contains recruitment keywords with hyphens, differing from the official website "${webDomain}". This is a common phishing tactic.`,
            icon: <AlertTriangle size={22} className="text-red" />
          };
        }

        return {
          status: 'warning',
          title: 'Email Domain & Website Mismatch',
          message: `Recruiter emails from "@${emailDom}", but official website is "${webDomain}". Verify if they represent a legitimate third-party staffing agency.`,
          icon: <AlertTriangle size={22} className="text-orange" />
        };
      }
    }

    return null;
  };

  const domainInsight = getDomainInsight();

  // Calculate user verification completion score
  const totalItems = Object.keys(checklist).length;
  const verifiedCount = Object.values(checklist).filter(Boolean).length;
  const confidencePercent = Math.round((verifiedCount / totalItems) * 100);

  const cleanWebDomain = cleanDomainString(inputs.websiteDomain);

  return (
    <div className="company-check-wrapper animate-fade-in">
      {/* Header Banner */}
      <div className="company-check-header">
        <div className="header-icon-badge">
          <Building2 size={28} className="electric-icon" />
        </div>
        <div>
          <h2>Company & Recruiter Verification Check</h2>
          <p>
            Verify company authenticity, cross-reference recruiter email domains against corporate websites, 
            and complete the essential 4-pillar verification checklist.
          </p>
        </div>
      </div>

      {/* Mandatory Guidance Disclaimer Notice */}
      <div className="guidance-disclaimer-banner">
        <Info size={20} className="electric-icon flex-shrink-0" />
        <div className="disclaimer-text-wrap">
          <strong>Guidance Notice (Non-External Verification)</strong>
          <p>
            These checks and checklist items are provided as educational and investigative guidance only. 
            They do not constitute an external background investigation, legal accreditation, or third-party guarantee. 
            Always conduct direct verification through verified official company directories and government registries.
          </p>
        </div>
      </div>

      {/* Quick Demo Presets */}
      <div className="preset-card">
        <div className="preset-header">
          <Sparkles size={16} className="electric-icon" />
          <span>Quick Demo Presets:</span>
        </div>
        <div className="preset-buttons">
          {DEMO_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              className="preset-chip"
              onClick={() => loadPreset(preset.data)}
            >
              <span className="preset-name">{preset.label}</span>
              <span className={`chip-tag ${preset.tag.includes('Risk') ? 'tag-danger' : 'tag-safe'}`}>
                {preset.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleRunCheck} className="company-check-form">
        <div className="form-grid">
          {/* Company Name */}
          <div className="form-group">
            <label htmlFor="companyName">
              <Building2 size={16} className="electric-icon" />
              <span>Company Name</span>
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="e.g. Google, Microsoft, Apex Tech Solutions"
              value={inputs.companyName}
              onChange={e => handleInputChange('companyName', e.target.value)}
              required
            />
          </div>

          {/* Website Domain */}
          <div className="form-group">
            <label htmlFor="websiteDomain">
              <Globe size={16} className="electric-icon" />
              <span>Official Website Domain</span>
            </label>
            <input
              id="websiteDomain"
              type="text"
              placeholder="e.g. microsoft.com or https://company.com"
              value={inputs.websiteDomain}
              onChange={e => handleInputChange('websiteDomain', e.target.value)}
              required
            />
          </div>

          {/* Recruiter Email */}
          <div className="form-group">
            <label htmlFor="recruiterEmail">
              <Mail size={16} className="electric-icon" />
              <span>Recruiter Email</span>
            </label>
            <input
              id="recruiterEmail"
              type="email"
              placeholder="e.g. talent@microsoft.com or hr.team@gmail.com"
              value={inputs.recruiterEmail}
              onChange={e => handleInputChange('recruiterEmail', e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="scan-submit-btn">
          <Search size={18} />
          <span>Run Company Verification Check</span>
        </button>
      </form>

      {/* Automated Domain Consistency Result Box */}
      {domainInsight && (
        <div className={`domain-insight-card insight-${domainInsight.status} animate-fade-in`}>
          <div className="insight-top">
            {domainInsight.icon}
            <div>
              <span className="insight-badge">{domainInsight.status.toUpperCase()} SIGNAL</span>
              <h3>{domainInsight.title}</h3>
            </div>
          </div>
          <p className="insight-desc">{domainInsight.message}</p>
        </div>
      )}

      {/* Verification Checklist (4 Pillars) */}
      <div className="verification-checklist-container">
        <div className="checklist-top-meta">
          <div>
            <h3>Comprehensive Verification Checklist</h3>
            <p className="checklist-sub">Check off verified items as you cross-reference the company and offer details.</p>
          </div>
          <div className="confidence-meter-box">
            <span className="confidence-num">{confidencePercent}%</span>
            <span className="confidence-label">Verification Index</span>
          </div>
        </div>

        <div className="pillars-checklist-grid">
          {/* PILLAR 1: Official Careers Page */}
          <div className="pillar-check-box">
            <div className="pillar-check-header">
              <Briefcase size={18} className="electric-icon" />
              <h4>1. Official Careers Page</h4>
            </div>

            <div className="pillar-checklist-items">
              <div 
                className={`check-row ${checklist.careersPageVerified ? 'row-checked' : ''}`}
                onClick={() => toggleChecklistItem('careersPageVerified')}
              >
                <button type="button" className="check-btn">
                  {checklist.careersPageVerified ? <CheckSquare size={18} className="text-green" /> : <Square size={18} className="text-muted" />}
                </button>
                <div>
                  <span className="check-title">Company has an active, legitimate careers page</span>
                  <span className="check-hint">e.g. {cleanWebDomain ? `${cleanWebDomain}/careers` : 'company.com/careers'} with genuine job listings.</span>
                </div>
              </div>

              <div 
                className={`check-row ${checklist.jobIdMatches ? 'row-checked' : ''}`}
                onClick={() => toggleChecklistItem('jobIdMatches')}
              >
                <button type="button" className="check-btn">
                  {checklist.jobIdMatches ? <CheckSquare size={18} className="text-green" /> : <Square size={18} className="text-muted" />}
                </button>
                <div>
                  <span className="check-title">Job opening or Job ID is posted on the official portal</span>
                  <span className="check-hint">Search the exact title or requisition ID directly on their site.</span>
                </div>
              </div>
            </div>

            {cleanWebDomain && (
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(inputs.companyName + ' careers jobs official portal')}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="external-search-link"
              >
                <span>Search {inputs.companyName || 'Company'} Careers on Google</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* PILLAR 2: Email-Domain Consistency */}
          <div className="pillar-check-box">
            <div className="pillar-check-header">
              <Mail size={18} className="electric-icon" />
              <h4>2. Email-Domain Consistency</h4>
            </div>

            <div className="pillar-checklist-items">
              <div 
                className={`check-row ${checklist.emailDomainMatches ? 'row-checked' : ''}`}
                onClick={() => toggleChecklistItem('emailDomainMatches')}
              >
                <button type="button" className="check-btn">
                  {checklist.emailDomainMatches ? <CheckSquare size={18} className="text-green" /> : <Square size={18} className="text-muted" />}
                </button>
                <div>
                  <span className="check-title">Recruiter email domain strictly matches company website</span>
                  <span className="check-hint">Not a lookalike or typosquatted domain (e.g. google-hr.com vs google.com).</span>
                </div>
              </div>

              <div 
                className={`check-row ${checklist.notFreeWebmail ? 'row-checked' : ''}`}
                onClick={() => toggleChecklistItem('notFreeWebmail')}
              >
                <button type="button" className="check-btn">
                  {checklist.notFreeWebmail ? <CheckSquare size={18} className="text-green" /> : <Square size={18} className="text-muted" />}
                </button>
                <div>
                  <span className="check-title">No free webmail provider is used</span>
                  <span className="check-hint">Real talent acquisition never recruits from @gmail.com or @yahoo.com.</span>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 3: Company Contact Details */}
          <div className="pillar-check-box">
            <div className="pillar-check-header">
              <PhoneCall size={18} className="electric-icon" />
              <h4>3. Company Contact Details</h4>
            </div>

            <div className="pillar-checklist-items">
              <div 
                className={`check-row ${checklist.physicalAddressVerified ? 'row-checked' : ''}`}
                onClick={() => toggleChecklistItem('physicalAddressVerified')}
              >
                <button type="button" className="check-btn">
                  {checklist.physicalAddressVerified ? <CheckSquare size={18} className="text-green" /> : <Square size={18} className="text-muted" />}
                </button>
                <div>
                  <span className="check-title">Physical corporate address & landline switchboard verified</span>
                  <span className="check-hint">Verified via Google Maps, corporate registry, or official telephone directory.</span>
                </div>
              </div>

              <div 
                className={`check-row ${checklist.linkedinPageActive ? 'row-checked' : ''}`}
                onClick={() => toggleChecklistItem('linkedinPageActive')}
              >
                <button type="button" className="check-btn">
                  {checklist.linkedinPageActive ? <CheckSquare size={18} className="text-green" /> : <Square size={18} className="text-muted" />}
                </button>
                <div>
                  <span className="check-title">Active corporate LinkedIn page with verifiable staff</span>
                  <span className="check-hint">Check if the recruiter actually appears under the company's verified employee roster.</span>
                </div>
              </div>
            </div>

            {inputs.companyName && (
              <a 
                href={`https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(inputs.companyName)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="external-search-link"
              >
                <span>Find {inputs.companyName} on LinkedIn</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* PILLAR 4: Payment Requests & Policies */}
          <div className="pillar-check-box">
            <div className="pillar-check-header">
              <CreditCard size={18} className="electric-icon" />
              <h4>4. Payment Requests & Policies</h4>
            </div>

            <div className="pillar-checklist-items">
              <div 
                className={`check-row ${checklist.noUpfrontFeeDemanded ? 'row-checked' : ''}`}
                onClick={() => toggleChecklistItem('noUpfrontFeeDemanded')}
              >
                <button type="button" className="check-btn">
                  {checklist.noUpfrontFeeDemanded ? <CheckSquare size={18} className="text-green" /> : <Square size={18} className="text-muted" />}
                </button>
                <div>
                  <span className="check-title">Zero candidate fee policy confirmed</span>
                  <span className="check-hint">No requests for registration, training kits, certificate fees, or ID charges.</span>
                </div>
              </div>

              <div 
                className={`check-row ${checklist.noEquipmentPaymentDemanded ? 'row-checked' : ''}`}
                onClick={() => toggleChecklistItem('noEquipmentPaymentDemanded')}
              >
                <button type="button" className="check-btn">
                  {checklist.noEquipmentPaymentDemanded ? <CheckSquare size={18} className="text-green" /> : <Square size={18} className="text-muted" />}
                </button>
                <div>
                  <span className="check-title">Company provides equipment directly (No check / wire transfer)</span>
                  <span className="check-hint">Never deposit a check to purchase equipment from an "approved vendor".</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
