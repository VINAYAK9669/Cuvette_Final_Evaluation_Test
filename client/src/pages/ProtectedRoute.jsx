/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
