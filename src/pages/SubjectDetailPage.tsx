import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Quiz from '../components/Quiz';
import Riddles from '../components/Riddles';
import Videos from '../components/Videos';
import Materials from '../components/Materials';
import { ArrowLeft, BookOpen, Puzzle, Play, FileText, ChevronDown } from 'lucide-react';

type Tab = 'quiz' | 'riddles' | 'videos' | 'materials';

export default function SubjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('quiz');
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const subject = state.subjects.find((s) => s.id === id);

  if (!subject) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Subject not found.</p>
        <Link to="/" className="text-indigo-600 hover:underline mt-2 inline-block">
          ← Back to subjects
        </Link>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'quiz', label: 'Quizzes', icon: <BookOpen className="w-4 h-4" />, count: subject.quizzes.length },
    { id: 'riddles', label: 'Riddles', icon: <Puzzle className="w-4 h-4" />, count: subject.riddles.length },
    { id: 'videos', label: 'Videos', icon: <Play className="w-4 h-4" />, count: subject.videos.length },
    { id: 'materials', label: 'Materials', icon: <FileText className="w-4 h-4" />, count: subject.materials.length },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'quiz':
        if (selectedQuiz) {
          const quiz = subject.quizzes.find((q) => q.id === selectedQuiz);
          if (quiz) {
            return (
              <div>
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="mb-4 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to quiz list
                </button>
                <Quiz subjectId={subject.id} quiz={quiz} />
              </div>
            );
          }
        }
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Quizzes</h3>
            <div className="grid gap-3">
              {subject.quizzes.map((quiz) => (
                <button
                  key={quiz.id}
                  onClick={() => setSelectedQuiz(quiz.id)}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {quiz.title}
                      </p>
                      <p className="text-sm text-gray-400">
                        {quiz.questions.length} questions
                        {quiz.imported && (
                          <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Imported</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-300 -rotate-90 group-hover:text-indigo-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        );
      case 'riddles':
        return <Riddles subjectId={subject.id} riddles={subject.riddles} />;
      case 'videos':
        return <Videos subjectId={subject.id} videos={subject.videos} />;
      case 'materials':
        return <Materials materials={subject.materials} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-3">
          <ArrowLeft className="w-4 h-4" />
          All Subjects
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{subject.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
            <p className="text-gray-500 text-sm">{subject.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedQuiz(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-2xl p-6 min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
}
