import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { instance } from '../requester';
import { bannerMovieReducer } from '../features/bannerMovie';
import { movieDetailsReducer } from '../features/movieDetails';
import { moviesReducer } from '../features/movies';

export const store = configureStore({
  reducer: {
    bannerMovie: bannerMovieReducer,
    movieDetails: movieDetailsReducer,
    movies: moviesReducer,
  },
   middleware: () => getDefaultMiddleware({ thunk: { extraArgument: instance } }),
});
