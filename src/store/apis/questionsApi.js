import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const questionsApi = createApi({
  reducerPath: 'questions',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://the-trivia-api.com/v2/',
  }),

  endpoints: builder => ({
    fetchQuestions: builder.query({
      query: difficulty => ({
        url: 'questions',
        params: {
          limit: '32',
          difficulties: difficulty,
        },
        method: 'GET',
      }),
      keepUnusedDataFor: 1,
    }),
  }),

  /* endpoints(builder) {
    return {
      fetchQuestions: builder.query({
        query: difficulty => {
          return {
            url: 'questions',
            params: {
              limit: '8',
              difficulties: difficulty,
            },
            method: 'GET',
          };
        },
        // Would work if multiple sets of data came back
        transformResponse: response => {
          const categorizedQuestions = {
            easy: [],
            medium: [],
            hard: [],
          };

          response.forEach(question => {
            switch (question.difficulty) {
              case 'easy':
                categorizedQuestions.easy.push(question);
                break;
              case 'medium':
                categorizedQuestions.medium.push(question);
                break;
              case 'hard':
                categorizedQuestions.hard.push(question);
                break;
              default:
                break;
            }
          });

          return categorizedQuestions;
        }, 
      }),
    };
  }, */
});

export const { useFetchQuestionsQuery } = questionsApi;
