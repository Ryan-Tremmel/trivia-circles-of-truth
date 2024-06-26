import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from './Button';
import { updateGameState, removeLives } from '../store';

export default function Answers({
  children,
  currentQuestion,
  isCorrectAnswer,
  isClickable,
}) {
  const dispatch = useDispatch();

  // State Management //
  const gameState = useSelector(state => {
    return state.gameState;
  });

  const lives = useSelector(state => {
    return state.lives;
  });

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  // Functionality //
  useEffect(() => {
    if (gameState === 'guessing') setShowCorrectAnswer(false);
    else if (gameState !== 'guessing') setShowCorrectAnswer(true);
  }, [gameState]);

  // If the clicked answer button is wrong, then it removes a life and changes state, otherwise it is correct
  const handleClick = function () {
    if (children !== currentQuestion.correctAnswer) {
      // Removes a life if the player guesses incorrectly
      if (lives > 0) {
        dispatch(removeLives(1));
        dispatch(updateGameState('incorrect'));
      }
    } else if (children === currentQuestion.correctAnswer) {
      dispatch(updateGameState('correct'));
    }
  };

  return (
    <Button
      children={children}
      buttonClass={`btn btn--long btn--primary ${
        showCorrectAnswer ? isCorrectAnswer : ''
      }`}
      textClass={'answer__text'}
      onClick={handleClick}
      isClickable={isClickable}
    />
  );
}
