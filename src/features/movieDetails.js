import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../constants/constants';

const initialState = {
  movie: {},
  status: 'idle',
  error: null,
};

const endpoints = {
  movieDetails: (id) => `movie/${id}?api_key=${API_KEY}&language=en-US`,
};

export const getMovieDetails = createAsyncThunk(
  'counter/getMovieDetails',
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get(endpoints.movieDetails(id));
     return data;

    } catch (err) {
      return [];
    }
  }
);

export const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movie = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload;
        state.movie = action.payload;
      });;
  },
});

export const { reducer: movieDetailsReducer } = movieDetailsSlice;
