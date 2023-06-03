import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../requester';

const initialState = {
  movie: {},
  status: 'idle',
  error: null,
};


export const getBannerMovie = createAsyncThunk(
  'counter/getBannerMovie',
  async (_, { extra: api }) => {
    try {
      const response = await api.get(request.getNetflixOriginals);
      const data = response.data.results;
      let randomIndex = Math.floor(Math.random() * data.length - 1);

      if (randomIndex < 0) randomIndex = 0;

      return data[randomIndex];

    } catch (err) {
      return [];
    }
  }
);

export const bannerMovieSlice = createSlice({
  name: 'bannerMovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBannerMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBannerMovie.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movie = action.payload;
      })
      .addCase(getBannerMovie.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload;
        state.movie = action.payload;
      });;
  },
});

export const { reducer: bannerMovieReducer } = bannerMovieSlice;
