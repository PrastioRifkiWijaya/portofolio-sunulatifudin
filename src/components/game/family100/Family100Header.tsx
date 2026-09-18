import { Volume2, VolumeX } from "lucide-react";

interface Family100HeaderProps {
  category: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function Family100Header({ category, currentQuestionIndex, totalQuestions, isMuted, onToggleMute }: Family100HeaderProps) {
  return (
    <div className="w-full bg-gradient-to-r from-[#0c2363] via-[#143da3] to-[#0c2363] border-2 border-[#87a9ff]/40 rounded-[20px] p-4 flex flex-col sm:flex-row items-center justify-between shadow-lg relative overflow-hidden mb-6 z-20">
      <div className="absolute inset-0 bg-[#ffd700] opacity-5 pointer-events-none" />
      
      <div className="flex items-center gap-6 relative z-10 w-full sm:w-auto mb-4 sm:mb-0">
        <div className="w-20 h-20 bg-gradient-to-br from-[#1e4cd5] to-[#0a1e54] rounded-2xl flex items-center justify-center border-2 border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.3)] shrink-0">
           <div className="flex flex-col items-center justify-center leading-none">
             <span className="text-white font-black text-xl italic tracking-tighter">FAMILY</span>
             <span className="text-[#ffd700] font-black text-3xl italic tracking-tighter" style={{ textShadow: "0 2px 0 #b39700" }}>100</span>
           </div>
        </div>
        <div>
          <h1 className="text-white text-2xl md:text-3xl font-black uppercase tracking-wider mb-1 drop-shadow-md">
            FAMILY 100 <span className="text-[#87a9ff]">— PKN KELAS X</span>
          </h1>
          <div className="text-[#ffd700] text-sm font-bold tracking-[0.2em] uppercase">
            {category}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 relative z-10 ml-auto w-full sm:w-auto justify-end">
        <div className="px-6 py-2.5 bg-[#ffd700] text-[#0a1e54] font-black text-lg rounded-full shadow-[0_4px_10px_rgba(255,215,0,0.4)] whitespace-nowrap">
          Soal {currentQuestionIndex + 1} dari {totalQuestions}
        </div>
        <button 
          onClick={onToggleMute}
          className="w-12 h-12 rounded-full border-2 border-[#ffd700] flex items-center justify-center bg-[#051033]/50 text-[#ffd700] hover:bg-[#ffd700] hover:text-[#0a1e54] transition-colors"
          aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
