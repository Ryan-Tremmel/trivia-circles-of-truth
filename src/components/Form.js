import { useState, useEffect } from 'react';
import Button from './Button';

export default function Form({
  submitType,
  submitText,
  utilFn = '',
  appearance = '',
  handleLoginSubmit,
  handleSignupSubmit,
  highscore,
}) {
  // State Management //
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputLength, setPasswordInputLength] = useState(30);

  // Handlers //
  const handleFormSubmit = e => {
    e.preventDefault();
    // Based on what is passed in determines which function should be used
    if (submitType === 'login') handleLoginSubmit(username, password);
    else if (submitType === 'signup')
      handleSignupSubmit(username, password, highscore);
  };

  // Handles showing password or not
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isChecked) {
      // Calculate additional length for characters beyond 18
      const additionalLength = Math.max(0, (password.length - 18) * 0.2);
      // Set the new length
      setPasswordInputLength(30 + additionalLength);
    } else {
      setPasswordInputLength(30); // Reset to the base length when isChecked is false
    }
  }, [password, isChecked]);

  return (
    <form className={`formContainer ${utilFn} ${appearance}`}>
      <label className="form__label__username ml-1">Username</label>
      <input
        className="form__input__username form__input"
        type="text"
        value={username}
        maxLength={20}
        onChange={e => setUsername(e.target.value)}
      />
      <label className="form__label__password ml-1">Password</label>
      <input
        className="form__input__password form__input"
        type={!showPassword ? 'password' : 'text'}
        value={password}
        maxLength={25}
        onChange={e => setPassword(e.target.value)}
        style={{
          minWidth: `${passwordInputLength}rem`,
        }}
      />
      <div className="form__checkbox__container">
        <input
          className="form__input__checkbox"
          type="checkbox"
          value={false}
          onChange={handleCheckboxChange}
        />
        <label className="form__label__checkbox">Show</label>
      </div>
      <Button
        buttonClass={'btn btn--short btn--primary form__btn'}
        textClass={'answer__text'}
        onClick={handleFormSubmit}
        isClickable={true}
      >
        {submitText}
      </Button>
    </form>
  );
}
