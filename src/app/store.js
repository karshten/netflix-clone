import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { instance } from '../requester';
import { bannerMovieReducer } from '../features/bannerMovie';
import { movieDetailsReducer } from '../features/movieDetails';

export const store = configureStore({
  reducer: {
    bannerMovie: bannerMovieReducer,
    movieDetails: movieDetailsReducer
  },
   middleware: () => getDefaultMiddleware({ thunk: { extraArgument: instance } }),
});
