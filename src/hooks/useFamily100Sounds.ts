"use client";

import { useCallback } from "react";

export function useFamily100Sounds(isMuted: boolean = false) {
  const playTone = useCallback((frequency: number, type: OscillatorType, duration: number, volume: number = 0.5) => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("AudioContext not supported or blocked", e);
    }
  }, [isMuted]);

  const playCorrect = useCallback(() => {
    // Two high pitched cheerful beeps (Ding-Ding!)
    playTone(659.25, "sine", 0.3, 0.4); // E5
    setTimeout(() => {
      playTone(880, "sine", 0.5, 0.5); // A5
    }, 150);
  }, [playTone]);

  const playWrong = useCallback(() => {
    // Low pitched harsh buzz (Eeehhh!)
    playTone(130.81, "sawtooth", 0.5, 0.4); // C3
    setTimeout(() => {
      playTone(130.81, "sawtooth", 0.7, 0.4);
    }, 150);
  }, [playTone]);

  const playReveal = useCallback(() => {
    // Short pop/woosh for flipping a card
    playTone(400, "triangle", 0.2, 0.2);
    setTimeout(() => {
      playTone(600, "sine", 0.3, 0.2);
    }, 50);
  }, [playTone]);

  const playNext = useCallback(() => {
    // Ascending sweep
    playTone(440, "sine", 0.2, 0.3);
    setTimeout(() => {
      playTone(554.37, "sine", 0.2, 0.3);
    }, 100);
    setTimeout(() => {
      playTone(659.25, "sine", 0.4, 0.3);
    }, 200);
  }, [playTone]);

  return { playCorrect, playWrong, playReveal, playNext };
}
