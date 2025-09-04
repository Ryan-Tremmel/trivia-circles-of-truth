// Game Configuration Constants
export const GAME_CONSTANTS = {
  // Initial Game State
  INITIAL_LIVES: 3,
  INITIAL_SCORE: 0,
  INITIAL_MULTIPLIER: 1,
  INITIAL_DIFFICULTY: 'easy',
  INITIAL_GAME_STATE: 'guessing',
  
  // API Configuration
  API_BASE_URL: 'https://the-trivia-api.com/v2/',
  QUESTIONS_PER_FETCH: 32,
  API_CACHE_TIME: 1, // keepUnusedDataFor value
  
  // Game Logic
  SCORE_BASE_MULTIPLIER: 100, // Base score calculation multiplier
  QUESTION_INDEX_THRESHOLD: 30, // When to fetch more questions
  LAST_QUESTION_INDEX: 31, // Index of last question in current batch
  
  // Difficulty Thresholds
  DIFFICULTY_THRESHOLDS: {
    MEDIUM: 15,
    HARD: 30
  },
  
  // Score Multiplier Thresholds
  SCORE_THRESHOLDS: [
    { threshold: 5, multiplier: 5 },
    { threshold: 10, multiplier: 10 },
    { threshold: 15, multiplier: 25, difficulty: 'medium' },
    { threshold: 20, multiplier: 50 },
    { threshold: 25, multiplier: 75 },
    { threshold: 30, multiplier: 100, difficulty: 'hard' },
    { threshold: 35, multiplier: 250 },
    { threshold: 40, multiplier: 500 },
    { threshold: 45, multiplier: 750 },
    { threshold: 50, multiplier: 1000 },
    { threshold: 55, multiplier: 2500 },
    { threshold: 60, multiplier: 5000 },
    { threshold: 65, multiplier: 7500 },
    { threshold: 70, multiplier: 10000 },
    { threshold: 75, multiplier: 20000 },
    { threshold: 80, multiplier: 50000 },
    { threshold: 85, multiplier: 75000 },
    { threshold: 90, multiplier: 100000 },
  ],
  
  // Game States
  GAME_STATES: {
    GUESSING: 'guessing',
    CORRECT: 'correct',
    INCORRECT: 'incorrect',
    SKIPPED: 'skipped'
  },
  
  // Difficulty Levels
  DIFFICULTY_LEVELS: {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
  },
  
  // Error Messages
  ERROR_MESSAGES: {
    LOADING_FAILED: 'Could not load questions. Please refresh or try again later!',
    LOADING: 'Loading questions... please wait...'
  }
};

// Export individual constants for easier imports
export const {
  INITIAL_LIVES,
  INITIAL_SCORE,
  INITIAL_MULTIPLIER,
  INITIAL_DIFFICULTY,
  INITIAL_GAME_STATE,
  API_BASE_URL,
  QUESTIONS_PER_FETCH,
  API_CACHE_TIME,
  SCORE_BASE_MULTIPLIER,
  QUESTION_INDEX_THRESHOLD,
  LAST_QUESTION_INDEX,
  DIFFICULTY_THRESHOLDS,
  SCORE_THRESHOLDS,
  GAME_STATES,
  DIFFICULTY_LEVELS,
  ERROR_MESSAGES
} = GAME_CONSTANTS;
