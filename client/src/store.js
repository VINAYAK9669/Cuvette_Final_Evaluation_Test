import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./configuration/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
