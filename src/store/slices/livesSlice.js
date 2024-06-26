import { createSlice } from '@reduxjs/toolkit';

const livesSlice = createSlice({
  name: 'lives',
  initialState: 3,
  reducers: {
    removeLives(state, action) {
      return state - action.payload;
    },
    addLives(state, action) {
      return state + action.payload;
    },
    resetLives(state, action) {
      return action.payload;
    },
  },
});

export const livesReducer = livesSlice.reducer;
export const { removeLives, addLives, resetLives } = livesSlice.actions;
