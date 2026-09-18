import { motion } from "framer-motion";
import clsx from "clsx";

interface AnswerCardProps {
  index: number;
  answer: string;
  points: number;
  revealed: boolean;
}

export function AnswerCard({ index, answer, points, revealed }: AnswerCardProps) {
  return (
    <div className="relative w-full h-30 md:h-40 cursor-default" style={{ perspective: "1000px" }}>
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateX: revealed ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side (Hidden) */}
        <div 
          className={clsx(
            "absolute inset-0 flex items-center justify-center p-4 rounded-xl border-2 shadow-lg",
            "bg-linear-to-b from-[#1e4cd5] to-[#12308a] border-[#87a9ff]/30"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full border-2 border-dashed border-[#87a9ff]/20 rounded-lg flex items-center justify-center">
             <span className="text-white/60 font-black tracking-[0.2em] uppercase text-xl">
                Kartu {index + 1}
             </span>
          </div>
        </div>

        {/* Back Side (Revealed) */}
        <div 
          className={clsx(
            "absolute inset-0 flex flex-col p-4 rounded-xl border-2 shadow-lg",
            "bg-linear-to-b from-[#2a66ff] to-[#143da3] border-[#ffd700]"
          )}
          style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
        >
          <div className="grow flex items-center justify-center text-center px-2">
            <span className="text-white font-bold text-lg md:text-xl md:leading-tight line-clamp-3" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
              {answer}
            </span>
          </div>
          <div className="mt-2 text-center border-t-2 border-[#87a9ff]/30 pt-2">
            <span 
              className="text-[#ffd700] font-black text-2xl drop-shadow-md tracking-wider"
              style={{ textShadow: "0 2px 0 #b39700" }}
            >
              {points} <span className="text-sm">POIN</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
