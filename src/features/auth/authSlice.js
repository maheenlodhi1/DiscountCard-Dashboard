import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, login } from "./authApi";

const initialState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });

    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

export const getUser = (state) => {
  return state.auth.user;
};

export const getAuthLoading = (state) => {
  return state.auth.isLoading;
};

export const getAuthError = (state) => {
  return state.auth.error;
};

export const getIsLoggedIn = (state) => {
  return state.auth.isLoggedIn;
};
