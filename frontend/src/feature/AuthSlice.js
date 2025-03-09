import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("user") ? true : false, // ✅ Local Storage se check karenge
  user: JSON.parse(localStorage.getItem("user")) || null, // ✅ User details bhi store karenge
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // ✅ Local Storage update
    },
    userLoggedOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user"); // ✅ Local Storage se remove karo
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
