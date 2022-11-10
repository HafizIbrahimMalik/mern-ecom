import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export const ProtectedRoute = ({ children }) => {
    const { userDetails } = useAuth()
    if (!userDetails?.token) {
        // user is not authenticated
        return <Navigate to="/sign-in" />;
    }
    return children;
};