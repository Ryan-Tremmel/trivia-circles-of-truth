import { validateUsername, validatePassword, validateForm, getPasswordStrength } from '../validationUtils';

describe('Validation Utils', () => {
  describe('validateUsername', () => {
    test('should return valid for valid username', () => {
      const result = validateUsername('testuser');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    test('should return invalid for empty username', () => {
      const result = validateUsername('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username is required');
    });

    test('should return invalid for username too short', () => {
      const result = validateUsername('ab');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username must be at least 3 characters');
    });

    test('should return invalid for username too long', () => {
      const result = validateUsername('a'.repeat(21));
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username must be 20 characters or less');
    });

    test('should return invalid for username with special characters', () => {
      const result = validateUsername('test@user');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username can only contain letters, numbers, and spaces');
    });

    test('should return valid for username with spaces', () => {
      const result = validateUsername('test user');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('validatePassword', () => {
    test('should return valid for valid password', () => {
      const result = validatePassword('password123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    test('should return invalid for empty password', () => {
      const result = validatePassword('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password is required');
    });

    test('should return invalid for password too short', () => {
      const result = validatePassword('pass');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password must be at least 8 characters');
    });

    test('should return invalid for password too long', () => {
      const result = validatePassword('a'.repeat(26));
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password must be 25 characters or less');
    });

    test('should return valid for password with special characters', () => {
      const result = validatePassword('password@123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('validateForm', () => {
    test('should return valid for valid form data', () => {
      const result = validateForm('testuser', 'password123');
      expect(result.isValid).toBe(true);
      expect(result.errors.username).toBeNull();
      expect(result.errors.password).toBeNull();
    });

    test('should return invalid for invalid form data', () => {
      const result = validateForm('ab', 'pass');
      expect(result.isValid).toBe(false);
      expect(result.errors.username).toBe('Username must be at least 3 characters');
      expect(result.errors.password).toBe('Password must be at least 8 characters');
    });
  });

  describe('getPasswordStrength', () => {
    test('should return weak for simple password', () => {
      const result = getPasswordStrength('password');
      expect(result.level).toBe(1);
      expect(result.message).toBe('Weak');
      expect(result.color).toBe('#ff4444');
    });

    test('should return medium for mixed case password', () => {
      const result = getPasswordStrength('Password');
      expect(result.level).toBe(2);
      expect(result.message).toBe('Medium');
      expect(result.color).toBe('#ffaa00');
    });

    test('should return strong for complex password', () => {
      const result = getPasswordStrength('Password123');
      expect(result.level).toBe(3);
      expect(result.message).toBe('Strong');
      expect(result.color).toBe('#00aa44');
    });

    test('should return very strong for password with special characters', () => {
      const result = getPasswordStrength('Password123!');
      expect(result.level).toBe(4);
      expect(result.message).toBe('Very Strong');
      expect(result.color).toBe('#006600');
    });

    test('should return empty for no password', () => {
      const result = getPasswordStrength('');
      expect(result.level).toBe(0);
      expect(result.message).toBe('');
      expect(result.color).toBe('');
    });
  });
});
