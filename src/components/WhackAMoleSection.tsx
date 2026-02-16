"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Board } from "./svgs/Board";
import { Mole, WhackedMole } from "./svgs/WhackAMole";

const GAME_DURATION = 60;
const MOLE_INTERVAL = 800;
const MOLE_VISIBLE_TIME = 1000;

type GameState = "playing" | "ended";

export const WhackAMoleSection = () => {
  const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));
  const [whacked, setWhacked] = useState<(boolean | null)[]>(Array(9).fill(null));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [lastScore, setLastScore] = useState(0);
  const moleTimers = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const clearAllMoles = useCallback(() => {
    moleTimers.current.forEach((timer) => clearTimeout(timer));
    moleTimers.current.clear();
    setMoles(Array(9).fill(false));
    setWhacked(Array(9).fill(null));
  }, []);

  const showMole = useCallback(() => {
    setMoles((prev) => {
      const emptyIndices = prev
        .map((v, i) => (!v ? i : null))
        .filter((v) => v !== null);
      if (emptyIndices.length === 0) return prev;

      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      const next = [...prev];
      next[randomIndex] = true;

      const timer = setTimeout(() => {
        setMoles((curr) => {
          const updated = [...curr];
          updated[randomIndex] = false;
          return updated;
        });
        moleTimers.current.delete(randomIndex);
      }, MOLE_VISIBLE_TIME);

      moleTimers.current.set(randomIndex, timer);
      return next;
    });
  }, []);

  const handleWhack = useCallback((index: number) => {
    setMoles((prev) => {
      if (!prev[index]) return prev;

      const timer = moleTimers.current.get(index);
      if (timer) {
        clearTimeout(timer);
        moleTimers.current.delete(index);
      }

      setScore((s) => s + 1);
      setWhacked((w) => {
        const next = [...w];
        next[index] = true;
        return next;
      });

      setTimeout(() => {
        setWhacked((w) => {
          const next = [...w];
          next[index] = null;
          return next;
        });
      }, 300);

      const next = [...prev];
      next[index] = false;
      return next;
    });
  }, []);

  const restartGame = useCallback(() => {
    clearAllMoles();
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState("playing");
  }, [clearAllMoles]);

  // Mole spawn interval — only when playing
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(showMole, MOLE_INTERVAL);
    return () => clearInterval(interval);
  }, [showMole, gameState]);

  // Countdown timer — only when playing
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameState("ended");
          setLastScore(score);
          clearAllMoles();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, score, clearAllMoles]);

  // Score in document title
  useEffect(() => {
    if (gameState === "ended") {
      document.title = `Score: ${lastScore}!`;
    } else {
      document.title = `Whack! ${score} | ${timeLeft}s`;
    }
  }, [score, timeLeft, gameState, lastScore]);

  return (
    <section className="relative grid aspect-square w-[200px] shrink-0 rotate-6 place-items-center">
      <div className="absolute -top-6 right-0 font-hand text-lg">
        <span>{score}</span>
        <span className="mx-1">·</span>
        <span>{timeLeft}s</span>
      </div>

      <div className="grid w-full grid-cols-3">
        {moles.map((hasMole, index) => (
          <button
            key={index}
            type="button"
            className="grid aspect-square place-items-center p-[15%]"
            onClick={() => handleWhack(index)}
            disabled={gameState !== "playing"}
          >
            {whacked[index] && <WhackedMole />}
            {hasMole && !whacked[index] && <Mole />}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 flex *:w-full">
        <Board />
      </div>

      {gameState === "ended" && (
        <button
          type="button"
          onClick={restartGame}
          className="absolute inset-0 grid place-items-center bg-bg/80"
        >
          <div className="font-hand text-center">
            <p className="text-3xl">{lastScore}</p>
            <p className="text-lg">tap to play again</p>
          </div>
        </button>
      )}
    </section>
  );
};
