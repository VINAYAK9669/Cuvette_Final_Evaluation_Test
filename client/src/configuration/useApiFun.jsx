/* eslint-disable no-unused-vars */
import axios from "axios";

// import { loginUser, registerUser } from "../data/useApiUrl";
import { jwtDecode } from "jwt-decode";
import {
  registerUserURL,
  loginUserURL,
  createFolderURL,
  getFolderByUserIdURL,
  getFolderbyIdURL,
  deleteFolderByIdURL,
  createSubFoldersURL,
} from "../data/apiURL";

// * This Custom hook which involve the Logic to send the request to the server and return the response
function useApiFun() {
  // TODO: ========= User Register Function
  const addNewUser = async (newUser) => {
    try {
      const response = await axios.post(registerUserURL, newUser);
      return { response };
    } catch (error) {
      return error;
    }
  };
  // TODO: ========= User LOGIN Function
  const loginUser = async (userData) => {
    try {
      const response = await axios.post(loginUserURL, userData);
      return { response };
    } catch (error) {
      return error;
    }
  };
  // TODO: ========= Create a Folder api function
  // *Create a folder with or without name
  const createFolderFun = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(createFolderURL, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { response };
    } catch (error) {
      return { error: error.response ? error.response.data : error.message };
    }
  };

  // *Create a subfolders [Will build this later]

  // *GET all the folders created by user
  const getFoldersbyUserIdFun = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${getFolderByUserIdURL}${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { response };
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  };

  // *GET the single folder details
  const getFoldersbyIdFun = async ({ folderId: id }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${getFolderbyIdURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { response };
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  };

  // *DELETE the folder by ID
  const deleteFolderByIdFun = async ({ folderId: id }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${deleteFolderByIdURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { response };
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  };

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

  return {
    addNewUser,
    loginUser,
    ValidateCurToken,
    createFolderFun,
    getFoldersbyUserIdFun,
    getFoldersbyIdFun,
    deleteFolderByIdFun,
  };
}

export default useApiFun;
