import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export const AdminProtectedRoute = ({ children }) => {
    const { userDetails,logout } = useAuth()
    if (userDetails?.token && userDetails?.email == 'admin@mail.com') {
        // user is not authenticated
        return children;
    }
    logout()
    // return <Navigate to="/sign-in" />;

};