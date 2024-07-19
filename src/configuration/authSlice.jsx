import { createSlice } from "@reduxjs/toolkit";
// TODO: Define the inital states required for authentication
const initialState = {
  isAuthenticated: false,
  loginUserStatus: true,
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
  },
});

export const { setIsAuthenticated, logout, setLoginUser } = authSlice.actions;
export default authSlice.reducer;
