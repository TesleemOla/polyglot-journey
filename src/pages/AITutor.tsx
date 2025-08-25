import React, { useState } from 'react';
import { useGenerateConversation, useGenerateFeedback, useGenerateContent } from '../hooks/useAI';
import { Bot, Send, Mic, FileText, MessageSquare, Loader2 } from 'lucide-react';

const AITutor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'conversation' | 'feedback' | 'content'>('conversation');
  const [response, setResponse] = useState('');

  // Mutations
  const conversationMutation = useGenerateConversation();
  const feedbackMutation = useGenerateFeedback();
  const contentMutation = useGenerateContent();

  // Form states
  const [conversationData, setConversationData] = useState({
    language: 'Spanish',
    level: 'beginner',
    topic: 'Introducing yourself',
    userMessage: '',
  });

  const [feedbackData, setFeedbackData] = useState({
    language: 'Spanish',
    level: 'beginner',
    content: '',
    contentType: 'writing',
  });

  const [contentData, setContentData] = useState({
    prompt: '',
    language: 'Spanish',
    level: 'beginner',
    contextType: 'vocabulary',
  });

  const handleConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await conversationMutation.mutateAsync(conversationData);
      setResponse(result.conversation || '');
    } catch (error) {
      console.error('Conversation error:', error);
      setResponse('Sorry, there was an error generating the conversation.');
    }
  };

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await feedbackMutation.mutateAsync(feedbackData);
      setResponse(result.feedback || '');
    } catch (error) {
      console.error('Feedback error:', error);
      setResponse('Sorry, there was an error generating feedback.');
    }
  };

  const handleContentGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await contentMutation.mutateAsync(contentData);
      setResponse(result.content || '');
    } catch (error) {
      console.error('Content generation error:', error);
      setResponse('Sorry, there was an error generating content.');
    }
  };

  const isLoading = conversationMutation.isPending || feedbackMutation.isPending || contentMutation.isPending;

  const tabs = [
    { id: 'conversation', label: 'AI Conversation', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'feedback', label: 'Get Feedback', icon: <FileText className="h-5 w-5" /> },
    { id: 'content', label: 'Generate Content', icon: <Bot className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Language Tutor</h1>
          <p className="text-gray-600">
            Practice conversations, get feedback on your writing, and generate personalized learning content.
          </p>
        </div>

        {/* Tabs */}
        <div className="card overflow-hidden animate-slide-up">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Conversation Tab */}
            {activeTab === 'conversation' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Practice Conversation with AI
                  </h3>
                  <form onSubmit={handleConversation} className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={conversationData.language}
                          onChange={(e) =>
                            setConversationData({ ...conversationData, language: e.target.value })
                          }
                          className="input-field"
                        >
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="Japanese">Japanese</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Level
                        </label>
                        <select
                          value={conversationData.level}
                          onChange={(e) =>
                            setConversationData({ ...conversationData, level: e.target.value })
                          }
                          className="input-field"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Topic
                        </label>
                        <input
                          type="text"
                          value={conversationData.topic}
                          onChange={(e) =>
                            setConversationData({ ...conversationData, topic: e.target.value })
                          }
                          className="input-field"
                          placeholder="e.g., Ordering food"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          value={conversationData.userMessage}
                          onChange={(e) =>
                            setConversationData({ ...conversationData, userMessage: e.target.value })
                          }
                          rows={3}
                          className="input-field pr-12"
                          placeholder="Type your message in the target language..."
                          required
                        />
                        <button
                          type="button"
                          className="absolute bottom-2 right-2 p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Mic className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary flex items-center space-x-2"
                    >
                      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                      <Send className="h-4 w-4" />
                      <span>{isLoading ? 'Generating...' : 'Send Message'}</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Get AI Feedback on Your Writing
                  </h3>
                  <form onSubmit={handleFeedback} className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={feedbackData.language}
                          onChange={(e) =>
                            setFeedbackData({ ...feedbackData, language: e.target.value })
                          }
                          className="input-field"
                        >
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="Japanese">Japanese</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Level
                        </label>
                        <select
                          value={feedbackData.level}
                          onChange={(e) =>
                            setFeedbackData({ ...feedbackData, level: e.target.value })
                          }
                          className="input-field"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Content Type
                        </label>
                        <select
                          value={feedbackData.contentType}
                          onChange={(e) =>
                            setFeedbackData({ ...feedbackData, contentType: e.target.value })
                          }
                          className="input-field"
                        >
                          <option value="writing">Writing</option>
                          <option value="speaking">Speaking</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Content
                      </label>
                      <textarea
                        value={feedbackData.content}
                        onChange={(e) =>
                          setFeedbackData({ ...feedbackData, content: e.target.value })
                        }
                        rows={5}
                        className="input-field"
                        placeholder="Paste your writing or describe your speaking practice..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary flex items-center space-x-2"
                    >
                      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                      <FileText className="h-4 w-4" />
                      <span>{isLoading ? 'Analyzing...' : 'Get Feedback'}</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Content Generation Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Generate Learning Content
                  </h3>
                  <form onSubmit={handleContentGeneration} className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={contentData.language}
                          onChange={(e) =>
                            setContentData({ ...contentData, language: e.target.value })
                          }
                          className="input-field"
                        >
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="Japanese">Japanese</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Level
                        </label>
                        <select
                          value={contentData.level}
                          onChange={(e) =>
                            setContentData({ ...contentData, level: e.target.value })
                          }
                          className="input-field"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Content Type
                        </label>
                        <select
                          value={contentData.contextType}
                          onChange={(e) =>
                            setContentData({ ...contentData, contextType: e.target.value })
                          }
                          className="input-field"
                        >
                          <option value="vocabulary">Vocabulary</option>
                          <option value="grammar">Grammar</option>
                          <option value="conversation">Conversation</option>
                          <option value="culture">Culture</option>
                          <option value="reading">Reading</option>
                          <option value="exercises">Exercises</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What would you like to learn?
                      </label>
                      <textarea
                        value={contentData.prompt}
                        onChange={(e) =>
                          setContentData({ ...contentData, prompt: e.target.value })
                        }
                        rows={3}
                        className="input-field"
                        placeholder="e.g., Teach me how to order food at a restaurant"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary flex items-center space-x-2"
                    >
                      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                      <Bot className="h-4 w-4" />
                      <span>{isLoading ? 'Generating...' : 'Generate Content'}</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Response Display */}
            {response && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg animate-fade-in">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Response:</h4>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-700 font-sans">{response}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;