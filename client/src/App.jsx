/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";

// TODO: CONFIGURE REACT QUERY
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./pages/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./pages/DashboardLayout";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout, setIsAuthenticated } from "./configuration/authSlice";
import SettingPage from "./pages/SettingPage";
import WorkSpace from "./pages/WorkSpace";
import { useEffect } from "react";
import WorkspaceTool from "./pages/WorkspaceTool";
import Theme from "./pages/Theme";
import Analytics from "./pages/Analytics";
import SharedFormPage from "./pages/SharedFormPage";
import ValidateCurToken from "./hooks/useValidateToken";

// *Create a client
const queryClient = new QueryClient();

function App() {
  // Upon Logout we have to remove "token", "userName" from local stroage
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check authentication status on component mount and update it accordingly
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const isAuth = await ValidateCurToken(token); // ValidateCurToken should be defined or imported
        dispatch(setIsAuthenticated(isAuth));
      } else {
        dispatch(setIsAuthenticated(false));
      }
    };

    checkAuthentication();
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
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
            <Route path="/share/:sharedLink" element={<SharedFormPage />} />
            {/* PROTECTED ROUTES */}
            <Route
              path="/dashboard/:userID/*"
              element={<ProtectedRoute element={DashboardLayout} />}
            >
              <Route index element={<WorkSpace />} />
              <Route
                path="workspacetool/:folderId?/flow/:formId?/"
                element={<WorkspaceTool />}
              />
              <Route
                path="workspacetool/:folderId?/theme/:formId?/"
                element={<Theme />}
              />
              <Route
                path="workspacetool/:folderId?/response/:formId?/"
                element={<Analytics />}
              />
              <Route path="settings" element={<SettingPage />} />
            </Route>
            <Route path="*" element={<p>Page Not Found</p>} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
