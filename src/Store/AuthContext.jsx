import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const loginHandler = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    useEffect(() => {
        const logoutTimer = setTimeout(() => {
            logoutHandler();
        }, 5 * 60 * 1000); // 5 minutes in milliseconds 5 * 60 * 1000

        return () => {
            clearTimeout(logoutTimer);
        };
    }, [token]); // Reset the timer whenever the token changes

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;