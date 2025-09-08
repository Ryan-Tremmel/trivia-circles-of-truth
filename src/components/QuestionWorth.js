import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { GAME_STATES } from '../constants/gameConstants';

export default function QuestionWorth() {
  const { scoreMultiplier } = useSelector(state => {
    return state.score;
  });

  const questionDifficulty = useSelector(state => {
    return state.questionDifficulty;
  });

  const gameState = useSelector(state => {
    return state.gameState;
  });

  // Track previous values to show until game state becomes GUESSING
  const [displayMultiplier, setDisplayMultiplier] = useState(scoreMultiplier);
  const [displayDifficulty, setDisplayDifficulty] = useState(questionDifficulty);

  // Update display values when game state becomes GUESSING
  useEffect(() => {
    if (gameState === GAME_STATES.GUESSING) {
      setDisplayMultiplier(scoreMultiplier);
      setDisplayDifficulty(questionDifficulty);
    }
  }, [gameState, scoreMultiplier, questionDifficulty]);

  const capitalizedDisplayDifficulty =
    displayDifficulty[0].toUpperCase() + displayDifficulty.slice(1);

  return (
    <p className="questionWorth text--general">
      The following question is worth $
      <span className="question--underlined">{displayMultiplier * 100}</span>!
      Difficulty: {capitalizedDisplayDifficulty}
    </p>
  );
}
