import { useState, useEffect } from 'react';
import { validateUsername, validatePassword, getPasswordStrength } from '../utils/validationUtils';
import './ValidationDisplay.css';

export default function ValidationDisplay({ 
  username = '', 
  password = '', 
  submitType, 
  showValidation = false,
  realTimeValidation = false,
  appearance = ''
}) {
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ level: 0, message: '', color: '', feedback: '' });

  // Show validation for signup forms either on submit or in real-time
  const shouldShowValidation = submitType === 'signup' && (showValidation || realTimeValidation);

  useEffect(() => {
    if (shouldShowValidation) {
      // Validate username
      const usernameValidation = validateUsername(username);
      setUsernameError(usernameValidation.error || '');

      // Validate password
      const passwordValidation = validatePassword(password);
      setPasswordError(passwordValidation.error || '');

      // Update password strength
      const strength = getPasswordStrength(password);
      setPasswordStrength(strength);
    }
  }, [username, password, shouldShowValidation]);

  // Don't render anything if validation shouldn't be shown
  if (!shouldShowValidation) {
    return null;
  }

  return (
    <div className={`validation-display ${appearance}`}>
      {/* Username validation */}
      {usernameError && (
        <div className="validation-error">
          <span className="validation-error__icon">⚠</span>
          <span className="validation-error__text">{usernameError}</span>
        </div>
      )}

      {/* Password validation */}
      {passwordError && (
        <div className="validation-error">
          <span className="validation-error__icon">⚠</span>
          <span className="validation-error__text">{passwordError}</span>
        </div>
      )}

      {/* Password strength indicator */}
      {password && (
        <div className="validation-password-strength">
          <div className="validation-password-strength__bar">
            <div 
              className="validation-password-strength__fill"
              style={{
                width: `${(passwordStrength.level / 4) * 100}%`,
                backgroundColor: passwordStrength.color
              }}
            />
          </div>
          {passwordStrength.message && (
            <span 
              className="validation-password-strength__text"
              style={{ color: passwordStrength.color }}
            >
              Password strength: {passwordStrength.message}
            </span>
          )}
          {passwordStrength.feedback && (
            <div className="validation-password-strength__feedback">
              {passwordStrength.feedback}
            </div>
          )}
        </div>
      )}

      {/* Requirements info */}
      <div className="validation-requirements">
        <div className="validation-requirements__item">
          <span className="validation-requirements__label">Username:</span>
          <span className="validation-requirements__text">3-20 characters, letters, numbers, and spaces only</span>
        </div>
        <div className="validation-requirements__item">
          <span className="validation-requirements__label">Password:</span>
          <span className="validation-requirements__text">8-25 characters, letters, numbers, and special characters</span>
        </div>
      </div>
    </div>
  );
}