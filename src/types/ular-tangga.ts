export type Player = {
  id: number;
  name: string;
  position: number;
  color: string;
  score: number;
  correctAnswers: number;
  answeredQuestions: number;
  videosCompleted: number;
  reflectionScore: number;
  achievements: string[];
};

export type Challenge = {
  id: number;
  topic: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  realLifeApplication: string;
};

export type LearningStation = {
  id: number;
  cell: number;
  title: string;
  topic: string;
  videoId: string;
  scenario: string;
  reflectionQuestion: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type PendingEvent = 
  | { type: "snake"; from: number; to: number }
  | { type: "ladder"; from: number; to: number }
  | { type: "station"; cell: number }
  | { type: "finish"; cell: number };
