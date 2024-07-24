import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./configuration/authSlice";
import modalReducer from "./pages/modalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

export default store;
