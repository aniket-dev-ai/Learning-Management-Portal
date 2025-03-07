import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
