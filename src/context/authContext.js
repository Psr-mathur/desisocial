import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_API } from "../vars";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    console.log("auth render");
    const [currentUser, setcurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const login = async (inputs) => {
        // console.log("login page", BASE_API);
        const res = await axios.post(`${BASE_API}/auth/login`, inputs, {
            withCredentials: true,
        });
        // console.log(res.data);
        setcurrentUser(res.data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);
    return (
        <AuthContext.Provider value={{ currentUser, login, setcurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
