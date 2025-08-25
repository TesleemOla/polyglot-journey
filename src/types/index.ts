export interface User {
  _id: string;
  name: string;
  email: string;
  nativeLanguage: string;
  learningLanguages: LearningLanguage[];
  profilePicture?: string;
  bio?: string;
  role: 'user' | 'admin';
  googleId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningLanguage {
  language: Language;
  level: 'beginner' | 'intermediate' | 'advanced';
  startedAt: string;
}

export interface Language {
  _id: string;
  name: string;
  code: string;
  nativeName: string;
  flagIcon: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'very hard';
  description: string;
  popularityRank: number;
  isActive: boolean;
}

export interface LearningPath {
  _id: string;
  language: Language;
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  duration: number;
  coverImage?: string;
  objectives: string[];
  prerequisites: string[];
  weeks: Week[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Week {
  weekNumber: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  language: Language;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing' | 'culture' | 'assessment';
  content: string;
  duration: number;
  order: number;
  resources: Resource[];
  exercises: Exercise[];
  isPublished: boolean;
}

export interface Resource {
  title: string;
  type: 'article' | 'video' | 'audio' | 'exercise' | 'quiz';
  url: string;
}

export interface Exercise {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Progress {
  _id: string;
  user: string;
  learningPath: LearningPath;
  currentWeek: number;
  lessonsCompleted: LessonCompletion[];
  weeklyAssessments: WeeklyAssessment[];
  vocabularyMastered: VocabularyWord[];
  totalTimeSpent: number;
  streakDays: number;
  lastActiveDate: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface LessonCompletion {
  lesson: Lesson;
  completedAt: string;
  score?: number;
  timeSpent?: number;
  notes?: string;
}

export interface WeeklyAssessment {
  week: number;
  score: number;
  completedAt: string;
  feedback?: string;
  strengths: string[];
  areasToImprove: string[];
}

export interface VocabularyWord {
  word: string;
  translation: string;
  mastered: boolean;
  lastReviewed?: string;
  nextReviewDate?: string;
  repetitionCount: number;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  nativeLanguage: string;
  learningLanguages: LearningLanguage[];
  token: string;
}

export interface AIResponse {
  content?: string;
  conversation?: string;
  feedback?: string;
  assessment?: string;
  promptUsed?: string;
}

export interface ApiError {
  message: string;
  errors?: Array<{ msg: string; param: string }>;
}