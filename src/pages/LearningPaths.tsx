import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLearningPaths } from '../hooks/useLearningPaths';
import { useLanguages } from '../hooks/useLanguages';
import { useStartLearningPath } from '../hooks/useProgress';
import { Clock, BookOpen, Target, Users, ArrowRight, Loader2 } from 'lucide-react';

const LearningPaths: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get('language') || '');
  const [selectedLevel, setSelectedLevel] = useState('');

  const { data: learningPaths = [], isLoading: pathsLoading } = useLearningPaths({
    language: selectedLanguage || undefined,
    level: selectedLevel || undefined,
  });
  const { data: languages = [] } = useLanguages();
  const startLearningPathMutation = useStartLearningPath();

  const handleStartPath = async (pathId: string) => {
    try {
      await startLearningPathMutation.mutateAsync(pathId);
      // Could show success message or redirect
    } catch (error) {
      console.error('Failed to start learning path:', error);
    }
  };

  if (pathsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <p className="text-gray-600">Loading learning paths...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Learning Paths
          </h1>
          <p className="text-gray-600">
            Choose a structured 8-week program designed to get you
            conversational in your target language.
          </p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Language
              </label>
              <select
                id="language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="input-field"
              >
                <option value="">All Languages</option>
                {languages.map((language) => (
                  <option key={language._id} value={language._id}>
                    <img src={language.flagIcon} alt={language.name} />{" "}
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Level
              </label>
              <select
                id="level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="input-field"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningPaths.map((path, index) => (
            <div
              key={path._id}
              className="card overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {path.coverImage && (
                <img
                  src={path.coverImage}
                  alt={path.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      <img src={path.language.flagIcon} alt={path.language.name} />
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {path.language.name}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                    {path.level}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {path.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {path.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{path.duration} weeks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      {path.weeks.reduce(
                        (total, week) => total + week.lessons.length,
                        0
                      )}{" "}
                      lessons
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>1.2k enrolled</span>
                  </div>
                </div>

                {path.objectives.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      What you'll learn:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {path.objectives.slice(0, 3).map((objective, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Target className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Link
                    to={`/learning-path/${path._id}`}
                    className="flex-1 btn-secondary text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleStartPath(path._id)}
                    disabled={startLearningPathMutation.isPending}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {startLearningPathMutation.isPending
                      ? "Starting..."
                      : "Start Path"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {learningPaths.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No learning paths found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPaths;