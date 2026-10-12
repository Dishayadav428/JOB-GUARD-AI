import React, { useState } from 'react';
import { JobCheckInput } from '../types';
import { SAMPLE_CASES } from '../mockData';
import { 
  Building2, 
  Briefcase, 
  Mail, 
  Globe, 
  FileText, 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

interface Props {
  onAnalyze: (input: JobCheckInput) => void;
}

interface FormErrors {
  jobTitle?: string;
  companyName?: string;
  recruiterEmail?: string;
  officialWebsite?: string;
  jobDescription?: string;
  moneyPurpose?: string;
}

export const JobScanner: React.FC<Props> = ({ onAnalyze }) => {
  const [formData, setFormData] = useState<JobCheckInput>({
    jobTitle: '',
    companyName: '',
    recruiterEmail: '',
    officialWebsite: '',
    communicationChannel: 'email',
    interviewConducted: 'phone_video',
    moneyRequested: false,
    moneyPurpose: '',
    offeredSalary: '',
    jobDescription: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: keyof JobCheckInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if it was edited
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

    let errorMsg: string | undefined = undefined;

    if (field === 'jobTitle') {
      if (!formData.jobTitle.trim()) {
        errorMsg = 'Job title is required.';
      } else if (formData.jobTitle.trim().length < 2) {
        errorMsg = 'Job title must be at least 2 characters.';
      }
    } else if (field === 'companyName') {
      if (!formData.companyName.trim()) {
        errorMsg = 'Company name is required.';
      } else if (formData.companyName.trim().length < 2) {
        errorMsg = 'Company name must be at least 2 characters.';
      }
    } else if (field === 'recruiterEmail') {
      if (formData.recruiterEmail.trim() && !emailRegex.test(formData.recruiterEmail.trim())) {
        errorMsg = 'Please enter a valid email address (e.g. hr@company.com).';
      }
    } else if (field === 'officialWebsite') {
      if (formData.officialWebsite.trim() && !urlRegex.test(formData.officialWebsite.trim())) {
        errorMsg = 'Please enter a valid website URL (e.g. https://company.com).';
      }
    } else if (field === 'jobDescription') {
      if (!formData.jobDescription.trim()) {
        errorMsg = 'Job description or offer message is required.';
      } else if (formData.jobDescription.trim().length < 20) {
        errorMsg = 'Please provide at least 20 characters of the job description or offer text.';
      }
    } else if (field === 'moneyPurpose') {
      if (formData.moneyRequested && !formData.moneyPurpose.trim()) {
        errorMsg = 'Please describe the payment or fee requested.';
      }
    }

    setErrors(prev => ({ ...prev, [field]: errorMsg }));
    return !errorMsg;
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required.';
    } else if (formData.jobTitle.trim().length < 2) {
      newErrors.jobTitle = 'Job title must be at least 2 characters.';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required.';
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters.';
    }

    if (formData.recruiterEmail.trim() && !emailRegex.test(formData.recruiterEmail.trim())) {
      newErrors.recruiterEmail = 'Please enter a valid email address (e.g. hr@company.com).';
    }

    if (formData.officialWebsite.trim() && !urlRegex.test(formData.officialWebsite.trim())) {
      newErrors.officialWebsite = 'Please enter a valid website URL (e.g. https://company.com).';
    }

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description or offer text is required for analysis.';
    } else if (formData.jobDescription.trim().length < 20) {
      newErrors.jobDescription = 'Please enter at least 20 characters of the job description or message.';
    }

    if (formData.moneyRequested && !formData.moneyPurpose.trim()) {
      newErrors.moneyPurpose = 'Please state what the fee or deposit is requested for.';
    }

    setErrors(newErrors);
    setTouched({
      jobTitle: true,
      companyName: true,
      recruiterEmail: true,
      officialWebsite: true,
      jobDescription: true,
      moneyPurpose: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const loadPreset = (preset: JobCheckInput) => {
    setFormData({ ...preset });
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      onAnalyze(formData);
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className="scanner-container">
      {/* Preset Demo Selection */}
      <div className="preset-card">
        <div className="preset-header">
          <Sparkles size={16} className="electric-icon" />
          <span>Quick Demo Presets:</span>
        </div>
        <div className="preset-buttons">
          {SAMPLE_CASES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              className="preset-chip"
              onClick={() => loadPreset(preset.input)}
            >
              <span className="preset-name">{preset.name}</span>
              <span className={`chip-tag ${preset.tag.toLowerCase().includes('scam') ? 'tag-danger' : preset.tag.toLowerCase().includes('safe') ? 'tag-safe' : 'tag-warn'}`}>
                {preset.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="scanner-form" noValidate>
        {hasErrors && (
          <div className="form-error-banner animate-fade-in">
            <AlertCircle size={18} className="text-red flex-shrink-0" />
            <span>Please correct the highlighted fields below before analyzing the offer.</span>
          </div>
        )}

        <div className="form-grid">
          {/* Job Title */}
          <div className="form-group">
            <label htmlFor="jobTitle">
              <Briefcase size={16} className="electric-icon" />
              <span>Job Title <span className="required-star">*</span></span>
            </label>
            <input
              id="jobTitle"
              type="text"
              placeholder="e.g. Data Entry Specialist, Python Developer Intern"
              value={formData.jobTitle}
              onChange={e => handleInputChange('jobTitle', e.target.value)}
              onBlur={() => handleBlur('jobTitle')}
              className={errors.jobTitle && touched.jobTitle ? 'input-error' : ''}
              required
            />
            {errors.jobTitle && touched.jobTitle && (
              <span className="error-text">
                <AlertCircle size={13} /> {errors.jobTitle}
              </span>
            )}
          </div>

          {/* Company Name */}
          <div className="form-group">
            <label htmlFor="companyName">
              <Building2 size={16} className="electric-icon" />
              <span>Company Name <span className="required-star">*</span></span>
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="e.g. Google India, Amazon, Apex Tech Solutions"
              value={formData.companyName}
              onChange={e => handleInputChange('companyName', e.target.value)}
              onBlur={() => handleBlur('companyName')}
              className={errors.companyName && touched.companyName ? 'input-error' : ''}
              required
            />
            {errors.companyName && touched.companyName && (
              <span className="error-text">
                <AlertCircle size={13} /> {errors.companyName}
              </span>
            )}
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
              placeholder="e.g. recruiter@company.com or hr.team@gmail.com"
              value={formData.recruiterEmail}
              onChange={e => handleInputChange('recruiterEmail', e.target.value)}
              onBlur={() => handleBlur('recruiterEmail')}
              className={errors.recruiterEmail && touched.recruiterEmail ? 'input-error' : ''}
            />
            {errors.recruiterEmail && touched.recruiterEmail ? (
              <span className="error-text">
                <AlertCircle size={13} /> {errors.recruiterEmail}
              </span>
            ) : (
              <span className="field-hint">Checks for free webmail impersonation (@gmail.com, @yahoo.com)</span>
            )}
          </div>

          {/* Website URL */}
          <div className="form-group">
            <label htmlFor="officialWebsite">
              <Globe size={16} className="electric-icon" />
              <span>Website URL</span>
            </label>
            <input
              id="officialWebsite"
              type="text"
              placeholder="e.g. https://company.com"
              value={formData.officialWebsite}
              onChange={e => handleInputChange('officialWebsite', e.target.value)}
              onBlur={() => handleBlur('officialWebsite')}
              className={errors.officialWebsite && touched.officialWebsite ? 'input-error' : ''}
            />
            {errors.officialWebsite && touched.officialWebsite ? (
              <span className="error-text">
                <AlertCircle size={13} /> {errors.officialWebsite}
              </span>
            ) : (
              <span className="field-hint">Cross-referenced against recruiter email domain</span>
            )}
          </div>

          {/* Communication Channel */}
          <div className="form-group">
            <label htmlFor="communicationChannel">
              <MessageSquare size={16} className="electric-icon" />
              <span>Communication Channel</span>
            </label>
            <select
              id="communicationChannel"
              value={formData.communicationChannel}
              onChange={e => handleInputChange('communicationChannel', e.target.value as any)}
            >
              <option value="email">Official Email / Company Portal</option>
              <option value="linkedin">LinkedIn Message</option>
              <option value="telegram">Telegram (High Risk Indicator)</option>
              <option value="whatsapp">WhatsApp Outreach</option>
              <option value="sms">SMS Text Message</option>
              <option value="other">Other Social Media / Chat</option>
            </select>
          </div>

          {/* Salary / Compensation */}
          <div className="form-group">
            <label htmlFor="offeredSalary">
              <DollarSign size={16} className="electric-icon" />
              <span>Offered Salary / Stipend</span>
            </label>
            <input
              id="offeredSalary"
              type="text"
              placeholder="e.g. ₹5,000 daily or ₹25,000/month or $40/hr"
              value={formData.offeredSalary}
              onChange={e => handleInputChange('offeredSalary', e.target.value)}
            />
          </div>
        </div>

        {/* Payment / Deposit Requested Field */}
        <div className={`payment-field-wrapper ${formData.moneyRequested ? 'payment-active' : ''}`}>
          <div className="payment-question-row">
            <div className="payment-label-block">
              <span className="payment-title">Is Any Payment or Deposit Requested?</span>
              <span className="payment-subtitle">
                e.g. Registration fees, laptop security deposit, training kit, certificate charge, or courier fee
              </span>
            </div>

            <div className="payment-toggle-group">
              <button
                type="button"
                className={`payment-toggle-btn ${!formData.moneyRequested ? 'selected-no' : ''}`}
                onClick={() => {
                  handleInputChange('moneyRequested', false);
                  handleInputChange('moneyPurpose', '');
                }}
              >
                No Payment
              </button>
              <button
                type="button"
                className={`payment-toggle-btn ${formData.moneyRequested ? 'selected-yes' : ''}`}
                onClick={() => handleInputChange('moneyRequested', true)}
              >
                <AlertTriangle size={15} />
                Yes, Payment Demanded
              </button>
            </div>
          </div>

          {formData.moneyRequested && (
            <div className="payment-detail-input animate-fade-in">
              <label htmlFor="moneyPurpose">
                <span>Fee Details / Purpose Stated by Recruiter <span className="required-star">*</span></span>
              </label>
              <input
                id="moneyPurpose"
                type="text"
                placeholder="e.g. ₹1,500 refundable deposit before interview, ₹4,999 certificate fee"
                value={formData.moneyPurpose}
                onChange={e => handleInputChange('moneyPurpose', e.target.value)}
                onBlur={() => handleBlur('moneyPurpose')}
                className={errors.moneyPurpose && touched.moneyPurpose ? 'input-error' : ''}
              />
              {errors.moneyPurpose && touched.moneyPurpose && (
                <span className="error-text">
                  <AlertCircle size={13} /> {errors.moneyPurpose}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Job Description / Offer Message */}
        <div className="form-group full-width">
          <label htmlFor="jobDescription">
            <FileText size={16} className="electric-icon" />
            <span>Job Description / Offer Message / Email Transcript <span className="required-star">*</span></span>
          </label>
          <textarea
            id="jobDescription"
            rows={5}
            placeholder="Paste the job posting description, WhatsApp invite, or offer email message here. Our local heuristics scan for deceptive language, urgency hooks, and task fraud patterns..."
            value={formData.jobDescription}
            onChange={e => handleInputChange('jobDescription', e.target.value)}
            onBlur={() => handleBlur('jobDescription')}
            className={errors.jobDescription && touched.jobDescription ? 'input-error' : ''}
            required
          />
          {errors.jobDescription && touched.jobDescription ? (
            <span className="error-text">
              <AlertCircle size={13} /> {errors.jobDescription}
            </span>
          ) : (
            <span className="field-hint">Minimum 20 characters required for heuristic evaluation.</span>
          )}
        </div>

        {/* Analyze Offer Button */}
        <button type="submit" className="scan-submit-btn">
          <ShieldCheck size={20} />
          <span>Analyze Offer</span>
        </button>
      </form>
    </div>
  );
};
