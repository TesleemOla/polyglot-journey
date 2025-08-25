import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Trophy, ArrowRight, Globe, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary-600" />,
      title: 'AI-Powered Learning',
      description: 'Personalized lessons and feedback powered by Google Gemini AI',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-600" />,
      title: '8-Week Programs',
      description: 'Structured learning paths designed to get you conversational in 8 weeks',
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-600" />,
      title: 'Multiple Languages',
      description: 'Learn Spanish, French, Japanese, and more with native-level content',
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary-600" />,
      title: 'Progress Tracking',
      description: 'Track your progress with detailed analytics and achievement badges',
    },
  ];

  const stats = [
    { label: 'Active Learners', value: '10,000+' },
    { label: 'Languages Available', value: '12' },
    { label: 'Completion Rate', value: '89%' },
    { label: 'Average Rating', value: '4.9' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Any Language in
              <span className="text-gradient"> 8 Weeks</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of language learning with AI-powered personalized lessons,
              interactive conversations, and structured 8-week programs that get results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-primary inline-flex items-center justify-center"
                  >
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/languages"
                    className="btn-secondary inline-flex items-center justify-center"
                  >
                    Explore Languages
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Polyglot Journey?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with proven language learning
              methodologies to deliver exceptional results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started on your language learning journey in just three simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Language',
                description: 'Select from our collection of popular languages and set your learning goals.',
              },
              {
                step: '2',
                title: 'Follow Your Path',
                description: 'Complete daily lessons in your personalized 8-week learning program.',
              },
              {
                step: '3',
                title: 'Practice & Progress',
                description: 'Use AI-powered conversations and get instant feedback to improve rapidly.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Language Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have successfully mastered new languages with our
            AI-powered platform.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold inline-flex items-center transition-colors"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;