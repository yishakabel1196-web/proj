import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, ChevronRight, TrendingUp } from 'lucide-react';

const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
};

export default function SubjectsPage() {
  const { state, getSubjectProgress } = useApp();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Subjects</h1>
        <p className="text-gray-500">Choose a subject to start studying</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.subjects.map((subject) => {
          const progress = getSubjectProgress(subject.id);
          const colors = colorMap[subject.color] || colorMap.blue;

          return (
            <Link
              key={subject.id}
              to={`/subject/${subject.id}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300"
            >
              {/* Header gradient */}
              <div className={`h-24 bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}>
                <span className="text-4xl">{subject.icon}</span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {subject.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {subject.quizzes.length} quizzes
                  </span>
                  <span>{subject.videos.length} videos</span>
                  <span>{subject.riddles.length} riddles</span>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Progress
                    </span>
                    <span className={`text-xs font-bold ${colors.text}`}>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${colors.gradient} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
