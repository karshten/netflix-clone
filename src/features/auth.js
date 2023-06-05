import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  tmpEmail: '',
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.tmpEmail = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { reducer: authReducer } = authSlice;
export const { setEmail, login, logout } = authSlice.actions;