// pages/games/DealFlow.jsx
import { useState } from "react";
import { boardSpaces } from "../../data/boardSpaces";
import OpportunityModal from "../../components/OpportunityModal";

// Constants
const FINANCIAL_FREEDOM = 200000; // passive income target per turn
const BANKRUPTCY_LIMIT = 0;

export default function DealFlow() {
  // Game state
  const [players, setPlayers] = useState([
    { id: 1, name: "You", cash: 1000000, assets: [], position: 0 },
    { id: 2, name: "AI", cash: 1000000, assets: [], position: 0 },
  ]);

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);
  const [modalOpportunity, setModalOpportunity] = useState(null);
  const [gameStatus, setGameStatus] = useState("playing"); // playing | won | lost
  const [economyPhase, setEconomyPhase] = useState("stable"); // boom | stable | recession

  // --- Helper Functions ---

  const calculatePassiveIncome = (player) => {
    let multiplier = 1;
    if (economyPhase === "boom") multiplier = 1.5;
    else if (economyPhase === "recession") multiplier = 0.6;

    return player.assets.reduce(
      (sum, asset) => sum + (asset.passiveIncome || 0) * multiplier,
      0,
    );
  };

  const calculateNetWorth = (player) => {
    const assetValue = player.assets.reduce((sum, a) => sum + a.cost, 0);
    return player.cash + assetValue;
  };

  const aiShouldBuy = (space, aiPlayer) => {
    if (!space || aiPlayer.cash < space.cost) return false;

    const multiplier =
      economyPhase === "boom" ? 1.5 : economyPhase === "recession" ? 0.6 : 1;

    if (economyPhase === "recession")
      return space.passiveIncome * multiplier > 15000;
    if (economyPhase === "boom") return aiPlayer.cash > 200000;
    return space.passiveIncome > 8000;
  };

  const randomizeEconomy = () => {
    const roll = Math.random();
    if (roll < 0.2) setEconomyPhase("recession");
    else if (roll > 0.8) setEconomyPhase("boom");
    else setEconomyPhase("stable");
  };

  const checkBankruptcy = (player) => {
    if (player.cash <= BANKRUPTCY_LIMIT) {
      setGameStatus("lost");
      alert(`${player.name} is bankrupt! Game Over.`);
    }
  };

  const checkWin = (players) => {
    const winner = players.find(
      (p) => calculatePassiveIncome(p) >= FINANCIAL_FREEDOM,
    );
    if (winner) {
      setGameStatus("won");
      alert(`${winner.name} achieved Financial Freedom! 🏆`);
    }
  };

  // --- Roll Dice + Turn Logic ---
  const rollDice = () => {
    if (gameStatus !== "playing") return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);

    const updatedPlayers = [...players];
    const player = updatedPlayers[currentPlayer];
    let newPosition = (player.position + roll) % boardSpaces.length;
    player.position = newPosition;

    const space = boardSpaces[newPosition];

    // Apply passive income
    player.cash += calculatePassiveIncome(player);

    // Handle space
    if (space.type === "Opportunity") {
      if (!space.owner) {
        if (player.id === 1) {
          // Human → open modal
          setModalOpportunity(space);
        } else {
          // AI decision
          if (aiShouldBuy(space, player)) {
            player.cash -= space.cost;
            space.owner = player.id;
            player.assets.push(space);
          }
        }
      } else if (space.owner !== player.id) {
        // Rent
        const rent = Math.floor((space.passiveIncome || 0) * 0.5);
        player.cash -= rent;
        const owner = updatedPlayers.find((p) => p.id === space.owner);
        if (owner) owner.cash += rent;
      }
    }

    if (space.type === "Tax") {
      player.cash -= space.amount;
    }

    if (space.type === "Event") {
      player.cash += space.effect;
    }

    // Randomize economy sometimes
    if (Math.random() < 0.3) randomizeEconomy();

    setPlayers(updatedPlayers);

    // Check win/loss
    checkBankruptcy(player);
    checkWin(updatedPlayers);

    // Next turn (if human needs to buy → modal opens first)
    if (player.id !== 1 || space.type !== "Opportunity" || space.owner) {
      setCurrentPlayer((prev) => (prev + 1) % players.length);
      setDiceRoll(null);
    }
  };

  // Buy opportunity (human)
  const buyOpportunity = (oppId) => {
    const updatedPlayers = [...players];
    const player = updatedPlayers[currentPlayer];
    const space = boardSpaces.find((b) => b.id === oppId);

    if (player.cash >= space.cost) {
      player.cash -= space.cost;
      space.owner = player.id;
      player.assets.push(space);
      setPlayers(updatedPlayers);
      setModalOpportunity(null);
      setCurrentPlayer((prev) => (prev + 1) % players.length);
      setDiceRoll(null);
    } else {
      alert("Not enough cash!");
    }
  };

  return (
    <div className="container">
      <h1>Deal Flow (Monopoly Lite)</h1>

      {/* Dice Roll */}
      <div className="card">
        <h3>Dice Roll</h3>
        <p>{diceRoll ? `Rolled: ${diceRoll}` : "Roll the dice to start"}</p>
        <button onClick={rollDice} disabled={gameStatus !== "playing"}>
          Roll Dice
        </button>
      </div>

      {/* Players */}
      <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
        {players.map((p, index) => (
          <div
            key={p.id}
            className="card"
            style={{
              border:
                index === currentPlayer ? "2px solid green" : "1px solid #ccc",
            }}
          >
            <h3>{p.name}</h3>
            <p>Cash: ₦{p.cash.toLocaleString()}</p>
            <p>Position: {p.position}</p>
            <p>Assets: {p.assets.map((a) => a.title).join(", ") || "None"}</p>
            <p>
              Passive Income/Turn: ₦{calculatePassiveIncome(p).toLocaleString()}
            </p>
            <p>Net Worth: ₦{calculateNetWorth(p).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Game Status */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Game Status</h3>
        <p>Status: {gameStatus}</p>
        <p>Economy: {economyPhase}</p>
        {gameStatus !== "playing" && (
          <button onClick={() => window.location.reload()}>Restart Game</button>
        )}
      </div>

      {/* Opportunity Modal */}
      {modalOpportunity && (
        <OpportunityModal
          opportunity={modalOpportunity}
          onBuy={() => buyOpportunity(modalOpportunity.id)}
          onClose={() => setModalOpportunity(null)}
        />
      )}
    </div>
  );
}
