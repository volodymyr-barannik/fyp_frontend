import {createContext, useState} from "react";

const GlobalAuthenticationContext = createContext({
    isLoggedInState: false,
    setIsLoggedInState: () => {},
});

export default GlobalAuthenticationContext;
