/* eslint-disable no-unused-vars */
import axios from "axios";

// import { loginUser, registerUser } from "../data/useApiUrl";
import { jwtDecode } from "jwt-decode";
import { loginUserURL, registerUserURL } from "../data/apiURL";

function useApiFun() {
  // TODO: User Register Function
  const addNewUser = async (newUser) => {
    try {
      const response = await axios.post(registerUserURL, newUser);
      console.log(response);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };
  // TODO: User LOGIN Function
  const loginUser = async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post(loginUserURL, userData);
      return response.data;
    } catch (error) {
      console.log("error block");
      console.log(error);
    }
  };

  // -------------------------------------------------------
  // TODO: Validate the TOKEN
  const ValidateCurToken = async (token) => {
    // * Token Validated based on "exp"
    if (!token) {
      return false;
    }
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem(token);
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem(token);
      return false;
    }
  };

  return { addNewUser, loginUser, ValidateCurToken };
}

export default useApiFun;
