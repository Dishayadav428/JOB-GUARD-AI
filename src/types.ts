export type RiskLabel = 'Low' | 'Medium' | 'High';
export type RiskLevel = 'safe' | 'low' | 'moderate' | 'high' | 'critical';

export interface WarningSign {
  id: string;
  title: string;
  category: 'upfront_fees' | 'unrealistic_salary' | 'urgent_pressure' | 'suspicious_email' | 'vague_description' | 'sensitive_info' | 'suspicious_link';
  categoryLabel: string;
  points: number;
  description: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface ScoreBreakdownItem {
  id: string;
  category: string;
  ruleName: string;
  points: number;
  description: string;
}

export interface PositiveSignal {
  id: string;
  title: string;
  description: string;
}

export interface JobCheckInput {
  jobTitle: string;
  companyName: string;
  recruiterEmail: string;
  officialWebsite: string;
  communicationChannel: 'email' | 'telegram' | 'whatsapp' | 'linkedin' | 'sms' | 'other';
  interviewConducted: 'none' | 'text_chat' | 'phone_video' | 'in_person' | 'unsolicited_offer';
  moneyRequested: boolean;
  moneyPurpose: string;
  offeredSalary: string;
  jobDescription: string;
}

export interface AnalysisResult {
  score: number; // 0 - 100 risk score
  riskLabel: RiskLabel; // 'Low' | 'Medium' | 'High'
  level: RiskLevel; // For backward compatibility
  summary: string;
  warningSigns: WarningSign[];
  redFlags: WarningSign[]; // For backward compatibility with existing components
  greenFlags: PositiveSignal[];
  safetyAdvice: string[];
  recommendations: string[]; // For backward compatibility
  disclaimer: string;
  scoreBreakdown?: ScoreBreakdownItem[];
  rawCalculatedScore?: number;
}

export interface HighlightedPhrase {
  text: string;
  category: 'advance_fees' | 'unrealistic_salary' | 'urgent_pressure' | 'suspicious_link' | 'sensitive_data' | 'other';
  categoryLabel: string;
  points: number;
  reason: string;
}

export type MessageChannel = 'whatsapp' | 'email' | 'sms' | 'linkedin' | 'telegram' | 'other';

export interface MessageScanResult {
  id: string;
  score: number; // 0 - 100
  riskLabel: RiskLabel;
  summary: string;
  originalMessage: string;
  channel: MessageChannel;
  highlightedPhrases: HighlightedPhrase[];
  scoreBreakdown: ScoreBreakdownItem[];
  safetyAdvice: string[];
  disclaimer: string;
}

export interface SavedScanRecord {
  id: string;
  date: string;
  companyName: string;
  jobTitle: string;
  riskScore: number;
  riskCategory: RiskLabel;
  result: AnalysisResult;
}
