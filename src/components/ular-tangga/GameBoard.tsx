"use client";

import { Player } from "@/types/ular-tangga";
import { snakes, ladders } from "@/data/ular-tangga/boardConfig";
import { learningStations } from "@/data/ular-tangga/learningStations";
import { motion } from "framer-motion";
import clsx from "clsx";
import { MonitorPlay, Trophy } from "lucide-react";

interface GameBoardProps {
  players: Player[];
}

export function GameBoard({ players }: GameBoardProps) {
  const getCellCenter = (num: number) => {
    const row = Math.floor((num - 1) / 10);
    const visualRow = 9 - row;

    const col =
      row % 2 === 0
        ? (num - 1) % 10
        : 9 - ((num - 1) % 10);

    return {
      x: col * 10 + 5,
      y: visualRow * 10 + 5,
    };
  };

  const getBoardSquares = () => {
    const squares: number[] = [];

    for (let row = 9; row >= 0; row--) {
      const leftToRight = row % 2 === 0;

      for (let col = 0; col < 10; col++) {
        const num = leftToRight
          ? row * 10 + col + 1
          : row * 10 + (9 - col) + 1;

        squares.push(num);
      }
    }

    return squares;
  };

  const boardSquares = getBoardSquares();

  const getStationByCell = (cell: number) =>
    learningStations.find((station) => station.cell === cell);

  const snakeHeads = new Set(Object.keys(snakes).map(Number));
  const ladderBottoms = new Set(Object.keys(ladders).map(Number));

  const renderSquare = (num: number) => {
    const station = getStationByCell(num);
    const isSnakeHead = snakeHeads.has(num);
    const isLadderBottom = ladderBottoms.has(num);
    const isFinish = num === 100;

    const playersHere = players.filter(
      (player) => player.position === num
    );

    const isEven = num % 2 === 0;

    return (
      <div
        key={num}
        className={clsx("relative flex aspect-square min-w-0 items-center justify-center", "border border-slate-200/80 dark:border-slate-700/80", "transition-colors duration-200",

          // Base board
          isEven
            ? "bg-[#F8FAFC] dark:bg-slate-800"
            : "bg-[#F1F5F9] dark:bg-slate-850",

          // Special cells
          station &&
            "bg-sky-50 dark:bg-sky-950/40",

          isSnakeHead &&
            "bg-rose-50 dark:bg-rose-950/30",

          isLadderBottom &&
            "bg-emerald-50 dark:bg-emerald-950/30",

          isFinish &&
            "bg-amber-50 dark:bg-amber-950/40",
        )}
      >
        {/* Cell number */}
        <span
          className={clsx("absolute left-1.5 top-1", "text-[9px] font-semibold tracking-tight", "text-slate-400 dark:text-slate-500", "select-none")}
        >
          {num}
        </span>

        {/* Station indicator */}
        {station && (
          <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-md bg-sky-500 text-white shadow-sm"> <MonitorPlay className="h-2.5 w-2.5" strokeWidth={2.5} /> </div>
        )}

        {/* Finish indicator */}
        {isFinish && (
          <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-md bg-amber-400 text-white shadow-sm" ><Trophy className="h-2.5 w-2.5" strokeWidth={2.5} /> 
          </div>
        )}

        {/* Player tokens */}
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-0.5 p-1">
          {playersHere.map((player, index) => (
            <motion.div
              key={player.id}
              layoutId={`player-${player.id}`}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 32,
              }}
              className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow-[0_2px_5px_rgba(15,23,42,0.3)] md:h-6 md:w-6" style={{ backgroundColor: player.color, zIndex: 20 + index, }} >
              {/* Token highlight */}
              <span className="absolute left-3 top-0.5 h-1 w-1 rounded-full bg-white/70" />
              <span className="relative text-[7px] font-bold text-white md:text-[9px]">{player.id}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      {/* Soft board elevation */}
      <div className="absolute -inset-3 rounded-[28px] bg-slate-950/10 blur-xl dark:bg-black/30" />

      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-[6px] border-white bg-slate-300 shadow-[0_20px_50px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-700 dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        {/* Board */}
        <div className="grid h-full w-full grid-cols-10 grid-rows-10">
          {boardSquares.map(renderSquare)}
        </div>

        {/* Snakes & ladders */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-30 h-full w-full">
          {/* LADDERS */}
          {Object.entries(ladders).map(([bottom, top]) => {
            const p1 = getCellCenter(Number(bottom));
            const p2 = getCellCenter(top);

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;

            const length = Math.sqrt(dx * dx + dy * dy);

            const nx = (-dy / length) * 1.8;
            const ny = (dx / length) * 1.8;

            return (
              <g key={`ladder-${bottom}`}>
                {/* Rails */}
                <line
                  x1={p1.x - nx}
                  y1={p1.y - ny}
                  x2={p2.x - nx}
                  y2={p2.y - ny}
                  stroke="#92400E"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                />

                <line
                  x1={p1.x + nx}
                  y1={p1.y + ny}
                  x2={p2.x + nx}
                  y2={p2.y + ny}
                  stroke="#92400E"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                />

                {/* Wooden rungs */}
                {Array.from({ length: Math.max(3, Math.floor(length / 7)) }).map(
                  (_, i, arr) => {
                    const t = (i + 1) / (arr.length + 1);

                    const cx = p1.x + dx * t;
                    const cy = p1.y + dy * t;

                    return (
                      <line
                        key={i}
                        x1={cx - nx}
                        y1={cy - ny}
                        x2={cx + nx}
                        y2={cy + ny}
                        stroke="#D6A66A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    );
                  }
                )}
              </g>
            );
          })}

          {/* SNAKES */}
          {Object.entries(snakes).map(([head, tail]) => {
            const p1 = getCellCenter(Number(head));
            const p2 = getCellCenter(tail);

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;

            const length = Math.sqrt(dx * dx + dy * dy);

            const nx = -dy / length;
            const ny = dx / length;

            const offset = Math.min(13, length * 0.22);

            const direction =
              Number(head) % 2 === 0 ? 1 : -1;

            const cx1 =
              p1.x + dx * 0.3 + nx * offset * direction;

            const cy1 =
              p1.y + dy * 0.3 + ny * offset * direction;

            const cx2 =
              p1.x + dx * 0.7 - nx * offset * direction;

            const cy2 =
              p1.y + dy * 0.7 - ny * offset * direction;

            const path = `
              M ${p1.x} ${p1.y}
              C ${cx1} ${cy1},
                ${cx2} ${cy2},
                ${p2.x} ${p2.y}
            `;

            return (
              <g key={`snake-${head}`}>
                {/* Shadow */}
                <path
                  d={path}
                  fill="none"
                  stroke="rgba(15,23,42,0.18)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  transform="translate(0.7 1)"
                />

                {/* Outer body */}
                <path
                  d={path}
                  fill="none"
                  stroke="#065F46"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />

                {/* Body */}
                <path
                  d={path}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Body highlight */}
                <path
                  d={path}
                  fill="none"
                  stroke="#6EE7B7"
                  strokeWidth="0.45"
                  strokeLinecap="round"
                  strokeDasharray="0.5 2"
                />

                {/* Head */}
                <circle
                  cx={p1.x}
                  cy={p1.y}
                  r="1.7"
                  fill="#F43F5E"
                  stroke="#881337"
                  strokeWidth="0.35"
                />

                {/* Eyes */}
                <circle
                  cx={p1.x - 0.55}
                  cy={p1.y - 0.45}
                  r="0.38"
                  fill="white"
                />

                <circle
                  cx={p1.x + 0.55}
                  cy={p1.y - 0.45}
                  r="0.38"
                  fill="white"
                />

                <circle
                  cx={p1.x - 0.55}
                  cy={p1.y - 0.45}
                  r="0.15"
                  fill="#0F172A"
                />

                <circle
                  cx={p1.x + 0.55}
                  cy={p1.y - 0.45}
                  r="0.15"
                  fill="#0F172A"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
