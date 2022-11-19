import SignUp from "./website/sign-up/SignUp";
import SignIn from "./website/sign-in/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './authentication/ProtectedRoute';
import { UnProtectedRoute } from './authentication/UnProtectedRoute';
import { AuthProvider } from './authentication/AuthProvider';
import ApiInterceptor from './interceptors/ApiInterceptor';
import AdminDashboard from "./admin/adminDashboard/AdminDashboard";
import AdminProductCategories from "./admin/adminProductCategories/AdminProductCategories";
import AdminCreateProductCategories from "./admin/adminProductCategories/AdminCreateProductCategories";
import AdminCreateProduct from "./admin/adminProduct/AdminCreateProduct";
import AdminProduct from "./admin/adminProduct/AdminProduct";
import UserDashboard from "./website/user-dasboard/UserDashboard";
import UserNavbar from "./website/userNavbar/UserNavbar";
import { AdminProtectedRoute } from "./authentication/AdminProtectedRoute";
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
              <Route path='buyer/dashboard' element={
                  <UserDashboard />
              } />
              <Route path='user/navbar' element={
                <ProtectedRoute>
                  <UserNavbar />
                </ProtectedRoute>
              } />
              <Route
                path="admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/product-categories"
                element={
                  <AdminProtectedRoute>
                    <AdminProductCategories />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/create-productCategories"
                element={
                  <AdminProtectedRoute>
                    <AdminCreateProductCategories />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/create-product"
                element={
                  <AdminProtectedRoute>
                    <AdminCreateProduct />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/product"
                element={
                  <AdminProtectedRoute>
                    <AdminProduct />
                  </AdminProtectedRoute>
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
