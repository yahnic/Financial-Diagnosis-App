import { useState } from "react";
import questions from "../data/questions";

export default function Diagnosis({ answers, setAnswers, next }) {
  const [step, setStep] = useState(0);

  const question = questions[step];
  const total = questions.length;

  function handleNext() {
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      next();
    }
  }

  function handlePrev() {
    if (step > 0) setStep(step - 1);
  }

  function updateAnswer(value) {
    setAnswers({
      ...answers,
      [question.id]: value,
    });
  }

  return (
    <div className="container">
      {/* PROGRESS BAR */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            height: 8,
            background: "#ddd",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              height: 8,
              width: `${((step + 1) / total) * 100}%`,
              background: "var(--primary)",
              borderRadius: 10,
              transition: "0.3s",
            }}
          />
        </div>

        <p style={{ marginTop: 5 }}>
          Step {step + 1} of {total}
        </p>
      </div>

      {/* QUESTION TITLE */}
      <h2>{question.title}</h2>
      <p>{question.question}</p>

      {/* =========================
      INPUT TYPES
      ========================= */}

      {/* MULTI SELECT */}
      {question.type === "multi-select" ? (
        <div>
          {question.options.map((opt) => (
            <label
              key={opt}
              style={{
                display: "block",
                marginBottom: 10,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={answers[question.id]?.includes(opt) || false}
                onChange={(e) => {
                  const prev = answers[question.id] || [];

                  let updated;

                  if (e.target.checked) {
                    updated = [...prev, opt];
                  } else {
                    updated = prev.filter((x) => x !== opt);
                  }

                  updateAnswer(updated);
                }}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ) : (
        /* SINGLE SELECT */
        <select
          value={answers[question.id] || ""}
          onChange={(e) => updateAnswer(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 10,
          }}
        >
          <option value="">Select an option</option>

          {question.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {/* =========================
      NAVIGATION BUTTONS
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <button onClick={handlePrev} disabled={step === 0}>
          Previous
        </button>

        <button onClick={handleNext}>
          {step === total - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
