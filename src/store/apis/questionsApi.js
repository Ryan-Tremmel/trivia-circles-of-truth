import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, QUESTIONS_PER_FETCH, API_CACHE_TIME } from '../../constants/gameConstants';
import { logError } from '../../utils/errorUtils';

export const questionsApi = createApi({
  reducerPath: 'questions',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    // Add retry logic for network failures
    fetchFn: async (...args) => {
      const maxRetries = 3;
      let lastError = new Error('Unknown error occurred');
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await fetch(...args);
          
          // If response is ok, return it
          if (response.ok) {
            return response;
          }
          
          // If it's a server error (5xx), retry
          if (response.status >= 500 && attempt < maxRetries) {
            logError(
              new Error(`Server error ${response.status}: ${response.statusText}`), 
              'questions-api', 
              { attempt, maxRetries, status: response.status }
            );
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            continue;
          }
          
          // For non-retryable errors (4xx), return the response immediately
          return response;
        } catch (error) {
          lastError = error;
          
          // If it's a network error and we have retries left, wait and retry
          if (attempt < maxRetries) {
            logError(error, 'questions-api', { attempt, maxRetries });
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            continue;
          }
        }
      }
      
      // If all retries failed, throw the last error
      throw lastError;
    },
  }),

  endpoints: builder => ({
    fetchQuestions: builder.query({
      query: difficulty => ({
        url: 'questions',
        params: {
          limit: QUESTIONS_PER_FETCH.toString(),
          difficulties: difficulty,
        },
        method: 'GET',
      }),
      keepUnusedDataFor: API_CACHE_TIME,
      // Add error handling for the endpoint
      transformErrorResponse: (response, meta, arg) => {
        // Log the error with context
        logError(
          new Error(`API Error: ${response.status} ${response.statusText}`),
          'fetchQuestions',
          { difficulty: arg, status: response.status }
        );
        return response;
      },
    }),
  }),

});

export const { useFetchQuestionsQuery } = questionsApi;
