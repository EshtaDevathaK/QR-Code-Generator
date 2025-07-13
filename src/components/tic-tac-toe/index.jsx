// 🧠 Grab the power to "remember things" and "react when things change"
import { useState, useEffect } from "react";

// 👕 Load the game's visual style (like dressing up your game!)
import "./styles.css";

// 🟦 This is just ONE square in the board
function Square({ value, onClick }) {
  return (
    // 🖱 This square listens for your click and shows X or O
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
}

// 🎮 This is the main brain of the game — the full Tic Tac Toe engine!
export default function TicTacToe() {
  // 🎲 The board has 9 slots (0-8), all empty at first ("")
  const [squares, setSquares] = useState(Array(9).fill(""));

  // ❌ Starts with X’s turn (true = X, false = O)
  const [isXTurn, setIsXTurn] = useState(true);

  // 📢 This text changes as the game plays (winner, draw, next turn)
  const [status, setStatus] = useState("");

  // 🧠 This function checks: "Do we have a winner?"
  function getWinner(squares) {
    // 📜 List of all winning combos (rows, cols, diagonals)
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    // 🔎 Loop through each winning combo and check if same symbol is there
    for (let i = 0; i < winningPatterns.length; i++) {
      const [x, y, z] = winningPatterns[i];

      // ✅ All 3 squares must be same and not empty
      if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
        return squares[x]; // 🔥 Boom! We have a winner (X or O)
      }
    }

    // 🚫 No winner found yet
    return null;
  }

  // 🖱 Called when a player clicks on a square
  function handleClick(squareIndex) {
    // 🧪 Always work on a copy (React’s rule for safe state updates)
    const newSquares = [...squares];

    // ❌ If someone already won or square is not empty — stop the move
    if (getWinner(newSquares) || newSquares[squareIndex]) return;

    // ✍️ Write "X" or "O" into the chosen square
    newSquares[squareIndex] = isXTurn ? "X" : "O";

    // 🔄 Flip the turn for the next player
    setIsXTurn(!isXTurn);

    // 💾 Save the new board state
    setSquares(newSquares);
  }

  // 🔁 Reset button clicked — start everything fresh!
  function handleRestart() {
    setIsXTurn(true);               // 🔄 X starts again
    setSquares(Array(9).fill("")); // 🧽 Clear the board
  }

  // 👀 Auto-update status whenever the board or turn changes
  useEffect(() => {
    const winner = getWinner(squares); // 🕵️ Find if someone has won

    if (!winner && squares.every((sq) => sq !== "")) {
      // ⛔ All boxes filled, no winner = Draw
      setStatus("This is a draw! Please restart the game");
    } else if (winner) {
      // 🎉 Announce the winner!
      setStatus(`Winner is ${winner}. Please restart the game`);
    } else {
      // 👉 Tell whose turn it is
      setStatus(`Next player is ${isXTurn ? "X" : "O"}`);
    }
  }, [squares, isXTurn]);

  // 🧾 Log current board state for dev eyes
  console.log(squares);

  // 🎨 This is the UI layout for the 3x3 grid
  return (
    <div className="tic-tac-toe-container">
      {/* 🔳 Top row */}
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>

      {/* 🔳 Middle row */}
      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>

      {/* 🔳 Bottom row */}
      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>

      {/* 📢 Show current game status */}
      <h1>{status}</h1>

      {/* 🔁 Restart the game when clicked */}
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}



// | 🔑 Keyword        | 💥 Meaning in Brain |
// | ----------------- | ------------------- |
// | `useState()`      | Brain Memory Box 📦 |
// | `useEffect()`     | Auto Reactor ⚙️     |
// | `setSquares()`    | Change Board 🛠     |
// | `isXTurn`         | Turn Tracker 🧭     |
// | `getWinner()`     | Referee Judge 👨‍⚖️ |
// | `handleClick()`   | Player's Move 🖱    |
// | `handleRestart()` | Fresh Start 🔄      |
// | `status`          | Game Voice 📣       |
