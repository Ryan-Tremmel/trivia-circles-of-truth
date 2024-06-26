import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGameState } from '../store';

import Button from './Button';
import { useEffect } from 'react';

export default function NextButton({ isClickable }) {
  const dispatch = useDispatch();

  // State Management //
  const gameState = useSelector(state => {
    return state.gameState;
  });

  const lives = useSelector(state => {
    return state.lives;
  });

  // Passed in as default for isClickable prop
  const [clickableGameState, setClickableGameState] = useState(true);

  // Functionality //
  useEffect(() => {
    // If lives > 0, returns; if player runs out of lives, disables the button
    if (lives > 0) return;
    else setClickableGameState(false);
  }, [gameState]);

  // Handlers //
  const handleClickNext = () => {
    // If clicked, do nothing if the player is still guessing; if not, then the gamemode should be set to guessing
    if (gameState === 'guessing') return;
    else dispatch(updateGameState('guessing'));
  };

  return (
    <Button
      buttonClass={'btnNext btn btn--short btn--primary'}
      textClass={'skipNextContainer__text'}
      onClick={handleClickNext}
      isClickable={(isClickable = clickableGameState)}
    >
      Next Question
    </Button>
  );
}
