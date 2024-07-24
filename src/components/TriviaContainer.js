import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchQuestionsQuery } from '../store';
import { useResetGame } from '../hooks/useResetGame';

import QuestionWorth from './QuestionWorth';
import Question from './Question';
import AnswersContainer from './AnswersContainer';
import SkipButton from './SkipButton';
import NextButton from './NextButton';
import BuyLivesButton from './BuyLivesButton';
import LoseGame from './LoseGame';

export default function TriviaContainer({ questionIndex, setQuestionIndex }) {
  // State Management //
  const gameState = useSelector(state => {
    return state.gameState;
  });

  const questionDifficulty = useSelector(state => {
    return state.questionDifficulty;
  });

  const lives = useSelector(state => {
    return state.lives;
  });

  const [currentAPIQueryData, setCurrentAPIQueryData] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    answers: [],
    correctAnswer: '',
  });

  const [isNewData, setIsNewData] = useState(false);

  const [isClickable, setIsClickable] = useState(false);

  // Functions //
  const shuffleAnswers = function (answers) {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };

  // Query API Call //
  const { data, isLoading, isError, isSuccess, isFetching, refetch } =
    useFetchQuestionsQuery(questionDifficulty);

  const resetGame = useResetGame();
  // Resets the game by setting all relevant states to default by using the useResetGame custom hook
  const handleClickRestart = () => {
    resetGame('easy');
    refetch('easy');
  };

  // Functionality //
  // useEffect responsible for data fetching and updating the current question
  useEffect(() => {
    // Error
    if (isError) {
      setCurrentQuestion({
        question:
          'Could not load questions. Please refresh or try again later!',
        answers: [],
        correctAnswer: '',
      });
    }

    // Loading
    if (isLoading) {
      setCurrentQuestion({
        question: 'Loading questions... please wait...',
        answers: [],
        correctAnswer: '',
      });

      setIsClickable(false);
    }

    if (isFetching) {
      setIsNewData(true);
    }

    // Once loaded
    if (isSuccess && data) {
      // Sets incoming query data to currentAPIQueryData state
      if (isNewData) setCurrentAPIQueryData(data);

      // Checks if state has been updated with the incoming data before trying to read said data
      if (currentAPIQueryData) {
        // gameState should be guessing - sets the current question and loads it into currentQuestion state
        if (gameState === 'guessing') {
          /* Sets the current question and corresponding data to the current data based on the index, which is updated
             each time the user selects an answer */
          setCurrentQuestion({
            question: currentAPIQueryData[questionIndex].question.text,
            answers: shuffleAnswers([
              ...currentAPIQueryData[questionIndex].incorrectAnswers,
              currentAPIQueryData[questionIndex].correctAnswer,
            ]),
            correctAnswer: currentAPIQueryData[questionIndex].correctAnswer,
          });
        }
      }
    }
  }, [data, currentAPIQueryData, gameState, isError, isLoading, isFetching]);

  // useEffect responsible for checking gameState and allowing buttons to be clickable as well as moving to next question
  useEffect(() => {
    // If the player has more than 1 life OR if the gameState is incorrect with 0 lives (end-game)
    if (lives >= 1 || (gameState === 'incorrect' && lives === 0))
      setIsClickable(true);

    // gameState after player guesses - sets buttons to be disabled
    if (gameState !== 'guessing' && lives > 0) {
      setIsClickable(false);
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
    else if (gameState === 'incorrect' && lives === 0) setQuestionIndex(0);
  }, [data, gameState]);

  // useEffect responsible for fetching more questions towards the end of the data so that the game does not crash
  useEffect(() => {
    if (
      questionIndex > 30 &&
      currentQuestion.correctAnswer === currentAPIQueryData[31].correctAnswer
    )
      refetch('hard');
  }, [questionIndex, currentAPIQueryData, currentQuestion]);

  return (
    <div className="triviaContainer">
      {lives ? (
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
