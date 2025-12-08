import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuthSlice";
import organizerAuthReducer from "./organizerAuthSlice";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    organizerAuth: organizerAuthReducer,
  },
});
