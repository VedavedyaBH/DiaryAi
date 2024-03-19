import { createContext, useContext } from "react";

import { useState } from "react";
import axios from "axios";

const AuthContext = createContext<any>(undefined);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState(localStorage.getItem("userId") || "");
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const _login = async ({ token }: any) => {
        try {
            const _user = await axios({
                method: "get",
                url: "http://localhost:8080/api/v1/users/auth",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(_user);

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
                console.log(error.response);
                console.log("input problem");
            }
        }
    };

    const _logout = () => {
        setUser("");
        setToken("");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        // navigate("/");
        window.location.reload();
    };

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
