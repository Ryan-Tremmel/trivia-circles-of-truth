import { createSlice } from '@reduxjs/toolkit';

const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    currentScore: 0,
    scoreMultiplier: 1,
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
