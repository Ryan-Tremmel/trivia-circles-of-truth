import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_SCORE, INITIAL_MULTIPLIER } from '../../constants/gameConstants';

const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    currentScore: INITIAL_SCORE,
    scoreMultiplier: INITIAL_MULTIPLIER,
  },
  reducers: {
    updateCurrentScore(state, action) {
      state.currentScore = action.payload;
    },
    resetCurrentScore(state, action) {
      state.currentScore = action.payload;
    },
    updateScoreMultiplier(state, action) {
      state.scoreMultiplier = action.payload;
    },
  },
});

export const scoreReducer = scoreSlice.reducer;
export const { updateCurrentScore, resetCurrentScore, updateScoreMultiplier } =
  scoreSlice.actions;
