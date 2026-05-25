import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Diagnosis from "./pages/Diagnosis";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";

import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [page, setPage] = useState("home");

  const [answers, setAnswers] = useState({});

  const [dark, setDark] = useState(false);

  // 🌐 OFFLINE / ONLINE STATE
  const [online, setOnline] = useState(navigator.onLine);

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
    <div className={dark ? "dark" : "light"}>
      {/* 🌙 Theme Toggle */}
      <ThemeToggle dark={dark} setDark={setDark} />

      {/* 🌐 Offline Banner */}
      {!online && (
        <div className="offline-banner">
          You are offline — data is saved locally
        </div>
      )}

      {/* NAVIGATION */}
      <div className="nav">
        <button onClick={() => setPage("home")}>Home</button>

        <button onClick={() => setPage("diagnosis")}>Diagnosis</button>

        <button onClick={() => setPage("dashboard")}>Dashboard</button>
      </div>

      {/* PAGES */}

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
    </div>
  );
}

export default App;
