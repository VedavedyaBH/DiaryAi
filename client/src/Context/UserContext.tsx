import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: any) {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("userId") || "");
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const _login = async ({ token }: any) => {
        try {
            const _user = await axios({
                method: "get",
                url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/users/auth`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!user) {
                console.log("Nothing received back");
            }

            setUser(_user.data);
            setToken(token);
            localStorage.setItem("userId", _user.data.id);
            localStorage.setItem("token", token);
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                console.log("creds problem");
            }
            if (error.response && error.response.status === 400) {
                console.log("input problem");
            }
        }
    };

    const _logout = () => {
        setUser("");
        setToken("");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        const logoutTimer = setTimeout(() => {
            _logout();
        }, 10 * 60 * 60 * 1000);

        return () => clearTimeout(logoutTimer);
    }, []);

    const contextValue = {
        user,
        token,
        _login,
        _logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};
