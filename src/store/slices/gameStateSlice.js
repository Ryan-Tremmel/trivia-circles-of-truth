import { createSlice } from '@reduxjs/toolkit';

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: 'guessing',
  reducers: {
    updateGameState(state, action) {
      return action.payload;
    },
  },
});

export const gameStateReducer = gameStateSlice.reducer;
export const { updateGameState } = gameStateSlice.actions;
