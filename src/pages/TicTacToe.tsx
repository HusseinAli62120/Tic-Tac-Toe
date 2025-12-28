import { useState, useEffect } from "react";
import Square from "../components/Square";
import type { result } from "../types/result";
import calculateWinner from "../utils/calculateWinner";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<String | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);

  useEffect(() => {
    const result: result | null = calculateWinner(squares);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      // If all squares are filled and no winner, it's a draw
    } else if (!squares.includes(null)) {
      setWinner("Draw");
    }
  }, [squares]);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  const status = winner
    ? winner === "Draw"
      ? "It's a Draw!"
      : `Winner: ${winner}`
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 font-sans bg-slate-950">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-400 to-rose-400 bg-clip-text text-transparent mb-2">
          Tic Tac Toe
        </h1>
        <div
          className={`text-xl font-medium px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 inline-block transition-colors duration-300
          ${
            winner && winner !== "Draw"
              ? "text-green-400 border-green-500/50"
              : "text-gray-300"
          }
        `}
        >
          {status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 bg-gray-900 p-4 rounded-2xl shadow-2xl border border-gray-800">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handleClick(i)}
            isWinningSquare={winningLine.includes(i)}
          />
        ))}
      </div>

      <button
        onClick={resetGame}
        className={`px-6 py-3  bg-linear-to-r from-blue-400 to-rose-400 hover:from-blue-500 hover:to-rose-500
         text-white font-bold rounded-lg shadow-lg transform ${
           winner ? "scale-105" : "scale-0"
         } transition-transform  hover:-translate-y-0.5 active:translate-y-0 active:shadow-md ring-2 ring-blue-500/20`}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
