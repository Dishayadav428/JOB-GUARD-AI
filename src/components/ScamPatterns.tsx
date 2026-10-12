import React from 'react';
import { SCAM_PATTERNS } from '../mockData';
import { BookOpen, AlertCircle, ShieldAlert } from 'lucide-react';

export const ScamPatterns: React.FC = () => {
  return (
    <div className="patterns-container">
      <div className="patterns-header">
        <BookOpen className="section-icon text-indigo" size={26} />
        <div>
          <h2>Scam Pattern Encyclopedia</h2>
          <p>Common job and internship scams targeting students and job seekers worldwide.</p>
        </div>
      </div>

      <div className="patterns-grid">
        {SCAM_PATTERNS.map((pattern, idx) => (
          <div key={idx} className="pattern-card">
            <div className="pattern-top">
              <span className="pattern-badge">{pattern.badge}</span>
            </div>
            <h3 className="pattern-title">{pattern.title}</h3>
            <p className="pattern-desc">{pattern.description}</p>

            <div className="pattern-red-flags">
              <strong>Key Red Flags to Spot:</strong>
              <ul>
                {pattern.redFlags.map((rf, fIdx) => (
                  <li key={fIdx}>
                    <AlertCircle size={14} className="text-red inline-icon" />
                    <span>{rf}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="emergency-note">
        <ShieldAlert size={24} className="text-red" />
        <div>
          <h4>Have you already paid money or shared confidential credentials?</h4>
          <p>
            If you transferred funds via UPI, bank transfer, or crypto, immediately report to your bank and file an official complaint with your local cybercrime portal (in India: <strong>cybercrime.gov.in / dial 1930</strong>; in the US: <strong>ic3.gov</strong>; in the UK: <strong>actionfraud.police.uk</strong>). Freeze any compromised accounts immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
