"use client";

import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types & Data
import { Player, Challenge, LearningStation, PendingEvent } from "@/types/ular-tangga";
import { snakes, ladders } from "@/data/ular-tangga/boardConfig";
import { challenges } from "@/data/ular-tangga/challenges";
import { learningStations } from "@/data/ular-tangga/learningStations";

// Components
import { GameSetup } from "@/components/ular-tangga/GameSetup";
import { GameBoard } from "@/components/ular-tangga/GameBoard";
import { GameHUD } from "@/components/ular-tangga/GameHUD";
import { ChallengeModal } from "@/components/ular-tangga/ChallengeModal";
import { LearningStationModal } from "@/components/ular-tangga/LearningStationModal";
import { ResultModal } from "@/components/ular-tangga/ResultModal";

type GameStatus = "setup" | "playing" | "won";

export default function UlarTanggaPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("setup");

  // States to prevent multiple actions at once
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Event States
  const [pendingEvent, setPendingEvent] = useState<PendingEvent | null>(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const [showLearningStation, setShowLearningStation] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [currentStation, setCurrentStation] = useState<LearningStation | null>(null);

  const currentPlayer = players[currentPlayerIndex];

  const handleStartGame = (initialPlayers: Player[]) => {
    setPlayers(initialPlayers);
    setCurrentPlayerIndex(0);
    setGameStatus("playing");
  };

  const nextTurn = () => {
    setCurrentPlayerIndex((prev) => {
      if (players.length === 0) return 0;
      return (prev + 1) % players.length;
    });

    setDiceValue(null);
    setFeedbackMsg("");
  };

  const addXPAndAchievement = (playerIndex: number, xp: number, achievementId?: string) => {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const p = { ...newPlayers[playerIndex] };
      p.score += xp;

      if (achievementId && !p.achievements.includes(achievementId)) {
        p.achievements = [...p.achievements, achievementId];
      }

      // Auto achievements
      const achievements = new Set(p.achievements);
      if (p.position >= 20) {
        achievements.add("Langkah Pertama");
      }

      if (p.correctAnswers >= 5) {
        achievements.add("Pemikir Kritis");
      }

      if (achievementId) {
        achievements.add(achievementId);
      }

      p.achievements = [...achievements];
      newPlayers[playerIndex] = p;
      return newPlayers;
    });
  };

  const rollDice = () => {
    if (isRolling || isMoving || showChallenge || showLearningStation || gameStatus !== "playing") return;

    setIsRolling(true);
    setFeedbackMsg("");

    let rolls = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      if (rolls > 15) {
        clearInterval(interval);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalDice);
        setIsRolling(false);
        movePlayer(finalDice);
      }
    }, 50);
  };

  const movePlayer = async (dice: number) => {
    setIsMoving(true);

    const startPos = currentPlayer.position;
    const targetPos = startPos + dice;

    if (targetPos > 100) {
      setFeedbackMsg(`Belum bisa jalan, kamu harus mendapatkan angka yang pas untuk mencapai 100.`);
      await new Promise(r => setTimeout(r, 1500));
      setIsMoving(false);
      nextTurn();
      return;
    }

    // Step-by-step animation
    let currentPos = startPos;
    for (let i = 0; i < dice; i++) {
      currentPos++;
      setPlayers((prev) => {
        const arr = [...prev];
        arr[currentPlayerIndex] = { ...arr[currentPlayerIndex], position: currentPos };
        return arr;
      });
      await new Promise((r) => setTimeout(r, 300)); // 300ms delay per step
    }

    evaluatePosition(currentPos);
  };

  const evaluatePosition = (pos: number) => {
    if (pos === 100) {
      setPendingEvent({ type: "finish", cell: 100 });
      handleEvent({ type: "finish", cell: 100 });
      return;
    }

    const station = learningStations.find((s) => s.cell === pos);
    if (station) {
      setPendingEvent({ type: "station", cell: pos });
      handleEvent({ type: "station", cell: pos });
      return;
    }

    if (ladders[pos]) {
      setPendingEvent({ type: "ladder", from: pos, to: ladders[pos] });
      handleEvent({ type: "ladder", from: pos, to: ladders[pos] });
      return;
    }

    if (snakes[pos]) {
      setPendingEvent({ type: "snake", from: pos, to: snakes[pos] });
      handleEvent({ type: "snake", from: pos, to: snakes[pos] });
      return;
    }

    // Normal cell, next turn
    setIsMoving(false);
    nextTurn();
  };

  const handleEvent = (event: PendingEvent) => {
    if (event.type === "finish") {
      addXPAndAchievement(currentPlayerIndex, 500, "PPKn Explorer");
      setTimeout(() => setGameStatus("won"), 1000);
      setIsMoving(false);
      return;
    }

    if (event.type === "station") {
      const station = learningStations.find((s) => s.cell === event.cell);
      if (station) {
        setCurrentStation(station);
        setShowLearningStation(true);
      }
      return;
    }

    // Snake or Ladder Challenge
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setCurrentChallenge(randomChallenge);
    setShowChallenge(true);
  };

  const handleChallengeComplete = (isCorrect: boolean) => {
    setShowChallenge(false);

    // Update stats
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const p = { ...newPlayers[currentPlayerIndex] };
      p.answeredQuestions += 1;
      if (isCorrect) p.correctAnswers += 1;
      newPlayers[currentPlayerIndex] = p;
      return newPlayers;
    });

    if (isCorrect) {
      addXPAndAchievement(currentPlayerIndex, 100, "Warga Negara Aktif");
    }

    if (pendingEvent?.type === "ladder") {
      if (isCorrect) {
        setFeedbackMsg("Horeeee... Jawaban benar! Anda naik tangga.");
        setPlayers((prev) => {
          const arr = [...prev];
          arr[currentPlayerIndex] = { ...arr[currentPlayerIndex], position: pendingEvent.to };
          return arr;
        });
      } else {
        setFeedbackMsg("Sayang sekali... Jawaban salah! Anda gagal naik tangga.");
      }
    } else if (pendingEvent?.type === "snake") {
      if (isCorrect) {
        setFeedbackMsg("Horeeee... Jawaban benar! Anda selamat dari ular.");
      } else {
        setFeedbackMsg("Upsss... Jawaban salah! Anda meluncur turun!");
        setPlayers((prev) => {
          const arr = [...prev];
          arr[currentPlayerIndex] = { ...arr[currentPlayerIndex], position: pendingEvent.to };
          return arr;
        });
      }
    }

    setTimeout(() => {
      setPendingEvent(null);
      setCurrentChallenge(null);

      // If position after snake/ladder is 100, they win
      const finalPosition =
        pendingEvent?.type === "ladder" && isCorrect
          ? pendingEvent.to
          : pendingEvent?.type === "snake" && !isCorrect
            ? pendingEvent.to
            : players[currentPlayerIndex].position;

      if (finalPosition === 100) {
        handleEvent({
          type: "finish",
          cell: 100,
        });
      } else {
        setIsMoving(false);
        nextTurn();
      }

    }, 1500);
  };

  const handleStationComplete = (isCorrect: boolean, reflectionScore: number) => {
    setShowLearningStation(false);

    setPlayers((prev) => {
      const newPlayers = [...prev];
      const p = { ...newPlayers[currentPlayerIndex] };
      p.videosCompleted += 1;
      p.reflectionScore += reflectionScore;
      newPlayers[currentPlayerIndex] = p;
      return newPlayers;
    });

    addXPAndAchievement(currentPlayerIndex, 150 + reflectionScore, "Pembelajar Aktif");
    setFeedbackMsg(`Checkpoint selesai! +${150 + reflectionScore} XP`);

    setTimeout(() => {
      setPendingEvent(null);
      setCurrentStation(null);
      setIsMoving(false);
      nextTurn();
    }, 1500);
  };

  const resetGame = () => {
    setGameStatus("setup");
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setFeedbackMsg("");
    setPendingEvent(null);
    setShowChallenge(false);
    setShowLearningStation(false);
    setIsMoving(false);
    setIsRolling(false);
  };

  const isControlsDisabled = isRolling || isMoving || showChallenge || showLearningStation || gameStatus !== "playing";

  return (
    <Section
      className="
    min-h-screen
    bg-[#F8FAFC]
    dark:bg-[#070B14]
    py-6 md:py-8
  "
    >

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">


        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/media"
            className="
      group inline-flex items-center gap-2
      rounded-full
      border border-slate-200
      bg-white
      px-3.5 py-2
      text-sm font-medium
      text-slate-600
      shadow-sm
      transition-all
      hover:-translate-x-0.5
      hover:border-slate-300
      hover:text-slate-900
      dark:border-slate-800
      dark:bg-slate-900
      dark:text-slate-400
      dark:hover:text-white
    "
          >
            <ArrowLeft
              className="
        h-4 w-4
        transition-transform
        group-hover:-translate-x-0.5
      "
            />

            <span>Kembali ke Media</span>
          </Link>

          {gameStatus !== "setup" && (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Permainan Aktif
              </span>
            </div>
          )}
        </div>

        <div className="mb-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                PPKn Adventure Game
              </p>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Ular Tangga
              </h1>

              <p className="mt-1 max-w-xl text-sm text-slate-500 dark:text-slate-400">
                Jelajahi papan, jawab tantangan, dan kumpulkan XP.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm sm:block dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Jumlah Pemain
              </p>

              <p className="mt-0.5 text-lg font-black text-slate-900 dark:text-white">
                {players.length} Orang
              </p>
            </div>
          </div>
        </div>

        {gameStatus === "setup" && (
          <GameSetup onStart={handleStartGame} />
        )}

        {gameStatus !== "setup" && (
          <div
            className="
    grid
    w-full
    grid-cols-1
    gap-6
    lg:grid-cols-[minmax(0,1fr)_320px]
    xl:grid-cols-[minmax(0,1fr)_360px]
    lg:items-start
  "
          >


            {/* Board */}
            <div className="min-w-0">
              <div
                className="
      rounded-[28px]
      border border-slate-200
      bg-white
      p-3
      shadow-[0_20px_60px_rgba(15,23,42,0.08)]
      sm:p-4
      dark:border-slate-800
      dark:bg-slate-900
      dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
    "
              >
                <GameBoard players={players} />
              </div>

              {/* Feedback */}
              <div className="mt-4 min-h-10 text-center">
                <AnimatePresence mode="wait">
                  {feedbackMsg && (
                    <motion.div
                      key={feedbackMsg}
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="
            inline-flex
            items-center
            rounded-full
            border border-emerald-200
            bg-emerald-50
            px-4 py-2
            text-sm font-semibold
            text-emerald-700
            shadow-sm
            dark:border-emerald-900
            dark:bg-emerald-950/40
            dark:text-emerald-400
          "
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
                      {feedbackMsg}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* HUD */}
            <div className="w-full lg:sticky lg:top-6">
              <GameHUD
                players={players}
                currentPlayerIndex={currentPlayerIndex}
                diceValue={diceValue}
                isRolling={isRolling}
                onRoll={rollDice}
                disabled={isControlsDisabled}
              />
            </div>

          </div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {showChallenge && currentChallenge && pendingEvent && (
            <ChallengeModal
              challenge={currentChallenge}
              pendingEvent={pendingEvent}
              onComplete={handleChallengeComplete}
            />
          )}

          {showLearningStation && currentStation && (
            <LearningStationModal
              station={currentStation}
              onComplete={handleStationComplete}
            />
          )}

          {gameStatus === "won" && (
            <ResultModal
              players={players}
              onRestart={resetGame}
            />
          )}
        </AnimatePresence>

      </div>
    </Section>
  );
}
