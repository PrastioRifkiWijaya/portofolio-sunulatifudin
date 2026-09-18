import { Family100Answer } from "@/data/family100/questions";
import { AnswerCard } from "./AnswerCard";

interface QuestionBoardProps {
  question: string;
  answers: Family100Answer[];
  revealedAnswers: Record<string, boolean>;
}

export function QuestionBoard({ question, answers, revealedAnswers }: QuestionBoardProps) {
  return (
    <div className="grow flex flex-col p-6 md:p-8 rounded-4xl border-[3px] border-[#ffd700] bg-linear-to-br from-[#0c2363] via-[#0f2d78] to-[#081a4d] shadow-[0_0_30px_rgba(15,45,120,0.5)] relative">
      {/* Background decoration with its own overflow-hidden to prevent spilling */}
      <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>
      </div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-[#ffd700] rounded-full border-[3px] border-[#0a1e54] z-10 whitespace-nowrap">
        <span className="text-[#0a1e54] text-xs md:text-sm font-black tracking-widest uppercase">
          Papan Jawaban
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
        {/* Question Text */}
        <h2 
          className="text-white text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
          style={{ textShadow: "2px 2px 0 #051033, -1px -1px 0 #051033, 1px -1px 0 #051033, -1px 1px 0 #051033, 0 4px 15px rgba(0,0,0,0.5)" }}
        >
          {question}
        </h2>

        {/* Answer Cards Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-center px-4">
          {answers.map((ans, idx) => (
            <AnswerCard 
              key={ans.id} 
              index={idx} 
              answer={ans.answer} 
              points={ans.points} 
              revealed={!!revealedAnswers[ans.id]} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
