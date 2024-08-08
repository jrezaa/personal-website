"use client";

import Board from "@/components/Board";
import data from "./data";
import { useEffect, useState } from "react";

export default function Breaker() {
  const { player } = data;
  const [playerObj1, setPlayerObj1] = useState(player);
  const [gameOver1, setGameOver1] = useState(false);
  const [gameOver2, setGameOver2] = useState(false);
  const [playerObj2, setPlayerObj2] = useState(player);
  const [start1, setStart1] = useState(false);
  const [start2, setStart2] = useState(false);

  useEffect(() => {
    if (!gameOver1 || !gameOver2) return;

    if (playerObj1.score > playerObj2.score) {
      alert("PLAYER 1 WINS!");
    } else if (playerObj1.score < playerObj2.score) alert("PLAYER 2 WINS!");
    else {
      alert("TIE GAME!");
    }
  }, [gameOver1, gameOver2]);

  return (
    <>
      <h1>Brick breaker!</h1>
      {!gameOver1 || !gameOver2 ? (
        <div className="flex justify-center gap-20">
          {!gameOver1 ? (
            start1 ? (
              <Board
                playerNumber={1}
                playerObj={playerObj1}
                setPlayerObj={setPlayerObj1}
                setGameOver={setGameOver1}
                start={start1}
              />
            ) : (
              <button
                className="bg-[#134959] rounded w-[800px] hover:bg-[#3487a0]"
                onClick={() => setStart1(true)}
              >
                Start game?
              </button>
            )
          ) : (
            <h1>GAME OVER PLAYER 1</h1>
          )}
          {!gameOver2 ? (
            start2 ? (
              <Board
                playerNumber={2}
                playerObj={playerObj2}
                setPlayerObj={setPlayerObj2}
                setGameOver={setGameOver2}
                start={start2}
              />
            ) : (
              <button
                className="bg-[#134959] rounded w-[800px] h-[800px] hover:bg-[#3487a0]"
                onClick={() => setStart2(true)}
              >
                Start game?
              </button>
            )
          ) : (
            <h1>GAME OVER PLAYER 2</h1>
          )}
        </div>
      ) : (
        <div>
          <h1>
            {playerObj1.score > playerObj2.score
              ? "PLAYER 1 WINS"
              : playerObj2.score > playerObj1.score
              ? "PLAYER 2 WINS"
              : "TIE GAME"}
          </h1>
        </div>
      )}
    </>
  );
}
