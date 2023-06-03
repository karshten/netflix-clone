import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { instance } from '../requester';
import { bannerMovieReducer } from '../features/bannerMovie';

export const store = configureStore({
  reducer: {
    bannerMovie: bannerMovieReducer
  },
   middleware: () => getDefaultMiddleware({ thunk: { extraArgument: instance } }),
});
