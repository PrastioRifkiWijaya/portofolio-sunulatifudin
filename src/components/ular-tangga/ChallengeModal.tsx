"use client";

import { useState } from "react";
import { Challenge, PendingEvent } from "@/types/ular-tangga";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { PiLadder } from "react-icons/pi";
import { GiSnake } from "react-icons/gi";

interface ChallengeModalProps {
  challenge: Challenge;
  pendingEvent: PendingEvent;
  onComplete: (isCorrect: boolean) => void;
}

export function ChallengeModal({
  challenge,
  pendingEvent,
  onComplete,
}: ChallengeModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const isSnake = pendingEvent.type === "snake";

  const isCorrect =
    selectedAnswer === challenge.correctAnswer;

  const handleSelect = (idx: number) => {
    if (isEvaluated) return;

    setSelectedAnswer(idx);
    setIsEvaluated(true);
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/60
        p-3 sm:p-6
        backdrop-blur-sm
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 12,
          scale: 0.98,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="
          relative
          w-full max-w-2xl
          max-h-[92vh]
          overflow-y-auto
          rounded-[28px]
          border border-slate-200
          bg-[#F8FAFC]
          shadow-[0_30px_80px_rgba(15,23,42,0.25)]
          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)]
        "
      >
        {/* Header */}
        <div
          className="
            border-b border-slate-200
            bg-white
            px-5 py-5
            sm:px-7
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="flex items-start gap-4">
            {/* Event icon */}
            <div
              className={clsx(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                isSnake
                  ? "bg-rose-50 text-rose-500 dark:bg-rose-950/50 dark:text-rose-400"
                  : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
              )}
            >
              {isSnake ? (
                <GiSnake className="h-5 w-5" />
              ) : (
                <PiLadder className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={clsx(
                    "text-[10px] font-bold uppercase tracking-[0.16em]",
                    isSnake
                      ? "text-rose-500"
                      : "text-emerald-600"
                  )}
                >
                  {isSnake
                    ? "Tantangan Ular"
                    : "Tantangan Tangga"}
                </span>

                <span className="text-xs text-slate-300 dark:text-slate-700">
                  |
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {challenge.topic}
                </span>
              </div>

              <h2
                className="
                  mt-1
                  text-xl font-black
                  tracking-tight
                  text-slate-900
                  sm:text-2xl
                  dark:text-white
                "
              >
                Uji Pengetahuanmu
              </h2>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-5 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-sky-500" />

            <div
              className={clsx(
                "h-1.5 flex-1 rounded-full transition-colors",
                isEvaluated
                  ? "bg-sky-500"
                  : "bg-slate-200 dark:bg-slate-700"
              )}
            />

            <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            <span>Tantangan</span>
            <span>Jawab</span>
            <span>Lanjut</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-5 sm:px-7 sm:py-6">
          {/* Scenario */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border border-slate-200
              bg-white
              p-5
              dark:border-slate-800
              dark:bg-slate-800/50
            "
          >
            <div
              className={clsx(
                "absolute left-0 top-0 h-full w-1",
                isSnake
                  ? "bg-rose-400"
                  : "bg-emerald-500"
              )}
            />

            <div className="flex gap-3">
              <div
                className="
                  flex h-8 w-8
                  shrink-0 items-center justify-center
                  rounded-lg
                  bg-slate-100
                  text-slate-500
                  dark:bg-slate-800
                  dark:text-slate-400
                "
              >
                <CircleHelp className="h-4 w-4" />
              </div>

              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Situasi
                </p>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
                  {challenge.scenario}
                </p>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="mt-6">
            <h3
              className="
                text-lg font-bold
                leading-relaxed
                text-slate-900
                sm:text-xl
                dark:text-white
              "
            >
              {challenge.question}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Pilih satu jawaban yang menurutmu paling tepat.
            </p>
          </div>

          {/* Answers */}
          <div className="mt-5 space-y-2.5">
            {challenge.options.map((option, idx) => {
              const isSelected =
                selectedAnswer === idx;

              const isActualCorrect =
                challenge.correctAnswer === idx;

              let stateClass =
                "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600";

              if (isEvaluated) {
                if (isActualCorrect) {
                  stateClass =
                    "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30";
                } else if (isSelected) {
                  stateClass =
                    "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30";
                } else {
                  stateClass =
                    "border-slate-200 bg-slate-50 opacity-45 dark:border-slate-800 dark:bg-slate-900";
                }
              }

              return (
                <motion.button
                  key={idx}
                  type="button"
                  disabled={isEvaluated}
                  onClick={() => handleSelect(idx)}
                  whileHover={!isEvaluated ? { x: 2 } : undefined}
                  whileTap={!isEvaluated ? { scale: 0.995 } : undefined}
                  className={clsx(
                    "group flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all sm:p-4",
                    stateClass
                  )}
                >
                  {/* Option number */}
                  <span
                    className="
                      flex h-8 w-8
                      shrink-0 items-center justify-center
                      rounded-lg
                      bg-slate-100
                      text-xs font-bold
                      text-slate-500
                      transition-colors
                      group-hover:bg-slate-200
                      dark:bg-slate-800
                      dark:text-slate-400
                      dark:group-hover:bg-slate-700
                    "
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>

                  <span
                    className="
                      flex-1
                      text-sm font-medium
                      leading-relaxed
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    {option}
                  </span>

                  {isEvaluated && isActualCorrect && (
                    <CheckCircle2
                      className="
                        h-5 w-5
                        shrink-0
                        text-emerald-500
                      "
                    />
                  )}

                  {isEvaluated &&
                    isSelected &&
                    !isActualCorrect && (
                      <XCircle
                        className="
                          h-5 w-5
                          shrink-0
                          text-rose-500
                        "
                      />
                    )}
                </motion.button>
              );
            })}
          </div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {isEvaluated && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="mt-5"
              >
                <div
                  className={clsx(
                    "rounded-2xl border p-5",
                    isCorrect
                      ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
                      : "border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30"
                  )}
                >
                  <div className="flex gap-3">
                    <div
                      className={clsx(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white",
                        isCorrect
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                      )}
                    >
                      {isCorrect ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4
                        className={clsx(
                          "text-sm font-bold",
                          isCorrect
                            ? "text-emerald-800 dark:text-emerald-300"
                            : "text-rose-800 dark:text-rose-300"
                        )}
                      >
                        {isCorrect
                          ? "Jawabanmu benar!"
                          : "Jawabanmu belum tepat."}
                      </h4>

                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {challenge.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Real life application */}
                  <div
                    className="
                      mt-4
                      border-t
                      border-black/5
                      pt-4
                      dark:border-white/5
                    "
                  >
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Dalam kehidupan nyata
                    </p>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 text-justify">
                      {challenge.realLifeApplication}
                    </p>
                  </div>
                </div>

                {/* Consequence */}
                <div
                  className={clsx(
                    "mt-3 flex items-center gap-3 rounded-xl px-4 py-3",
                    isSnake
                      ? isCorrect
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                      : isCorrect
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                  )}
                >
                  <ShieldCheck className="h-4 w-4 shrink-0" />

                  <p className="text-xs font-semibold">
                    {isSnake
                      ? isCorrect
                        ? "Selamat! Kamu berhasil menghindari ular."
                        : "Maaf, jawabanmu belum tepat. Kamu harus meluncur turun."
                      : isCorrect
                        ? "Selamat! Jawabanmu benar, kamu naik tangga!"
                        : "Maaf, jawabanmu belum tepat. Kamu gagal naik tangga."}
                  </p>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => onComplete(isCorrect)}
                  className="
                    mt-5
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
                  Lanjutkan permainan
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
