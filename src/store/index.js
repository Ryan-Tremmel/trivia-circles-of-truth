import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { gameStateReducer, updateGameState } from './slices/gameStateSlice';
import {
  questionDifficultyReducer,
  updateQuestionDifficulty,
} from './slices/questionDifficultySlice';
import {
  livesReducer,
  removeLives,
  addLives,
  resetLives,
} from './slices/livesSlice';
import {
  scoreReducer,
  updateCurrentScore,
  resetCurrentScore,
  updateScoreMultiplier,
} from './slices/scoreSlice';
import {
  currentUserReducer,
  setCurrentUser,
  clearCurrentUser,
} from './slices/currentUserSlice';
import { questionsApi } from './apis/questionsApi';
import { currentUserApi } from './apis/currentUserApi';

const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
    questionDifficulty: questionDifficultyReducer,
    lives: livesReducer,
    score: scoreReducer,
    currentUser: currentUserReducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [currentUserApi.reducerPath]: currentUserApi.reducer,
  },
  // Middleware needed to be added in order for the API (from Toolkit Query) to work nicely with the store...don't look too deep into it, just do it
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
      .concat(questionsApi.middleware)
      .concat(currentUserApi.middleware);
  },
  devTools: false,
});

// Again, needed to be done once to get API (from Toolkit Query) to work with the store
setupListeners(store.dispatch);

export {
  store,
  updateGameState,
  updateQuestionDifficulty,
  removeLives,
  addLives,
  resetLives,
  updateCurrentScore,
  resetCurrentScore,
  updateScoreMultiplier,
  setCurrentUser,
  clearCurrentUser,
};
export { useFetchQuestionsQuery } from './apis/questionsApi';
export {
  useSignupUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
} from './apis/currentUserApi';
