import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_GAME_STATE } from '../../constants/gameConstants';

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: INITIAL_GAME_STATE,
  reducers: {
    updateGameState(state, action) {
      return action.payload;
    },
  },
});

export const gameStateReducer = gameStateSlice.reducer;
export const { updateGameState } = gameStateSlice.actions;
