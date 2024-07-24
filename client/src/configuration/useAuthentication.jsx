/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useApiFun from "./useApiFun";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import {
  setFormErrorMessage,
  setIsAuthenticated,
  setCurrentUser,
  setLoginUser,
  setUserFolders,
} from "./authSlice";
import ValidateCurToken from "../hooks/useValidateToken";

function useAuthentication() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  // Destructure all the functions related to API
  const { addNewUser, loginUser, createFolderFun, getFoldersbyUserIdFun } =
    useApiFun();

  // TODO:  ================== Functions Logic ===================
  // * Handle signup once we get response from server
  const handleSignupLogic = async (data) => {
    const { response } = data;
    try {
      if (response.status === 201) {
        userLogin.mutate({
          email: currentUser.email,
          password: currentUser.password,
        });
      }
      if (response.status === 400) {
        dispatch(setFormErrorMessage("User already Exists"));
      }
      // Invalidate and refetch
      queryClient.invalidateQueries("newUserDetails");
    } catch (error) {
      console.error("Initialization Error:", error);
    }
  };
  // * Handle signIn once we get response from server
  const handleLoginLogic = async (data) => {
    const { response } = data;

    if (response.status === 200) {
      try {
        // 1] store the token to the localStorage
        localStorage.setItem("token", response.data.token);
        // 2] Decode the JWT token to get the user information
        const decodedToken = jwtDecode(response.data.token);

        const tokenValidation = await ValidateCurToken(response.data.token);
        if (tokenValidation) {
          const { userID, userName } = decodedToken;
          localStorage.setItem(
            "loggedUser",
            JSON.stringify({ userID, userName })
          );
          dispatch(setCurrentUser(userName));
          navigate(`/dashboard/${userID}`);
          dispatch(setIsAuthenticated(true));
          dispatch(setLoginUser(true));
          dispatch(setFormErrorMessage(""));
        }
        queryClient.invalidateQueries("loggedDetails");
      } catch (error) {
        console.log(error);
      }
    } else if (response.status === 401) {
      dispatch(setFormErrorMessage("Password or email are incorrect"));
    } else {
      dispatch(setFormErrorMessage("User Not found"));
    }
  };
  // *Handle CreateFolder once we get response from the server
  const handlecreateFolderLogic = async ({ response }) => {
    try {
      if (response.status === 201) {
        const { userID } = await JSON.parse(localStorage.getItem("loggedUser"));

        fetchAllFolders.mutate(userID);
      }
    } catch (error) {
      throw new error();
    }
  };
  // TODO: ==================== React Query Logics ==============

  // TODO: 1] User REGISTERATION
  const addUser = useMutation({
    mutationKey: ["newUserDetails"],
    mutationFn: addNewUser,
    onSuccess: handleSignupLogic,
    onError: (error) => {
      console.error("Login Error:", error);
    },
  });

  // TODO: 2]  User LOGIN
  const userLogin = useMutation({
    mutationKey: ["loggedDetails"],
    mutationFn: loginUser,
    onSuccess: handleLoginLogic,
  });

  // *==================  FUNCTION RELATED TO FOLDERS =========

  // TODO: 3] Create a folder
  const createFolder = useMutation({
    mutationKey: ["FolderDetails"],
    mutationFn: createFolderFun,
    onSuccess: handlecreateFolderLogic,
  });
  // TODO: 4] Fecth all the folders by userId
  const fetchAllFolders = useMutation({
    mutationKey: ["userFolders"],
    mutationFn: getFoldersbyUserIdFun,
    onSuccess: async ({ response }) => {
      dispatch(setUserFolders(response.data));
    },
  });

  return { addUser, userLogin, createFolder, fetchAllFolders };
}

export default useAuthentication;
