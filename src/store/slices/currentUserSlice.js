import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    username: null,
    objectId: null,
    highscore: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.username = action.payload.username;
      state.objectId = action.payload.objectId;
      state.highscore = action.payload.highscore;
    },
    clearCurrentUser(state, action) {
      state.username = null;
      state.objectId = null;
      state.highscore = null;
    },
  },
});

export const currentUserReducer = currentUserSlice.reducer;
export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;
