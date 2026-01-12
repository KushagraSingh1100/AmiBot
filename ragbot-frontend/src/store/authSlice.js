import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.token = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    logout(state) {
      state.token = null;
      state.email = null;
    },
  },
});
export const selectUserId = (state) => state.auth.userId;
export const selectEmail = (state) => state.auth.email;
export const selectIsAuthenticated = (state) => !!state.auth.token;
export const { setAccessToken, setEmail, setUserId, logout } =
  authSlice.actions;
export default authSlice.reducer;
