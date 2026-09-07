"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface DiceProps {
  value: number | null;
  isRolling: boolean;
  onRoll: () => void;
  disabled: boolean;
}

const DICE_DOTS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

export function Dice({
  value,
  isRolling,
  onRoll,
  disabled,
}: DiceProps) {
  const isInteractive = !disabled && !isRolling;

  const renderDots = (val: number) => {
    const activeDots = DICE_DOTS[val] ?? [];

    return Array.from({ length: 9 }, (_, index) => (
      <div
        key={index}
        className="flex items-center justify-center"
      >
        {activeDots.includes(index) && (
          <span
            className="
              h-2.5 w-2.5
              rounded-full
              bg-slate-800
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]
              sm:h-3 sm:w-3
              dark:bg-white
            "
          />
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center">
      <motion.button
        type="button"
        onClick={onRoll}
        disabled={!isInteractive}
        aria-label={isRolling ? "Dadu sedang dikocok" : "Kocok dadu"}
        aria-busy={isRolling}
        whileHover={
          isInteractive
            ? {
                y: -3,
                scale: 1.02,
              }
            : undefined
        }
        whileTap={
          isInteractive
            ? {
                scale: 0.96,
              }
            : undefined
        }
        animate={
          isRolling
            ? {
                rotate: [0, -12, 12, -8, 8, 0],
              }
            : {
                rotate: 0,
              }
        }
        transition={
          isRolling
            ? {
                duration: 0.45,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                type: "spring",
                stiffness: 400,
                damping: 20,
              }
        }
        className={clsx(
          "group relative",
          "flex h-24 w-24 items-center justify-center",
          "rounded-[22px]",
          "border border-slate-200",
          "bg-white",
          "shadow-[0_8px_24px_rgba(15,23,42,0.12)]",
          "transition-shadow duration-200",
          "sm:h-28 sm:w-28",

          isInteractive &&
            [
              "cursor-pointer",
              "hover:border-slate-300",
              "hover:shadow-[0_12px_30px_rgba(15,23,42,0.16)]",
            ],

          !isInteractive && [
            "cursor-not-allowed",
            "opacity-60",
          ],

          "dark:border-slate-700",
          "dark:bg-slate-800",
          "dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
        )}
      >
        {/* Subtle inner surface */}
        <span
          className="
            pointer-events-none
            absolute inset-1.5
            rounded-2xl
            border border-slate-100
            dark:border-slate-700/80
          "
        />

        {value ? (
          <span
            className="
              relative
              grid h-16 w-16
              grid-cols-3 grid-rows-3
              gap-1
              sm:h-20 sm:w-20
            "
          >
            {renderDots(value)}
          </span>
        ) : (
          <span
            className="
              relative
              text-3xl font-black
              text-slate-300
              dark:text-slate-600
            "
          >
            ?
          </span>
        )}

        {/* Rolling indicator */}
        {isRolling && (
          <motion.span
            className="
              absolute -bottom-1.5
              h-1.5 w-8
              rounded-full
              bg-emerald-500
            "
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.7, 1, 0.7] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
            }}
          />
        )}
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          opacity: isRolling ? 0.5 : 1,
        }}
        className="
          mt-3
          text-center
        "
      >
        <p
          className={clsx(
            "text-xs font-bold uppercase tracking-[0.14em]",
            isRolling
              ? "text-slate-400"
              : "text-slate-500 dark:text-slate-400"
          )}
        >
          {isRolling ? "Mengocok..." : "Kocok Dadu"}
        </p>

        {!isRolling && !disabled && !value && (
          <p className="mt-1 text-[11px] text-slate-400">
            Tekan untuk mulai
          </p>
        )}
      </motion.div>
    </div>
  );
}
