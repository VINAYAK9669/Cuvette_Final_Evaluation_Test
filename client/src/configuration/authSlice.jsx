import { createSlice } from "@reduxjs/toolkit";
import ValidateCurToken from "../hooks/useValidateToken";
// TODO: Define the inital states required for authentication

const initialState = {
  isAuthenticated: await ValidateCurToken(localStorage.getItem("token")),
  loginUserStatus: true,
  loggedUser: JSON.parse(localStorage.getItem("loggedUser")),
  currentUser: null,
  formErrorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // TODO: Create a action creators
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    },
    setLoginUser(state, action) {
      state.loginUserStatus = action.payload;
    },
    setCurrentUser(state, action) {
      console.log(action.payload);
      state.currentUser = action.payload;
    },
    setFormErrorMessage(state, action) {
      state.formErrorMessage = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  logout,
  setLoginUser,
  setCurrentUser,
  setFormErrorMessage,
} = authSlice.actions;
export default authSlice.reducer;
