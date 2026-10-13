import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { Home } from './components/Home';
import { JobScanner } from './components/JobScanner';
import { AnalysisResult } from './components/AnalysisResult';
import { CompanyCheck } from './components/CompanyCheck';
import { Checklist } from './components/Checklist';
import { ScamPatterns } from './components/ScamPatterns';
import { ScanHistory } from './components/ScanHistory';
import { StudentSafetyHub as StudentProtectionCenter } from './components/StudentSafetyHub';
import { JobCheckInput, AnalysisResult as AnalysisResultType, SavedScanRecord } from './types';
import { analyzeJobOffer } from './detector';
import { Shield, ShieldAlert, History, Sparkles, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'jobguard_scan_history';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [scanSubTab, setScanSubTab] = useState<'form' | 'history'>('form');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);
  const [scanHistory, setScanHistory] = useState<SavedScanRecord[]>([]);

  // Load scan history from localStorage on initial render
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setScanHistory(parsed);
        }
      }
    } catch (err) {
      console.error('Error loading history from localStorage:', err);
    }
  }, []);

  const saveHistoryToStorage = (records: SavedScanRecord[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (err) {
      console.error('Error writing history to localStorage:', err);
    }
  };

  const handleAnalyze = (input: JobCheckInput) => {
    const result = analyzeJobOffer(input);
    setAnalysisResult(result);

    // Save only essential summary & result, omitting any sensitive personal info
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date());

    const newRecord: SavedScanRecord = {
      id: `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: formattedDate,
      companyName: input.companyName.trim() || 'Undisclosed Company',
      jobTitle: input.jobTitle.trim() || 'General Position',
      riskScore: result.score,
      riskCategory: result.riskLabel,
      result,
    };

    setScanHistory(prev => {
      const updated = [newRecord, ...prev].slice(0, 50);
      saveHistoryToStorage(updated);
      return updated;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  const handleDeleteRecord = (id: string) => {
    setScanHistory(prev => {
      const updated = prev.filter(r => r.id !== id);
      saveHistoryToStorage(updated);
      return updated;
    });
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all saved scan records?')) {
      setScanHistory([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error('Error clearing localStorage history:', err);
      }
    }
  };

  const handleOpenRecord = (record: SavedScanRecord) => {
    setAnalysisResult(record.result);
    setScanSubTab('form');
    setActiveTab('scan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartScan = () => {
    setAnalysisResult(null);
    setScanSubTab('form');
    setActiveTab('scan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCompanyCheck = () => {
    setActiveTab('company');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToSafetyTips = () => {
    setActiveTab('safety');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell cyber-theme">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <Home 
            onStartScan={handleStartScan}
            onGoToCompanyCheck={handleGoToCompanyCheck}
            onGoToSafetyTips={handleGoToSafetyTips}
          />
        )}

        {/* SCAN OFFER TAB */}
        {activeTab === 'scan' && (
          <div className="tab-pane animate-fade-in">
            {/* Header with Sub-tabs: New Scan vs Scan History */}
            <div className="scan-pane-header">
              <div className="pane-title-wrap">
                <ShieldAlert size={26} className="electric-icon" />
                <div>
                  <h2>Scan Job & Internship Offer</h2>
                  <p>Analyze job postings, WhatsApp/Telegram communications, and recruiter emails for fraud markers.</p>
                </div>
              </div>

              {/* Sub-tab navigation */}
              <div className="scan-subtabs">
                <button
                  type="button"
                  className={`subtab-btn ${scanSubTab === 'form' ? 'active' : ''}`}
                  onClick={() => {
                    setAnalysisResult(null);
                    setScanSubTab('form');
                  }}
                >
                  <Sparkles size={15} />
                  <span>Scanner</span>
                </button>
                <button
                  type="button"
                  className={`subtab-btn ${scanSubTab === 'history' ? 'active' : ''}`}
                  onClick={() => setScanSubTab('history')}
                >
                  <History size={15} />
                  <span>Scan History</span>
                  {scanHistory.length > 0 && (
                    <span className="subtab-badge">{scanHistory.length}</span>
                  )}
                </button>
              </div>
            </div>

            {scanSubTab === 'history' ? (
              <ScanHistory
                records={scanHistory}
                onOpenRecord={handleOpenRecord}
                onDeleteRecord={handleDeleteRecord}
                onClearAll={handleClearAllHistory}
                onStartNewScan={() => {
                  setAnalysisResult(null);
                  setScanSubTab('form');
                }}
              />
            ) : analysisResult ? (
              <AnalysisResult 
                result={analysisResult} 
                onReset={handleReset} 
              />
            ) : (
              <JobScanner onAnalyze={handleAnalyze} />
            )}
          </div>
        )}

        {/* COMPANY CHECK TAB */}
        {activeTab === 'company' && (
          <div className="tab-pane animate-fade-in">
            <CompanyCheck />
          </div>
        )}

        {/* STUDENT SAFETY HUB TAB */}
        {activeTab === 'safety' && (
          <div className="tab-pane animate-fade-in">
            <StudentProtectionCenter onStartScan={handleStartScan} onGoToCompanyCheck={handleGoToCompanyCheck} />
            <div className="divider-cyber"></div>
            <Checklist />
            <div className="divider-cyber"></div>
            <ScamPatterns />
          </div>
        )}
      </main>

      <footer className="cyber-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand-cyber">
              <div className="shield-logo-small">
                <Shield size={20} className="electric-icon" />
              </div>
              <span className="footer-title">JobGuard Cyber Defense</span>
            </div>
            <div className="footer-trust-indicators">
              <span className="trust-pill">
                <CheckCircle2 size={14} className="electric-icon" />
                100% Client-Side Storage
              </span>
              <span className="trust-pill">
                <CheckCircle2 size={14} className="electric-icon" />
                Zero Cloud Tracking
              </span>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-legal">
              JobGuard runs entirely in your local browser sandbox. Scan history is preserved exclusively in your device's <code>localStorage</code>. No personal documents, contacts, or compensation data are ever transmitted to external servers.
            </p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} JobGuard – Protecting student careers and job seekers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
