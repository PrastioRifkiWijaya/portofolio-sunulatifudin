"use client";

import { useState } from "react";
import { LearningStation } from "@/types/ular-tangga";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  Check,
  CheckCircle2,
  CircleHelp,
  Play,
  Sparkles,
  XCircle,
} from "lucide-react";

interface LearningStationModalProps {
  station: LearningStation;
  onComplete: (isCorrect: boolean, reflectionScore: number) => void;
}

export function LearningStationModal({
  station,
  onComplete,
}: LearningStationModalProps) {
  const [videoStarted, setVideoStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [reflectionText, setReflectionText] = useState("");

  const handleSelect = (idx: number) => {
    if (isEvaluated) return;

    setSelectedAnswer(idx);
    setIsEvaluated(true);
  };

  const handleComplete = () => {
    const isCorrect = selectedAnswer === station.correctAnswer;

    let reflectionScore = 0;
    const text = reflectionText.trim();

    if (text.length > 20) reflectionScore += 20;
    if (text.length > 50) reflectionScore += 30;

    onComplete(isCorrect, reflectionScore);
  };

  const isCorrectAnswer =
    selectedAnswer === station.correctAnswer;

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
          flex max-h-[92vh]
          w-full max-w-4xl
          flex-col
          overflow-hidden
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
            px-5 py-4
            sm:px-7
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="
                    inline-flex items-center gap-1.5
                    rounded-full
                    bg-sky-50
                    px-2.5 py-1
                    text-[10px] font-bold
                    uppercase tracking-[0.14em]
                    text-sky-600
                    dark:bg-sky-950/50
                    dark:text-sky-400
                  "
                >
                  <Sparkles className="h-3 w-3" />
                  Learning Station
                </span>

                <span className="text-xs font-medium text-slate-400">
                  Petak {station.cell}
                </span>
              </div>

              <h2
                className="
                  text-xl font-black
                  tracking-tight
                  text-slate-900
                  sm:text-2xl
                  dark:text-white
                "
              >
                {station.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {station.topic}
              </p>
            </div>

            {/* Decorative indicator */}
            <div
              className="
                hidden h-10 w-10
                shrink-0 items-center justify-center
                rounded-xl
                bg-sky-50
                text-sky-600
                sm:flex
                dark:bg-sky-950/50
                dark:text-sky-400
              "
            >
              <CircleHelp className="h-5 w-5" />
            </div>
          </div>

          {/* Progress */}
          <div className="mt-5 flex items-center gap-2">
            <div
              className={clsx(
                "h-1.5 flex-1 rounded-full",
                videoStarted
                  ? "bg-sky-500"
                  : "bg-slate-200 dark:bg-slate-700"
              )}
            />

            <div
              className={clsx(
                "h-1.5 flex-1 rounded-full",
                isEvaluated
                  ? "bg-sky-500"
                  : "bg-slate-200 dark:bg-slate-700"
              )}
            />

            <div
              className={clsx(
                "h-1.5 flex-1 rounded-full",
                isEvaluated
                  ? "bg-sky-500"
                  : "bg-slate-200 dark:bg-slate-700"
              )}
            />
          </div>

          <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            <span>Pelajari</span>
            <span>Jawab</span>
            <span>Refleksi</span>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {/* Video */}
          <section>
            <div
              className="
                overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-slate-950
                shadow-sm
                dark:border-slate-700
              "
            >
              {!videoStarted ? (
                <div className="group relative aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${station.videoId}/hqdefault.jpg`}
                    alt=""
                    className="
                      absolute inset-0
                      h-full w-full
                      object-cover
                      opacity-75
                      transition-transform
                      duration-700
                      group-hover:scale-[1.02]
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      bg-linear-to-t
                      from-slate-950/90
                      via-slate-950/20
                      to-slate-950/10
                    "
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setVideoStarted(true)}
                      className="
                        group/play
                        flex flex-col
                        items-center gap-3
                        text-white
                      "
                    >
                      <span
                        className="
                          flex h-16 w-16
                          items-center justify-center
                          rounded-full
                          bg-white
                          text-slate-900
                          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                          transition-transform
                          duration-200
                          group-hover/play:scale-105
                        "
                      >
                        <Play
                          className="ml-1 h-6 w-6 fill-current"
                          strokeWidth={2.5}
                        />
                      </span>

                      <span className="text-sm font-bold">
                        Mulai pembelajaran
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${station.videoId}?autoplay=1`}
                    title={station.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </section>

          {/* Question */}
          <AnimatePresence mode="wait">
            {videoStarted && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-6 space-y-5"
              >
                <section
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    p-5
                    sm:p-6
                    dark:border-slate-800
                    dark:bg-slate-800/50
                  "
                >
                  <div className="mb-5">
                    <p
                      className="
                        mb-2
                        text-[10px] font-bold
                        uppercase tracking-[0.16em]
                        text-sky-600
                        dark:text-sky-400
                      "
                    >
                      Pertanyaan
                    </p>

                    <h3
                      className="
                        text-base font-bold
                        leading-relaxed
                        text-slate-900
                        sm:text-lg
                        dark:text-white
                      "
                    >
                      {station.reflectionQuestion}
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {station.options.map((option, idx) => {
                      const isSelected =
                        selectedAnswer === idx;

                      const isCorrect =
                        station.correctAnswer === idx;

                      let stateClass =
                        "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600";

                      if (isEvaluated) {
                        if (isCorrect) {
                          stateClass =
                            "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30";
                        } else if (isSelected) {
                          stateClass =
                            "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30";
                        } else {
                          stateClass =
                            "border-slate-200 bg-slate-50 opacity-45 dark:border-slate-800 dark:bg-slate-900";
                        }
                      } else if (isSelected) {
                        stateClass =
                          "border-sky-400 bg-sky-50 ring-2 ring-sky-100 dark:border-sky-500 dark:bg-sky-950/30 dark:ring-sky-950";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isEvaluated}
                          onClick={() => handleSelect(idx)}
                          className={clsx(
                            "group flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all sm:p-4",
                            stateClass
                          )}
                        >
                          <span
                            className="
                              flex h-7 w-7
                              shrink-0 items-center justify-center
                              rounded-lg
                              bg-slate-100
                              text-xs font-bold
                              text-slate-500
                              dark:bg-slate-800
                              dark:text-slate-400
                            "
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>

                          <span
                            className="
                              flex-1 pt-1
                              text-sm font-medium
                              leading-relaxed
                              text-slate-700
                              dark:text-slate-300
                            "
                          >
                            {option}
                          </span>

                          {isEvaluated && isCorrect && (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                          )}

                          {isEvaluated &&
                            isSelected &&
                            !isCorrect && (
                              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                            )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {isEvaluated && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={clsx(
                        "mt-5 rounded-xl border p-4",
                        isCorrectAnswer
                          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
                          : "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30"
                      )}
                    >
                      <div className="flex gap-3">
                        <div
                          className={clsx(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                            isCorrectAnswer
                              ? "bg-emerald-500 text-white"
                              : "bg-amber-500 text-white"
                          )}
                        >
                          {isCorrectAnswer ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <CircleHelp className="h-4 w-4" />
                          )}
                        </div>

                        <div>
                          <p
                            className={clsx(
                              "text-sm font-bold",
                              isCorrectAnswer
                                ? "text-emerald-800 dark:text-emerald-300"
                                : "text-amber-800 dark:text-amber-300"
                            )}
                          >
                            {isCorrectAnswer
                              ? "Jawaban benar!"
                              : "Belum tepat"}
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            {station.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </section>

                {/* Reflection */}
                {isEvaluated && (
                  <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="
                      rounded-2xl
                      border border-slate-200
                      bg-white
                      p-5
                      sm:p-6
                      dark:border-slate-800
                      dark:bg-slate-800/50
                    "
                  >
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Refleksi singkat
                        </h3>

                        <span
                          className="
                            rounded-full
                            bg-slate-100
                            px-2 py-0.5
                            text-[10px] font-semibold
                            text-slate-500
                            dark:bg-slate-800
                            dark:text-slate-400
                          "
                        >
                          Opsional
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        Bagaimana materi ini bisa kamu terapkan dalam kehidupan sehari-hari?
                      </p>
                    </div>

                    <textarea
                      value={reflectionText}
                      onChange={(event) =>
                        setReflectionText(event.target.value)
                      }
                      placeholder="Tulis pendapatmu di sini..."
                      className="
                        min-h-28
                        w-full resize-y
                        rounded-xl
                        border border-slate-200
                        bg-slate-50
                        px-4 py-3
                        text-sm leading-relaxed
                        text-slate-700
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-sky-400
                        focus:bg-white
                        focus:ring-4
                        focus:ring-sky-50
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-slate-300
                        dark:focus:border-sky-500
                        dark:focus:bg-slate-900
                        dark:focus:ring-sky-950
                      "
                    />

                    <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[11px] text-slate-400">
                        Refleksi dapat memberikan bonus XP.
                      </p>

                      <button
                        type="button"
                        onClick={handleComplete}
                        className="
                          inline-flex
                          items-center justify-center
                          gap-2
                          rounded-xl
                          bg-slate-900
                          px-5 py-3
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
                        "
                      >
                        Selesaikan
                        <Check className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.section>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
