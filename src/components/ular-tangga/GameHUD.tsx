"use client";

import { Player } from "@/types/ular-tangga";
import clsx from "clsx";
import { Dice } from "./Dice";

interface GameHUDProps {
  players: Player[];
  currentPlayerIndex: number;
  diceValue: number | null;
  isRolling: boolean;
  onRoll: () => void;
  disabled: boolean;
}

export function GameHUD({ players, currentPlayerIndex, diceValue, isRolling, onRoll, disabled }: GameHUDProps) {
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="flex flex-col lg:flex-col gap-6 w-full max-w-4xl mx-auto shrink-0">
      {/* Active Player Card */}
      <div className="w-full lg:w-full p-6 bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div 
          className="absolute top-0 left-0 w-full h-1" 
          style={{ backgroundColor: currentPlayer.color }} 
        />
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse border-2 border-white dark:border-gray-800"
            style={{ backgroundColor: currentPlayer.color }}
          >
            P{currentPlayer.id}
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Giliran Aktif</div>
            <h3 className="font-title font-bold text-xl text-secondary dark:text-white truncate">{currentPlayer.name}</h3>
          </div>
        </div>

        <div className="flex justify-center mb-6">
           <Dice value={diceValue} isRolling={isRolling} onRoll={onRoll} disabled={disabled} />
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Posisi</div>
            <div className="font-bold text-xl text-secondary dark:text-white">{currentPlayer.position}</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">XP</div>
            <div className="font-bold text-xl text-primary dark:text-gold">{currentPlayer.score}</div>
          </div>
        </div>
      </div>

      {/* Other Players List */}
      <div className="w-full lg:w-full p-4 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-md flex flex-col">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Daftar Pemain</h4>
        <div className="space-y-2 flex-1 overflow-y-auto max-h-62.5 lg:max-h-none pr-2">
          {players.map((p, idx) => (
            <div 
              key={p.id}
              className={clsx(
                "flex items-center justify-between p-3 rounded-xl transition-all",
                idx === currentPlayerIndex 
                  ? "bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-gray-600" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm border border-white dark:border-gray-700"
                  style={{ backgroundColor: p.color }}
                >
                  P{p.id}
                </div>
                <div>
                  <div className="font-bold text-sm text-secondary dark:text-gray-200">{p.name}</div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">{p.score} XP</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-400 uppercase">Posisi</div>
                <div className="font-bold text-gray-700 dark:text-gray-300">{p.position}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
