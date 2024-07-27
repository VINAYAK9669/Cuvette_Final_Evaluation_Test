const BASE_URL = "http://localhost:3000/";

// TODO:URL's Related to User Authentication and Registration
const registerUserURL = `${BASE_URL}user/register`;
const loginUserURL = `${BASE_URL}user/login`;

// TODO: URL's related to Folders
const createFolderURL = `${BASE_URL}api/folders`;
const getFolderByUserIdURL = `${BASE_URL}api/folders/by-user?userId=`;
const getFolderbyIdURL = `${BASE_URL}api/folders/:id`;
const deleteFolderByIdURL = `${BASE_URL}api/folders`;
const createSubFoldersURL = `${BASE_URL}folders/subfolder`;

export {
  registerUserURL,
  loginUserURL,
  createFolderURL,
  getFolderByUserIdURL,
  getFolderbyIdURL,
  deleteFolderByIdURL,
  createSubFoldersURL,
};
