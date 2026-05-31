import { useEffect, useState } from "react";

import { Helmet } from "react-helmet";

import Home from "./pages/Home";
import Diagnosis from "./pages/Diagnosis";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";
import CompoundSimulator from "./pages/games/CompoundSimulator";
import InflationSurvivor from "./pages/games/InflationSurvivor";
import ThemeToggle from "./components/ThemeToggle";
import BudgetBoss from "./pages/games/BudgetBoss";

function App() {
  const [page, setPage] = useState("home");

  const [answers, setAnswers] = useState({});

  const [dark, setDark] = useState(false);

  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const handleOnline = () => setOnline(true);

    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);

      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Financial Diagnosis App | HappyInvest</title>

        <meta
          name="description"
          content="Discover your investor profile and get personalized investment recommendations."
        />

        <meta
          name="keywords"
          content="investment, Nigeria, finance, stocks, wealth"
        />
      </Helmet>

      <div className="app-shell">
        {/* TOP BAR */}

        <header className="topbar">
          <div>
            <h2>HappyInvest</h2>
          </div>

          <ThemeToggle dark={dark} setDark={setDark} />
        </header>

        {/* OFFLINE */}

        {!online && (
          <div className="offline-banner">
            You are offline — data is saved locally
          </div>
        )}

        {/* NAV */}

        <nav className="nav">
          <button onClick={() => setPage("home")}>Home</button>

          <button onClick={() => setPage("diagnosis")}>Diagnosis</button>

          <button onClick={() => setPage("dashboard")}>Dashboard</button>

          <button onClick={() => setPage("compound")}>
            Compound Simulator
          </button>
          <button onClick={() => setPage("inflation")}>
            Inflation Survivor
          </button>
          <button onClick={() => setPage("budget")}>Budget Boss</button>
        </nav>

        {/* PAGE AREA */}

        <main className="page-wrapper">
          {page === "home" && <Home start={() => setPage("diagnosis")} />}

          {page === "diagnosis" && (
            <Diagnosis
              answers={answers}
              setAnswers={setAnswers}
              next={() => setPage("result")}
            />
          )}

          {page === "result" && (
            <Result
              answers={answers}
              restart={() => {
                setAnswers({});

                setPage("home");
              }}
            />
          )}

          {page === "dashboard" && <Dashboard />}
          {page === "compound" && <CompoundSimulator />}
          {page === "inflation" && <InflationSurvivor />}
          {page === "budget" && <BudgetBoss />}
        </main>
      </div>
    </>
  );
}

export default App;
