// src/App.js
import React, {useContext, useState} from 'react';
import LoginModal from "./Auth/LoginModal";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import LoginModalContext from "./Auth/LoginModalContext";
import GlobalAuthenticationContextProvider from "./Auth/GlobalAuthenticationContextProvider";
import SavedPapersPage from "./Pages/SavedPapersPage";
import GlobalAuthenticationContext from "./Auth/GlobalAuthenticationContext";


function AppRoutes() {
    const { isLoggedInState } = useContext(GlobalAuthenticationContext);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/"         element = {<HomePage/>}/>
                    <Route path="/search"   element = {<SearchResultsPage/>}/>
                    <Route path="/saved"    element = {isLoggedInState ? (<SavedPapersPage/>) : (<Navigate to="/"/>)}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


function App() {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    return (
        <GlobalAuthenticationContextProvider>
            <LoginModal isOpen={loginModalOpen}
                        onClose={() => setLoginModalOpen(false)}
                        isLogin={isLogin}
                        setIsLogin={setIsLogin} />

            <LoginModalContext.Provider value={{ loginModalOpen, setLoginModalOpen, isLogin, setIsLogin }}>
                <AppRoutes/>
            </LoginModalContext.Provider>
        </GlobalAuthenticationContextProvider>
    );
}

export default App;
