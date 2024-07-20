/* eslint-disable react-hooks/exhaustive-deps */
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";

// TODO: CONFIGURE REACT QUERY
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./pages/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "./configuration/authSlice";

// *Create a client
const queryClient = new QueryClient();

function App() {
  // Upon Logout we have to remove "token", "userName" from local stroage
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout);
    }
  }, [isAuthenticated]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<HomePage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/signin" element={<SignInPage />}></Route>
            <Route
              path="/dashboard/:userID"
              element={<ProtectedRoute element={Dashboard} />}
            ></Route>
            <Route path="*" element={<p>Page Not Found</p>} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
