import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProgress } from '../hooks/useProgress';
import { useLanguages } from '../hooks/useLanguages';
import { BookOpen, Clock, Trophy, Flame, Plus, ArrowRight, Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { data: progress = [], isLoading: progressLoading } = useUserProgress();
  const { data: languages = [] } = useLanguages();

  const getProgressPercentage = (prog: any) => {
    const totalWeeks = prog.learningPath.duration;
    return Math.round((prog.currentWeek / totalWeeks) * 100);
  };

  const getTotalTimeSpent = () => {
    return progress.reduce((total, prog) => total + prog.totalTimeSpent, 0);
  };

  const getMaxStreak = () => {
    return Math.max(...progress.map(prog => prog.streakDays), 0);
  };

  const getCompletedLessons = () => {
    return progress.reduce((total, prog) => total + prog.lessonsCompleted.length, 0);
  };

  if (progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Continue your language learning journey and track your progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: <Clock className="h-6 w-6 text-blue-600" />,
              label: "Total Time",
              value: `${Math.round(getTotalTimeSpent() / 60)}h`,
              bgColor: "bg-blue-100",
            },
            {
              icon: <BookOpen className="h-6 w-6 text-green-600" />,
              label: "Lessons Completed",
              value: getCompletedLessons(),
              bgColor: "bg-green-100",
            },
            {
              icon: <Flame className="h-6 w-6 text-orange-600" />,
              label: "Current Streak",
              value: getMaxStreak(),
              bgColor: "bg-orange-100",
            },
            {
              icon: <Trophy className="h-6 w-6 text-purple-600" />,
              label: "Achievements",
              value: progress.filter((p) => p.isCompleted).length,
              bgColor: "bg-purple-100",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="card p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Learning Paths */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Learning Paths
              </h2>
              <Link
                to="/languages"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                Start New Path
                <Plus className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {progress.length > 0 ? (
              <div className="space-y-4">
                {progress.map((prog, index) => (
                  <div
                    key={prog._id}
                    className="card p-6 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          <img
                            src={prog.learningPath.language.flagIcon}
                            alt={prog.learningPath.language.name}
                          />{" "}
                        </span>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {prog.learningPath.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Week {prog.currentWeek} of{" "}
                            {prog.learningPath.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {getProgressPercentage(prog)}% Complete
                        </p>
                        <p className="text-xs text-gray-500">
                          {prog.lessonsCompleted.length} lessons done
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(prog)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {Math.round(prog.totalTimeSpent / 60)}h spent
                        </span>
                        <span className="flex items-center">
                          <Flame className="h-4 w-4 mr-1" />
                          {prog.streakDays} day streak
                        </span>
                      </div>
                      <Link
                        to={`/learning-path/${prog.learningPath._id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                      >
                        Continue
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center animate-slide-up">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Learning Paths Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start your language learning journey by choosing a language
                  and level.
                </p>
                <Link to="/languages" className="btn-primary">
                  Browse Languages
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div
              className="card p-6 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: "AI Conversation",
                    description: "Practice speaking with AI",
                    link: "/ai-tutor",
                  },
                  {
                    title: "View Progress",
                    description: "See detailed analytics",
                    link: "/progress",
                  },
                  {
                    title: "Update Profile",
                    description: "Manage your account",
                    link: "/profile",
                  },
                ].map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {action.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Available Languages */}
            <div
              className="card p-6 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Languages
              </h3>
              <div className="space-y-2">
                {languages.slice(0, 5).map((language) => (
                  <div
                    key={language._id}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-lg">
                      <img src={language.flagIcon} alt={language.name} />
                    </span>
                    <span className="text-sm text-gray-700">
                      {language.name}
                    </span>
                  </div>
                ))}
                {languages.length > 5 && (
                  <Link
                    to="/languages"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View all languages →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;