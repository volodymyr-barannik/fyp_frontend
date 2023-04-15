import React, {useContext, useState} from 'react';
import './LoginModal.css';
import {Link} from "react-router-dom";
import LoginModalContext from "./LoginModalContext";
import axios from "axios";
import GlobalAuthenticationContext from "./GlobalAuthenticationContext";


function LoginModal({ isOpen, onClose, isLogin, setIsLogin }) {

    const [errorMessage, setErrorMessage] = useState("");
    const { isLoggedInState, setIsLoggedInState } = useContext(GlobalAuthenticationContext);

    // Login (login) or register (false)

    if (!isOpen) {
        return null;
    }

    function handleClose() {
        setErrorMessage(null);

        onClose();
    }

    const showLoginModal = () => {
        setErrorMessage(null);

        setIsLogin(true);
    };

    const showRegisterModal = () => {
        setErrorMessage(null);

        setIsLogin(false);
    };

    function verifyPassword(password) {
        if (password.length < 6) {
            setErrorMessage("Password must be at least 8 characters long");
            return false;
        }

        return true;
    }


    if (isLogin)
    {
        const handleLogin = async (event) => {
            event.preventDefault();
            console.log('sending login request')

            const usernameValue = document.getElementById('usernameInput').value;
            const passwordValue = document.getElementById('passwordInput').value;

            // TODO: add input verification

            // Send a POST request to the server
            await axios.post('http://localhost:8080/login',{
                username: usernameValue,
                password: passwordValue,
            })
                .then((res) => {
                    console.log(`token=${res.data.token}`)
                    localStorage.setItem("sessionId", res.data.token);
                    setErrorMessage('Welcome back!');

                    setIsLoggedInState(true);
                    //window.location.reload();

                    return res;
                })
                .catch((error) => {
                    console.error(error);
                    setErrorMessage(error.response.data);

                    setIsLoggedInState(false);

                    return error;
                });
        }

        const renderLogin = () => {
            return (
                <div className="modal-backdrop" onClick={handleClose}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2 style={{'font-size': '40px', 'margin': '0px'}}>Log In</h2>
                        <div className="flex-box-align-left" style={{'gap': '2px', 'width': 'auto', 'margin-top': '15px'}}>
                            <div className="Input-login-subtitle">Don’t have an account?</div>
                            <button className="Input-button-subtitle-try-register" onClick={showRegisterModal}>Sign up</button>
                        </div>
                        <form style={{'margin-top': '30px'}}>
                            <div>Username</div>
                            <input className="Input-login-with-border" type="text" placeholder="Username" id='usernameInput'/>

                            <div style={{'margin-top': '30px'}}>Password</div>
                            <input className="Input-login-with-border" type="password" placeholder="Password" id='passwordInput'/>

                            {errorMessage && <div id='requestResultTextBox' style={{'margin': '5px 0px 0px 0px'}}>{errorMessage}</div>}
                            <div></div>
                            <div className="center-contents" style={{'margin-top': '30px'}}>
                                <button className="Input-button-login-with-border" type="submit" onClick={handleLogin}>Log In</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

        return (
        <div>
            {renderLogin()}
        </div>
        );
    }
    else
    {
        const handleRegistration = async (event) => {
            event.preventDefault();
            console.log('sending register request')

            const emailValue = document.getElementById('emailInput').value;
            const usernameValue = document.getElementById('usernameInput').value;
            const passwordValue = document.getElementById('passwordInput').value;

            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) {
                setErrorMessage("Please enter a valid email address.");
                console.log("Please enter a valid email address. You have entered: " + emailValue);
            }
            else if (verifyPassword(passwordValue) === true) {
                setErrorMessage("");
            }

            console.log('username: ' + usernameValue + ', email: ' + emailValue + ', password: ' + passwordValue);

            // Send a POST request to the server
            const result = await axios.post('http://localhost:8080/register',{
                username: usernameValue,
                email: emailValue,
                password: passwordValue
            })
                .then((res) => res)
                .catch((error) => { console.error(error); setErrorMessage(error.response.data); return error; });

            console.log(result.status);

            if (result.status === 201)
            {
                setErrorMessage('Registered successfully.');
                console.log('Registered successfully.');
            }
            else if (result.status === 400)
            {
                setErrorMessage('Registration failed.');
                console.log('Registration failed.');
            }
        }


        const renderRegister = () => {
            return (
                <div className="modal-backdrop" onClick={handleClose}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}
                         style={{'height': '600px'}}>
                        <h2 style={{'font-size': '40px', 'margin': '0px'}}>Sign Up</h2>
                        <div className="flex-box-align-left" style={{'gap': '2px', 'width': 'auto', 'margin-top': '15px'}}>
                            <div className="Input-login-subtitle">Already have an account?</div>
                            <button className="Input-button-subtitle-try-register" onClick={showLoginModal}>Sign in</button>
                        </div>
                        <form style={{'margin-top': '30px'}}>
                            <div>Username</div>
                            <input className="Input-login-with-border" type="text" placeholder="Username" id='usernameInput'/>

                            <div style={{'margin-top': '30px'}}>Mail</div>
                            <input className="Input-login-with-border" type="text" placeholder="Mail" id='emailInput'/>

                            <div style={{'margin-top': '30px'}}>Password</div>
                            <input className="Input-login-with-border" type="password" placeholder="Password" id='passwordInput'/>

                            {errorMessage && <div id='requestResultTextBox'>{errorMessage}</div>}
                            <div></div>
                            <div className="center-contents" style={{'margin-top': '30px'}}>
                                <button className="Input-button-login-with-border" type="submit" onClick={handleRegistration}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {renderRegister()}
            </div>
        );
    }
}

export default LoginModal;