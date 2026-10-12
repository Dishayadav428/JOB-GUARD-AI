import React, { useState } from 'react';
import { SavedScanRecord } from '../types';
import { 
  History, 
  Trash2, 
  ExternalLink, 
  Building2, 
  Calendar, 
  ShieldAlert, 
  ShieldCheck, 
  Shield, 
  Search,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

interface ScanHistoryProps {
  records: SavedScanRecord[];
  onOpenRecord: (record: SavedScanRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
  onStartNewScan: () => void;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({
  records,
  onOpenRecord,
  onDeleteRecord,
  onClearAll,
  onStartNewScan,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter(rec =>
    rec.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskMeta = (category: 'Low' | 'Medium' | 'High') => {
    switch (category) {
      case 'High':
        return {
          badgeClass: 'badge-risk-high',
          icon: <ShieldAlert size={16} className="text-red" />,
          color: 'var(--alert-red)'
        };
      case 'Medium':
        return {
          badgeClass: 'badge-risk-medium',
          icon: <Shield size={16} className="text-orange" />,
          color: 'var(--alert-yellow)'
        };
      case 'Low':
      default:
        return {
          badgeClass: 'badge-risk-low',
          icon: <ShieldCheck size={16} className="text-green" />,
          color: 'var(--alert-green)'
        };
    }
  };

  return (
    <div className="history-container animate-fade-in">
      {/* Top Banner */}
      <div className="history-header">
        <div className="header-icon-badge">
          <History size={26} className="electric-icon" />
        </div>
        <div className="history-header-text">
          <div className="history-title-row">
            <h2>Local Scan History</h2>
            <span className="record-count-pill">{records.length} Saved</span>
          </div>
          <p>
            Review and reopen previously evaluated job and internship assessments saved in your browser's private storage.
          </p>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="history-privacy-banner">
        <Lock size={16} className="electric-icon flex-shrink-0" />
        <span>
          <strong>Zero Cloud Tracking:</strong> History records are stored exclusively in your browser's <code>localStorage</code>. No personal information or resumes are uploaded to any external server.
        </span>
      </div>

      {records.length > 0 && (
        <div className="history-toolbar">
          <div className="history-search-input">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Filter by company or job title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="history-actions">
            <button className="btn-clear-history" onClick={onClearAll} title="Clear all history">
              <Trash2 size={15} />
              <span>Clear All</span>
            </button>
            <button className="primary-btn" onClick={onStartNewScan}>
              <Sparkles size={15} />
              <span>Scan New Offer</span>
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {records.length === 0 ? (
        <div className="history-empty-state">
          <div className="empty-icon-wrap">
            <History size={48} className="electric-icon" />
          </div>
          <h3>No Scans Recorded Yet</h3>
          <p>
            When you run an analysis on a job posting, WhatsApp message, or internship offer, 
            the assessment summary will be automatically preserved here so you can revisit it anytime.
          </p>
          <button className="btn-electric-primary" onClick={onStartNewScan}>
            <ShieldCheck size={18} />
            <span>Scan an Offer Now</span>
            <ArrowRight size={16} className="cta-arrow" />
          </button>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="history-no-match">
          <Search size={32} className="text-muted" />
          <h4>No matching records found</h4>
          <p>No saved scans match the search term "{searchQuery}".</p>
        </div>
      ) : (
        <div className="history-list">
          {filteredRecords.map(record => {
            const riskMeta = getRiskMeta(record.riskCategory);
            return (
              <div key={record.id} className="history-card">
                <div className="history-card-main">
                  <div className="card-top-row">
                    <div className="company-info-block">
                      <Building2 size={16} className="electric-icon" />
                      <span className="card-company-name">{record.companyName}</span>
                      <span className="card-job-title">• {record.jobTitle}</span>
                    </div>

                    <div className="card-date-badge">
                      <Calendar size={13} className="text-muted" />
                      <span>{record.date}</span>
                    </div>
                  </div>

                  <div className="card-bottom-row">
                    <div className="card-risk-pill-wrap">
                      <span className={`risk-pill-label ${riskMeta.badgeClass}`}>
                        {riskMeta.icon}
                        <span>{record.riskCategory} Risk ({record.riskScore}/100)</span>
                      </span>
                      <span className="card-warning-count">
                        {record.result.warningSigns.length} warning signs identified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="history-card-actions">
                  <button
                    className="btn-open-result"
                    onClick={() => onOpenRecord(record)}
                    title="Open full analysis result"
                  >
                    <span>View Result</span>
                    <ExternalLink size={15} />
                  </button>

                  <button
                    className="btn-delete-record"
                    onClick={() => onDeleteRecord(record.id)}
                    title="Delete this record"
                    aria-label={`Delete scan for ${record.companyName}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
