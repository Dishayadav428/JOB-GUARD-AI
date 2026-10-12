import React, { useState } from 'react';
import { AnalysisResult as AnalysisResultType } from '../types';
import { 
  AlertOctagon, 
  CheckCircle, 
  Copy, 
  Check, 
  Sparkles, 
  HelpCircle, 
  Info,
  ShieldAlert,
  ShieldCheck,
  Shield
} from 'lucide-react';

interface Props {
  result: AnalysisResultType;
  onReset: () => void;
}

export const AnalysisResult: React.FC<Props> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  // Deterministic styling based on Low / Medium / High
  const getRiskMeta = (label: 'Low' | 'Medium' | 'High') => {
    switch (label) {
      case 'High':
        return {
          text: '#f43f5e',
          bg: 'rgba(244, 63, 94, 0.12)',
          border: 'rgba(244, 63, 94, 0.4)',
          badgeText: 'HIGH RISK',
          badgeClass: 'badge-risk-high',
          icon: <ShieldAlert size={28} className="text-red" />
        };
      case 'Medium':
        return {
          text: '#fbbf24',
          bg: 'rgba(251, 191, 36, 0.12)',
          border: 'rgba(251, 191, 36, 0.4)',
          badgeText: 'MEDIUM RISK',
          badgeClass: 'badge-risk-medium',
          icon: <Shield size={28} className="text-orange" />
        };
      case 'Low':
      default:
        return {
          text: '#10b981',
          bg: 'rgba(16, 185, 129, 0.12)',
          border: 'rgba(16, 185, 129, 0.4)',
          badgeText: 'LOW RISK',
          badgeClass: 'badge-risk-low',
          icon: <ShieldCheck size={28} className="text-green" />
        };
    }
  };

  const riskMeta = getRiskMeta(result.riskLabel);

  const handleCopyReport = async () => {
    const reportText = `=== JobGuard Heuristic Risk Analysis ===
Risk Score: ${result.score}/100
Risk Label: ${result.riskLabel} Risk
Summary: ${result.summary}

--- Detected Warning Signs (${result.warningSigns.length}) ---
${result.warningSigns.length === 0 ? 'None detected.' : result.warningSigns.map(ws => `• [${ws.categoryLabel} | +${ws.points} pts] ${ws.title}: ${ws.description}`).join('\n')}

--- Positive Signals (${result.greenFlags.length}) ---
${result.greenFlags.length === 0 ? 'None verified.' : result.greenFlags.map(gf => `• ${gf.title}: ${gf.description}`).join('\n')}

--- Safety Advice ---
${result.safetyAdvice.map((sa, i) => `${i + 1}. ${sa}`).join('\n')}

--- Disclaimer ---
${result.disclaimer}
=======================================`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(reportText);
      } else {
        throw new Error('Clipboard API not available');
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

  return (
    <div className="analysis-card animate-fade-in">
      {/* Top Header Card */}
      <div 
        className="result-header" 
        style={{ borderColor: riskMeta.border, backgroundColor: riskMeta.bg }}
      >
        <div className="score-meter-wrap">
          <div className="score-circle" style={{ borderColor: riskMeta.text }}>
            <span className="score-num" style={{ color: riskMeta.text }}>{result.score}</span>
            <span className="score-label">/ 100 Risk</span>
          </div>
          <div className="score-info">
            <div className="risk-label-row">
              <span className={`risk-pill-label ${riskMeta.badgeClass}`}>
                {riskMeta.badgeText}
              </span>
              <span className="score-subtext">Deterministic Rule Engine</span>
            </div>
            <p className="result-summary">{result.summary}</p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="secondary-btn" onClick={handleCopyReport}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Report Copied!' : 'Copy Analysis'}</span>
          </button>
          <button className="primary-btn" onClick={onReset}>
            Analyze Another Offer
          </button>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="disclaimer-alert-card">
        <Info size={20} className="electric-icon flex-shrink-0" />
        <div>
          <strong>Important Evaluation Notice</strong>
          <p>{result.disclaimer}</p>
        </div>
      </div>

      {/* Detected Warning Signs */}
      <div className="result-section">
        <div className="section-title-row">
          <AlertOctagon className="section-icon text-red" size={22} />
          <h3>Detected Warning Signs ({result.warningSigns.length})</h3>
        </div>

        {result.warningSigns.length === 0 ? (
          <div className="empty-flag-box safe">
            <CheckCircle size={20} className="text-green" />
            <span>No transparent warning rules were triggered for this offer.</span>
          </div>
        ) : (
          <div className="flags-list">
            {result.warningSigns.map(sign => (
              <div key={sign.id} className={`flag-card flag-${sign.severity}`}>
                <div className="flag-top">
                  <span className={`severity-badge sev-${sign.severity}`}>
                    +{sign.points} PTS
                  </span>
                  <span className="flag-category">{sign.categoryLabel}</span>
                </div>
                <h4 className="flag-title">{sign.title}</h4>
                <p className="flag-desc">{sign.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Positive Verification Signals */}
      <div className="result-section">
        <div className="section-title-row">
          <CheckCircle className="section-icon text-green" size={22} />
          <h3>Standard / Positive Hiring Signals ({result.greenFlags.length})</h3>
        </div>

        {result.greenFlags.length === 0 ? (
          <div className="empty-flag-box info">
            <HelpCircle size={20} className="text-muted" />
            <span>No explicit positive verification signals were identified. Double-check official corporate communication channels.</span>
          </div>
        ) : (
          <div className="flags-list">
            {result.greenFlags.map((flag, idx) => (
              <div key={idx} className="flag-card flag-green">
                <h4 className="flag-title text-green">{flag.title}</h4>
                <p className="flag-desc">{flag.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actionable Safety Advice */}
      <div className="result-section recommendation-box">
        <div className="section-title-row">
          <Sparkles className="section-icon electric-icon" size={22} />
          <h3>Safety Advice & Recommended Next Steps</h3>
        </div>
        <ul className="recommendations-list">
          {result.safetyAdvice.map((advice, i) => (
            <li key={i} className="rec-item">
              <span className="rec-number">{i + 1}</span>
              <span>{advice}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
