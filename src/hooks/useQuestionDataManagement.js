import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchQuestionsQuery } from '../store';
import { 
  QUESTION_INDEX_THRESHOLD, 
  LAST_QUESTION_INDEX, 
  ERROR_MESSAGES, 
  GAME_STATES,
  DIFFICULTY_LEVELS 
} from '../constants/gameConstants';

export const useQuestionDataManagement = (questionIndex) => {
  // Redux state - exactly as in TriviaContainer
  const gameState = useSelector(state => state.gameState);
  const questionDifficulty = useSelector(state => state.questionDifficulty);
  const lives = useSelector(state => state.lives);

  // Local state - exactly as in TriviaContainer
  const [currentAPIQueryData, setCurrentAPIQueryData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    answers: [],
    correctAnswer: '',
  });
  const [isNewData, setIsNewData] = useState(false);
  const [isClickable, setIsClickable] = useState(false);

  // API query - exactly as in TriviaContainer
  const { data, isLoading, isError, isSuccess, isFetching, refetch } =
    useFetchQuestionsQuery(questionDifficulty);

  // Utility function - exactly as in TriviaContainer
  const shuffleAnswers = function (answers) {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };

  // First useEffect - exactly as in TriviaContainer
  useEffect(() => {
    // Error
    if (isError) {
      setCurrentQuestion({
        question: ERROR_MESSAGES.LOADING_FAILED,
        answers: [],
        correctAnswer: '',
      });
    }

    // Loading
    if (isLoading) {
      setCurrentQuestion({
        question: ERROR_MESSAGES.LOADING,
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
        if (gameState === GAME_STATES.GUESSING) {
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
  }, [data, currentAPIQueryData, gameState, isError, isLoading, isFetching, questionIndex]);

  // Second useEffect - exactly as in TriviaContainer
  useEffect(() => {
    // If the player has more than 1 life OR if the gameState is incorrect with 0 lives (end-game)
    if (lives >= 1 || (gameState === GAME_STATES.INCORRECT && lives === 0))
      setIsClickable(true);

    // gameState after player guesses - sets buttons to be disabled
    if (gameState !== GAME_STATES.GUESSING && lives > 0) {
      setIsClickable(false);
    }
  }, [data, gameState]);

  // Third useEffect - exactly as in TriviaContainer
  useEffect(() => {
    if (
      questionIndex > QUESTION_INDEX_THRESHOLD &&
      currentQuestion.correctAnswer === currentAPIQueryData[LAST_QUESTION_INDEX].correctAnswer
    )
      refetch(DIFFICULTY_LEVELS.HARD);
  }, [questionIndex, currentAPIQueryData, currentQuestion]);

  return {
    // State
    currentQuestion,
    isClickable,
    isNewData,
    setIsNewData,
    currentAPIQueryData,
    
    // API
    refetch,
    
    // Computed
    hasLives: lives > 0,
  };
};
