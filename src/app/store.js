import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { instance } from '../requester';
import { bannerMovieReducer } from '../features/bannerMovie';
import { movieDetailsReducer } from '../features/movieDetails';
import { moviesReducer } from '../features/movies';
import { authReducer } from '../features/auth';

export const store = configureStore({
  reducer: {
    bannerMovie: bannerMovieReducer,
    movieDetails: movieDetailsReducer,
    movies: moviesReducer,
    auth: authReducer,
  },
   middleware: () => getDefaultMiddleware({ thunk: { extraArgument: instance } }),
});
