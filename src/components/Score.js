import { useDispatch, useSelector } from 'react-redux';
import {
  updateQuestionDifficulty,
  updateCurrentScore,
  updateScoreMultiplier,
} from '../store';
import { useState, useEffect } from 'react';

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
    if (gameState === 'incorrect' && lives === 0) setCounter(1);

    // Updates counter when player selects an answer or skips
    if (
      gameState === 'correct' ||
      gameState === 'incorrect' ||
      gameState === 'skipped'
    ) {
      setCounter(prevCounter => prevCounter + 1);

      // Each threshold below corresponds to the counter value, with multiplier representing the score multiplier

      const thresholds = [
        { threshold: 5, multiplier: 5 },
        { threshold: 10, multiplier: 10 },
        { threshold: 15, multiplier: 25, difficulty: 'medium' },
        { threshold: 20, multiplier: 50 },
        { threshold: 25, multiplier: 75 },
        { threshold: 30, multiplier: 100, difficulty: 'hard' },
        { threshold: 35, multiplier: 250 },
        { threshold: 40, multiplier: 500 },
        { threshold: 45, multiplier: 750 },
        { threshold: 50, multiplier: 1000 },
        { threshold: 55, multiplier: 2500 },
        { threshold: 60, multiplier: 5000 },
        { threshold: 65, multiplier: 7500 },
        { threshold: 70, multiplier: 10000 },
        { threshold: 75, multiplier: 20000 },
        { threshold: 80, multiplier: 50000 },
        { threshold: 85, multiplier: 75000 },
        { threshold: 90, multiplier: 100000 },
      ];

      /* Loops through each threshold and finds the threshold value that matches the counter value and returns the multiplier.
          It finds the current threshold that applies to the current counter value. It compares the counter with the threshold values
          and selects the appropriate threshold based on whether the counter falls between the current and next threshold. */
      const threshold = thresholds.find((item, i) => {
        const nextThreshold = thresholds[i + 1];
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

      if (gameState === 'correct')
        dispatch(updateCurrentScore(currentScore + scoreMultiplier * 100));
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
