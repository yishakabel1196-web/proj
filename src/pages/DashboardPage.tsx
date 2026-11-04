import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { TrendingUp, Award, BookOpen, Video, Puzzle, Target } from 'lucide-react';

const colorMap: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
};

export default function DashboardPage() {
  const { state, getSubjectProgress } = useApp();

  const overallProgress = state.subjects.length > 0
    ? Math.round(state.subjects.reduce((acc, s) => acc + getSubjectProgress(s.id), 0) / state.subjects.length)
    : 0;

  const totalQuizzes = state.subjects.reduce((acc, s) => acc + s.quizzes.length, 0);
  const completedQuizzes = state.subjects.reduce((acc, s) => {
    return acc + s.quizzes.filter((q) => {
      const key = `${s.id}:${q.id}`;
      return state.progress.quizProgress[key]?.completed;
    }).length;
  }, 0);

  const totalVideos = state.subjects.reduce((acc, s) => acc + s.videos.length, 0);
  const completedVideos = state.subjects.reduce((acc, s) => {
    return acc + s.videos.filter((v) => {
      const key = `${s.id}:${v.id}`;
      return state.progress.videoProgress[key]?.completed;
    }).length;
  }, 0);

  const totalRiddles = state.subjects.reduce((acc, s) => acc + s.riddles.length, 0);
  const revealedRiddles = state.subjects.reduce((acc, s) => {
    return acc + s.riddles.filter((r) => {
      const key = `${s.id}:${r.id}`;
      return state.progress.riddleProgress[key];
    }).length;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Dashboard</h1>
        <p className="text-gray-500">Track your learning journey across all subjects</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-sm text-gray-500">Overall</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{overallProgress}%</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Quizzes</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{completedQuizzes}<span className="text-lg text-gray-400">/{totalQuizzes}</span></p>
          <p className="text-xs text-gray-400 mt-1">completed</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Video className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Videos</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{completedVideos}<span className="text-lg text-gray-400">/{totalVideos}</span></p>
          <p className="text-xs text-gray-400 mt-1">watched</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Puzzle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Riddles</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{revealedRiddles}<span className="text-lg text-gray-400">/{totalRiddles}</span></p>
          <p className="text-xs text-gray-400 mt-1">revealed</p>
        </div>
      </div>

      {/* Per-Subject Progress */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            Subject Breakdown
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Progress is weighted: 40% quizzes, 40% videos, 20% riddles
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {state.subjects.map((subject) => {
            const progress = getSubjectProgress(subject.id);
            const gradient = colorMap[subject.color] || colorMap.blue;

            const subjectQuizTotal = subject.quizzes.length;
            const subjectQuizDone = subject.quizzes.filter((q) => {
              const key = `${subject.id}:${q.id}`;
              return state.progress.quizProgress[key]?.completed;
            }).length;

            const subjectVideoTotal = subject.videos.length;
            const subjectVideoDone = subject.videos.filter((v) => {
              const key = `${subject.id}:${v.id}`;
              return state.progress.videoProgress[key]?.completed;
            }).length;

            const subjectRiddleTotal = subject.riddles.length;
            const subjectRiddleDone = subject.riddles.filter((r) => {
              const key = `${subject.id}:${r.id}`;
              return state.progress.riddleProgress[key];
            }).length;

            return (
              <Link
                key={subject.id}
                to={`/subject/${subject.id}`}
                className="flex items-center gap-5 p-5 hover:bg-gray-50 transition-colors group"
              >
                <span className="text-3xl">{subject.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {subject.name}
                    </h3>
                    <span className="text-sm font-bold text-gray-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
                    <div
                      className={`bg-gradient-to-r ${gradient} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {subjectQuizDone}/{subjectQuizTotal} quizzes
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      {subjectVideoDone}/{subjectVideoTotal} videos
                    </span>
                    <span className="flex items-center gap-1">
                      <Puzzle className="w-3 h-3" />
                      {subjectRiddleDone}/{subjectRiddleTotal} riddles
                    </span>
                  </div>
                </div>
                <Award className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
