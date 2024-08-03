import { createSlice } from "@reduxjs/toolkit";

// TODO: Define the inital states required for authentication

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  loginUserStatus: true,
  loggedUser: JSON.parse(localStorage.getItem("loggedUser")),
  currentUser: null,
  formErrorMessage: "",
  modalStatus: false,
  //* Folder Details
  userFolders: [],
  selectedFolder: null,
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
      localStorage.removeItem("loggedUser");
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
    setModalStatus(state, action) {
      state.modalStatus = action.payload;
    },
    setUserFolders(state, action) {
      state.userFolders = action.payload;
    },
    setSelectedFolder(state, action) {
      state.selectedFolder = action.payload;
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (loggedUser) {
        loggedUser.currentSelectedFolder = action.payload;
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      }
    },
  },
});

export const {
  setIsAuthenticated,
  logout,
  setLoginUser,
  setCurrentUser,
  setFormErrorMessage,
  setUserFolders,
  setSelectedFolder,
  setforms,
} = authSlice.actions;
export default authSlice.reducer;
