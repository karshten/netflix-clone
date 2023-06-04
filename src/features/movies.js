import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../constants/constants';

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
};

const endpoints = {
  movies: (genreId, page) => `/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genreId}`,
  topRatedMovies: (page) => `/discover/movie?api_key=${API_KEY}&page=${page}&with_network=213`
};

export const getMovies = createAsyncThunk(
  'counter/getMovies',
  async ({genreId, page}, { extra: api }) => {
    try {
      const { data } = await api.get(endpoints.movies(genreId, page));
      return data;

    } catch (err) {
      return [];
    }
  }
);

export const getTopRatedMovies = createAsyncThunk(
  'counter/getTopRatedMovies',
  async ({page}, { extra: api }) => {
    try {
      const { data } = await api.get(endpoints.topRatedMovies(page));
      return data;

    } catch (err) {
      return [];
    }
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload?.results) {
          state.movies.push(...action.payload.results);
        }
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload;
      })
      
      .addCase(getTopRatedMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload?.results) {
          state.movies.push(...action.payload.results);
        }
      })
      .addCase(getTopRatedMovies.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload;
      });
  },
});

export const { reducer: moviesReducer } = moviesSlice;
export const { clearMovies } = moviesSlice.actions;
