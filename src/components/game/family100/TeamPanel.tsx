import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Edit2 } from "lucide-react";

interface TeamPanelProps {
  teamName: string;
  score: number;
  strikes: number;
  isActive: boolean;
  onNameChange?: (newName: string) => void;
}

export function TeamPanel({ teamName, score, strikes, isActive, onNameChange }: TeamPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(teamName);
  const inputRef = useRef<HTMLInputElement>(null);

  // Array of 3 to represent strikes
  const maxStrikes = [0, 1, 2];

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (editValue.trim() && onNameChange) {
      onNameChange(editValue.trim().toUpperCase());
    } else {
      setEditValue(teamName);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(teamName);
    }
  };

  return (
    <div
      className={clsx(
        "relative flex flex-col rounded-4xl border-[3px] transition-all duration-300 w-full sm:w-70 p-6 shadow-2xl",
        isActive
          ? "border-[#ffd700] bg-linear-to-b from-[#0f2d78] to-[#081a4d] shadow-[0_0_20px_rgba(255,215,0,0.3)] z-10 scale-[1.02]"
          : "border-[#1e3a8a] bg-linear-to-b from-[#0a1e54] to-[#051033] opacity-90 scale-100"
      )}
    >
      {/* Active Indicator Badge */}
      {isActive && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#ffd700] rounded-full shadow-[0_4px_10px_rgba(255,215,0,0.5)] z-20 whitespace-nowrap border-2 border-[#1e3a8a]">
          <span className="text-[#0a1e54] text-xs font-black tracking-widest uppercase">
            Giliran Aktif
          </span>
        </div>
      )}

      {/* Panel Label */}
      <div className="text-center text-[#87a9ff] text-xs font-black tracking-[0.2em] mb-4 uppercase mt-2">
        Panel Tim
      </div>

      {/* Team Name Container */}
      <div 
        className="group relative border-2 border-[#87a9ff]/30 rounded-xl px-4 py-3 bg-[#051033]/50 text-center mb-8 backdrop-blur-sm cursor-text transition-colors hover:border-[#ffd700]"
        onClick={() => !isEditing && setIsEditing(true)}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-white text-xl md:text-2xl font-black uppercase tracking-widest text-center focus:outline-none"
            maxLength={20}
          />
        ) : (
          <>
            <h2 className="text-white text-xl md:text-2xl font-black uppercase tracking-widest line-clamp-1 drop-shadow-md">
              {teamName}
            </h2>
            <div className="absolute top-1/2 right-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit2 className="w-4 h-4 text-[#87a9ff]" />
            </div>
          </>
        )}
      </div>

      {/* Score */}
      <div className="flex flex-col items-center justify-center grow mb-8">
        <span className="text-[#87a9ff] text-sm font-bold tracking-widest mb-2 uppercase">Skor</span>
        <motion.div 
          key={score}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-[#ffd700] text-7xl md:text-8xl font-black leading-none drop-shadow-[0_5px_15px_rgba(255,215,0,0.4)]"
          style={{ textShadow: "0 4px 0 #b39700" }}
        >
          {score}
        </motion.div>
      </div>

      {/* Strikes / Kesalahan */}
      <div className="flex flex-col items-center mt-auto">
        <span className="text-[#87a9ff] text-[10px] font-black tracking-[0.2em] mb-3 uppercase">
          Kesalahan
        </span>
        <div className="flex items-center justify-center gap-3">
          {maxStrikes.map((index) => {
            const hasStrike = index < strikes;
            return (
              <div 
                key={index} 
                className="relative flex items-center justify-center w-10 h-10"
              >
                {/* Background Shadow X */}
                <span className="absolute inset-0 text-4xl font-black text-black/20 select-none flex items-center justify-center leading-none transform translate-y-1">
                  X
                </span>
                
                {hasStrike ? (
                   <motion.span 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="relative text-4xl font-black text-[#ff3333] select-none flex items-center justify-center leading-none z-10"
                    style={{ textShadow: "0 2px 5px rgba(255,0,0,0.5)" }}
                  >
                    X
                  </motion.span>
                ) : (
                  <span className="relative text-4xl font-black text-[#87a9ff]/20 select-none flex items-center justify-center leading-none z-10">
                    X
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
