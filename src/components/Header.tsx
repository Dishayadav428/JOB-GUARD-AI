import React, { useState } from 'react';
import { Shield, Home as HomeIcon, Search, ShieldCheck, HelpCircle, Menu, X } from 'lucide-react';

export type NavTab = 'home' | 'scan' | 'company' | 'safety';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="cyber-header">
      <div className="cyber-header-inner">
        {/* Shield Logo & Brand */}
        <div className="cyber-brand" onClick={() => handleNavClick('home')}>
          <div className="shield-logo-wrap">
            <Shield size={24} className="shield-svg" />
            <div className="shield-pulse"></div>
          </div>
          <div className="brand-text-block">
            <div className="brand-title-line">
              <span className="brand-name">JobGuard</span>
              <span className="cyber-tag">CYBER SECURE</span>
            </div>
            <span className="brand-subtitle-line">Job & Internship Scam Defense</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="cyber-nav-desktop">
          <button
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <HomeIcon size={16} />
            <span>Home</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'scan' ? 'active' : ''}`}
            onClick={() => handleNavClick('scan')}
          >
            <ShieldCheck size={16} />
            <span>Scan Offer</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'company' ? 'active' : ''}`}
            onClick={() => handleNavClick('company')}
          >
            <Search size={16} />
            <span>Company Check</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'safety' ? 'active' : ''}`}
            onClick={() => handleNavClick('safety')}
          >
            <HelpCircle size={16} />
            <span>Safety Hub</span>
          </button>
        </nav>

        {/* CTA Scan Button on Header */}
        <div className="header-action-desktop">
          <button 
            className="btn-header-scan"
            onClick={() => handleNavClick('scan')}
          >
            <ShieldCheck size={16} />
            <span>Scan Offer</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="cyber-nav-mobile animate-fade-in">
          <button
            className={`mobile-nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <HomeIcon size={18} />
            <span>Home</span>
          </button>
          <button
            className={`mobile-nav-link ${activeTab === 'scan' ? 'active' : ''}`}
            onClick={() => handleNavClick('scan')}
          >
            <ShieldCheck size={18} />
            <span>Scan Offer</span>
          </button>
          <button
            className={`mobile-nav-link ${activeTab === 'company' ? 'active' : ''}`}
            onClick={() => handleNavClick('company')}
          >
            <Search size={18} />
            <span>Company Check</span>
          </button>
          <button
            className={`mobile-nav-link ${activeTab === 'safety' ? 'active' : ''}`}
            onClick={() => handleNavClick('safety')}
          >
            <HelpCircle size={18} />
            <span>Safety Hub</span>
          </button>
        </div>
      )}
    </header>
  );
};
