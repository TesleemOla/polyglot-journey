import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguages } from '../hooks/useLanguages';
import { Clock, Users, Star, Loader2 } from 'lucide-react';

const Languages: React.FC = () => {
  const { data: languages = [], isLoading, error } = useLanguages();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-orange-100 text-orange-800';
      case 'very hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLanguages = selectedDifficulty
    ? languages.filter(lang => lang.difficulty === selectedDifficulty)
    : languages;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <p className="text-gray-600">Loading languages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Languages</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Language
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your 8-week journey to fluency with our AI-powered language
            learning programs.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8 flex justify-center">
          <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setSelectedDifficulty("")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDifficulty === ""
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All
            </button>
            {["easy", "medium", "hard", "very hard"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  selectedDifficulty === difficulty
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLanguages.map((language, index) => (
            <div
              key={language._id}
              className="card p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">
                    <img src={language.flagIcon} alt={language.name} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {language.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {language.nativeName}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    language.difficulty
                  )}`}
                >
                  {language.difficulty}
                </span>
              </div>

              <p className="text-gray-600 mb-6 line-clamp-3">
                {language.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>8 weeks</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>1.2k learners</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span>4.8</span>
                </div>
              </div>

              <Link
                to={`/learning-paths?language=${language._id}`}
                className="btn-primary w-full text-center block"
              >
                Start Learning {language.name}
              </Link>
            </div>
          ))}
        </div>

        {filteredLanguages.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No languages found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new language
              courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Languages;