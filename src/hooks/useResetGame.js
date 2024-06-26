import {
  updateQuestionDifficulty,
  resetLives,
  updateGameState,
  resetCurrentScore,
  updateScoreMultiplier,
} from '../store';
import { useDispatch } from 'react-redux';

export const useResetGame = () => {
  const dispatch = useDispatch();

  return difficulty => {
    dispatch(updateQuestionDifficulty(difficulty));
    dispatch(resetLives(3));
    dispatch(resetCurrentScore(0));
    dispatch(updateScoreMultiplier(1));
    dispatch(updateGameState('guessing'));
  };
};
