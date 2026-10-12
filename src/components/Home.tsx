import React from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Search, 
  Lock, 
  FileCheck, 
  ArrowRight, 
  Terminal,
  Zap,
  EyeOff
} from 'lucide-react';

interface HomeProps {
  onStartScan: () => void;
  onGoToCompanyCheck: () => void;
  onGoToSafetyTips: () => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onStartScan, 
  onGoToCompanyCheck, 
  onGoToSafetyTips 
}) => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-cyber">
        <div className="cyber-glow-bg"></div>

        <div className="hero-badge">
          <span className="pulsing-dot"></span>
          <Terminal size={14} className="electric-icon" />
          <span>CYBERSECURITY DEFENSE • LOCAL HEURISTIC ENGINE</span>
        </div>

        <h1 className="hero-headline">
          Your Career Deserves <span className="electric-gradient-text">Real Opportunities</span>
        </h1>

        <p className="hero-subtitle">
          Unmask fraudulent internships, upfront deposit schemes, lookalike corporate domains, 
          and Telegram task scams with real-time cybersecurity analysis before you share sensitive documents or pay fees.
        </p>

        <div className="hero-cta-group">
          <button className="btn-electric-primary" onClick={onStartScan}>
            <ShieldCheck size={20} />
            <span>Scan a Job Offer</span>
            <ArrowRight size={18} className="cta-arrow" />
          </button>

          <button className="btn-navy-secondary" onClick={onGoToCompanyCheck}>
            <Search size={18} />
            <span>Verify Recruiter Domain</span>
          </button>
        </div>

        {/* Live Cyber Metrics Bar */}
        <div className="cyber-metrics-grid">
          <div className="metric-card">
            <div className="metric-val electric-text">100%</div>
            <div className="metric-label">Client-Side Privacy</div>
            <div className="metric-sub">Zero data leaves your browser</div>
          </div>
          <div className="metric-card">
            <div className="metric-val electric-text">&lt; 1s</div>
            <div className="metric-label">Analysis Speed</div>
            <div className="metric-sub">Instant fraud probability score</div>
          </div>
          <div className="metric-card">
            <div className="metric-val electric-text">8+</div>
            <div className="metric-label">Threat Vectors</div>
            <div className="metric-sub">Fee, domain, channel & urgency check</div>
          </div>
          <div className="metric-card">
            <div className="metric-val electric-text">$0 / ₹0</div>
            <div className="metric-label">Free Forever</div>
            <div className="metric-sub">No paywalls or paid API keys</div>
          </div>
        </div>
      </section>

      {/* Interactive Threat Radar Simulation Card */}
      <section className="threat-preview-section">
        <div className="threat-preview-card">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="terminal-title">
              <Shield size={14} className="electric-icon" />
              <span>JobGuard Real-Time Heuristic Scanner Demo</span>
            </div>
            <span className="terminal-status">LIVE MONITOR</span>
          </div>

          <div className="terminal-body">
            <div className="radar-col">
              <div className="incoming-sample-box">
                <div className="sample-tag">Intercepted Message Analysis</div>
                <div className="sample-bubble">
                  <p className="sample-sender">From: <strong>recruiter-amazon-india@gmail.com</strong> (Telegram)</p>
                  <p className="sample-text">
                    "Congratulations! Selected for Part-time Product Review Executive. Earn ₹4,500 daily. 
                    Deposit ₹1,200 refundable registration fee before 5 PM to receive company credentials."
                  </p>
                </div>
              </div>
            </div>

            <div className="radar-col radar-analysis">
              <div className="radar-score-badge">
                <span className="score-high-risk">CRITICAL SCAM DETECTED: 95% RISK</span>
              </div>
              <ul className="radar-findings">
                <li>
                  <span className="threat-indicator red"></span>
                  <strong>Upfront Fee Demand:</strong> Employers never charge registration/kit fees.
                </li>
                <li>
                  <span className="threat-indicator red"></span>
                  <strong>Free Webmail Impersonation:</strong> Amazon does not hire via public @gmail.com.
                </li>
                <li>
                  <span className="threat-indicator yellow"></span>
                  <strong>High Urgency Pressure:</strong> Artificial deadlines force hasty money transfers.
                </li>
              </ul>
              <button className="radar-test-btn" onClick={onStartScan}>
                Test Your Own Offer Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cyber Security Pillars */}
      <section className="features-grid-section">
        <div className="section-heading-center">
          <span className="subheading-cyber">ENTERPRISE-GRADE VERIFICATION</span>
          <h2>How JobGuard Shields Job Seekers</h2>
          <p>Multi-layered rule-based evaluation modeled after corporate cyber threat intelligence.</p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Lock size={24} className="electric-icon" />
            </div>
            <h3>Financial Extortion Detection</h3>
            <p>
              Pinpoints veiled registration fees, "training certificate" requirements, refundable security deposits, and counterfeit equipment check scams.
            </p>
            <div className="pillar-link" onClick={onStartScan}>
              <span>Scan job posting</span>
              <ArrowRight size={14} />
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Search size={24} className="electric-icon" />
            </div>
            <h3>Corporate Domain Intelligence</h3>
            <p>
              Identifies lookalike phishing domains, typosquatting, and deceptive recruitment outreach conducted from free webmail providers.
            </p>
            <div className="pillar-link" onClick={onGoToCompanyCheck}>
              <span>Check recruiter domain</span>
              <ArrowRight size={14} />
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <FileCheck size={24} className="electric-icon" />
            </div>
            <h3>Offer Letter Audit Checklist</h3>
            <p>
              Interactive safety verification evaluating interview rigor, direct communication channels, salary realism, and formal offer legitimacy.
            </p>
            <div className="pillar-link" onClick={onGoToSafetyTips}>
              <span>Review safety checklist</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Local Privacy Banner */}
      <section className="privacy-banner">
        <div className="privacy-content">
          <div className="privacy-icon">
            <EyeOff size={32} className="electric-icon" />
          </div>
          <div>
            <h3>Zero Cloud Uploads • 100% On-Device Execution</h3>
            <p>
              Job offers often contain sensitive contact details, personal addresses, or compensation data. 
              JobGuard runs entirely in your client browser memory—no logs, no databases, no external data brokers.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bottom-cta-cyber">
        <div className="bottom-cta-box">
          <Zap size={32} className="electric-icon mb-2" />
          <h2>Got an Offer or Interview Message?</h2>
          <p>Don't risk your money, identity, or peace of mind. Scan it in seconds before replying.</p>
          <button className="btn-electric-primary lg" onClick={onStartScan}>
            <ShieldCheck size={22} />
            <span>Scan a Job Offer Now</span>
          </button>
        </div>
      </section>
    </div>
  );
};
