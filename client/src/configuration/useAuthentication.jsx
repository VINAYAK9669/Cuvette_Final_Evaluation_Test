/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useApiFun from "./useApiFun";
import { useDispatch, useSelector } from "react-redux";

import {
  setFormErrorMessage,
  setIsAuthenticated,
  setLoginUser,
} from "./authSlice";
import useValidateToken from "../hooks/useValidateToken";

function useAuthentication() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  // Destructure all the functions related to API
  const { addNewUser, loginUser } = useApiFun();
  const { ValidateCurToken } = useValidateToken();

  // TODO:  ================== Functions Logic ===================
  // * Handle signup once we get response from server
  const handleSignupLogic = async (data) => {
    const { response } = data;
    console.log(currentUser);
    console.log(response.status);
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
        const tokenValidation = await ValidateCurToken(response.data.token);
        if (tokenValidation) {
          navigate("/dashboard");
          dispatch(setIsAuthenticated(true));
          dispatch(setLoginUser(true));
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

  return { addUser, userLogin };
}

export default useAuthentication;
