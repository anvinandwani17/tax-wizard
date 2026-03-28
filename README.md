<div align="center">
  <h1>🧙‍♂️ Tax Wizard AI</h1>
  <p><strong>Optimize Your Taxes with the Power of Generative AI</strong></p>
  <p><i>A smart, intuitive, and AI-powered Indian Income Tax calculator built for the future.</i></p>
</div>

---

## 🚀 Overview

**Tax Wizard AI** is a state-of-the-art Next.js web application designed to help users navigate the complexities of Indian Income Tax. Whether you are directly entering your salary details or uploading your Form 16, Tax Wizard instantly calculates your tax liabilities, visualizes the data, and most importantly—employs **Generative AI** to provide custom, personalized tax-saving advice tailored strictly to your financial profile.

Built as a sleek, modern solution for a Gen AI Hackathon!

## ✨ Key Features

- **🧠 Smart AI Tax Advisor:** Integrates OpenAI's GPT-4o-mini to analyze your income, deductions, and tax regime comparative data, generating plain-English (and Hinglish!) actionable tips to reduce your tax footprint.
- **📊 Precision Indian Tax Engine:** Fully updated logic for the latest tax regimes, incorporating standard deductions, Section 80C, HRA exemptions, Section 87A rebates, and Health/Education Cess.
- **📈 Interactive Data Visualization:** Utilizes Recharts to provide beautiful, responsive bar charts comparing the Old and New tax regimes at a glance.
- **📄 Form 16 Upload Simulation:** Designed to process and simulate OCR extraction of real Form 16 PDF documents, making data entry completely frictionless.
- **📥 One-Click PDF Reports:** Securely generate and download comprehensive `Tax_Record.pdf` breakdowns directly to your device via `jsPDF`.
- **🔊 Accessibility First:** Built-in Text-to-Speech functionality so users can listen to their tax summaries live.

## 🛠️ Technology Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend APIs:** Next.js API Routes (Serverless)
- **Generative AI:** OpenAI GPT API (`gpt-4o-mini`)
- **Libraries:** `recharts` (Visualization), `jspdf` (Report Generation)

## 💻 Getting Started

To run the Tax Wizard AI locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/anvinandwani17/tax-wizard.git
cd tax-wizard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a file named `.env.local` in the root of your project and add your OpenAI API Key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```
*(If you do not provide an API key, the app will gracefully fall back to a simulated AI response for demo purposes).*

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the Tax Wizard.

## 🏆 Hackathon Objective

This project leverages the fast real-time generative capabilities of LLMs to dynamically formulate personalized financial strategies on the fly. By turning dry tax math into human-readable advice, **Tax Wizard** demonstrates how Generative AI can democratize financial literacy and proactive tax planning.
