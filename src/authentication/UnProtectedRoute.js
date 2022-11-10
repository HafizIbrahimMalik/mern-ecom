import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const UnProtectedRoute = ({ children }) => {
    const { userDetails } = useAuth()
    if (!userDetails?.token) {
        // user is not authenticated
        return children;
    }
    return <Navigate to="/dashboard" />;
};