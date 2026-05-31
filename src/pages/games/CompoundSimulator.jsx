import { useState } from "react";

import { simulateInvestment } from "../../utils/wealthEngine";

import { investmentPresets } from "../../data/investmentPresets";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function CompoundSimulator() {
  const [selectedPreset, setSelectedPreset] = useState("mmf");

  const [form, setForm] = useState({
    initialInvestment: 100_000,

    monthlyContribution: 20000,

    annualReturn: 12,

    inflationRate: 25,

    taxRate: 10,

    years: 10,
  });

  function handlePresetChange(key) {
    const preset = investmentPresets[key];

    setSelectedPreset(key);

    setForm((prev) => ({
      ...prev,

      annualReturn: preset.annualReturn,

      taxRate: preset.taxRate,
    }));
  }

  const result = simulateInvestment(form);

  const chartData = result.yearlyData.map((item) => {
    const afterTax = item.value * (1 - form.taxRate / 100);

    const realValue =
      afterTax / Math.pow(1 + form.inflationRate / 100, item.year);

    return {
      year: item.year,

      nominal: Math.round(item.value),

      afterTax: Math.round(afterTax),

      real: Math.round(realValue),
    };
  });

  const inflationLoss = result.afterTaxValue - result.realValue;

  return (
    <div className="container">
      <h1>Compounding + Inflation Simulator</h1>

      <div className="card">
        <h3>Investment Type</h3>

        <select
          value={selectedPreset}
          onChange={(e) => handlePresetChange(e.target.value)}
        >
          {Object.entries(investmentPresets).map(([key, preset]) => (
            <option key={key} value={key}>
              {preset.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Initial Investment</label>

        <input
          type="number"
          value={form.initialInvestment}
          onChange={(e) =>
            setForm({
              ...form,

              initialInvestment: Number(e.target.value),
            })
          }
        />

        <label>Monthly Contribution</label>

        <input
          type="number"
          value={form.monthlyContribution}
          onChange={(e) =>
            setForm({
              ...form,

              monthlyContribution: Number(e.target.value),
            })
          }
        />

        <label>Annual Return %</label>

        <input
          type="number"
          value={form.annualReturn}
          onChange={(e) =>
            setForm({
              ...form,

              annualReturn: Number(e.target.value),
            })
          }
        />

        <label>Inflation %</label>

        <input
          type="number"
          value={form.inflationRate}
          onChange={(e) =>
            setForm({
              ...form,

              inflationRate: Number(e.target.value),
            })
          }
        />

        <label>Tax %</label>

        <input
          type="number"
          value={form.taxRate}
          onChange={(e) =>
            setForm({
              ...form,

              taxRate: Number(e.target.value),
            })
          }
        />

        <label>Years</label>

        <input
          type="number"
          value={form.years}
          onChange={(e) =>
            setForm({
              ...form,

              years: Number(e.target.value),
            })
          }
        />
      </div>

      {/* RESULTS */}

      <div className="card">
        <h2>Simulation Results</h2>

        <p>
          Portfolio Value:
          <strong>₦{result.finalValue.toLocaleString()}</strong>
        </p>

        <p>
          After Tax:
          <strong>₦{result.afterTaxValue.toLocaleString()}</strong>
        </p>

        <p>
          Tax Paid:
          <strong>₦{result.taxPaid.toLocaleString()}</strong>
        </p>

        <p>
          Real Purchasing Power:
          <strong>₦{result.realValue.toLocaleString()}</strong>
        </p>

        <p>
          Inflation Loss:
          <strong>₦{inflationLoss.toLocaleString()}</strong>
        </p>

        <p>
          Real Return:
          <strong>{result.realReturn}%</strong>
        </p>
      </div>

      {/* DIAGNOSIS */}

      <div className="card">
        <h2>Financial Diagnosis</h2>

        {result.realReturn < 0 ? (
          <>
            <h3>⚠️ Inflation Wins</h3>

            <p>Your investment grows on paper but loses purchasing power.</p>

            <p>
              Consider higher yielding assets, stocks, dollar assets or business
              investments.
            </p>
          </>
        ) : (
          <>
            <h3>✅ You Beat Inflation</h3>

            <p>
              Your investment growth exceeds inflation and is creating real
              wealth.
            </p>
          </>
        )}
      </div>

      {/* CHART */}

      <div className="card">
        <h2>Wealth Growth Chart</h2>

        <div
          style={{
            width: "100%",
            height: 450,
          }}
        >
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="nominal"
                name="Portfolio Value"
                stroke="#4caf50"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="afterTax"
                name="After Tax"
                stroke="#2196f3"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="real"
                name="Real Value"
                stroke="#ff5722"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* EDUCATIONAL SUMMARY */}

      <div className="card">
        <h2>What This Means</h2>

        <p>Many investors focus only on portfolio value.</p>

        <p>Real wealth is what remains after taxes and inflation.</p>

        <p>
          If inflation is 25% and your investment earns less than or equal to
          25%, you may be getting poorer even though your account balance
          increases.
        </p>
      </div>
    </div>
  );
}
