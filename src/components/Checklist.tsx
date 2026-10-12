import React, { useState } from 'react';
import { CheckSquare, Square, ShieldCheck } from 'lucide-react';

interface CheckItem {
  id: string;
  text: string;
  category: 'green' | 'red';
  hint: string;
}

const CHECKLIST_ITEMS: CheckItem[] = [
  {
    id: 'applied_officially',
    text: 'I applied for this position on an official company careers site or verified job board.',
    category: 'green',
    hint: 'If you received an unsolicited offer out of the blue, risk of fraud is over 90%.',
  },
  {
    id: 'video_interview',
    text: 'I conducted at least one live video or in-person technical / HR interview.',
    category: 'green',
    hint: 'Text-only questionnaire chats via Telegram or Google Forms are hallmark scam patterns.',
  },
  {
    id: 'official_email_domain',
    text: 'All emails came from the company\'s official corporate domain (not @gmail or @outlook).',
    category: 'green',
    hint: 'Genuine recruiters do not use personal or free webmail addresses.',
  },
  {
    id: 'no_money_demanded',
    text: 'No one requested any payment for registration, training, laptop deposit, or processing.',
    category: 'green',
    hint: 'Legitimate employers never charge candidates money. Period.',
  },
  {
    id: 'equipment_shipped_directly',
    text: 'The company ships laptops/hardware directly, without sending a check for me to deposit.',
    category: 'green',
    hint: 'Sending a fake check to buy equipment from a "vendor" is a well-known banking scam.',
  },
  {
    id: 'verified_linkedin',
    text: 'I can find the hiring manager and recruiter\'s verified profiles and connections on LinkedIn.',
    category: 'green',
    hint: 'Scammers frequently make up fake names or steal photos from strangers.',
  },
  {
    id: 'realistic_compensation',
    text: 'The compensation is consistent with market rates for my experience level.',
    category: 'green',
    hint: 'Offering ₹50,000/week or $80/hr for simple entry-level data entry is bait.',
  },
  {
    id: 'no_urgency_pressure',
    text: 'The offer allows a reasonable time to review (3+ days) without panic deadlines.',
    category: 'green',
    hint: 'Scammers demand immediate acceptance ("accept within 2 hours") to prevent due diligence.',
  },
];

export const Checklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const score = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="checklist-container">
      <div className="checklist-header">
        <ShieldCheck className="section-icon text-indigo" size={26} />
        <div>
          <h2>Offer Letter Safety Checklist</h2>
          <p>Check all the statements that are TRUE about your job offer to calculate your safety index.</p>
        </div>
      </div>

      <div className="score-summary-bar">
        <div className="score-progress-wrap">
          <div className="score-progress-bar" style={{ width: `${score}%` }}></div>
        </div>
        <div className="score-summary-meta">
          <span>Safety Index: <strong>{score}%</strong> ({checkedIds.length} of {CHECKLIST_ITEMS.length} verified)</span>
          <span className={`status-badge-inline ${score >= 75 ? 'badge-safe' : score >= 50 ? 'badge-warn' : 'badge-danger'}`}>
            {score >= 75 ? 'Safe & Professional' : score >= 50 ? 'Proceed with Caution' : 'Critical Warning'}
          </span>
        </div>
      </div>

      <div className="checklist-items">
        {CHECKLIST_ITEMS.map(item => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`checklist-item ${isChecked ? 'item-checked' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              <button type="button" className="checkbox-toggle-btn">
                {isChecked ? (
                  <CheckSquare size={22} className="text-green" />
                ) : (
                  <Square size={22} className="text-muted" />
                )}
              </button>
              <div className="item-content">
                <span className="item-text">{item.text}</span>
                <span className="item-hint">{item.hint}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
