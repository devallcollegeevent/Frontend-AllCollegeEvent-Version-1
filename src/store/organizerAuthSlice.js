import { createSlice } from "@reduxjs/toolkit";
import { clearToken } from "@/lib/auth";

const initialState = {
  organizer: null,
  isLoggedIn: false,
};

const organizerAuthSlice = createSlice({
  name: "organizerAuth",
  initialState,
  reducers: {
    organizerLoginSuccess: (state, action) => {
      state.organizer = action.payload;
      state.isLoggedIn = true;
    },
    organizerLogout: (state) => {
      clearToken();
      state.organizer = null;
      state.isLoggedIn = false;
    },
  },
});

export const { organizerLoginSuccess, organizerLogout } = organizerAuthSlice.actions;
export default organizerAuthSlice.reducer;
