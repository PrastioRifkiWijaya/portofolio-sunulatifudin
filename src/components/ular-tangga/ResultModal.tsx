"use client";

import { Player } from "@/types/ular-tangga";
import { motion } from "framer-motion";
import {
  Trophy,
  RotateCcw,
  Target,
  MapPin,
  PlayCircle,
  Zap,
  Medal,
} from "lucide-react";

interface ResultModalProps {
  players: Player[];
  onRestart: () => void;
}

export function ResultModal({
  players,
  onRestart,
}: ResultModalProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.position !== a.position) {
      return b.position - a.position;
    }

    return b.score - a.score;
  });

  const winner = sortedPlayers[0];

  const winnerAccuracy =
    winner.answeredQuestions > 0
      ? Math.round(
          (winner.correctAnswers /
            winner.answeredQuestions) *
            100
        )
      : 0;

  const getRankStyle = (index: number) => {
    if (index === 0) {
      return {
        container:
          "border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20",
        badge:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
      };
    }

    if (index === 1) {
      return {
        container:
          "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60",
        badge:
          "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
      };
    }

    if (index === 2) {
      return {
        container:
          "border-orange-200 bg-orange-50/50 dark:border-orange-900/50 dark:bg-orange-950/20",
        badge:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
      };
    }

    return {
      container:
        "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
      badge:
        "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
    };
  };

  return (
    <div
      className="
        fixed inset-0 z-100
        flex items-center justify-center
        bg-slate-950/65
        p-3 sm:p-6
        backdrop-blur-sm
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="
          w-full max-w-2xl
          max-h-[92vh]
          overflow-y-auto
          rounded-[28px]
          border border-slate-200
          bg-[#F8FAFC]
          shadow-[0_30px_80px_rgba(15,23,42,0.25)]
          dark:border-slate-700
          dark:bg-slate-950
          dark:shadow-[0_30px_80px_rgba(0,0,0,0.5)]
        "
      >
        {/* Header */}
        <div
          className="
            border-b border-slate-200
            bg-white
            px-5 py-7
            text-center
            sm:px-8 sm:py-8
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          {/* Trophy */}
          <motion.div
            initial={{
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.1,
              duration: 0.3,
              ease: "backOut",
            }}
            className="
              mx-auto
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-amber-50
              text-amber-500
              ring-1 ring-amber-200
              dark:bg-amber-950/40
              dark:text-amber-400
              dark:ring-amber-900/50
            "
          >
            <Trophy className="h-8 w-8" />
          </motion.div>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Permainan Selesai
          </p>

          <h2
            className="
              mt-1
              text-2xl font-black
              tracking-tight
              text-slate-900
              sm:text-3xl
              dark:text-white
            "
          >
            Selamat, {winner.name}!
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Kamu berhasil mencapai garis akhir.
            Berikut rangkuman perjalanan dan
            pencapaianmu.
          </p>
        </div>

        {/* Winner summary */}
        <div className="px-5 py-5 sm:px-7">
          <div
            className="
              relative overflow-hidden
              rounded-2xl
              border border-slate-200
              bg-white
              p-5
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            {/* Player accent */}
            <div
              className="absolute left-0 top-0 h-full w-1"
              style={{
                backgroundColor: winner.color,
              }}
            />

            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  text-sm font-black
                  text-white
                  shadow-sm
                "
                style={{
                  backgroundColor: winner.color,
                }}
              >
                P{winner.id}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-400">
                  Pemenang
                </p>

                <p className="truncate text-base font-bold text-slate-900 dark:text-white">
                  {winner.name}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  XP
                </p>

                <p className="text-xl font-black text-slate-900 dark:text-white">
                  {winner.score}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div
              className="
                mt-5
                grid grid-cols-2
                gap-px
                overflow-hidden
                rounded-xl
                border border-slate-200
                bg-slate-200
                dark:border-slate-800
                dark:bg-slate-800
                sm:grid-cols-4
              "
            >
              <Stat
                icon={<MapPin className="h-4 w-4" />}
                label="Posisi"
                value={`${winner.position}`}
              />

              <Stat
                icon={<Target className="h-4 w-4" />}
                label="Akurasi"
                value={`${winnerAccuracy}%`}
                valueClass={
                  winnerAccuracy >= 70
                    ? "text-emerald-600 dark:text-emerald-400"
                    : undefined
                }
              />

              <Stat
                icon={<PlayCircle className="h-4 w-4" />}
                label="Station"
                value={`${winner.videosCompleted}`}
                valueClass="text-sky-600 dark:text-sky-400"
              />

              <Stat
                icon={<Zap className="h-4 w-4" />}
                label="Total XP"
                value={`${winner.score}`}
                valueClass="text-amber-600 dark:text-amber-400"
              />
            </div>

            {/* Achievements */}
            {winner.achievements.length > 0 && (
              <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="mb-3 flex items-center gap-2">
                  <Medal className="h-4 w-4 text-amber-500" />

                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    Pencapaian
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {winner.achievements.map((achievement, index) => (
                    <span
                      key={`${achievement}-${index}`}
                      className="
                        rounded-lg
                        border border-amber-200
                        bg-amber-50
                        px-2.5 py-1.5
                        text-xs font-semibold
                        text-amber-700
                        dark:border-amber-900/50
                        dark:bg-amber-950/30
                        dark:text-amber-300
                      "
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Ranking */}
          <div className="mt-7">
            <div className="mb-3 flex items-end justify-between px-1">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Peringkat akhir
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Berdasarkan posisi dan XP
                </p>
              </div>

              <span className="text-xs font-medium text-slate-400">
                {players.length} pemain
              </span>
            </div>

            <div className="space-y-2">
              {sortedPlayers.map((player, index) => {
                const rankStyle =
                  getRankStyle(index);

                const accuracy =
                  player.answeredQuestions > 0
                    ? Math.round(
                        (player.correctAnswers /
                          player.answeredQuestions) *
                          100
                      )
                    : 0;

                return (
                  <motion.div
                    key={player.id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.1 + index * 0.05,
                    }}
                    className={`
                      flex items-center gap-3
                      rounded-xl
                      border
                      px-3 py-3
                      transition-colors
                      ${rankStyle.container}
                    `}
                  >
                    {/* Rank */}
                    <div
                      className={`
                        flex h-8 w-8
                        shrink-0
                        items-center justify-center
                        rounded-lg
                        text-xs font-black
                        ${rankStyle.badge}
                      `}
                    >
                      {index + 1}
                    </div>

                    {/* Player */}
                    <div
                      className="
                        flex h-9 w-9
                        shrink-0
                        items-center justify-center
                        rounded-full
                        text-[10px] font-black
                        text-white
                      "
                      style={{
                        backgroundColor:
                          player.color,
                      }}
                    >
                      P{player.id}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                        {player.name}
                      </p>

                      <p className="mt-0.5 text-[11px] text-slate-400">
                        Posisi {player.position}
                        {" · "}
                        Akurasi {accuracy}%
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-slate-800 dark:text-white">
                        {player.score}
                      </p>

                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        XP
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={onRestart}
            className="
              mt-7
              flex w-full
              items-center justify-center
              gap-2
              rounded-xl
              bg-slate-900
              px-5 py-3.5
              text-sm font-bold
              text-white
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:bg-slate-800
              hover:shadow-md
              active:translate-y-0
              dark:bg-white
              dark:text-slate-900
              dark:hover:bg-slate-100
              cursor-pointer
            "
          >
            <RotateCcw className="h-4 w-4" />
            Main lagi
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}

function Stat({
  icon,
  label,
  value,
  valueClass = "text-slate-900 dark:text-white",
}: StatProps) {
  return (
    <div className="bg-white px-3 py-4 dark:bg-slate-900">
      <div className="flex items-center gap-1.5 text-slate-400">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p
        className={`mt-1 text-lg font-black ${valueClass}`}
      >
        {value}
      </p>
    </div>
  );
}
