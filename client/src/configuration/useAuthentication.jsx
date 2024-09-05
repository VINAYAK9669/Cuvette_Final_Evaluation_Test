/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
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
import toast from "react-hot-toast";
import { onCloseModal } from "../pages/modalSlice";
import { useEffect } from "react";

function useAuthentication() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { userID, sharedLink } = useParams();
  const navigate = useNavigate();
  const { currentUser, selectedFolder } = useSelector((state) => state.auth);

  //* Destructure all the functions related to API
  const {
    addNewUser,
    loginUser,
    createFolderFun,
    getFoldersbyUserIdFun,
    deleteFolderByIdFun,
    deleteFromByIdFun,
    getFormWithFolderIdFun,
    createFormFun,
    updateFormByIdFun,
    getFormDetailsById,
    addLinkDeatilsFun,
    getSharedLinkUserDetailsFun,
    addNewUserToLinkDeatilsFun,
    addUserInputsToSharedLinkFun,
    addThemeToformFun,
    updateUserDeatilsFun,
  } = useApiFun();

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
      //* Invalidate and refetch
      queryClient.invalidateQueries("newUserDetails");
    } catch (error) {
      console.error("Initialization Error:", error);
    }
  };
  // * Handle signIn once we get response from server
  const handleLoginLogic = async (data) => {
    const { response } = data;
    console.log(response);
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
        toast.success("New Folder is Created!");
        dispatch(onCloseModal());
        fetchAllFolders.mutate(userID);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      throw new error();
    }
  };

  // *Handle Form in folder by selectedFolder

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
      console.log("");
      dispatch(setUserFolders(response.data));
    },
  });
  // TODO: Delete folders based on ID

  const deleteFolderById = useMutation({
    mutationKey: ["deleteFolders"],
    mutationFn: deleteFolderByIdFun,
    onSuccess: async (data) => {
      if (data.response.status === 200) {
        fetchAllFolders.mutate(userID);
        dispatch(onCloseModal());
        toast.success("Folder Deleted");
      } else {
        toast.error("Something Went Wrong");
      }
    },
  });

  // TODO: Fetch all the form with folderId
  const formsWithUserId = useQuery({
    queryKey: ["Forms"],
    queryFn: async () => {
      return getFormWithFolderIdFun({
        userId: userID,
        folderId: selectedFolder,
      });
    },
    enabled: !!localStorage.getItem("token"),
  });

  useEffect(() => {
    formsWithUserId.refetch();
  }, [selectedFolder || formsWithUserId.isSuccess]);

  // TODO: delete a form with formId
  const deleteFormById = useMutation({
    mutationKey: ["deleteFolders"],
    mutationFn: deleteFromByIdFun,
    onSuccess: async (data) => {
      toast.success("Form Deleted Successfully");
      formsWithUserId.refetch();
    },
  });

  // TODO: Create a form with or without forlderId
  const createForm = useMutation({
    mutationKey: ["createForm"],
    mutationFn: createFormFun,
    onSuccess: (data) => {
      if (data.status === 201) {
        navigate(
          `/dashboard/${userID}/workspacetool/${
            selectedFolder ? selectedFolder + "/" : ""
          }flow/${data?.data._id}`
        );
        toast.success("Draft Form has been created");
      } else {
        toast.error("Unable to create a Form");
      }

      queryClient.invalidateQueries("forms");
    },
    onError: (error) => {
      toast.error("Failed to create form");
      console.error(error);
    },
  });

  // TODO:Update a Form Id

  const updateForm = useMutation({
    mutationKey: ["updateForm"],
    mutationFn: updateFormByIdFun,
    onSuccess: (data) => {
      if (data.status === 200) {
        navigate(
          `/dashboard/${userID}/workspacetool/${
            selectedFolder ? selectedFolder + "/" : ""
          }flow/${data?.data._id}`
        );
        toast.success("Form is updated");
      } else {
        toast.error("Unable to update a Form");
      }

      queryClient.invalidateQueries("forms");
    },
    onError: (error) => {
      if (error.response.status === 413) {
        toast.error("payload is too large");
      }
      console.log(error.response);
    },
  });

  // TODO: Fetch all the form with folderId
  const getFormDetails = useQuery({
    queryKey: ["formsDetails"],
    queryFn: getFormDetailsById,
    enabled: !!localStorage.getItem("token"),
  });

  // TODO: Add Details to the New created link
  const addDetailsToNewLink = useMutation({
    mutationKey: ["updateForm"],
    mutationFn: addLinkDeatilsFun,
    onSuccess: (data) => {
      queryClient.invalidateQueries("forms");
    },
    onError: (error) => {
      throw error("Failed to create form");
    },
  });

  // TODO: Fetch all the details of the sharedLink
  const getSharedLinkUserDetails = useQuery({
    queryKey: ["LinkDetails"],
    queryFn: getSharedLinkUserDetailsFun,
    staleTime: 600000,
  });

  // TODO: Add userInputs to the sharedLinks
  const addUserInputsToSharedLink = useMutation({
    mutationKey: ["formDeatils"],
    mutationFn: addUserInputsToSharedLinkFun,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("forms");
    },
    onError: (error) => {
      throw error("Failed to create form");
    },
  });

  // TODO:Create a New user in SharedLink
  const addNewuserToSharedlink = useMutation({
    mutationKey: ["newuserLinks"],
    mutationFn: addNewUserToLinkDeatilsFun,
    onSuccess: (data) => {
      queryClient.invalidateQueries("forms");
    },
    onError: (error) => {
      throw error("Failed to create form");
    },
  });

  // TODO:Create a New user in SharedLink
  const addThemeToform = useMutation({
    mutationKey: ["newTheme"],
    mutationFn: addThemeToformFun,
    onSuccess: (data) => {
      toast.success("theme Added");
      queryClient.invalidateQueries("forms");
    },
    onError: (error) => {
      toast.error("something went wrong");
      throw error("Failed to create form");
    },
  });
  // TODO: Update user credentials or personal datas
  const updateUserDetails = useMutation({
    mutationKey: ["newUserDetails"],
    mutationFn: updateUserDeatilsFun,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        toast.success("Details Updated");
      } else {
        toast.error("something went wrong");
      }
      queryClient.invalidateQueries("forms");
    },
    onError: (error) => {
      toast.error("something went wrong");

      throw error("Failed to create form");
    },
  });

  return {
    addUser,
    userLogin,
    createFolder,
    fetchAllFolders,
    deleteFolderById,
    deleteFormById,
    formsWithUserId,
    createForm,
    updateForm,
    getFormDetails,
    addDetailsToNewLink,
    getSharedLinkUserDetails,
    addUserInputsToSharedLink,
    addNewuserToSharedlink,
    addThemeToform,
    updateUserDetails,
  };
}

export default useAuthentication;
