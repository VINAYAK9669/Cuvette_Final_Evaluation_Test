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
import { logout } from "./configuration/authSlice";
import SettingPage from "./pages/SettingPage";
import WorkSpace from "./pages/WorkSpace";
import { useEffect } from "react";
import WorkspaceTool from "./pages/WorkspaceTool";
import NavWorkSpaceTool from "./components/Workspace/NavWorkSpaceTool";
import Theme from "./pages/Theme";
import Analytics from "./pages/Analytics";

// *Create a client
const queryClient = new QueryClient();

function App() {
  // Upon Logout we have to remove "token", "userName" from local stroage
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

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
            <Route
              path="/dashboard/:userID/*"
              element={<ProtectedRoute element={DashboardLayout} />}
            >
              <Route index element={<WorkSpace />} />
              <Route
                path="workspacetool/:folderId?/flow"
                element={<WorkspaceTool />}
              />
              <Route
                path="workspacetool/:folderId?/theme"
                element={<Theme />}
              />

              <Route
                path="workspacetool/:folderId?/response"
                element={<Analytics />}
              />
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
