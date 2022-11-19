import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = (data) => {
        setUserDetails(data);
        localStorage.setItem('userDetails', JSON.stringify(data))
        if (data.email == 'admin@mail.com') {
            navigate("/admin/dashboard");
        } else if (data.seller) {
            navigate("/seller/dashboard");
        } else if (data.buyer) {
            navigate("/buyer/dashboard");
        } else {
            navigate("/");
        }
};

// call this function to sign out logged in user
const logout = () => {
    setUserDetails(null);
    localStorage.removeItem('userDetails')
    navigate("/sign-in", { replace: true });
};
const value = useMemo(
    () => ({
        userDetails,
        login,
        logout
    }),// eslint-disable-next-line react-hooks/exhaustive-deps
    [userDetails]
);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};