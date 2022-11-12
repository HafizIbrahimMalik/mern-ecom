import SignUp from "./website/sign-up/SignUp";
import SignIn from "./website/sign-in/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './authentication/ProtectedRoute';
import { UnProtectedRoute } from './authentication/UnProtectedRoute';
import { AuthProvider } from './authentication/AuthProvider';
import ApiInterceptor from './interceptors/ApiInterceptor';
import Dashboard from "./admin/dashboard/Dashboard";
import ProductCategories from "./admin/productcategories/ProductCategories";
import CreateProductCategories from "./admin/Create-product-categories/CreateProductCategories"
import CreateProduct from "./admin/create-product/CreateProduct";
import Product from "./admin/product/Product";
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
              path="/create-productCategories"
              element={
                <ProtectedRoute>
                  <CreateProductCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-product"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product"
              element={
                <ProtectedRoute>
                  <Product />
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
