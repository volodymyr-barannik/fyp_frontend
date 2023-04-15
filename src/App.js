// src/App.js
import React, { useState } from 'react';
import LoginModal from "./LoginModal";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./HomePage";
import SearchResultsPage from "./SearchResultsPage";
import LoginModalContext from "./LoginModalContext";
import GlobalAuthenticationContextProvider from "./GlobalAuthenticationContextProvider";
import SavedPapersPage from "./SavedPapersPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },

    {
        path: '/search',
        element: <SearchResultsPage />
    },

    {
        path: '/saved',
        element: <SavedPapersPage />
    }
]);


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
                <RouterProvider router={router} />
            </LoginModalContext.Provider>
        </GlobalAuthenticationContextProvider>
    );
}

export default App;
