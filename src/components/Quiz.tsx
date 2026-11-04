import { useState } from 'react';
import { Quiz as QuizType } from '../types';
import { useApp } from '../context/AppContext';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';

interface QuizProps {
  subjectId: string;
  quiz: QuizType;
}

export default function Quiz({ subjectId, quiz }: QuizProps) {
  const { dispatch } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const hasSelected = selectedAnswers[currentQuestion] !== undefined;

  const handleSelect = (choiceId: string) => {
    if (quizCompleted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: choiceId });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const finishQuiz = () => {
    setShowResult(true);
    setQuizCompleted(true);
    const score = quiz.questions.reduce((acc, q, idx) => {
      const selected = selectedAnswers[idx];
      const correct = q.choices.find((c) => c.isCorrect);
      if (selected && correct && selected === correct.id) return acc + 1;
      return acc;
    }, 0);
    const percentage = Math.round((score / totalQuestions) * 100);
    dispatch({
      type: 'SET_QUIZ_PROGRESS',
      subjectId,
      quizId: quiz.id,
      progress: {
        quizId: quiz.id,
        bestScore: percentage,
        completed: true,
        lastAttempted: new Date().toISOString(),
      },
    });
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScore = () => {
    return quiz.questions.reduce((acc, q, idx) => {
      const selected = selectedAnswers[idx];
      const correct = q.choices.find((c) => c.isCorrect);
      if (selected && correct && selected === correct.id) return acc + 1;
      return acc;
    }, 0);
  };

  if (quizCompleted) {
    const score = getScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
          <Trophy className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h3>
        <p className="text-lg text-gray-600 mb-4">
          You scored <span className="font-bold text-indigo-600">{score}/{totalQuestions}</span> ({percentage}%)
        </p>
        <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{quiz.title}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {question.text}
        </h3>
        <div className="space-y-3">
          {question.choices.map((choice) => {
            const isSelected = selectedAnswers[currentQuestion] === choice.id;
            const isCorrect = choice.isCorrect;
            let borderColor = 'border-gray-200 hover:border-indigo-300';
            let bgColor = 'bg-white';
            let icon = null;

            if (showResult && isSelected) {
              if (isCorrect) {
                borderColor = 'border-green-500';
                bgColor = 'bg-green-50';
                icon = <CheckCircle className="w-5 h-5 text-green-600" />;
              } else {
                borderColor = 'border-red-500';
                bgColor = 'bg-red-50';
                icon = <XCircle className="w-5 h-5 text-red-600" />;
              }
            } else if (showResult && isCorrect) {
              borderColor = 'border-green-500';
              bgColor = 'bg-green-50';
              icon = <CheckCircle className="w-5 h-5 text-green-600" />;
            } else if (isSelected) {
              borderColor = 'border-indigo-500';
              bgColor = 'bg-indigo-50';
            }

            return (
              <button
                key={choice.id}
                onClick={() => handleSelect(choice.id)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between ${borderColor} ${bgColor} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span className="font-medium text-gray-700">{choice.text}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        {hasSelected && !showResult && !isLastQuestion && (
          <button
            onClick={handleShowResult}
            className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Check Answer
          </button>
        )}
        {hasSelected && showResult && !isLastQuestion && (
          <button
            onClick={handleNext}
            className="ml-auto inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        {hasSelected && showResult && isLastQuestion && !quizCompleted && (
          <button
            onClick={finishQuiz}
            className="ml-auto inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Finish Quiz
            <Trophy className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
