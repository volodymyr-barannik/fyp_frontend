import {Link, useLocation, useNavigate} from "react-router-dom";
import SaveIcon from "./SaveIcon.svg";
import ArrowLeftIcon from "./ArrowLeftIcon.svg";
import {useContext, useEffect, useState} from "react";
import LoginModalContext from "./LoginModalContext";
import GlobalAuthenticationContext from "./GlobalAuthenticationContext";
import {isLoggedIn} from "./Common";


function UserPanel({handleSavedPapersClicked}) {

    const { handleSavedPapersClickedState, setHandleSavedPapersClickedState } = useState(handleSavedPapersClicked);
    const { setLoginModalOpen, setIsLogin } = useContext(LoginModalContext);
    const { isLoggedInState, setIsLoggedInState } = useContext(GlobalAuthenticationContext);


    const location = useLocation();
    const navigate = useNavigate();
    console.log(`location.pathname=${location.pathname}`)
    const isOnSavedPapersPage = location.pathname === '/saved';

    useEffect(() => {
        setIsLoggedInState(isLoggedIn())
    }, [isLoggedInState]);


    const handleLogOut = async (event) => {
        event.preventDefault();

        console.log('logging out')
        localStorage.removeItem("sessionId");
        setIsLoggedInState(false);
        console.log('logged out')
    }

    function handleGoBackClicked() {
        navigate(-1);
    }


    return (
        <d className="flex-box-align-right" style={{'height': '151px', 'margin-right': '60px'}}>
            { !isLoggedInState && <button className="button-transparent" onClick={() => {setLoginModalOpen(true); setIsLogin(true); }}>Log in</button> }
            { !isLoggedInState && <button className="button-white" onClick={() => {setLoginModalOpen(true); setIsLogin(false); }}>Sign up</button> }

            { isLoggedInState && !isOnSavedPapersPage &&
                <Link to='/saved'>
                    <button className="result-item-button" onClick={handleSavedPapersClickedState}
                            style={{'background': '#D8FFDC', 'width': '220px', 'height': '50px', 'marginRight': '10px'}}>
                        <img src={SaveIcon} className="in-button-image" style={{'margin': '0 7px 0'}}></img>
                        <div>Saved papers</div>
                    </button>
                </Link>
            }

            { isLoggedInState && isOnSavedPapersPage &&
                    <button className="deactivated-saved-papers-button" onClick={handleGoBackClicked}
                            style={{'background': '#EDF2F7', 'width': '220px', 'height': '50px', 'marginRight': '10px'}}>
                        <img src={ArrowLeftIcon} className="in-button-image" style={{'margin': '0 4px 0', 'color': '#85888f'}}></img>
                        <div>Go back</div>
                    </button>
            }

            { isLoggedInState && <button className="button-transparent" onClick={handleLogOut}>Log out</button>}
        </d>
    );

}

export default UserPanel;