import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@app/models';

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout, updateLoading } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
