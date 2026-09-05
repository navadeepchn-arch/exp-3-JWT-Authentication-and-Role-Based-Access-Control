import { createSlice } from "@reduxjs/toolkit";
import { decodeMockJWT, isTokenExpired } from "../../utils/jwt";

const storedToken = localStorage.getItem("authToken");

const getUserFromToken = (token) => {
  if (!token || isTokenExpired(token)) {
    return null;
  }

  return decodeMockJWT(token);
};

const initialState = {
  token: storedToken && !isTokenExpired(storedToken) ? storedToken : null,
  user: getUserFromToken(storedToken),
  isAuthenticated:
    !!storedToken && !isTokenExpired(storedToken),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("authToken", token);
    },

    loginFailure: (state, action) => {
  state.token = null;
  state.user = null;
  state.isAuthenticated = false;
  state.error = action.payload;

  localStorage.removeItem("authToken");
},

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("authToken");
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;