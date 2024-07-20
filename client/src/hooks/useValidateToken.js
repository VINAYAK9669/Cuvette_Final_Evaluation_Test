import { jwtDecode } from "jwt-decode";

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
export default ValidateCurToken;
