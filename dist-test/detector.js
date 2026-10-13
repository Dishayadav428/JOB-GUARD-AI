// Deterministic Reference Sets
const FREE_EMAIL_PROVIDERS = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
    'mail.com', 'zoho.com', 'protonmail.com', 'yandex.com', 'aol.com',
    'gmx.com', 'fastmail.com'
];
const PROMINENT_ENTERPRISES = [
    'google', 'amazon', 'microsoft', 'apple', 'meta', 'netflix', 'adobe',
    'ibm', 'oracle', 'salesforce', 'infosys', 'tcs', 'wipro', 'accenture',
    'deloitte', 'cognizant', 'capgemini', 'tesla', 'nvidia', 'intel', 'cisco'
];
// 1. Advance Fee Keywords & Patterns
const ADVANCE_FEE_RULES = [
    { phrase: 'registration fee', points: 35, reason: 'Demands upfront registration fee before joining.' },
    { phrase: 'security deposit', points: 35, reason: 'Demands upfront security deposit for equipment or placement.' },
    { phrase: 'laptop deposit', points: 35, reason: 'Requires money deposit for work equipment.' },
    { phrase: 'equipment fee', points: 35, reason: 'Charges candidate for standard company work tools.' },
    { phrase: 'training fee', points: 30, reason: 'Demands payment for mandatory onboarding or training.' },
    { phrase: 'kit fee', points: 30, reason: 'Charges candidate for welcome/starter kit materials.' },
    { phrase: 'processing fee', points: 30, reason: 'Charges application or file processing charges.' },
    { phrase: 'background check fee', points: 30, reason: 'Shifts background verification costs onto candidate.' },
    { phrase: 'id card fee', points: 25, reason: 'Requires payment for corporate ID generation.' },
    { phrase: 'application fee', points: 30, reason: 'Charges candidate to process employment application.' },
    { phrase: 'courier charges', points: 25, reason: 'Asks candidate to pay shipping/courier fees.' },
    { phrase: 'courier fee', points: 25, reason: 'Asks candidate to pay shipping/courier fees.' },
    { phrase: 'refundable deposit', points: 35, reason: 'Promises deposit is refundable to lure payment.' },
    { phrase: 'pay upfront', points: 35, reason: 'Explicit demand for pre-hiring payment.' },
    { phrase: 'crypto', points: 35, reason: 'Demands irreversible cryptocurrency transfer.' },
    { phrase: 'usdt', points: 35, reason: 'Demands cryptocurrency stablecoin payment.' },
    { phrase: 'bitcoin', points: 35, reason: 'Demands cryptocurrency transfer.' },
    { phrase: 'gift card', points: 35, reason: 'Demands non-traceable gift card codes.' },
    { phrase: 'wire transfer to vendor', points: 35, reason: 'Third-party equipment supplier forwarding scam.' },
    { phrase: 'deposit ₹', points: 35, reason: 'Requests candidate deposit funds.' },
    { phrase: 'deposit rs', points: 35, reason: 'Requests candidate deposit funds.' },
    { phrase: 'pay ₹', points: 35, reason: 'Direct request for candidate funds.' },
    { phrase: 'pay rs', points: 35, reason: 'Direct request for candidate funds.' },
];
// 2. Unrealistic Salary Keywords & Patterns
const UNREALISTIC_SALARY_RULES = [
    { phrase: 'daily payout', points: 20, reason: 'Promises abnormal daily cash payouts.' },
    { phrase: 'daily payouts', points: 20, reason: 'Promises abnormal daily cash payouts.' },
    { phrase: '5000 daily', points: 20, reason: 'Promises disproportionate entry-level daily returns.' },
    { phrase: '3000 daily', points: 20, reason: 'Promises disproportionate entry-level daily returns.' },
    { phrase: '2000 daily', points: 20, reason: 'Promises disproportionate entry-level daily returns.' },
    { phrase: 'earn 2000 to 5000', points: 20, reason: 'Exaggerated daily income promise for minimal tasks.' },
    { phrase: 'earn 3000 to 8000', points: 20, reason: 'Exaggerated daily income promise for minimal tasks.' },
    { phrase: '50,000/week', points: 20, reason: 'Astronomical weekly wage for student/intern role.' },
    { phrase: '50000/week', points: 20, reason: 'Astronomical weekly wage for student/intern role.' },
    { phrase: '100000/month', points: 20, reason: 'Inflated monthly pay promise for entry-level or data entry.' },
    { phrase: 'per day payout', points: 20, reason: 'Promises immediate per-day payout structure.' },
    { phrase: 'daily income', points: 20, reason: 'Promises guaranteed daily income without evaluation.' },
    { phrase: 'instant daily transfer', points: 20, reason: 'Promises instant daily cash transfers.' },
    { phrase: 'earn from home 2-3 hours', points: 15, reason: 'Standard click-bait part-time earnings template.' },
    { phrase: 'earn from mobile', points: 15, reason: 'Casual mobile task bait targeting students.' }
];
// 3. Urgent Pressure Keywords & Patterns
const URGENT_PRESSURE_RULES = [
    { phrase: 'urgent requirement', points: 15, reason: 'Creates artificial panic and urgency.' },
    { phrase: 'selected immediately', points: 15, reason: 'Claims instant selection without rigorous interview.' },
    { phrase: 'offer expires today', points: 15, reason: 'Pressure deadline to bypass candidate verification.' },
    { phrase: 'offer expires in', points: 15, reason: 'Pressure deadline to rush candidate decision.' },
    { phrase: 'within 24 hours', points: 15, reason: 'Short window forcing impulsive response.' },
    { phrase: 'within 2 hours', points: 20, reason: 'Extreme high-pressure deadline.' },
    { phrase: 'limited seats', points: 15, reason: 'Artificial scarcity tactic.' },
    { phrase: 'slots left', points: 15, reason: 'Artificial scarcity tactic.' },
    { phrase: 'immediate joining bonus', points: 15, reason: 'Financial bait conditioning fast commitment.' },
    { phrase: 'hurry up', points: 15, reason: 'High pressure phrasing.' },
    { phrase: 'respond immediately', points: 15, reason: 'Aggressive response demand.' },
    { phrase: 'act fast', points: 15, reason: 'Aggressive response demand.' },
    { phrase: 'offer will be cancelled', points: 15, reason: 'Fear-based deadline threat.' }
];
// 4. Suspicious Links & Domains
const SUSPICIOUS_LINK_PATTERNS = [
    { regex: /t\.me\/[a-zA-Z0-9_-]+/gi, label: 'Telegram Direct Channel Link', points: 20, reason: 'Directs formal recruitment communication to anonymous Telegram channel.' },
    { regex: /telegram\.me\/[a-zA-Z0-9_-]+/gi, label: 'Telegram Invite Link', points: 20, reason: 'Directs candidate off-platform into unverified messaging.' },
    { regex: /wa\.me\/[0-9]+/gi, label: 'WhatsApp Direct Chat Link', points: 15, reason: 'Routes communication to unverified private WhatsApp number.' },
    { regex: /chat\.whatsapp\.com\/[a-zA-Z0-9_-]+/gi, label: 'WhatsApp Group Invite Link', points: 20, reason: 'Invites candidate to group chat typical of task syndicate rings.' },
    { regex: /bit\.ly\/[a-zA-Z0-9_-]+/gi, label: 'Bit.ly Shortened URL', points: 15, reason: 'Hides true destination domain behind URL shortener.' },
    { regex: /tinyurl\.com\/[a-zA-Z0-9_-]+/gi, label: 'TinyURL Shortened Link', points: 15, reason: 'Conceals actual link destination.' },
    { regex: /forms\.gle\/[a-zA-Z0-9_-]+/gi, label: 'Google Form Recruitment Link', points: 20, reason: 'Corporate employers use applicant tracking systems (ATS), not free Google Forms.' },
    { regex: /docs\.google\.com\/forms\/[^\s]+/gi, label: 'Google Form Link', points: 20, reason: 'Enterprises do not conduct formal recruitment via public Google Forms.' },
    { regex: /[a-zA-Z0-9-]+\.(xyz|top|online|club|buzz|click|site|cc|tk|ml|ga|cf|gq|work|rest)\b[^\s]*/gi, label: 'Low-Reputation TLD Link', points: 25, reason: 'Links to domain extension with high correlation to disposable phishing sites.' }
];
// 5. Sensitive Data Request Rules
const SENSITIVE_DATA_RULES = [
    { phrase: 'send aadhaar', points: 25, reason: 'Premature request for government identity card.' },
    { phrase: 'send aadhar', points: 25, reason: 'Premature request for government identity card.' },
    { phrase: 'send pan card', points: 25, reason: 'Premature request for tax identification card.' },
    { phrase: 'bank details', points: 25, reason: 'Requests banking data prior to formal signed offer.' },
    { phrase: 'bank account details', points: 25, reason: 'Requests sensitive bank account information.' },
    { phrase: 'share otp', points: 30, reason: 'Critical: Demands OTP credentials for illicit authorization.' },
    { phrase: 'otp verification', points: 25, reason: 'Requests verification codes over chat.' },
    { phrase: 'credit card details', points: 30, reason: 'Critical: Demands financial payment card data.' },
    { phrase: 'debit card', points: 30, reason: 'Critical: Demands payment card details.' },
    { phrase: 'net banking', points: 30, reason: 'Critical: Solicits internet banking credentials.' },
    { phrase: 'passport copy', points: 25, reason: 'Demands international identity document prematurely.' },
    { phrase: 'ssn', points: 30, reason: 'Demands US Social Security Number over informal messaging.' },
    { phrase: 'social security number', points: 30, reason: 'Demands Social Security Number over informal chat.' },
    { phrase: 'send identity proof before interview', points: 25, reason: 'KYC harvesting before candidate screening.' }
];
export const DISCLAIMER_TEXT = "Notice: This score is generated using deterministic heuristic rules and pattern analysis. It does NOT definitively prove that an offer is genuine or fraudulent. Fraudulent actors evolve tactics, and legitimate employers occasionally have informal processes. Always verify offers independently via official corporate career portals.";
/**
 * Deterministic JavaScript Risk Analyzer for JobGuard (Job Offers)
 */
export function analyzeJobOffer(input) {
    const warningSigns = [];
    const positiveSignals = [];
    const scoreBreakdown = [];
    let score = 0;
    const combinedText = `
    ${input.jobTitle} 
    ${input.companyName} 
    ${input.jobDescription} 
    ${input.moneyPurpose} 
    ${input.offeredSalary}
  `.toLowerCase();
    const recruiterEmail = input.recruiterEmail.trim().toLowerCase();
    const emailDomain = recruiterEmail.includes('@') ? recruiterEmail.split('@')[1] : '';
    const companyClean = input.companyName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    // RULE 1: UPFRONT FEES & DEPOSITS
    if (input.moneyRequested) {
        score += 35;
        const item = {
            id: 'rule-upfront-fee-explicit',
            title: 'Upfront Payment or Deposit Demanded',
            category: 'upfront_fees',
            categoryLabel: 'Upfront Fees',
            points: 35,
            description: `The offer explicitly demands candidate payment (${input.moneyPurpose || 'fees/deposits'}). Legitimate employers never charge candidates for equipment, interview slots, ID cards, or training.`,
            severity: 'critical'
        };
        warningSigns.push(item);
        scoreBreakdown.push({
            id: item.id,
            category: 'Upfront Fees',
            ruleName: 'Explicit Payment Demand',
            points: 35,
            description: 'Candidate fees requested directly.'
        });
    }
    else {
        const matchedFee = ADVANCE_FEE_RULES.find(r => combinedText.includes(r.phrase));
        if (matchedFee) {
            score += matchedFee.points;
            const item = {
                id: 'rule-upfront-fee-keyword',
                title: `Mentions Upfront Payment Term: "${matchedFee.phrase}"`,
                category: 'upfront_fees',
                categoryLabel: 'Upfront Fees',
                points: matchedFee.points,
                description: `The description or compensation terms include references to candidate-funded expenses ("${matchedFee.phrase}"). Real employers absorb 100% of onboarding expenses.`,
                severity: 'critical'
            };
            warningSigns.push(item);
            scoreBreakdown.push({
                id: item.id,
                category: 'Upfront Fees',
                ruleName: `Keyword: "${matchedFee.phrase}"`,
                points: matchedFee.points,
                description: matchedFee.reason
            });
        }
    }
    // RULE 2: UNREALISTIC SALARY PROMISES
    const matchedSalary = UNREALISTIC_SALARY_RULES.find(r => combinedText.includes(r.phrase));
    const isEntryLevelOrIntern = combinedText.includes('intern') || combinedText.includes('fresher') || combinedText.includes('data entry') || combinedText.includes('part-time');
    if (matchedSalary) {
        score += matchedSalary.points;
        const item = {
            id: 'rule-unrealistic-salary-keyword',
            title: 'Unrealistic Compensation Formula',
            category: 'unrealistic_salary',
            categoryLabel: 'Salary Promises',
            points: matchedSalary.points,
            description: `Promises abnormal compensation patterns ("${matchedSalary.phrase}"). Daily payouts and disproportionate returns for minimal effort are standard lures.`,
            severity: 'warning'
        };
        warningSigns.push(item);
        scoreBreakdown.push({
            id: item.id,
            category: 'Salary Promises',
            ruleName: `Keyword: "${matchedSalary.phrase}"`,
            points: matchedSalary.points,
            description: matchedSalary.reason
        });
    }
    else if (isEntryLevelOrIntern && (combinedText.includes('80,000') || combinedText.includes('1,00,000') || combinedText.includes('100000') || combinedText.includes('50000/week'))) {
        score += 15;
        const item = {
            id: 'rule-unrealistic-entry-salary',
            title: 'Disproportionately Inflated Entry-Level Pay',
            category: 'unrealistic_salary',
            categoryLabel: 'Salary Promises',
            points: 15,
            description: 'The offered salary is significantly above prevailing market baselines for entry-level or student positions.',
            severity: 'warning'
        };
        warningSigns.push(item);
        scoreBreakdown.push({
            id: item.id,
            category: 'Salary Promises',
            ruleName: 'Inflated Entry-Level Compensation',
            points: 15,
            description: 'Salary promises disproportionate to role requirements.'
        });
    }
    else if (input.offeredSalary.trim().length > 0) {
        positiveSignals.push({
            id: 'signal-salary-stated',
            title: 'Standard Compensation Structure',
            description: 'Compensation details appear structured within conventional hiring parameters.'
        });
    }
    // RULE 3: URGENT PRESSURE TACTICS
    const matchedUrgency = URGENT_PRESSURE_RULES.find(r => combinedText.includes(r.phrase));
    if (matchedUrgency) {
        score += matchedUrgency.points;
        const item = {
            id: 'rule-urgent-pressure',
            title: `High Urgency / Pressure Tactic: "${matchedUrgency.phrase}"`,
            category: 'urgent_pressure',
            categoryLabel: 'Urgent Pressure',
            points: matchedUrgency.points,
            description: `Contains artificial deadline pressure ("${matchedUrgency.phrase}"). Scammers pressure victims to accept and transfer money before performing due diligence.`,
            severity: 'warning'
        };
        warningSigns.push(item);
        scoreBreakdown.push({
            id: item.id,
            category: 'Urgent Pressure',
            ruleName: `Keyword: "${matchedUrgency.phrase}"`,
            points: matchedUrgency.points,
            description: matchedUrgency.reason
        });
    }
    // RULE 4: SUSPICIOUS EMAIL & DOMAIN PATTERNS
    if (emailDomain) {
        const isFreeEmail = FREE_EMAIL_PROVIDERS.includes(emailDomain);
        const claimsEnterprise = PROMINENT_ENTERPRISES.some(ent => companyClean.includes(ent));
        if (isFreeEmail && claimsEnterprise) {
            score += 30;
            const item = {
                id: 'rule-email-enterprise-impersonation',
                title: `Enterprise Impersonation via Free Email (@${emailDomain})`,
                category: 'suspicious_email',
                categoryLabel: 'Suspicious Email',
                points: 30,
                description: `The offer claims to represent ${input.companyName}, but outreach originates from a public free email account (@${emailDomain}). Established companies never use free webmail for recruitment.`,
                severity: 'critical'
            };
            warningSigns.push(item);
            scoreBreakdown.push({
                id: item.id,
                category: 'Suspicious Email',
                ruleName: 'Corporate Free Webmail Impersonation',
                points: 30,
                description: `Claims enterprise but uses free public @${emailDomain}`
            });
        }
        else if (isFreeEmail) {
            score += 15;
            const item = {
                id: 'rule-email-free-webmail',
                title: `Public Webmail Provider Used (@${emailDomain})`,
                category: 'suspicious_email',
                categoryLabel: 'Suspicious Email',
                points: 15,
                description: `The recruiter uses an unverified public mailbox (@${emailDomain}) rather than an organizational domain.`,
                severity: 'warning'
            };
            warningSigns.push(item);
            scoreBreakdown.push({
                id: item.id,
                category: 'Suspicious Email',
                ruleName: `Public Domain: @${emailDomain}`,
                points: 15,
                description: 'Recruitment outreach conducted from free webmail'
            });
        }
        else if (input.officialWebsite) {
            const cleanWebsite = input.officialWebsite.toLowerCase()
                .replace(/^https?:\/\//, '')
                .replace(/^www\./, '')
                .split('/')[0];
            if (emailDomain.includes(cleanWebsite) || cleanWebsite.includes(emailDomain)) {
                positiveSignals.push({
                    id: 'signal-matching-domain',
                    title: 'Verified Domain Consistency',
                    description: `The recruiter email domain (@${emailDomain}) aligns with the provided company website (${cleanWebsite}).`
                });
            }
            else {
                score += 15;
                const item = {
                    id: 'rule-email-mismatched-domain',
                    title: 'Domain Mismatch Between Email & Website',
                    category: 'suspicious_email',
                    categoryLabel: 'Suspicious Email',
                    points: 15,
                    description: `Recruiter email (@${emailDomain}) does not correspond to the stated website (${cleanWebsite}). Watch out for typosquatted or proxy domains.`,
                    severity: 'warning'
                };
                warningSigns.push(item);
                scoreBreakdown.push({
                    id: item.id,
                    category: 'Suspicious Email',
                    ruleName: 'Website / Email Mismatch',
                    points: 15,
                    description: `@${emailDomain} differs from website ${cleanWebsite}`
                });
            }
        }
        else {
            positiveSignals.push({
                id: 'signal-corporate-email',
                title: 'Custom Corporate Email Domain',
                description: `Recruiter outreach originates from a private corporate email domain (@${emailDomain}).`
            });
        }
    }
    // RULE 5: VAGUE JOB DESCRIPTIONS
    const descWordCount = input.jobDescription.trim().split(/\s+/).filter(Boolean).length;
    if (descWordCount < 25) {
        score += 10;
        const item = {
            id: 'rule-vague-short-description',
            title: 'Excessively Brief / Vague Job Responsibilities',
            category: 'vague_description',
            categoryLabel: 'Vague Description',
            points: 10,
            description: 'The job posting provides under 25 words with minimal information regarding actual deliverables, technical stack, or project scope.',
            severity: 'warning'
        };
        warningSigns.push(item);
        scoreBreakdown.push({
            id: item.id,
            category: 'Vague Description',
            ruleName: 'Minimal Job Detail (< 25 words)',
            points: 10,
            description: 'Posting lacks concrete responsibilities or tech stack'
        });
    }
    else {
        positiveSignals.push({
            id: 'signal-detailed-description',
            title: 'Detailed Job Description',
            description: 'The opportunity posting provides substantive context regarding responsibilities and scope.'
        });
    }
    // RULE 6: SENSITIVE INFORMATION DEMANDED PREMATURELY
    const matchedSensitive = SENSITIVE_DATA_RULES.find(r => combinedText.includes(r.phrase));
    if (matchedSensitive) {
        score += matchedSensitive.points;
        const item = {
            id: 'rule-sensitive-info-demand',
            title: `Premature Sensitive Information Request: "${matchedSensitive.phrase}"`,
            category: 'sensitive_info',
            categoryLabel: 'Sensitive Information',
            points: matchedSensitive.points,
            description: `Demands banking, tax, or government identity documentation ("${matchedSensitive.phrase}") early in the process. Sensitive credentials should only be provided post-written-offer via secure HR onboarding systems.`,
            severity: 'critical'
        };
        warningSigns.push(item);
        scoreBreakdown.push({
            id: item.id,
            category: 'Sensitive Information',
            ruleName: `Keyword: "${matchedSensitive.phrase}"`,
            points: matchedSensitive.points,
            description: matchedSensitive.reason
        });
    }
    // Channel & interview format check
    if (input.communicationChannel === 'telegram') {
        score += 15;
        const item = {
            id: 'rule-channel-telegram',
            title: 'Communication Exclusively on Telegram',
            category: 'urgent_pressure',
            categoryLabel: 'Communication Channel',
            points: 15,
            description: 'Recruitment conducted exclusively on Telegram. Anonymous messaging apps make fraudulent actors difficult to trace.',
            severity: 'warning'
        };
        warningSigns.push(item);
        scoreBreakdown.push({
            id: item.id,
            category: 'Communication Channel',
            ruleName: 'Anonymous Telegram Outreach',
            points: 15,
            description: 'High risk platform favored by task scammers'
        });
    }
    else if (input.interviewConducted === 'none' || input.interviewConducted === 'unsolicited_offer') {
        score += 15;
        const item = {
            id: 'rule-no-interview-selection',
            title: 'Instant Selection Without Technical / HR Screening',
            category: 'vague_description',
            categoryLabel: 'Hiring Process',
            points: 15,
            description: 'An offer issued without an application or live screening interview is a common indicator of mass-outreach scams.',
            severity: 'warning'
        };
        warningSigns.push(item);
        scoreBreakdown.push({
            id: item.id,
            category: 'Hiring Process',
            ruleName: 'Offer Without Screening',
            points: 15,
            description: 'No technical assessment or interview was conducted'
        });
    }
    const rawCalculatedScore = score;
    const finalScore = Math.min(100, Math.max(0, score));
    let riskLabel = 'Low';
    let level = 'safe';
    let summary = 'Few or no common scam indicators detected. The opportunity aligns with standard hiring practices.';
    if (finalScore >= 65) {
        riskLabel = 'High';
        level = 'high';
        summary = `High Risk (${finalScore}/100): Multiple high-confidence warning indicators detected. Exercise extreme caution.`;
    }
    else if (finalScore >= 30) {
        riskLabel = 'Medium';
        level = 'moderate';
        summary = `Medium Risk (${finalScore}/100): Several warning patterns identified. Verify the employer independently before sharing data.`;
    }
    else {
        riskLabel = 'Low';
        level = finalScore > 10 ? 'low' : 'safe';
        summary = `Low Risk (${finalScore}/100): Few or no overt scam indicators detected. Practice standard due diligence.`;
    }
    const safetyAdvice = [];
    if (finalScore >= 65) {
        safetyAdvice.push('Never transfer money, purchase gift cards, or pay refundable fees under any circumstances.');
        safetyAdvice.push('Do NOT provide bank account numbers, OTPs, Aadhaar, PAN card, or passport copies over chat or email.');
        safetyAdvice.push('Contact the employer directly through their official career website (do not use phone numbers or emails provided in the message).');
        safetyAdvice.push('Search LinkedIn to verify whether the recruiter actually works at the stated company.');
    }
    else if (finalScore >= 30) {
        safetyAdvice.push('Cross-reference the recruiter\'s email domain with the company\'s official web address.');
        safetyAdvice.push('Request a live video interview before agreeing to any offer terms or sharing personal documents.');
        safetyAdvice.push('Verify that the job requisition ID is listed on the company\'s verified careers portal.');
    }
    else {
        safetyAdvice.push('Always confirm offer letters through the organization\'s official HR department.');
        safetyAdvice.push('Ensure equipment and work assets are shipped directly by the employer at zero cost to you.');
        safetyAdvice.push('Review the formal written contract and non-disclosure terms carefully before signing.');
    }
    return {
        score: finalScore,
        riskLabel,
        level,
        summary,
        warningSigns,
        redFlags: warningSigns,
        greenFlags: positiveSignals,
        safetyAdvice,
        recommendations: safetyAdvice,
        disclaimer: DISCLAIMER_TEXT,
        scoreBreakdown,
        rawCalculatedScore
    };
}
/**
 * Deterministic Recruiter Message Scanner
 * Scans pasted text messages (WhatsApp, Email, SMS, LinkedIn, Telegram)
 * Highlights suspicious phrases, scores risk, and provides explainable points breakdown
 */
export function analyzeRecruiterMessage(message, channel) {
    const highlightedPhrases = [];
    const scoreBreakdown = [];
    let score = 0;
    const lowerText = message.toLowerCase();
    // 1. Advance Fee Check
    ADVANCE_FEE_RULES.forEach(rule => {
        if (lowerText.includes(rule.phrase)) {
            // Find matching text in original message preserving case
            const idx = lowerText.indexOf(rule.phrase);
            const originalMatched = idx !== -1 ? message.substring(idx, idx + rule.phrase.length) : rule.phrase;
            // Prevent duplicates in highlight list
            if (!highlightedPhrases.some(h => h.text.toLowerCase() === rule.phrase)) {
                highlightedPhrases.push({
                    text: originalMatched,
                    category: 'advance_fees',
                    categoryLabel: 'Advance Fee',
                    points: rule.points,
                    reason: rule.reason
                });
                score += rule.points;
                scoreBreakdown.push({
                    id: `msg-fee-${rule.phrase}`,
                    category: 'Advance Fee Demand',
                    ruleName: `"${rule.phrase}"`,
                    points: rule.points,
                    description: rule.reason
                });
            }
        }
    });
    // 2. Unrealistic Salaries Check
    UNREALISTIC_SALARY_RULES.forEach(rule => {
        if (lowerText.includes(rule.phrase)) {
            const idx = lowerText.indexOf(rule.phrase);
            const originalMatched = idx !== -1 ? message.substring(idx, idx + rule.phrase.length) : rule.phrase;
            if (!highlightedPhrases.some(h => h.text.toLowerCase() === rule.phrase)) {
                highlightedPhrases.push({
                    text: originalMatched,
                    category: 'unrealistic_salary',
                    categoryLabel: 'Unrealistic Salary',
                    points: rule.points,
                    reason: rule.reason
                });
                score += rule.points;
                scoreBreakdown.push({
                    id: `msg-salary-${rule.phrase}`,
                    category: 'Unrealistic Salary Promise',
                    ruleName: `"${rule.phrase}"`,
                    points: rule.points,
                    description: rule.reason
                });
            }
        }
    });
    // 3. Urgent Pressure Check
    URGENT_PRESSURE_RULES.forEach(rule => {
        if (lowerText.includes(rule.phrase)) {
            const idx = lowerText.indexOf(rule.phrase);
            const originalMatched = idx !== -1 ? message.substring(idx, idx + rule.phrase.length) : rule.phrase;
            if (!highlightedPhrases.some(h => h.text.toLowerCase() === rule.phrase)) {
                highlightedPhrases.push({
                    text: originalMatched,
                    category: 'urgent_pressure',
                    categoryLabel: 'Urgent Pressure',
                    points: rule.points,
                    reason: rule.reason
                });
                score += rule.points;
                scoreBreakdown.push({
                    id: `msg-urgency-${rule.phrase}`,
                    category: 'Urgent Pressure Tactic',
                    ruleName: `"${rule.phrase}"`,
                    points: rule.points,
                    description: rule.reason
                });
            }
        }
    });
    // 4. Suspicious Links Check (Regex)
    SUSPICIOUS_LINK_PATTERNS.forEach(pattern => {
        const matches = message.match(pattern.regex);
        if (matches) {
            matches.forEach(matchText => {
                if (!highlightedPhrases.some(h => h.text === matchText)) {
                    highlightedPhrases.push({
                        text: matchText,
                        category: 'suspicious_link',
                        categoryLabel: 'Suspicious Link',
                        points: pattern.points,
                        reason: `${pattern.label}: ${pattern.reason}`
                    });
                    score += pattern.points;
                    scoreBreakdown.push({
                        id: `msg-link-${matchText}`,
                        category: 'Suspicious Link Detected',
                        ruleName: pattern.label,
                        points: pattern.points,
                        description: `${pattern.reason} (${matchText})`
                    });
                }
            });
        }
    });
    // 5. Sensitive Data Requests
    SENSITIVE_DATA_RULES.forEach(rule => {
        if (lowerText.includes(rule.phrase)) {
            const idx = lowerText.indexOf(rule.phrase);
            const originalMatched = idx !== -1 ? message.substring(idx, idx + rule.phrase.length) : rule.phrase;
            if (!highlightedPhrases.some(h => h.text.toLowerCase() === rule.phrase)) {
                highlightedPhrases.push({
                    text: originalMatched,
                    category: 'sensitive_data',
                    categoryLabel: 'Sensitive Data Request',
                    points: rule.points,
                    reason: rule.reason
                });
                score += rule.points;
                scoreBreakdown.push({
                    id: `msg-data-${rule.phrase}`,
                    category: 'Sensitive Data Request',
                    ruleName: `"${rule.phrase}"`,
                    points: rule.points,
                    description: rule.reason
                });
            }
        }
    });
    // 6. Free webmail in text claiming major corporate
    FREE_EMAIL_PROVIDERS.forEach(provider => {
        if (lowerText.includes(`@${provider}`)) {
            const hasEnterprise = PROMINENT_ENTERPRISES.some(ent => lowerText.includes(ent));
            const points = hasEnterprise ? 30 : 15;
            const reason = hasEnterprise
                ? `Recruiter claims enterprise employer but uses free public @${provider}`
                : `Uses generic public webmail (@${provider})`;
            if (!highlightedPhrases.some(h => h.text.toLowerCase().includes(`@${provider}`))) {
                highlightedPhrases.push({
                    text: `@${provider}`,
                    category: 'other',
                    categoryLabel: 'Free Webmail',
                    points,
                    reason
                });
                score += points;
                scoreBreakdown.push({
                    id: `msg-email-${provider}`,
                    category: 'Suspicious Email Domain',
                    ruleName: `@${provider}`,
                    points,
                    description: reason
                });
            }
        }
    });
    // 7. Channel specific baseline weight
    if (channel === 'telegram') {
        score += 15;
        scoreBreakdown.push({
            id: 'msg-channel-telegram',
            category: 'Communication Channel',
            ruleName: 'Telegram Outreach',
            points: 15,
            description: 'Anonymous messaging service frequently used by task scam syndicates.'
        });
    }
    else if (channel === 'whatsapp' && highlightedPhrases.length > 0) {
        score += 10;
        scoreBreakdown.push({
            id: 'msg-channel-whatsapp',
            category: 'Communication Channel',
            ruleName: 'Unsolicited WhatsApp Message',
            points: 10,
            description: 'Cold recruitment message received on private messaging.'
        });
    }
    const finalScore = Math.min(100, Math.max(0, score));
    let riskLabel = 'Low';
    let summary = 'No high-risk scam triggers identified in the pasted message.';
    if (finalScore >= 65) {
        riskLabel = 'High';
        summary = `High Risk Message (${finalScore}/100): Contains critical scam indicators such as advance fee demands or deceptive links.`;
    }
    else if (finalScore >= 30) {
        riskLabel = 'Medium';
        summary = `Medium Risk Message (${finalScore}/100): Suspicious patterns detected. Do not click links or share confidential documents.`;
    }
    else {
        riskLabel = 'Low';
        summary = `Low Risk Message (${finalScore}/100): Message appears consistent with standard communication. Exercise normal due diligence.`;
    }
    const safetyAdvice = [];
    if (finalScore >= 65) {
        safetyAdvice.push('Do NOT click on any links in the message, especially Telegram invite links or shortened URLs.');
        safetyAdvice.push('Never send any money, UPI transfers, or registration deposits.');
        safetyAdvice.push('Block and report the sender on WhatsApp / Telegram / SMS immediately.');
        safetyAdvice.push('Never share Aadhaar, PAN card, bank details, or OTP verification codes.');
    }
    else if (finalScore >= 30) {
        safetyAdvice.push('Ask the sender for their official corporate email address ending in the company domain.');
        safetyAdvice.push('Search the company\'s official website to confirm if the recruiter and role actually exist.');
        safetyAdvice.push('Insist on a live video interview before sharing resumes with contact details.');
    }
    else {
        safetyAdvice.push('Verify the recruiter\'s identity and company presence on LinkedIn.');
        safetyAdvice.push('Confirm that the official job requisition exists on the employer careers portal.');
    }
    return {
        id: `msg-${Date.now()}`,
        score: finalScore,
        riskLabel,
        summary,
        originalMessage: message,
        channel,
        highlightedPhrases,
        scoreBreakdown,
        safetyAdvice,
        disclaimer: DISCLAIMER_TEXT
    };
}
