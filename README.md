# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


# Financial Diagnosis Questionnaire (Nigeria Edition)

Think of this like a medical checkup — before prescribing an investment, you first diagnose the person’s:

* Income health
* Risk tolerance
* Cash-flow stability
* Financial goals
* Emotional behavior with money
* Knowledge level
* Nigerian economic realities (inflation, naira depreciation, unstable policies, FX risk)

The goal is to determine:

1. What investments fit the person
2. What they should avoid
3. How to balance their portfolio
4. How much risk they can actually survive

---

# SECTION 1 — FINANCIAL VITAL SIGNS

These questions determine if the person is financially stable enough to invest.

### Income & Stability

1. What is your monthly income after tax?
2. Is your income:

   * Stable salary
   * Business income
   * Freelance/gig income
   * Multiple streams
3. How predictable is your income?
4. What happens if you stop working for 3 months?
5. Do you have dependents?
6. How many people rely on your income?

### Emergency Readiness

7. Do you have emergency savings?
8. How many months can your savings cover your expenses?
9. Where do you keep your emergency fund?
10. Have you ever sold investments because of an emergency?

### Debt Health

11. Do you currently owe money?
12. What type of debt?

* Credit
* Loan app debt
* Mortgage
* Business debt
* Car loan

13. What is the interest rate?
14. Is your debt growing faster than your income?
15. Are you using borrowed money to invest?

---

# SECTION 2 — INVESTMENT PERSONALITY TEST

This diagnoses risk tolerance.

### Emotional Risk Questions

16. If your investment drops by 30%, what would you do?

* Sell immediately
* Wait
* Buy more

17. Have you ever panic-sold?
18. Which scares you more:

* Losing money
* Missing opportunities

19. Do you check your investments daily?
20. Can you sleep peacefully during market crashes?

### Experience Level

21. Have you invested before?
22. What have you invested in?

* Crypto
* Stocks
* Real estate
* Treasury bills
* Cooperative
* Agriculture
* Forex
* Business

23. Which investment gave you losses?
24. Which gave you profits?
25. Do you understand compound interest?
26. Can you explain inflation?
27. Do you understand exchange-rate risk in Nigeria?

---

# SECTION 3 — GOAL DIAGNOSIS

Different goals need different investments.

### Financial Goals

28. Why do you want to invest?

* Wealth growth
* Monthly income
* Retirement
* School fees
* Japa plans
* House purchase
* Financial freedom

29. What is the exact amount you want to achieve?
30. By when?
31. Is this goal negotiable or compulsory?

### Time Horizon

32. When will you need the money?

* Less than 1 year
* 1–3 years
* 3–5 years
* 10+ years

33. Can you leave the money untouched?

---

# SECTION 4 — NIGERIA-SPECIFIC DIAGNOSIS

Very important in Nigeria because inflation and naira depreciation can destroy weak portfolios.

### Inflation & Currency Protection

34. Is your income in naira or dollars?
35. Do you have dollar savings?
36. What percentage of your wealth is exposed only to naira?
37. How do you protect yourself from inflation?
38. Have you ever lost purchasing power because your money sat in savings?
39. Are you interested in foreign investments?

### Economic Reality

40. Could your business/job be affected by government policy?
41. How exposed are you to fuel price increases?
42. How vulnerable are you to exchange-rate changes?
43. Do you understand the risk of “too good to be true” investments in Nigeria?

---

# SECTION 5 — LIQUIDITY TEST

This diagnoses how quickly the person may need cash.

44. How often do emergencies happen in your life?
45. Can you survive without touching investments?
46. How quickly might you need cash?
47. Do you prefer:

* Easy access to money
* Higher returns with locked money

---

# SECTION 6 — INVESTMENT KNOWLEDGE TEST

48. What investments do you actually understand?
49. Have you ever researched before investing?
50. Do you follow social media hype?
51. Have you invested because influencers said so?
52. Can you read a financial statement?
53. Do you know the difference between investing and gambling?

---

# SECTION 7 — BUSINESS VS PASSIVE INVESTMENT

Very important in Nigeria.

54. Would investing in your own business give higher returns?
55. Are you already running a profitable business?
56. Is your business scalable?
57. Would skills increase your income faster than investments?

---

# SECTION 8 — PORTFOLIO BALANCING DIAGNOSIS

For people already investing.

### Asset Allocation Questions

58. What percentage of your money is in:

* Cash
* Crypto
* Nigerian stocks
* US stocks
* Real estate
* Treasury bills
* Business
* Agriculture
* Gold
* Dollar assets

59. What investment dominates your portfolio?
60. Are you overexposed to one sector?
61. What percentage is high risk?
62. What percentage generates passive income?
63. What percentage beats inflation?
64. What percentage is liquid?

### Rebalancing Behavior

65. Do you rebalance regularly?
66. When profits come, do you diversify or double down?
67. Are your investments correlated?
68. If crypto crashes today, what happens to your net worth?

---

# SECTION 9 — FINANCIAL HEALTH SCORE

After answering, classify the person:

| Type                  | Diagnosis                   | Recommended Focus         |
| --------------------- | --------------------------- | ------------------------- |
| Survival Investor     | No savings, unstable income | Emergency fund + skills   |
| Conservative Investor | Wants safety                | T-bills, MMF, bonds       |
| Balanced Investor     | Moderate risk               | Diversified portfolio     |
| Growth Investor       | Long-term aggressive        | Stocks + business         |
| Speculative Investor  | High risk appetite          | Small crypto allocation   |
| Wealth Builder        | Strong income & discipline  | Global diversified assets |

---

# PORTFOLIO BALANCING FRAMEWORK (Nigeria Edition)

## 1. Emergency Layer (Foundation)

Goal: Protection

* 3–12 months emergency fund
* Money market fund
* Treasury bills
* High-liquidity savings

Suggested allocation:

* 10–30%

---

## 2. Stability Layer

Goal: Beat inflation safely

* FGN bonds
* Treasury bills
* Dollar savings
* Fixed income

Suggested allocation:

* 20–40%

---

## 3. Growth Layer

Goal: Long-term wealth

* Nigerian stocks
* US stocks
* ETFs
* Real estate
* Business expansion

Suggested allocation:

* 30–60%

---

## 4. Aggressive Layer

Goal: High upside

* Crypto
* Startups
* Speculative plays

Suggested allocation:

* 5–15% MAX for most people

---

# QUICK PORTFOLIO EXAMPLES

## Conservative Nigerian Worker

* 40% MMF/T-bills
* 30% Dollar assets
* 20% Stocks
* 10% Crypto

---

## Young Aggressive Investor

* 20% Emergency fund
* 30% Stocks
* 25% Business
* 15% Dollar assets
* 10% Crypto

---

## Business Owner

* 20% Liquidity
* 40% Business reinvestment
* 20% Real estate
* 10% Dollar hedge
* 10% Growth/speculative

---

# RED FLAGS A FINANCIAL DOCTOR SHOULD DETECT

🚨 No emergency fund
🚨 Investing with loan apps
🚨 100% crypto portfolio
🚨 No dollar exposure in Nigeria
🚨 Investing without understanding
🚨 Chasing unrealistic returns
🚨 Depending on one income source
🚨 Illiquid investments with unstable income
🚨 Emotional investing from social media hype

---

# Final Diagnosis Principle

The “best investment” is NOT the one with the highest returns.

It is the one that matches:

* The person’s income
* Risk tolerance
* Time horizon
* Financial goals
* Nigerian inflation reality
* Emotional discipline

A good portfolio should:

1. Survive emergencies
2. Beat inflation
3. Grow wealth
4. Generate opportunities
5. Protect against naira weakness
6. Reduce catastrophic risk
# Financial-Diagnosis-App
