/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import useApiFun from "./useApiFun";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormErrorMessage,
  setIsAuthenticated,
  setLoginUser,
} from "./authSlice";
import { useQueryClient } from "@tanstack/react-query";
import useAuthentication from "./useAuthentication";

function useHandleServerLogic() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //TODO: Destructure all the functions related to API Function
  const { addNewUser, loginUser, ValidateCurToken } = useApiFun();

  // TODO:Redux Disptach Function
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  //   TODO:  ------------ FUNCTION LOGICS ------------
  // * Handle SignIn Logic after server provides a response
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
  //  * Handle Signup Logic when server provide a response
  const handleSignupLogic = async (status) => {
    try {
      if (status === 201) {
        userLogin.mutate({
          email: currentUser.email,
          password: currentUser.password,
        });
      } else if (status === 400) {
        setFormErrorMessage("User already Exists");
      }
      // Invalidate and refetch
      queryClient.invalidateQueries("newUserDetails");
    } catch (error) {
      console.error("Initialization Error:", error);
    }
  };
  return { handleLoginLogic };
}

export default useHandleServerLogic;
