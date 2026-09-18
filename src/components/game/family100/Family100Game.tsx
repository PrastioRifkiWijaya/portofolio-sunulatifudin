"use client";

import { useState } from "react";
import { Family100Question } from "@/data/family100/questions";
import { Family100Header } from "./Family100Header";
import { TeamPanel } from "./TeamPanel";
import { QuestionBoard } from "./QuestionBoard";
import { GameMasterControls } from "./GameMasterControls";
import { useFamily100Sounds } from "@/hooks/useFamily100Sounds";
import { GameModal, ModalType } from "./GameModal";

interface Family100GameProps {
  questions: Family100Question[];
}

type Team = "garuda" | "bhinneka";

export function Family100Game({ questions }: Family100GameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeTeam, setActiveTeam] = useState<Team>("garuda");
  
  const [scores, setScores] = useState({ garuda: 0, bhinneka: 0 });
  const [strikes, setStrikes] = useState({ garuda: 0, bhinneka: 0 });
  const [teamNames, setTeamNames] = useState({ garuda: "TIM GARUDA", bhinneka: "TIM BHINNEKA" });
  const [isMuted, setIsMuted] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: ModalType;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const { playCorrect, playWrong, playReveal, playNext } = useFamily100Sounds(isMuted);

  const currentQuestion = questions[currentQuestionIndex];

  // Logic functions
  const handleCheckAnswer = (inputText: string) => {
    // Normalisasi input
    const normalizedInput = inputText.trim().toLowerCase();
    
    // Cari jawaban yang cocok
    const match = currentQuestion.answers.find(
      (ans) => ans.answer.toLowerCase() === normalizedInput
    );

    if (match) {
      if (revealedAnswers[match.id]) {
        setModalConfig({
          isOpen: true,
          title: "Sudah Terbuka",
          message: "Jawaban ini sudah ditemukan sebelumnya!",
          type: "warning",
        });
      } else {
        setModalConfig({
          isOpen: true,
          title: "Jawaban Ditemukan",
          message: `Terdapat jawaban:\n\n"${match.answer}" (${match.points} POIN)\n\nSilakan pilih kartu dan klik "Benar" untuk membuka dan menambah skor.`,
          type: "success",
        });
      }
    } else {
      setModalConfig({
        isOpen: true,
        title: "Tidak Ditemukan",
        message: "Jawaban tidak ditemukan di papan.",
        type: "warning",
      });
    }
  };

  const handleRevealCard = (answerId: string) => {
    if (revealedAnswers[answerId]) return;

    const answerToReveal = currentQuestion.answers.find(a => a.id === answerId);
    if (!answerToReveal) return;

    setRevealedAnswers(prev => ({ ...prev, [answerId]: true }));
    playCorrect();
    
    // Tambah skor ke tim yang aktif
    setScores(prev => ({
      ...prev,
      [activeTeam]: prev[activeTeam] + answerToReveal.points
    }));
  };

  const handleStrike = () => {
    playWrong();
    setStrikes(prev => ({
      ...prev,
      [activeTeam]: Math.min(prev[activeTeam] + 1, 3)
    }));
  };

  const handleChangeTeam = () => {
    setActiveTeam(prev => prev === "garuda" ? "bhinneka" : "garuda");
  };

  const handleResetStrike = () => {
    setStrikes(prev => ({
      ...prev,
      [activeTeam]: 0
    }));
  };

  const handleRevealAll = () => {
    playReveal();
    const allRevealed: Record<string, boolean> = {};
    currentQuestion.answers.forEach(ans => {
      allRevealed[ans.id] = true;
    });
    // Set without adding points
    setRevealedAnswers(allRevealed);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      playNext();
      setCurrentQuestionIndex(prev => prev + 1);
      setRevealedAnswers({});
      setStrikes({ garuda: 0, bhinneka: 0 });
      // Skor dan tim aktif tidak direset saat lanjut soal
    } else {
      setModalConfig({
        isOpen: true,
        title: "Permainan Selesai",
        message: "Ini adalah soal terakhir. Silakan Reset Game untuk memulai ulang.",
        type: "info",
      });
    }
  };

  const handleResetGame = () => {
    setModalConfig({
      isOpen: true,
      title: "Konfirmasi Reset",
      message: "Apakah Anda yakin ingin mereset seluruh permainan?\n\nSkor akan kembali menjadi 0.",
      type: "warning",
      confirmText: "Ya, Reset",
      cancelText: "Batal",
      onConfirm: () => {
        setCurrentQuestionIndex(0);
        setActiveTeam("garuda");
        setScores({ garuda: 0, bhinneka: 0 });
        setStrikes({ garuda: 0, bhinneka: 0 });
        setRevealedAnswers({});
      },
    });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  if (!currentQuestion) return <div>Data pertanyaan tidak tersedia.</div>;

  return (
    <div className="w-full grow flex flex-col bg-[#051033] p-2 md:p-6 lg:p-8 font-sans overflow-hidden">
      
      {/* Header */}
      <Family100Header 
        category={currentQuestion.category}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* Main Game Area */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 flex-grow">
        
        {/* Left Team Panel (Garuda) */}
        <div className="flex w-full lg:w-auto shrink-0 justify-center">
           <TeamPanel 
             teamName={teamNames.garuda} 
             score={scores.garuda} 
             strikes={strikes.garuda} 
             isActive={activeTeam === "garuda"} 
             onNameChange={(newName) => setTeamNames(prev => ({ ...prev, garuda: newName }))}
           />
        </div>

        {/* Center Board */}
        <div className="grow flex items-stretch">
           <QuestionBoard 
             question={currentQuestion.question}
             answers={currentQuestion.answers}
             revealedAnswers={revealedAnswers}
           />
        </div>

        {/* Right Team Panel (Bhinneka) */}
        <div className="flex w-full lg:w-auto shrink-0 justify-center">
           <TeamPanel 
             teamName={teamNames.bhinneka} 
             score={scores.bhinneka} 
             strikes={strikes.bhinneka} 
             isActive={activeTeam === "bhinneka"} 
             onNameChange={(newName) => setTeamNames(prev => ({ ...prev, bhinneka: newName }))}
           />
        </div>

      </div>

      {/* Controls */}
      <GameMasterControls 
        answers={currentQuestion.answers}
        revealedAnswers={revealedAnswers}
        onCheckAnswer={handleCheckAnswer}
        onRevealCard={handleRevealCard}
        onStrike={handleStrike}
        onChangeTeam={handleChangeTeam}
        onResetStrike={handleResetStrike}
        onRevealAll={handleRevealAll}
        onNextQuestion={handleNextQuestion}
        onResetGame={handleResetGame}
      />

      <GameModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
      />

    </div>
  );
}
