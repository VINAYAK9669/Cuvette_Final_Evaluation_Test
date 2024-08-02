/* eslint-disable no-unused-vars */
const BASE_URL = String(import.meta.env.VITE_API_BASE_URL);
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  registerUserURL,
  loginUserURL,
  createFolderURL,
  getFolderByUserIdURL,
  getFolderbyIdURL,
  deleteFolderByIdURL,
  deleteFormByIdURL,
  getFormWithoutFolderIdURL,
  getFormsByUserIdURL,
} from "../data/apiURL";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// * This Custom hook which involve the Logic to send the request to the server and return the response
function useApiFun() {
  const { formId, userID } = useParams();

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

  // TODO: GET all the folders created by user
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

  // TODO: GET the single folder details
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

  // TODO: DELETE the folder by ID
  const deleteFolderByIdFun = async (folderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${deleteFolderByIdURL}/${folderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { response };
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  };

  //TODO: Delete form by Id
  const deleteFromByIdFun = async (formId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${deleteFormByIdURL}/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  };

  // TODO: FETCH forms
  const getFormWithFolderIdFun = async ({ folderId, userId }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${getFormsByUserIdURL}/${userId}/${folderId ? folderId : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching forms:", error);
      return error;
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

  // TODO: Create a form with or without folderId
  const createFormFun = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}formapi/createform`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating form:", error);
      throw error;
    }
  };

  // TODO: Update a form by formId function
  const updateFormByIdFun = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}formapi/form/update/${formId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Error updating form:", error);
      throw error;
    }
  };

  // TODO: Get the form details
  const getFormDetailsById = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}formapi/form/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching form details:", error);
      throw error;
    }
  };

  //* Add new user link to the UserDetails
  const addLinkDeatilsFun = async (sharedLinkData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}response/add-new-sharedLink`,
        sharedLinkData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching form details:", error);
      throw error;
    }
  };

  // TODO: Get all the information of the shared Link
  const getSharedLinkUserDetailsFun = async () => {
    const sharedLink = window.location.href;

    try {
      const response = await axios.get(
        `${BASE_URL}response/get-shared-link-details/`,
        {
          params: { sharedLink },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching form details:", error);
      throw error;
    }
  };

  const addUserInputsToSharedLinkFun = async ({
    sharedLink,
    randomId,
    formInput,
  }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}response/add-new-user-form-details`,
        {
          sharedLink: sharedLink,
          randomId: randomId,
          formInput: formInput,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error adding user form details:", error);
      throw error;
    }
  };

  // TODO:Add a new user to the sharedLink
  const addNewUserToLinkDeatilsFun = async (sharedLinkData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}response/add-new-user-to-shared-link/`,
        sharedLinkData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching form details:", error);
      throw error;
    }
  };

  // TODO: add theme
  const addThemeToformFun = async (theme) => {
    try {
      console.log(theme);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}formapi/${formId}/theme`,
        theme,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Error updating form:", error);
      throw error;
    }
  };

  // TODO: Update a form by formId function
  const updateUserDeatilsFun = async ({
    oldPassword = "",
    newPassword = "",
    name = "",
    email = "",
  }) => {
    console.log(oldPassword, newPassword, name, email);
    const userId = userID;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}user/update/${userId}`,
        { oldPassword, newPassword, name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Error updating form:", error);
      throw error;
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
    deleteFromByIdFun,
    getFormWithFolderIdFun,
    createFormFun,
    updateFormByIdFun,
    getFormDetailsById,
    addLinkDeatilsFun,
    getSharedLinkUserDetailsFun,
    addUserInputsToSharedLinkFun,
    addNewUserToLinkDeatilsFun,
    addThemeToformFun,
    updateUserDeatilsFun,
  };
}

export default useApiFun;
