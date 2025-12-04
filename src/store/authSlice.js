import { createSlice } from "@reduxjs/toolkit";
import { clearToken, getUserData } from "@/lib/auth";

const initialState = {
  user: getUserData() || null,
  isLoggedIn: !!getUserData(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      clearToken();
      state.user = null;
      state.isLoggedIn = false;
    },
  }
});

export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
