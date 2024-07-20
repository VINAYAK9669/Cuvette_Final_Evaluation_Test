import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";

// TODO: CONFIGURE REACT QUERY
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./pages/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";

// *Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<HomePage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/signin" element={<SignInPage />}></Route>
            <Route
              path="/dashboard"
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
