import { ERROR_TYPES, ERROR_MESSAGES } from '../constants/errorConstants';

/**
 * Determines the error type based on the error object
 * @param {Error|Object} error - The error object
 * @returns {string} - The error type
 */
export const getErrorType = (error) => {
  if (!error) return ERROR_TYPES.UNKNOWN;
  
  // Network errors
  if (error.status === 'FETCH_ERROR' || error.name === 'TypeError') {
    return ERROR_TYPES.NETWORK;
  }
  
  // Server errors (HTTP status codes)
  if (error.status && typeof error.status === 'number') {
    if (error.status >= 500) return ERROR_TYPES.SERVER;
    if (error.status >= 400) return ERROR_TYPES.AUTHENTICATION;
  }
  
  // RTK Query specific errors
  if (error.status === 'PARSING_ERROR') {
    return ERROR_TYPES.VALIDATION;
  }
  
  return ERROR_TYPES.UNKNOWN;
};

/**
 * Gets user-friendly error message based on error type and context
 * @param {Error|Object} error - The error object
 * @param {string} context - The context where the error occurred (e.g., 'auth', 'questions')
 * @returns {string} - User-friendly error message
 */
export const getErrorMessage = (error, context = 'general') => {
  const errorType = getErrorType(error);
  
  // Handle backend-specific error messages first
  if (error?.data?.message) {
    return error.data.message;
  }
  
  // Handle specific HTTP status codes from backend
  if (error?.status && typeof error.status === 'number') {
    switch (error.status) {
      case 401:
        return ERROR_MESSAGES.PROVIDE_CREDENTIALS;
      case 403:
        return ERROR_MESSAGES.INVALID_CREDENTIALS;
      case 503:
        return ERROR_MESSAGES.SERVER_UNAVAILABLE;
      case 400:
        return ERROR_MESSAGES.LOGIN_ERROR;
      default:
        break;
    }
  }
  
  switch (errorType) {
    case ERROR_TYPES.NETWORK:
      return context === 'auth' 
        ? ERROR_MESSAGES.AUTH_NETWORK_ERROR 
        : ERROR_MESSAGES.NETWORK_ERROR;
        
    case ERROR_TYPES.SERVER:
      return ERROR_MESSAGES.SERVER_ERROR;
      
    case ERROR_TYPES.AUTHENTICATION:
      if (context === 'auth') {
        return ERROR_MESSAGES.LOGIN_FAILED;
      }
      return ERROR_MESSAGES.UNKNOWN_ERROR;
      
    case ERROR_TYPES.VALIDATION:
      return ERROR_MESSAGES.PASSWORD_REQUIREMENTS;
      
    default:
      return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

/**
 * Logs error with context for debugging
 * @param {Error|Object} error - The error object
 * @param {string} context - The context where the error occurred
 * @param {Object} additionalInfo - Additional information to log
 */
export const logError = (error, context, additionalInfo = {}) => {
  const errorInfo = {
    message: error.message || 'Unknown error',
    status: error.status,
    context,
    timestamp: new Date().toISOString(),
    ...additionalInfo
  };
  
  console.error(`[${context.toUpperCase()}] Error:`, errorInfo);
  
  // In a production app, you would send this to an error reporting service
  // Example: errorReportingService.captureException(error, errorInfo);
};

/**
 * Determines if an error is retryable
 * @param {Error|Object} error - The error object
 * @returns {boolean} - Whether the error can be retried
 */
export const isRetryableError = (error) => {
  const errorType = getErrorType(error);
  return errorType === ERROR_TYPES.NETWORK || errorType === ERROR_TYPES.SERVER;
};

/**
 * Creates a standardized error object
 * @param {string} message - Error message
 * @param {string} type - Error type
 * @param {Object} details - Additional error details
 * @returns {Object} - Standardized error object
 */
export const createError = (message, type = ERROR_TYPES.UNKNOWN, details = {}) => {
  return {
    message,
    type,
    timestamp: new Date().toISOString(),
    ...details
  };
};

/**
 * Handles backend validation errors from Mongoose
 * @param {Object} error - The error object from backend
 * @returns {string} - User-friendly validation error message
 */
export const handleValidationError = (error) => {
  if (error?.data?.message) {
    return error.data.message;
  }
  
  // Handle Mongoose validation errors
  if (error?.data?.errors && error.data.errors !== null) {
    const errors = error.data.errors;
    const firstError = Object.values(errors)[0];
    return firstError?.message || ERROR_MESSAGES.PASSWORD_REQUIREMENTS;
  }
  
  return ERROR_MESSAGES.PASSWORD_REQUIREMENTS;
};
