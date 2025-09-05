import { useSelector } from 'react-redux';
import { useResetGame } from '../hooks/useResetGame';
import { useQuestionDataManagement } from '../hooks/useQuestionDataManagement';
import { useQuestionNavigation } from '../hooks/useQuestionNavigation';
import { DIFFICULTY_LEVELS } from '../constants/gameConstants';

import QuestionWorth from './QuestionWorth';
import Question from './Question';
import AnswersContainer from './AnswersContainer';
import SkipButton from './SkipButton';
import NextButton from './NextButton';
import BuyLivesButton from './BuyLivesButton';
import LoseGame from './LoseGame';

export default function TriviaContainer({ questionIndex, setQuestionIndex }) {
  // Redux state for question index management
  const gameState = useSelector(state => state.gameState);
  const lives = useSelector(state => state.lives);

  // Question data management hook
  const {
    currentQuestion,
    isClickable,
    isNewData,
    setIsNewData,
    refetch,
    hasLives,
  } = useQuestionDataManagement(questionIndex);

  // Question navigation hook
  useQuestionNavigation(
    questionIndex,
    setQuestionIndex,
    gameState,
    lives,
    isNewData,
    setIsNewData
  );

  const resetGame = useResetGame();
  // Resets the game by setting all relevant states to default by using the useResetGame custom hook
  const handleClickRestart = () => {
    resetGame(DIFFICULTY_LEVELS.EASY);
    refetch(DIFFICULTY_LEVELS.EASY);
  };


  return (
    <div className="triviaContainer">
      {hasLives ? (
        <>
          <QuestionWorth />
          <div className="questionContainer">
            <Question question={currentQuestion.question} />
          </div>
          <AnswersContainer
            currentQuestion={currentQuestion}
            isClickable={isClickable}
          />
          <div className="skipNextContainer">
            <SkipButton isClickable={isClickable} />
            <NextButton isClickable={isClickable} />
            <BuyLivesButton isClickable={isClickable} />
          </div>
        </>
      ) : (
        <LoseGame
          isClickable={isClickable}
          handleClickRestart={handleClickRestart}
        />
      )}
    </div>
  );
}
