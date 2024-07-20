import { createSlice } from "@reduxjs/toolkit";
// TODO: Define the inital states required for authentication
const initialState = {
  isAuthenticated: false,
  loginUserStatus: true,
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
