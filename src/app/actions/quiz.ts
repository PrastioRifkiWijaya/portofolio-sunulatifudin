"use server";

import { PPKnService } from "@/services/ppkn.service";

export async function checkQuizAnswer(quizId: string, selectedOption: number) {
  try {
    const quiz = await PPKnService.getQuizById(quizId);
    if (!quiz) {
      return { success: false, error: "Quiz not found" };
    }
    
    const isCorrect = quiz.correct_answer === selectedOption;
    return { 
      success: true, 
      isCorrect, 
      explanation: quiz.explanation 
    };
  } catch {
    return { success: false, error: "Failed to check answer" };
  }
}
