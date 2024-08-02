const BASE_URL = String(import.meta.env.VITE_API_BASE_URL);

// TODO:URL's Related to User Authentication and Registration
const registerUserURL = `${BASE_URL}user/register`;
const loginUserURL = `${BASE_URL}user/login`;

// TODO: URL's related to Folders
// *Create a folder
const createFolderURL = `${BASE_URL}api/folders`;
// * get all the folders by UserId
const getFolderByUserIdURL = `${BASE_URL}api/folders/user/`;
const getFolderbyIdURL = `${BASE_URL}api/folders/:id`;
const deleteFolderByIdURL = `${BASE_URL}api/folders`;
const createSubFoldersURL = `${BASE_URL}folders/subfolder`;

// *Get the form without folderId
const getFormWithoutFolderIdURL = `${BASE_URL}formapi/form/withoutfolderId`;
// *Delete the form by its Id
const deleteFormByIdURL = `${BASE_URL}formapi/form/delete`;
// *Get the forms by userId, also can fetch the with folders
const getFormsByUserIdURL = `${BASE_URL}formapi/folder/forms`;

export {
  registerUserURL,
  loginUserURL,
  createFolderURL,
  getFolderByUserIdURL,
  getFolderbyIdURL,
  deleteFolderByIdURL,
  createSubFoldersURL,
  getFormWithoutFolderIdURL,
  deleteFormByIdURL,
  getFormsByUserIdURL,
};
