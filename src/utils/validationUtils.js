/**
 * Validation utilities for form inputs
 */

/**
 * Validates username input
 * @param {string} username - The username to validate
 * @returns {Object} - Validation result with isValid boolean and error message
 */
export const validateUsername = (username) => {
  if (!username || !username.trim()) {
    return {
      isValid: false,
      error: 'Username is required'
    };
  }

  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 3) {
    return {
      isValid: false,
      error: 'Username must be at least 3 characters'
    };
  }

  if (trimmedUsername.length > 20) {
    return {
      isValid: false,
      error: 'Username must be 20 characters or less'
    };
  }

  // Allow letters, numbers, and spaces (matching backend validation)
  if (!/^[a-zA-Z0-9\s]+$/.test(trimmedUsername)) {
    return {
      isValid: false,
      error: 'Username can only contain letters, numbers, and spaces'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates password input
 * @param {string} password - The password to validate
 * @returns {Object} - Validation result with isValid boolean and error message
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      error: 'Password is required'
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      error: 'Password must be at least 8 characters'
    };
  }

  if (password.length > 25) {
    return {
      isValid: false,
      error: 'Password must be 25 characters or less'
    };
  }

  // Allow letters, numbers, and common special characters (matching backend validation)
  if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]+$/.test(password)) {
    return {
      isValid: false,
      error: 'Password can contain letters, numbers, and special characters'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates the entire form
 * @param {string} username - The username to validate
 * @param {string} password - The password to validate
 * @returns {Object} - Validation result with isValid boolean and errors object
 */
export const validateForm = (username, password) => {
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password);

  return {
    isValid: usernameValidation.isValid && passwordValidation.isValid,
    errors: {
      username: usernameValidation.error,
      password: passwordValidation.error
    }
  };
};

/**
 * Gets password strength indicator
 * @param {string} password - The password to analyze
 * @returns {Object} - Strength info with level and message
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      level: 0,
      message: '',
      color: ''
    };
  }

  let score = 0;
  let feedback = [];

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('At least 8 characters');
  }

  // Character variety checks
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('lowercase letters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('uppercase letters');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('numbers');
  }

  // Special characters check
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
    score += 1;
  } else {
    feedback.push('special characters');
  }

  // Determine strength level (5 possible points: length, lowercase, uppercase, numbers, special chars)
  let level, message, color;
  
  if (score === 0) {
    level = 0;
    message = '';
    color = '';
  } else if (score <= 2) {
    level = 1;
    message = 'Weak';
    color = '#ff4444';
  } else if (score <= 3) {
    level = 2;
    message = 'Medium';
    color = '#ffaa00';
  } else if (score <= 4) {
    level = 3;
    message = 'Strong';
    color = '#00aa44';
  } else {
    level = 4;
    message = 'Very Strong';
    color = '#006600';
  }

  return {
    level,
    message,
    color,
    feedback: feedback.length > 0 ? `Add ${feedback.join(', ')}` : ''
  };
};
