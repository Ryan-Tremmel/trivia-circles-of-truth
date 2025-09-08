import { useEffect } from 'react';
import { GAME_STATES } from '../constants/gameConstants';

/**
 * Custom hook to manage question navigation logic
 * Handles question index progression based on game state and new data status
 */
export const useQuestionNavigation = (
  questionIndex,
  setQuestionIndex,
  gameState,
  lives,
  isNewData,
  setIsNewData
) => {
  useEffect(() => {
    // gameState after player guesses - sets buttons to be disabled
    if (gameState !== GAME_STATES.GUESSING && lives > 0) {
      // If question is not the first OR if it is the very first question with new data (i.e. start of game or when the player selects an answer)
      if (!isNewData || (isNewData && questionIndex === 0)) {
        setQuestionIndex(prevIndex => prevIndex + 1);
        if (isNewData) setIsNewData(!isNewData);
        // If there is new data but the game hasn't just started (i.e. difficulty has been updated)
      } else if (isNewData && questionIndex !== 0) {
        setQuestionIndex(0);
        setIsNewData(!isNewData);
      }
    }
    // gameState will be incorrect, but the game has ended (intended) (i.e. game has ended)
    else if (gameState === GAME_STATES.INCORRECT && lives === 0) setQuestionIndex(0);
  }, [gameState]);
};
