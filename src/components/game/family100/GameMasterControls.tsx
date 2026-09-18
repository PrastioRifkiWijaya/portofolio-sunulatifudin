import { useState } from "react";
import { Family100Answer } from "@/data/family100/questions";
import clsx from "clsx";
import { X, Search, RotateCcw, Check, Users, Unlock, ArrowRight } from "lucide-react";

interface GameMasterControlsProps {
  answers: Family100Answer[];
  revealedAnswers: Record<string, boolean>;
  onCheckAnswer: (answerText: string) => void;
  onRevealCard: (answerId: string) => void;
  onStrike: () => void;
  onChangeTeam: () => void;
  onResetStrike: () => void;
  onRevealAll: () => void;
  onNextQuestion: () => void;
  onResetGame: () => void;
}

export function GameMasterControls({
  answers,
  revealedAnswers,
  onCheckAnswer,
  onRevealCard,
  onStrike,
  onChangeTeam,
  onResetStrike,
  onRevealAll,
  onNextQuestion,
  onResetGame
}: GameMasterControlsProps) {
  const [inputText, setInputText] = useState("");
  const [selectedCardId, setSelectedCardId] = useState("");

  const handleCheck = () => {
    if (inputText.trim()) {
      onCheckAnswer(inputText);
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const handleRevealSelected = () => {
    if (selectedCardId) {
      onRevealCard(selectedCardId);
      setSelectedCardId("");
    }
  };

  return (
    <div className="w-full bg-[#051033] border-2 border-[#1e4cd5] rounded-3xl p-6 shadow-xl relative z-20">
      
      {/* Top Row: Input & Manual Select */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Answer Input */}
        <div className="grow flex gap-2">
          <div className="relative grow">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#87a9ff]" />
            </div>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Masukkan jawaban peserta..." 
              className="w-full bg-[#0a1e54] border-2 border-[#1e4cd5] text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#ffd700] transition-colors placeholder-[#87a9ff]/50 font-medium"
            />
          </div>
          <button 
            onClick={handleCheck}
            className="px-6 py-3 bg-[#1e4cd5] hover:bg-[#2a66ff] text-white font-bold rounded-xl transition-colors shadow-md whitespace-nowrap"
          >
            Cek Jawaban
          </button>
        </div>

        {/* Card Manual Select */}
        <div className="flex gap-2">
          <select 
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
            className="bg-[#0a1e54] border-2 border-[#1e4cd5] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#ffd700] min-w-35"
          >
            <option value="">Pilih Kartu ▼</option>
            {answers.map((ans, idx) => (
              <option key={ans.id} value={ans.id} disabled={revealedAnswers[ans.id]}>
                Kartu {idx + 1} {revealedAnswers[ans.id] ? "(Terbuka)" : ""}
              </option>
            ))}
          </select>
          <button 
            onClick={handleRevealSelected}
            disabled={!selectedCardId}
            className={clsx(
              "px-6 py-3 font-bold rounded-xl transition-colors shadow-md flex items-center gap-2",
              selectedCardId 
                ? "bg-[#10b981] hover:bg-[#059669] text-white" 
                : "bg-[#10b981]/50 text-white/50 cursor-not-allowed"
            )}
          >
            <Check className="w-5 h-5" />
            Benar
          </button>
        </div>
      </div>

      {/* Bottom Row: Game Master Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-t border-[#1e4cd5]/50 pt-6">
        
        <button onClick={onStrike} className="flex items-center gap-2 px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white text-sm font-bold rounded-lg shadow-md transition-colors">
          <X className="w-4 h-4" /> Salah / X
        </button>

        <button onClick={onChangeTeam} className="flex items-center gap-2 px-5 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-sm font-bold rounded-lg shadow-md transition-colors">
          <Users className="w-4 h-4" /> Ganti Tim
        </button>

        <button onClick={onResetStrike} className="flex items-center gap-2 px-5 py-2.5 bg-[#4b5563] hover:bg-[#374151] text-white text-sm font-bold rounded-lg shadow-md transition-colors border border-[#6b7280]">
          <RotateCcw className="w-4 h-4" /> Reset X
        </button>

        <button onClick={onRevealAll} className="flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b] hover:bg-[#d97706] text-white text-sm font-bold rounded-lg shadow-md transition-colors">
          <Unlock className="w-4 h-4" /> Buka Semua Jawaban
        </button>
        
        <div className="w-px h-8 bg-[#1e4cd5] mx-2 hidden md:block"></div>

        <button onClick={onNextQuestion} className="flex items-center gap-2 px-6 py-2.5 bg-[#ffd700] hover:bg-[#e6c200] text-[#0a1e54] text-sm font-black rounded-lg shadow-md transition-colors">
          Soal Berikutnya <ArrowRight className="w-4 h-4" />
        </button>

        <button onClick={onResetGame} className="px-5 py-2.5 bg-transparent hover:bg-white/10 text-[#87a9ff] hover:text-white text-sm font-bold rounded-lg transition-colors border border-[#87a9ff]/30">
          Reset Game
        </button>

      </div>

      <div className="mt-4 text-center">
         <span className="text-[#ffd700] text-xs font-bold tracking-widest uppercase opacity-80">
           Semua jawaban dibuka tanpa menambah poin.
         </span>
      </div>

    </div>
  );
}
