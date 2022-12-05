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
import LandingPage from "./website/landingPage/LandingPage";
import UserNavbar from "./website/userNavbar/UserNavbar";
import { AdminProtectedRoute } from "./authentication/AdminProtectedRoute";
import { AdminLandingPage } from "./admin/adminLayouts/AdminLandingPage";
import UserProductDetails from "./website/userProductDetails/UserProductDetails";
import AdminUser from "./admin/adminUser/AdminUser";
import AdminCreateUser from "./admin/adminUser/AdminCreateUser";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <ApiInterceptor>
            <Routes>
              <Route path='sign-up' element={
                <UnProtectedRoute>
                  <SignUp />
                </UnProtectedRoute>
              } />
              <Route path='sign-in' element={
                <UnProtectedRoute>
                  <SignIn />
                </UnProtectedRoute>
              } />
              <Route path='/' element={
                <LandingPage />
              } />
              <Route path='product-details/:id' element={
                <UserProductDetails />
              } />
              <Route path='user/navbar' element={
                <ProtectedRoute>
                  <UserNavbar />
                </ProtectedRoute>
              } />
              <Route
                path="admin"
                element={
                  <AdminProtectedRoute>
                    <AdminLandingPage />
                  </AdminProtectedRoute>
                }
              >
                <Route
                  path="dashboard"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="product-categories"
                  element={
                    <AdminProtectedRoute>
                      <AdminProductCategories />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="create-productCategories"
                  element={
                    <AdminProtectedRoute>
                      <AdminCreateProductCategories />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="create-product"
                  element={
                    <AdminProtectedRoute>
                      <AdminCreateProduct />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="product"
                  element={
                    <AdminProtectedRoute>
                      <AdminProduct />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <AdminProtectedRoute>
                      <AdminUser />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="create-user"
                  element={
                    <AdminProtectedRoute>
                      <AdminCreateUser />
                    </AdminProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </ApiInterceptor>
        </AuthProvider>
      </Router>

    </>

  );
}
export default App;
