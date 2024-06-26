import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCurrentUser } from '../slices/currentUserSlice';

export const currentUserApi = createApi({
  reducerPath: 'currentUserApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/trivia/api/users',
  }),
  endpoints: builder => ({
    signupUser: builder.mutation({
      query: userData => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
      /* Once the query / mutation is fulfilled but before completion, dispatches the setCurrentUser function and stores
         the response data in the store */
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { username, objectId, highscore } = data.data;
          dispatch(setCurrentUser({ username, objectId, highscore }));
        } catch (err) {
          console.error('Signup failed', err);
        }
        /* dispatch(
          currentUserApi.util.updateQueryData('getCurrentUser', draft => {
            // Modify the state to include the objectId
            if (draft) {
              draft.objectId = objectId;
            }
          })
        ); */
      },
    }),
    loginUser: builder.mutation({
      query: userData => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { username, objectId, highscore } = data.data;
          dispatch(setCurrentUser({ username, objectId, highscore }));
        } catch (err) {
          console.error('Login failed', err);
        }
        /* dispatch(
          currentUserApi.util.updateQueryData('getCurrentUser', draft => {
            if (draft) {
              draft.currentUser = username;
              draft.objectId = objectId;
            }
          })
        ); */
      },
    }),
    updateUser: builder.mutation({
      query: ({ currentUserId, userData }) => ({
        url: `/${currentUserId}`,
        method: 'PATCH',
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { username, objectId, highscore } = data.data;
          dispatch(setCurrentUser({ username, objectId, highscore }));
        } catch (err) {
          console.error('Update failed', err);
        }
      },
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
} = currentUserApi;
