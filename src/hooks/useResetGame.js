import {
  updateQuestionDifficulty,
  resetLives,
  updateGameState,
  resetCurrentScore,
  updateScoreMultiplier,
} from '../store';
import { useDispatch } from 'react-redux';
import { 
  INITIAL_LIVES, 
  INITIAL_SCORE, 
  INITIAL_MULTIPLIER, 
  INITIAL_GAME_STATE 
} from '../constants/gameConstants';

export const useResetGame = () => {
  const dispatch = useDispatch();

  return difficulty => {
    dispatch(updateQuestionDifficulty(difficulty));
    dispatch(resetLives(INITIAL_LIVES));
    dispatch(resetCurrentScore(INITIAL_SCORE));
    dispatch(updateScoreMultiplier(INITIAL_MULTIPLIER));
    dispatch(updateGameState(INITIAL_GAME_STATE));
  };
};
