import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_LIVES } from '../../constants/gameConstants';

const livesSlice = createSlice({
  name: 'lives',
  initialState: INITIAL_LIVES,
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
