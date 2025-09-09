import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSignupUserMutation, useUpdateUserMutation } from '../store';
import Form from './Form';
import HighscoreButton from './HighscoreButton';
import RestartButton from './RestartButton';
import { getErrorMessage, logError } from '../utils/errorUtils';
import { ERROR_MESSAGES } from '../constants/errorConstants';
import './LoseGame.css';

export default function LoseGame({ isClickable, handleClickRestart }) {
  // State Management //
  const currentUserId = useSelector(
    state => state.currentUser?.objectId ?? null
  );

  const currentUserHighscore = useSelector(
    state => state.currentUser?.highscore ?? null
  );

  const { currentScore } = useSelector(state => {
    return state.score;
  });

  const [showForm, setShowForm] = useState(false); // For showing form when Submit Highscore button is pressed

  const [isOpen, setIsOpen] = useState(false); // For determining if showForm should be open (for animation)

  const [buttonText, setButtonText] = useState('Submit Highscore'); // Text on the Submit Highscore button

  const [countdown, setCountdown] = useState(3);

  const [loseGameText, setLoseGameText] = useState(
    'You can either submit your highscore or you can restart and try again!'
  );

  // Functions //
  const randomArrayGeneratorLoseGameText = numResponses => {
    const responses = [
      `Your current score isn't more than your highscore!`,
      'You sure you want to make your highscore lower? LOL',
      `Your highscore is higher than what you're trying to replace it with...`,
      'You are trying to make your highscore lower.',
      `${currentScore} is less than your highscore if ${currentUserHighscore}.`,
    ];
    let arrIndex = Math.floor(Math.random() * numResponses);
    return responses.find((res, i) => res[i] === res[arrIndex]);
  };

  const [
    signupUser,
    {
      isSuccess: isSuccessSignup,
      isLoading: isLoadingSignup,
      isError: isErrorSignup,
      error: errorSignup,
    },
  ] = useSignupUserMutation();

  // Signing up User Functionality //
  const [
    updateUser,
    {
      isSuccess: isSuccessUpdate,
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
    },
  ] = useUpdateUserMutation();

  const handleSignupSubmit = async (username, password, highscore) => {
    try {
      await signupUser({ username, password, highscore }).unwrap();
    } catch (err) {
      logError(err, 'signup', { username, highscore });
      
      // Handle different types of errors
      let errorMessage;
      
      if (err.status === 'PARSING_ERROR') {
        // Handle parsing errors - likely validation errors from backend
        if (err.data && err.data.message) {
          errorMessage = err.data.message;
        } else if (err.error && err.error.data && err.error.data.message) {
          errorMessage = err.error.data.message;
        } else {
          errorMessage = ERROR_MESSAGES.SIGNUP_VALIDATION_ERROR;
        }
      } else {
        errorMessage = getErrorMessage(err, 'auth');
      }
      
      setTimeout(() => {
        setLoseGameText(
          'You can either submit your highscore or you can restart and try again!'
        );
      }, 5000);
      setLoseGameText(errorMessage);
    }
  };
  // Functionality //
  useEffect(() => {
    // Handle loading states
    if (isLoadingSignup || isLoadingUpdate) {
      setLoseGameText('Submitting Highscore...');
    }
  }, [isLoadingSignup, isLoadingUpdate]);

  useEffect(() => {
    // If isSuccess, set a timeout and countdown as well as change highscoreButtonText to successful update
    if (isSuccessSignup || isSuccessUpdate) {
      setLoseGameText(
        `Highscore successfully submitted! Please wait... ${countdown}`
      );

      const countdownTimer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      // Cleanup function to clear the interval when the component unmounts or countdown changes
      return () => clearInterval(countdownTimer);
    }
  }, [isSuccessSignup, isSuccessUpdate, countdown]);

  useEffect(() => {
    // Update the loseGameText whenever the countdown changes
    if (isSuccessSignup || isSuccessUpdate) {
      if (countdown <= 0)
        setLoseGameText(
          'Highscore successfully submitted! You can either close the app or restart to play again.'
        );
      if (isSuccessSignup) setShowForm(false);
    }
  }, [countdown, isSuccessSignup, isSuccessUpdate]);

  // Updating User Functionality
  const updateUserHighscore = async highscore => {
    try {
      await updateUser({ currentUserId, userData: { highscore } });
    } catch (err) {
      // Set err message like in Rules.js
      console.error(err);
    }
  };

  const handleHighscoreClick = () => {
    if (currentUserHighscore >= currentScore) {
      // Randomizes the response (loseGame) text using the function randomArrayGeneratorLoseGameText
      setLoseGameText(randomArrayGeneratorLoseGameText(5));
      setTimeout(() => {
        setLoseGameText(
          'You can either submit your highscore or you can restart and try again!'
        );
      }, 2000);
    }
    // If a currentUser exists (logged in), will not open the form and will instead just submit the highscore
    else if (currentUserId && currentUserHighscore <= currentScore) {
      updateUserHighscore(currentScore);
    } else {
      setButtonText('Close Form');
      setIsOpen(!isOpen);

      if (showForm) {
        setTimeout(() => {
          setButtonText('Submit Highscore');
          setShowForm(!showForm);
        }, '180');
      } else setShowForm(!showForm);
    }
  };

  return (
    <div className="loseGame">
      <h3 className="loseGame__textBig mb-1">
        You lost! But that's okay because you get to keep $
        {currentScore.toLocaleString()}!
      </h3>
      <p className="loseGame__textSmall mb-2">{loseGameText}</p>
      {!showForm ? null : (
        <Form
          submitType={'signup'}
          submitText={'Submit!'}
          utilFn={'mb-3'}
          appearance={
            isOpen ? 'formContainer--slideIn' : 'formContainer--slideOut'
          }
          handleSignupSubmit={handleSignupSubmit}
          highscore={currentScore}
        />
      )}
      <div className="loseGameBtnContainer">
        {!(isSuccessSignup || isSuccessUpdate) && (
          <HighscoreButton
            handleHighscoreClick={handleHighscoreClick}
            buttonText={buttonText}
            isClickable={isClickable && !isLoadingSignup && !isLoadingUpdate}
          />
        )}
        <RestartButton
          isClickable={isClickable}
          handleClickRestart={handleClickRestart}
        />
      </div>
    </div>
  );
}