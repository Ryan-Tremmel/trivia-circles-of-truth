import { createSlice } from '@reduxjs/toolkit';

const questionDifficultySlice = createSlice({
  name: 'questionDifficulty',
  initialState: 'easy',
  reducers: {
    updateQuestionDifficulty(state, action) {
      return action.payload;
    },
  },
});

export const questionDifficultyReducer = questionDifficultySlice.reducer;
export const { updateQuestionDifficulty } = questionDifficultySlice.actions;
