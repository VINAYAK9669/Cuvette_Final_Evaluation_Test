/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useApiFun from "./useApiFun";
import { useDispatch, useSelector } from "react-redux";
import useHandleServerLogic from "./useHandleServerLogic";

function useAuthentication() {
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state) => state.auth);

  // Destructure all the functions related to API
  const { addNewUser, loginUser } = useApiFun();
  const { handleLoginLogic } = useHandleServerLogic();

  // TODO: 1] User REGISTERATION
  const addUser = useMutation({
    mutationKey: ["newUserDetails"],
    mutationFn: addNewUser,
    onSuccess: async (status) => {
      console.log(status);
      try {
        if (status === 201)
          userLogin.mutate({
            email: currentUser.email,
            password: currentUser.password,
          });
        // Invalidate and refetch
        queryClient.invalidateQueries("newUserDetails");
      } catch (error) {
        console.error("Initialization Error:", error);
      }
    },
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
