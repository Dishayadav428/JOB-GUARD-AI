# JobGuard – Fake Internship & Job Checker

**JobGuard** is an open-source, local-first web application designed to help students, recent graduates, and job seekers detect fraudulent job offers, fake internships, task/deposit scams, and recruiter impersonation.

---

## Features

- **Job & Internship Heuristic Scanner**: Checks compensation, fee requests, interview stages, communication channels, and keywords for scam patterns.
- **Scam Risk Scoring (0–100%)**: Instant visual risk assessment with severity categorization (Critical, Warning, Low, Safe).
- **Red & Green Flag Breakdown**: Explains specifically why an offer is suspicious or authentic.
- **Demo Presets**: 1-click test cases for Telegram task scams, fake enterprise recruiters, and genuine offers.
- **Recruiter Email & Domain Authenticity Verifier**: Detects public webmail impersonation (@gmail.com claiming to be major companies) and lookalike phishing domains.
- **Offer Letter Safety Checklist**: Interactive 8-point verification checklist with real-time safety index calculation.
- **Scam Pattern Encyclopedia**: Learn the anatomy of the most common student/fresher employment scams.
- **Privacy First & Zero Cost**: Runs 100% in the browser locally without third-party tracking, resume data harvesting, or paid APIs.

---

## Local Setup & Development

### 1. Prerequisites
- Node.js (v18 or higher)
- npm

### 2. Run Locally
```bash
# Start development server
npm run dev
```

The application will be available at: `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
npm run preview
```
