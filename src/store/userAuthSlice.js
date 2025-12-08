import { createSlice } from "@reduxjs/toolkit";
import { clearToken, getUserData } from "@/lib/auth";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLoginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    userLogout: (state) => {
      clearToken();
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { userLoginSuccess, userLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
