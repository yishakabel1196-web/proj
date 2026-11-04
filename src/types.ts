export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
  confidence?: number; // OCR confidence 0-1
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  imported?: boolean;
  importedAt?: string;
}

export interface Riddle {
  id: string;
  question: string;
  answer: string;
}

export interface Video {
  id: string;
  title: string;
  path: string; // relative path under public/videos/
  order: number;
  duration?: string;
}

export interface Material {
  id: string;
  title: string;
  path: string; // relative path under public/materials/
  subjectId: string;
  type: 'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx' | 'other';
}

export interface VideoProgress {
  videoId: string;
  percentage: number; // 0-100
  currentTime: number; // seconds
  completed: boolean;
  lastWatched: string;
}

export interface QuizProgress {
  quizId: string;
  bestScore: number;
  completed: boolean;
  lastAttempted: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  quizzes: Quiz[];
  riddles: Riddle[];
  videos: Video[];
  materials: Material[];
}

export interface ProgressState {
  videoProgress: Record<string, VideoProgress>; // subjectId:videoId -> progress
  quizProgress: Record<string, QuizProgress>; // subjectId:quizId -> progress
  riddleProgress: Record<string, boolean>; // subjectId:riddleId -> revealed
}

export interface AppState {
  subjects: Subject[];
  progress: ProgressState;
}

export interface OCRResult {
  text: string;
  confidence: number;
}

export interface ImportedQuestion {
  text: string;
  choices: { text: string; isCorrect: boolean }[];
  confidence: number;
  flagged: boolean;
}

export interface StoredData {
  version: number;
  state: AppState;
}
