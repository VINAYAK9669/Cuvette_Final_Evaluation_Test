import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useApiFun from "./useApiFun";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setLoginUser } from "./authSlice";

function useAuthentication() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  // TODO:Redux Disptach Function
  const dispatch = useDispatch();

  // Destructure all the functions related to API
  const { addNewUser, loginUser, ValidateCurToken } = useApiFun();

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
    onSuccess: async (data) => {
      console.log(data);
      try {
        // 1] store the token to the localStorage
        localStorage.setItem("token", data.token);
        const tokenValidation = await ValidateCurToken(data.token);
        if (tokenValidation) {
          navigate("/dashboard");
          dispatch(setIsAuthenticated(true));
          dispatch(setLoginUser(true));
        }
        queryClient.invalidateQueries("loggedDetails");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { addUser, userLogin };
}

export default useAuthentication;
