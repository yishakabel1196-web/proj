import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Subject, VideoProgress, QuizProgress, ProgressState } from '../types';
import { seedSubjects } from '../data/seedData';

const STORAGE_KEY = 'studyhub_data';
const SCHEMA_VERSION = 1;

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.version === SCHEMA_VERSION) {
        return parsed.state;
      }
    }
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
  }
  return {
    subjects: seedSubjects,
    progress: {
      videoProgress: {},
      quizProgress: {},
      riddleProgress: {},
    },
  };
}

function saveState(state: AppState) {
  try {
    const data = { version: SCHEMA_VERSION, state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
}

type Action =
  | { type: 'SET_VIDEO_PROGRESS'; subjectId: string; videoId: string; progress: VideoProgress }
  | { type: 'SET_QUIZ_PROGRESS'; subjectId: string; quizId: string; progress: QuizProgress }
  | { type: 'SET_RIDDLE_REVEALED'; subjectId: string; riddleId: string }
  | { type: 'ADD_QUIZ'; subjectId: string; quiz: import('../types').Quiz }
  | { type: 'UPDATE_QUIZ'; subjectId: string; quizId: string; quiz: import('../types').Quiz }
  | { type: 'DELETE_QUIZ'; subjectId: string; quizId: string }
  | { type: 'ADD_MATERIAL'; material: import('../types').Material }
  | { type: 'RESET_ALL' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_VIDEO_PROGRESS': {
      const key = `${action.subjectId}:${action.videoId}`;
      return {
        ...state,
        progress: {
          ...state.progress,
          videoProgress: {
            ...state.progress.videoProgress,
            [key]: action.progress,
          },
        },
      };
    }
    case 'SET_QUIZ_PROGRESS': {
      const key = `${action.subjectId}:${action.quizId}`;
      const existing = state.progress.quizProgress[key];
      const bestScore = existing
        ? Math.max(existing.bestScore, action.progress.bestScore)
        : action.progress.bestScore;
      return {
        ...state,
        progress: {
          ...state.progress,
          quizProgress: {
            ...state.progress.quizProgress,
            [key]: { ...action.progress, bestScore },
          },
        },
      };
    }
    case 'SET_RIDDLE_REVEALED': {
      const key = `${action.subjectId}:${action.riddleId}`;
      return {
        ...state,
        progress: {
          ...state.progress,
          riddleProgress: {
            ...state.progress.riddleProgress,
            [key]: true,
          },
        },
      };
    }
    case 'ADD_QUIZ': {
      const subjects = state.subjects.map((s) =>
        s.id === action.subjectId
          ? { ...s, quizzes: [...s.quizzes, action.quiz] }
          : s
      );
      return { ...state, subjects };
    }
    case 'UPDATE_QUIZ': {
      const subjects = state.subjects.map((s) =>
        s.id === action.subjectId
          ? {
              ...s,
              quizzes: s.quizzes.map((q) =>
                q.id === action.quizId ? action.quiz : q
              ),
            }
          : s
      );
      return { ...state, subjects };
    }
    case 'DELETE_QUIZ': {
      const subjects = state.subjects.map((s) =>
        s.id === action.subjectId
          ? { ...s, quizzes: s.quizzes.filter((q) => q.id !== action.quizId) }
          : s
      );
      return { ...state, subjects };
    }
    case 'ADD_MATERIAL': {
      const subjects = state.subjects.map((s) =>
        s.id === action.material.subjectId
          ? { ...s, materials: [...s.materials, action.material] }
          : s
      );
      return { ...state, subjects };
    }
    case 'RESET_ALL': {
      return {
        subjects: seedSubjects,
        progress: { videoProgress: {}, quizProgress: {}, riddleProgress: {} },
      };
    }
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  getSubjectProgress: (subjectId: string) => number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const getSubjectProgress = (subjectId: string): number => {
    const subject = state.subjects.find((s) => s.id === subjectId);
    if (!subject) return 0;

    // Quiz progress: % of quizzes completed (bestScore > 0)
    const totalQuizzes = subject.quizzes.length;
    const completedQuizzes = subject.quizzes.filter((q) => {
      const key = `${subjectId}:${q.id}`;
      return state.progress.quizProgress[key]?.completed;
    }).length;
    const quizScore = totalQuizzes > 0 ? completedQuizzes / totalQuizzes : 0;

    // Riddle progress: % of riddles revealed
    const totalRiddles = subject.riddles.length;
    const revealedRiddles = subject.riddles.filter((r) => {
      const key = `${subjectId}:${r.id}`;
      return state.progress.riddleProgress[key];
    }).length;
    const riddleScore = totalRiddles > 0 ? revealedRiddles / totalRiddles : 0;

    // Video progress: average watch percentage
    const totalVideos = subject.videos.length;
    const videoPercentages = subject.videos.map((v) => {
      const key = `${subjectId}:${v.id}`;
      return state.progress.videoProgress[key]?.percentage || 0;
    });
    const videoScore = totalVideos > 0
      ? videoPercentages.reduce((a, b) => a + b, 0) / (totalVideos * 100)
      : 0;

    // Weighted: 40% quiz, 20% riddle, 40% video
    return Math.round((quizScore * 0.4 + riddleScore * 0.2 + videoScore * 0.4) * 100);
  };

  return (
    <AppContext.Provider value={{ state, dispatch, getSubjectProgress }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
