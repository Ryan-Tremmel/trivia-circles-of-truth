// Error Configuration Constants
export const ERROR_CONSTANTS = {
  // Error Messages
  ERROR_MESSAGES: {
    // General
    LOADING_FAILED: 'Could not load questions. Please refresh or try again later!',
    LOADING: 'Loading questions... please wait...',
    NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
    SERVER_ERROR: 'Server is temporarily unavailable. Please try again later.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
    
    // Authentication (matching backend responses)
    LOGIN_FAILED: 'Login failed. Please check your credentials.',
    SIGNUP_FAILED: 'Signup failed. Please try again.',
    AUTH_NETWORK_ERROR: 'Could not contact server - please try again later to log in.',
    PASSWORD_REQUIREMENTS: 'Password needs to be a minimum of eight alpha-numeric characters.',
    
    // Backend-specific error messages
    PROVIDE_CREDENTIALS: 'Please provide your username and password.',
    INVALID_CREDENTIALS: 'Could not log in! Please check the username and password are correct.',
    SERVER_UNAVAILABLE: 'Server unavailable. Please try again later.',
    LOGIN_ERROR: 'Error: Could not log in! Please check the username and password are correct.',
    
    // Game specific
    QUESTIONS_LOAD_FAILED: 'Failed to load trivia questions. Please refresh the page.',
    GAME_SAVE_FAILED: 'Failed to save your progress. Please try again.',
    
    // Retry messages
    RETRY_AVAILABLE: 'Click to retry',
    RETRYING: 'Retrying...',
  },
  
  // Error Types
  ERROR_TYPES: {
    NETWORK: 'NETWORK_ERROR',
    SERVER: 'SERVER_ERROR', 
    AUTHENTICATION: 'AUTH_ERROR',
    VALIDATION: 'VALIDATION_ERROR',
    UNKNOWN: 'UNKNOWN_ERROR'
  }
};

// Export individual constants for easier imports
export const {
  ERROR_MESSAGES,
  ERROR_TYPES
} = ERROR_CONSTANTS;
