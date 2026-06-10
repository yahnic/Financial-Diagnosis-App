import { useState } from "react";

import { businesses } from "../../data/businesses";

import { businessEvents } from "../../data/businessEvents";

import BusinessCard from "../../components/BusinessCard";

import BusinessReport from "../../components/BusinessReport";

import BusinessDecisionModal from "../../components/BusinessDecisionModal";

import {
  nextMonth,
  applyEvent,
  expandBusiness,
  hireStaff,
} from "../../utils/startupEngine";

export default function StartupSimulator() {
  const [business, setBusiness] = useState(null);

  const [cash, setCash] = useState(500000);

  const [month, setMonth] = useState(1);

  const [report, setReport] = useState(null);

  const [event, setEvent] = useState(null);

  function playMonth() {
    if (!business) return;

    const result = nextMonth(business);

    let newCash = cash + result.profit;

    const randomEvent =
      businessEvents[Math.floor(Math.random() * businessEvents.length)];

    newCash = applyEvent(newCash, randomEvent);

    setCash(newCash);

    setReport(result);

    setEvent(randomEvent);

    setMonth((prev) => prev + 1);
  }

  if (!business) {
    return (
      <div className="container">
        <h1>Startup Simulator</h1>

        {businesses.map((b) => (
          <BusinessCard key={b.id} business={b} select={setBusiness} />
        ))}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{business.name}</h1>

      <BusinessReport
        cash={cash}
        month={month}
        revenue={report?.revenue || 0}
        expenses={report?.expenses || 0}
        profit={report?.profit || 0}
      />

      {event && (
        <div className="card">
          <h3>Monthly Event</h3>

          <p>{event.title}</p>

          <p>Impact: ₦{event.effect.toLocaleString()}</p>
        </div>
      )}

      <BusinessDecisionModal
        expand={() => setBusiness(expandBusiness(business))}
        hire={() => setBusiness(hireStaff(business))}
      />

      <button onClick={playMonth}>Next Month</button>
    </div>
  );
}
