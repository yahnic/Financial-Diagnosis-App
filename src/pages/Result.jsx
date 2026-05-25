import { useMemo } from "react";

import { diagnose } from "../utils/financialEngine";
import { saveReport } from "../utils/storage";
import { downloadPDF } from "../utils/exportPDF";

import ScoreMeter from "../components/ScoreMeter";
import RiskMap from "../components/RiskMap";
import AllocationSplit from "../components/AllocationSplit";
import PortfolioPieChart from "../components/PortfolioPieChart";

import { explainDiagnosis } from "../utils/aiExplainV2";
import { generateStory } from "../utils/reportStory";
import { smartRebalance } from "../utils/rebalanceV2";
import AdvisorChat from "../components/AdvisorChat";
import InvestmentSimulator from "../components/InvestmentSimulator";

export default function Result({ answers, restart }) {
  const result = useMemo(() => diagnose(answers), [answers]);

  const explanation = explainDiagnosis(result, answers);
  const story = generateStory(result);
  const rebalance = smartRebalance(result);

  function handleSave() {
    saveReport({
      id: Date.now(),
      date: new Date().toISOString(),
      answers,
      result,
    });

    alert("Report saved");
  }

  function handleDownload() {
    downloadPDF({
      answers,
      result,
      story,
    });
  }

  function shareWhatsApp() {
    const text = `
📊 My Financial Diagnosis

Score: ${result.score}/100
Level: ${result.level}

🌍 Global Readiness: ${result.globalScore}/100

💼 Investments:
${(result.investments || []).join(", ")}

💡 Advice:
${(result.advice || []).join(", ")}
`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  }

  return (
    <div className="container">
      <h1>Financial Diagnosis Report</h1>

      {/* SCORE */}
      <ScoreMeter score={result.score} />

      <hr />

      {/* SUMMARY */}
      <h2>{result.level}</h2>

      <p>
        Global Readiness: <strong>{result.globalScore}/100</strong>
      </p>

      <p>{result.globalRecommendation}</p>

      <hr />

      {/* INVESTMENTS */}
      <h3>Recommended Investments</h3>
      <ul>
        {(result.investments || []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <hr />
      <InvestmentSimulator />
      <hr />

      {/* PORTFOLIO VISUAL */}
      <h3>Portfolio Visualization</h3>
      <PortfolioPieChart split={result.allocationSplit} />

      <hr />

      {/* ADVICE */}
      <h3>Financial Advice</h3>
      <ul>
        {(result.advice || []).length ? (
          result.advice.map((a) => <li key={a}>{a}</li>)
        ) : (
          <li>Keep building consistency.</li>
        )}
      </ul>

      <hr />

      {/* AI EXPLANATION */}
      <h3>AI Explanation</h3>
      <p>{explanation}</p>

      <hr />

      {/* STORY */}
      <h3>Your Financial Story</h3>
      <div className="card">
        <p>{story}</p>
      </div>

      <hr />

      {/* RISK MAP (FIXED) */}
      <RiskMap result={result} />

      <hr />

      {/* ALLOCATION TABLE */}
      <AllocationSplit split={result.allocationSplit} />

      <hr />
      <AdvisorChat result={result} />
      <hr />

      {/* REBALANCING */}
      <h3>Smart Rebalancing</h3>
      <ul>
        {(rebalance || []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <hr />

      {/* ACTION BUTTONS */}
      <div className="actions">
        <button onClick={handleSave}>Save Report</button>

        <button onClick={handleDownload}>Download PDF</button>

        <button onClick={shareWhatsApp}>Share WhatsApp</button>

        <button onClick={restart}>Start Again</button>
      </div>
    </div>
  );
}
