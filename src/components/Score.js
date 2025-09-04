import { useDispatch, useSelector } from 'react-redux';
import {
  updateQuestionDifficulty,
  updateCurrentScore,
  updateScoreMultiplier,
} from '../store';
import { useState, useEffect } from 'react';
import { SCORE_THRESHOLDS, SCORE_BASE_MULTIPLIER, GAME_STATES } from '../constants/gameConstants';

export default function Score() {
  const dispatch = useDispatch();

  // State Management //
  const gameState = useSelector(state => {
    return state.gameState;
  });

  const lives = useSelector(state => {
    return state.lives;
  });

  const { currentScore, scoreMultiplier } = useSelector(state => {
    return state.score;
  });

  // The score multliplier increases after every 5 questions answered
  const [counter, setCounter] = useState(1);

  // Functionality //
  useEffect(() => {
    // When the game ends, the counter is reset to 1
    if (gameState === GAME_STATES.INCORRECT && lives === 0) setCounter(1);

    // Updates counter when player selects an answer or skips
    if (
      gameState === GAME_STATES.CORRECT ||
      gameState === GAME_STATES.INCORRECT ||
      gameState === GAME_STATES.SKIPPED
    ) {
      setCounter(prevCounter => prevCounter + 1);

      /* Loops through each threshold and finds the threshold value that matches the counter value and returns the multiplier.
          It finds the current threshold that applies to the current counter value. It compares the counter with the threshold values
          and selects the appropriate threshold based on whether the counter falls between the current and next threshold. */
      const threshold = SCORE_THRESHOLDS.find((item, i) => {
        const nextThreshold = SCORE_THRESHOLDS[i + 1];
        return (
          counter >= item.threshold &&
          (!nextThreshold || counter < nextThreshold.threshold)
        );
      });
      // Updates the score multiplier and difficulty according to the counter
      if (threshold) {
        dispatch(updateScoreMultiplier(threshold.multiplier));
        if (threshold.difficulty) {
          dispatch(updateQuestionDifficulty(threshold.difficulty));
        }
      }

      if (gameState === GAME_STATES.CORRECT)
        dispatch(updateCurrentScore(currentScore + scoreMultiplier * SCORE_BASE_MULTIPLIER));
    }
  }, [gameState]);
  /* const threshold = thresholds.find((item, i) => {
        const nextThreshold = thresholds[i + 1];
        return (
          questionIndex >= item.threshold &&
          (!nextThreshold || questionIndex < nextThreshold.threshold)
        );
      });
      // Updates the score multiplier and difficulty according to the counter
      if (threshold) {
        dispatch(updateScoreMultiplier(threshold.multiplier));
        if (threshold.difficulty) {
          dispatch(updateQuestionDifficulty(threshold.difficulty));
        }
      }

      if (gameState === 'correct')
        dispatch(updateCurrentScore(currentScore + scoreMultiplier * 100));
    }
  }, [gameState]); */

  return (
    <p className="score score__text">
      Score: $
      <span className="score__amount">{currentScore.toLocaleString()}</span>
    </p>
  );
}
