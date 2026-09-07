"use client";

import { useState } from "react";
import { PLAYER_COLORS } from "@/data/ular-tangga/boardConfig";
import { Player } from "@/types/ular-tangga";
import clsx from "clsx";
import {
  Users,
  Play,
  Check,
  Palette,
} from "lucide-react";

interface GameSetupProps {
  onStart: (players: Player[]) => void;
}

export function GameSetup({
  onStart,
}: GameSetupProps) {
  const [playerCount, setPlayerCount] = useState(2);

  const [playerConfigs, setPlayerConfigs] =
    useState(
      Array.from({ length: 6 }).map((_, i) => ({
        name: `Pemain ${i + 1}`,
        color: PLAYER_COLORS[i].hex,
      }))
    );

  const handleNameChange = (
    index: number,
    name: string
  ) => {
    setPlayerConfigs((prev) =>
      prev.map((player, i) =>
        i === index
          ? { ...player, name }
          : player
      )
    );
  };

  const handleColorChange = (
    index: number,
    color: string
  ) => {
    setPlayerConfigs((prev) =>
      prev.map((player, i) =>
        i === index
          ? { ...player, color }
          : player
      )
    );
  };

  const handleStart = () => {
    const activeConfigs =
      playerConfigs.slice(0, playerCount);

    const initialPlayers: Player[] =
      activeConfigs.map((config, index) => ({
        id: index + 1,
        name:
          config.name.trim() ||
          `Pemain ${index + 1}`,
        position: 1,
        color: config.color,
        score: 0,
        correctAnswers: 0,
        answeredQuestions: 0,
        videosCompleted: 0,
        reflectionScore: 0,
        achievements: [],
      }));

    onStart(initialPlayers);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div
          className="
            mx-auto
            flex h-14 w-14
            items-center justify-center
            rounded-2xl
            bg-sky-50
            text-sky-600
            ring-1 ring-sky-100
            dark:bg-sky-950/40
            dark:text-sky-400
            dark:ring-sky-900/50
          "
        >
          <Users className="h-6 w-6" />
        </div>

        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Ular Tangga Edukatif
        </p>

        <h1
          className="
            mt-1
            text-2xl font-black
            tracking-tight
            text-slate-900
            sm:text-3xl
            dark:text-white
          "
        >
          Siapkan permainan
        </h1>

        <p
          className="
            mx-auto mt-2
            max-w-md
            text-sm leading-relaxed
            text-slate-500
            dark:text-slate-400
          "
        >
          Tentukan jumlah pemain dan
          personalisasikan pion sebelum memulai.
        </p>
      </div>

      {/* Main card */}
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border border-slate-200
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
          dark:border-slate-800
          dark:bg-slate-900
          dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        "
      >
        {/* Player count */}
        <div className="border-b border-slate-200 p-5 sm:p-6 dark:border-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Jumlah pemain
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Pilih 2–6 pemain
              </p>
            </div>

            <span
              className="
                rounded-lg
                bg-slate-100
                px-2.5 py-1
                text-xs font-bold
                text-slate-500
                dark:bg-slate-800
                dark:text-slate-400
              "
            >
              {playerCount} pemain
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[2, 3, 4, 5, 6].map((number) => {
              const active =
                playerCount === number;

              return (
                <button
                  key={number}
                  type="button"
                  onClick={() =>
                    setPlayerCount(number)
                  }
                  className={clsx(
                    `
                      relative
                      flex h-12
                      items-center justify-center
                      rounded-xl
                      border
                      text-sm font-bold
                      transition-all
                    `,
                    active
                      ? `
                        border-sky-500
                        bg-sky-500
                        text-white
                        shadow-sm
                      `
                      : `
                        border-slate-200
                        bg-white
                        text-slate-600
                        hover:border-slate-300
                        hover:bg-slate-50
                        dark:border-slate-700
                        dark:bg-slate-800
                        dark:text-slate-300
                        dark:hover:border-slate-600
                      `
                  )}
                >
                  {number}

                  {active && (
                    <span
                      className="
                        absolute
                        right-1.5 top-1.5
                        flex h-3.5 w-3.5
                        items-center justify-center
                        rounded-full
                        bg-white/20
                      "
                    >
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Players */}
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Palette className="h-4 w-4 text-slate-400" />

            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Pemain
              </h2>

              <p className="text-xs text-slate-400">
                Atur nama dan warna pion
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {Array.from({
              length: playerCount,
            }).map((_, index) => {
              const player =
                playerConfigs[index];

              return (
                <div
                  key={index}
                  className="
                    group
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50/70
                    p-3
                    transition-colors
                    hover:border-slate-300
                    dark:border-slate-800
                    dark:bg-slate-800/40
                    dark:hover:border-slate-700
                  "
                >
                  <div className="flex items-center gap-3">
                    {/* Player token */}
                    <div
                      className="
                        flex h-10 w-10
                        shrink-0
                        items-center justify-center
                        rounded-xl
                        text-[11px]
                        font-black
                        text-white
                        shadow-sm
                      "
                      style={{
                        backgroundColor:
                          player.color,
                      }}
                    >
                      P{index + 1}
                    </div>

                    {/* Name */}
                    <div className="min-w-0 flex-1">
                      <label
                        htmlFor={`player-${index}`}
                        className="
                          mb-1 block
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-slate-400
                        "
                      >
                        Pemain {index + 1}
                      </label>

                      <input
                        id={`player-${index}`}
                        type="text"
                        value={player.name}
                        onChange={(event) =>
                          handleNameChange(
                            index,
                            event.target.value
                          )
                        }
                        maxLength={12}
                        className="
                          w-full
                          border-0
                          bg-transparent
                          p-0
                          text-sm font-semibold
                          text-slate-900
                          outline-none
                          placeholder:text-slate-400
                          dark:text-white
                        "
                        placeholder={`Nama pemain ${index + 1}`}
                      />
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="mt-3 flex items-center gap-2 pl-13">
                    <span className="mr-1 text-[10px] font-medium text-slate-400">
                      Warna
                    </span>

                    {PLAYER_COLORS.map((color) => {
                      const active =
                        player.color ===
                        color.hex;

                      return (
                        <button
                          key={color.hex}
                          type="button"
                          onClick={() =>
                            handleColorChange(
                              index,
                              color.hex
                            )
                          }
                          title={color.name}
                          aria-label={`Pilih warna ${color.name}`}
                          className={clsx(
                            `
                              relative
                              flex h-7 w-7
                              items-center justify-center
                              rounded-full
                              transition-all
                            `,
                            active
                              ? "ring-2 ring-slate-900 ring-offset-2 dark:ring-white dark:ring-offset-slate-800"
                              : "opacity-50 hover:scale-105 hover:opacity-100"
                          )}
                          style={{
                            backgroundColor:
                              color.hex,
                          }}
                        >
                          {active && (
                            <Check
                              className="
                                h-3.5 w-3.5
                                text-white
                                drop-shadow-sm
                              "
                              strokeWidth={3}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer / CTA */}
        <div
          className="
            border-t border-slate-200
            bg-slate-50/70
            p-5
            sm:p-6
            dark:border-slate-800
            dark:bg-slate-950/40
          "
        >
          <button
            type="button"
            onClick={handleStart}
            className="
              flex w-full
              items-center justify-center
              gap-2
              rounded-xl
              bg-slate-900
              px-5 py-3.5
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
            <Play className="h-4 w-4" />
            Mulai permainan
          </button>

          <p className="mt-3 text-center text-[10px] text-slate-400">
            Setiap pemain memulai dari petak 1
          </p>
        </div>
      </div>
    </div>
  );
}
