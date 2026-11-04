import { useState } from 'react';
import { Riddle as RiddleType } from '../types';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface RiddlesProps {
  subjectId: string;
  riddles: RiddleType[];
}

export default function Riddles({ subjectId, riddles }: RiddlesProps) {
  const { state, dispatch } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  if (riddles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No riddles available for this subject yet.</p>
      </div>
    );
  }

  const riddle = riddles[currentIndex];
  const riddleKey = `${subjectId}:${riddle.id}`;
  const isRevealed = revealed[riddle.id] || state.progress.riddleProgress[riddleKey];
  const isLast = currentIndex === riddles.length - 1;
  const isFirst = currentIndex === 0;

  const handleReveal = () => {
    setRevealed({ ...revealed, [riddle.id]: true });
    dispatch({ type: 'SET_RIDDLE_REVEALED', subjectId, riddleId: riddle.id });
  };

  const handleHide = () => {
    setRevealed({ ...revealed, [riddle.id]: false });
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const revealedCount = riddles.filter((r) => {
    const key = `${subjectId}:${r.id}`;
    return state.progress.riddleProgress[key] || revealed[r.id];
  }).length;

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-6 text-center">
        <span className="text-sm text-gray-500">
          Riddle {currentIndex + 1} of {riddles.length} • {revealedCount} revealed
        </span>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-6">
        <div
          className={`relative w-full min-h-[280px] rounded-2xl shadow-lg transition-all duration-500 ${
            isRevealed
              ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
              : 'bg-gradient-to-br from-indigo-500 to-purple-600'
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
            {!isRevealed ? (
              <>
                <div className="text-4xl mb-4">🤔</div>
                <p className="text-lg font-medium text-center leading-relaxed">
                  {riddle.question}
                </p>
                <button
                  onClick={handleReveal}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Reveal Answer
                </button>
              </>
            ) : (
              <>
                <div className="text-4xl mb-4">💡</div>
                <p className="text-lg font-medium text-center leading-relaxed">
                  {riddle.answer}
                </p>
                <button
                  onClick={handleHide}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  <EyeOff className="w-4 h-4" />
                  Hide Answer
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isFirst
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <div className="flex gap-1.5">
          {riddles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-indigo-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={isLast}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isLast
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
