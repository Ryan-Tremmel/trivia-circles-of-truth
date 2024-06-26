import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { updateGameState } from '../store';

export default function SkipButton({ isClickable }) {
  const dispatch = useDispatch();

  // State Management //
  const [skips, setSkips] = useState(3);
  const [showSkips, setShowSkips] = useState(false);

  const handleClickSkips = () => {
    // Handler for actually skipping
    if (skips >= 1) {
      setSkips(prevSkips => prevSkips - 1);
      dispatch(updateGameState('skipped'));
    } else return;
  };

  // Handlers //
  const handleMouse = () => {
    // Handler for hovering over skips to show amount; state change based on current value
    setShowSkips(currentValueShowSkips => {
      if (currentValueShowSkips === false) return true;
      else return false;
    });
  };

  const skipText = !showSkips ? `Skip Question` : `Skips: ${skips}`;

  return (
    <Button
      buttonClass={`btnSkip btn btn--short btn--primary ${
        !isClickable ? 'btn--disabled' : ''
      }`}
      textClass={'skipNextContainer__text'}
      onClick={handleClickSkips}
      onMouseOver={handleMouse}
      onMouseOut={handleMouse}
      isClickable={isClickable}
    >
      {skipText}
    </Button>
  );
}
