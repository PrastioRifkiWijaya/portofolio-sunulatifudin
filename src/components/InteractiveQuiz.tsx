"use client";

import { useState } from "react";
import { PublicQuiz } from "@/data/ppkn";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, ChevronLeft } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { checkQuizAnswer } from "@/app/actions/quiz";

interface InteractiveQuizProps {
  quizzes: PublicQuiz[];
  levelCode: string;
  gradeCode: string;
  gradeName: string;
  levelName: string;
}

export function InteractiveQuiz({ quizzes: initialQuizzes, levelCode, gradeName, levelName }: InteractiveQuizProps) {
  const [quizzes, setQuizzes] = useState<PublicQuiz[]>(initialQuizzes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState<string | null>(null);

  if (!quizzes || quizzes.length === 0) return null;

  const currentQuiz = quizzes[currentIndex];
  // Progress is calculated based on how many have been answered (so before answering 0, after answering 1 it becomes 1)
  const progress = ((currentIndex) / quizzes.length) * 100;

  const handleSelectAnswer = async (index: number) => {
    if (isAnswered || isSubmitting) return;
    
    setSelectedAnswer(index);
    setIsSubmitting(true);
    
    const result = await checkQuizAnswer(currentQuiz.id, index);
    
    setIsSubmitting(false);
    setIsAnswered(true);

    if (result.success) {
      setIsCorrect(result.isCorrect ?? false);
      if (result.isCorrect) {
        setCorrectCount((prev) => prev + 1);
      }
      setCurrentExplanation(result.explanation || currentQuiz.explanation); // fallback to public explanation if any
    } else {
      // Fallback in case of server error
      setIsCorrect(false);
      setCurrentExplanation("Terjadi kesalahan saat memvalidasi jawaban.");
    }
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(null);
      setCurrentExplanation(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    // Shuffle quizzes again if desired, or just reset state
    const shuffled = [...initialQuizzes].sort(() => Math.random() - 0.5);
    setQuizzes(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setCorrectCount(0);
    setIsFinished(false);
    setCurrentExplanation(null);
  };

  const score = Math.round((correctCount / quizzes.length) * 100);

  const getScoreCategory = (score: number) => {
    if (score >= 90) return { text: "Sangat Baik", color: "text-green-500" };
    if (score >= 75) return { text: "Baik", color: "text-blue-500" };
    if (score >= 60) return { text: "Cukup", color: "text-yellow-500" };
    return { text: "Perlu Belajar Lagi", color: "text-red-500" };
  };

  if (isFinished) {
    const category = getScoreCategory(score);
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#0d1b38] rounded-3xl p-8 md:p-12 border-2 border-gray-100 dark:border-gray-800 shadow-xl"
        >
          <div className="w-24 h-24 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="font-title text-3xl font-bold text-secondary dark:text-white mb-2">
            Kuis Selesai!
          </h2>
          <p className="font-desc text-gray-600 dark:text-gray-400 mb-8">
            Kamu menjawab benar {correctCount} dari {quizzes.length} soal.
          </p>

          <div className="py-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl mb-8">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Skor Akhir</div>
            <div className="text-6xl font-bold text-secondary dark:text-white mb-2">{score}</div>
            <div className={`font-semibold text-lg ${category.color}`}>{category.text}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-3 bg-primary dark:bg-gold text-white dark:text-[#0a1128] font-semibold rounded-full hover:bg-secondary dark:hover:bg-white transition-colors flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Main Lagi
            </button>
            <Link
              href={`/media/game/kuis/${levelCode}`}
              className="w-full sm:w-auto px-8 py-3 bg-gray-100 dark:bg-gray-800 text-secondary dark:text-white font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              Kembali ke Kelas
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header & Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Link href={`/media/game/kuis/${levelCode}`} className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-primary dark:text-gray-400 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Kembali
          </Link>
          <div className="text-sm font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            PPKn {levelName} — {gradeName}
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-secondary dark:text-white">Soal {currentIndex + 1} dari {quizzes.length}</span>
          <span className="text-sm font-bold text-primary dark:text-gold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary dark:bg-gold rounded-full"
            initial={{ width: `${progress}%` }}
            animate={{ width: `${((currentIndex) / quizzes.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#0d1b38] rounded-3xl p-6 md:p-10 border-2 border-gray-100 dark:border-gray-800 shadow-lg"
        >
          <h3 className="font-title text-2xl font-bold text-secondary dark:text-white mb-8 leading-relaxed">
            {currentQuiz.question}
          </h3>

          <div className="space-y-3">
            {currentQuiz.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              // If answered, highlight selected as wrong if wrong, or correct if correct.
              // Note: since correct_answer is not exposed to the client, we only know if the SELECTED answer was correct or not.
              // We do NOT highlight the actual correct answer if the user picked wrong, unless we return it from the server action.
              // For now, the UI will just mark their answer wrong.
              let optionStateClass = "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a1128] hover:border-primary dark:hover:border-gold";
              
              if (isAnswered) {
                if (isSelected) {
                  optionStateClass = isCorrect
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 ring-2 ring-green-500/20"
                    : "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 ring-2 ring-red-500/20";
                } else {
                  optionStateClass = "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 opacity-50";
                }
              } else if (isSelected) {
                optionStateClass = "border-primary dark:border-gold bg-primary/5 dark:bg-gold/5 ring-2 ring-primary/20 dark:ring-gold/20";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isAnswered || isSubmitting}
                  className={clsx(
                    "w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center group",
                    optionStateClass
                  )}
                >
                  <div className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold shrink-0 transition-colors",
                    (isAnswered && isSelected && isCorrect) ? "bg-green-500 text-white" :
                    (isAnswered && isSelected && !isCorrect) ? "bg-red-500 text-white" :
                    "bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-primary/20 dark:group-hover:bg-gold/20 group-hover:text-primary dark:group-hover:text-gold"
                  )}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="font-semibold text-secondary dark:text-white flex-1 text-lg">{option}</span>
                  
                  {isAnswered && isSelected && (
                    <div className="shrink-0 ml-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className={clsx(
                  "p-6 rounded-2xl border-2",
                  isCorrect 
                    ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800" 
                    : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                )}>
                  <h4 className={clsx(
                    "font-bold text-lg mb-2 flex items-center",
                    isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                  )}>
                    {isCorrect ? (
                      <><CheckCircle2 className="w-5 h-5 mr-2" /> Jawaban Tepat!</>
                    ) : (
                      <><XCircle className="w-5 h-5 mr-2" /> Jawaban Kurang Tepat</>
                    )}
                  </h4>
                  <p className="font-desc text-secondary dark:text-gray-300 leading-relaxed">
                    <span className="font-semibold block mb-1">Penjelasan:</span>
                    {currentExplanation}
                  </p>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-secondary dark:bg-white text-white dark:text-secondary font-bold rounded-full hover:bg-primary dark:hover:bg-gold transition-colors flex items-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Lanjut <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
