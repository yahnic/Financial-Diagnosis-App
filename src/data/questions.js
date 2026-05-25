const questions = [
  /* =========================
SECTION 1: FINANCIAL VITAL SIGNS
========================= */

  {
    id: "income",
    title: "Income Health",
    question: "What is your monthly income after tax?",
    type: "select",
    options: ["Below ₦100k", "₦100k–₦300k", "₦300k–₦1m", "₦1m+"],
  },

  {
    id: "incomeType",
    title: "Income Type",
    question: "What best describes your income source?",
    type: "select",
    options: [
      "Stable Salary",
      "Business Income",
      "Freelance/Gig",
      "Multiple Streams",
    ],
  },

  {
    id: "incomeStability",
    title: "Income Stability",
    question: "How predictable is your income?",
    type: "select",
    options: ["Very Stable", "Somewhat Stable", "Unstable", "Very Unstable"],
  },

  {
    id: "dependents",
    title: "Dependents",
    question: "Do people depend on your income?",
    type: "select",
    options: ["No", "1–2 people", "3–5 people", "5+ people"],
  },

  {
    id: "emergencyFund",
    title: "Emergency Fund",
    question: "How many months can your savings cover?",
    type: "select",
    options: ["No savings", "1 month", "1–3 months", "3–6 months", "6+ months"],
  },

  {
    id: "debt",
    title: "Debt Status",
    question: "Do you currently owe money?",
    type: "select",
    options: ["No", "Small debt", "Moderate debt", "High debt"],
  },

  {
    id: "debtType",
    title: "Debt Type",
    question: "What type of debt do you have?",
    type: "select",
    options: [
      "No debt",
      "Loan apps",
      "Bank loan",
      "Business loan",
      "Credit card",
    ],
  },

  /* =========================
SECTION 2: RISK & PSYCHOLOGY
========================= */

  {
    id: "riskReaction",
    title: "Risk Reaction",
    question: "If your investment drops 30%, what do you do?",
    type: "select",
    options: ["Sell immediately", "Wait", "Buy more"],
  },

  {
    id: "panicSeller",
    title: "Emotional Behavior",
    question: "Have you ever panic-sold an investment?",
    type: "select",
    options: ["Yes", "No"],
  },

  {
    id: "investmentExperience",
    title: "Investment Experience",
    question: "What have you invested in before? (Select all that apply)",
    type: "multi-select",
    options: [
      "None",
      "Crypto",
      "Stocks",
      "Real Estate",
      "Treasury Bills",
      "Business",
      "Forex",
      "Agriculture",
    ],
  },

  {
    id: "inflationUnderstanding",
    title: "Financial Knowledge",
    question: "Do you understand inflation and currency depreciation?",
    type: "select",
    options: ["Yes", "No", "Somewhat"],
  },

  /* =========================
SECTION 3: GOALS
========================= */

  {
    id: "goalType",
    title: "Goal",
    question: "Why do you want to invest?",
    type: "select",
    options: [
      "Wealth Growth",
      "Monthly Income",
      "Retirement",
      "House",
      "School Fees",
      "Japa Plan",
      "Financial Freedom",
    ],
  },

  {
    id: "timeHorizon",
    title: "Time Horizon",
    question: "When will you need this money?",
    type: "select",
    options: ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"],
  },

  /* =========================
SECTION 4: NIGERIA CONTEXT
========================= */

  {
    id: "currencyExposure",
    title: "Currency Exposure",
    question: "Where is most of your money stored?",
    type: "select",
    options: [
      "Only Naira",
      "Mostly Naira",
      "Mixed (Naira + Dollar)",
      "Mostly Dollar",
    ],
  },

  {
    id: "inflationProtection",
    title: "Inflation Protection",
    question: "Do you actively protect against inflation?",
    type: "select",
    options: ["Yes", "No", "Not sure"],
  },

  /* =========================
SECTION 5: LIQUIDITY
========================= */

  {
    id: "liquidityNeed",
    title: "Liquidity Need",
    question: "How quickly might you need access to your money?",
    type: "select",
    options: [
      "Anytime (high liquidity)",
      "Within 1 month",
      "3–6 months",
      "Long term locked",
    ],
  },

  /* =========================
SECTION 6: KNOWLEDGE
========================= */

  {
    id: "investmentKnowledge",
    title: "Knowledge Level",
    question: "What do you understand well?",
    type: "select",
    options: [
      "Nothing",
      "Savings only",
      "Basic investing",
      "Advanced investing",
    ],
  },

  /* =========================
SECTION 7: BUSINESS VS INVESTING
========================= */

  {
    id: "businessOwner",
    title: "Business",
    question: "Do you run a business?",
    type: "select",
    options: ["No", "Yes - Small", "Yes - Growing", "Yes - Profitable"],
  },

  {
    id: "usdExposureInterest",
    title: "Global Investment Interest",
    question: "Are you interested in investing in US or global stocks?",
    type: "select",
    options: [
      "Yes, very interested",
      "Maybe, I want to learn",
      "No, I prefer Nigeria only",
    ],
  },
  {
    id: "usdComfort",
    title: "Dollar Exposure Comfort",
    question: "How comfortable are you holding assets in USD?",
    type: "select",
    options: ["Very comfortable", "Somewhat comfortable", "Not comfortable"],
  },

  {
    id: "globalAccess",
    title: "Access to Global Markets",
    question: "Do you currently have access to platforms like:",
    type: "select",
    options: [
      "Yes (e.g. Bamboo, Risevest, Trading apps)",
      "No",
      "I don’t know how to access it",
    ],
  },
  {
    id: "globalVsLocal",
    title: "Investment Geography Preference",
    question: "Where do you prefer investing?",
    type: "select",
    options: [
      "Nigeria only",
      "Mostly Nigeria",
      "Balanced Nigeria + Global",
      "Global only",
    ],
  },
  {
    id: "fxRiskUnderstanding",
    title: "FX Risk Awareness",
    question: "Do you understand how exchange rate affects your investments?",
    type: "select",
    options: ["Yes", "No", "Somewhat"],
  },
  {
    id: "investmentIntent",
    title: "Investment Purpose",
    question: "What is your primary investing goal?",
    type: "select",
    options: [
      "Preserve wealth",
      "Grow aggressively",
      "Generate monthly income",
      "Beat inflation",
      "Retirement planning",
    ],
  },
  {
    id: "marketCrashBehavior",
    title: "Market Crash Behavior",
    question: "If ALL your investments drop 40% in a crash, what do you do?",
    type: "select",
    options: ["Sell everything", "Do nothing", "Buy more", "Panic but hold"],
  },
  {
    id: "peerInfluence",
    title: "Social Influence Risk",
    question: "If friends are making money from crypto hype, what do you do?",
    type: "select",
    options: [
      "Join immediately",
      "Research first",
      "Ignore it",
      "Invest small amount only",
    ],
  },
  {
    id: "wealthTransition",
    title: "Wealth Progression",
    question: "What do you think will grow your wealth fastest?",
    type: "select",
    options: [
      "Saving money only",
      "Investing in stocks",
      "Starting a business",
      "Multiple income streams",
      "Not sure",
    ],
  },
];

export default questions;
