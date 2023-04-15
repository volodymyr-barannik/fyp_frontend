import {useState} from "react";
import GlobalAuthenticationContext from "./GlobalAuthenticationContext";

const GlobalAuthenticationContextProvider = ({ children }) => {
    const [isLoggedInState, setIsLoggedInState] = useState('GlobalAuthenticationContext');

    return (
        <GlobalAuthenticationContext.Provider value={{ isLoggedInState, setIsLoggedInState }}>
            {children}
        </GlobalAuthenticationContext.Provider>
    );
};

export default GlobalAuthenticationContextProvider;