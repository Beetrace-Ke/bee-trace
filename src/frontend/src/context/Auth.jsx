import { useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
     
    useEffect(() => {
        const checkAuth = async () => {
            var authenticated = window.auth.isAuthenticated;
            if (!authenticated) {
                navigate('/wallet-login?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai');
                return;
            }
            
            // Check if user has selected a role
            const userRole = localStorage.getItem("userRole");
            if (!userRole) {
                navigate('/role-selection?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai');
                return;
            }
        };
             
        checkAuth();
    }, [navigate]);
           
    return (
        <AuthContext.Provider value={{  }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;