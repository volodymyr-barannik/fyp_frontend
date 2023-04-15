import { createContext } from "react";

const LoginModalContext = createContext({
    loginModalOpen: false,
    setLoginModalOpen: () => {},
    isLogin: true,
    setIsLogin: () => {},
});

export default LoginModalContext;