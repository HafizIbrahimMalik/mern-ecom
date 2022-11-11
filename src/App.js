import SignUp from "./ui/sign-up/SignUp";
import SignIn from "./ui/sign-in/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './authentication/ProtectedRoute';
import { UnProtectedRoute } from './authentication/UnProtectedRoute';
import { AuthProvider } from './authentication/AuthProvider';
import ApiInterceptor from './interceptors/ApiInterceptor';
import Dashboard from "./students/dashboard/Dashboard";
import ProductCategories from "./students/productcategories/ProductCategories";
import CreateProductCategories from "./students/Create-product-categories/CreateProductCategories"
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
                path="/product-categories"
                element={
                  <ProtectedRoute>
                    <ProductCategories />
                  </ProtectedRoute>
                }
              />
              <Route
              path="/create-product"
              element={
                <ProtectedRoute>
                  <CreateProductCategories />
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
