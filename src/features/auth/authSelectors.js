export const selectAuth = (state) => state.auth;

export const selectToken = (state) => state.auth.token;

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;

export const selectAuthError = (state) => state.auth.error;

export const selectUserRole = (state) =>
  state.auth.user?.role || null;