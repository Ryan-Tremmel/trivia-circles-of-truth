import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentScore } from '../store';
import { addLives } from '../store';
import Button from './Button';

export default function BuyLivesButton({ isClickable }) {
  const dispatch = useDispatch();

  // State Management //
  const lives = useSelector(state => {
    return state.lives;
  });

  const { currentScore } = useSelector(state => {
    return state.score;
  });

  const questionDifficulty = useSelector(state => {
    return state.questionDifficulty;
  });

  const [costState, setCostState] = useState(1000);
  const [showBuyLives, setShowBuyLives] = useState(false);

  // Handlers //
  const handleClickBuyLives = () => {
    if (lives < 3 && lives >= 1 && costState <= currentScore) {
      dispatch(updateCurrentScore(currentScore - costState));
      dispatch(addLives(1));
    } else return;
  };

  const handleMouse = () => {
    const thresholds = [
      {
        threshold: 'easy',
        cost: 5000,
      },
      { threshold: 'medium', cost: 25000 },
      {
        threshold: 'hard',
        cost: 75000,
      },
    ];

    // Loops through thresholds to find the cost that matches the current difficulty
    const { cost } = thresholds.find(
      item => item.threshold === questionDifficulty
    );
    setCostState(cost);

    // Handler for hovering over buy life to show amount; state change based on current value
    setShowBuyLives(currentValueShowBuyLives => {
      if (currentValueShowBuyLives === false) return true;
      else return false;
    });
  };

  const buyLivesText = !showBuyLives
    ? `Buy Life`
    : `Cost: $${costState.toLocaleString()}`;

  return (
    <Button
      buttonClass={`btnBuyLives btn btn--short btn--primary ${
        !isClickable ? 'btn--disabled' : ''
      }`}
      textClass={'skipNextContainer__text'}
      onClick={handleClickBuyLives}
      onMouseOver={handleMouse}
      onMouseOut={handleMouse}
      isClickable={isClickable}
    >
      {buyLivesText}
    </Button>
  );
}
