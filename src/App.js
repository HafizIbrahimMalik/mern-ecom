import SignUp from "./ui/sign-up/SignUp";
import SignIn from "./ui/sign-in/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './authentication/ProtectedRoute';
import { UnProtectedRoute } from './authentication/UnProtectedRoute';
import { AuthProvider } from './authentication/AuthProvider';
import ApiInterceptor from './interceptors/ApiInterceptor';
import Dashboard from "./students/dashboard/Dashboard";
import Posts from "./students/posts/Posts";
import CreatePost from "./students/create-post/CreatePost";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <ApiInterceptor>
            <Routes>
              <Route path='sign-up' element={<SignUp />} />
              <Route path='sign-in' element={
                <UnProtectedRoute>
                  <SignIn />
                </UnProtectedRoute>
              } />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts"
                element={
                  <ProtectedRoute>
                    <Posts />
                  </ProtectedRoute>
                }
              />
              <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
             </Routes>
          </ApiInterceptor>
        </AuthProvider>
      </Router>

    </>

  );
}
export default App;
