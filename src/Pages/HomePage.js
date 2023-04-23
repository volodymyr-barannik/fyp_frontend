import backgroundLine from '../Resources/BackgroundLine.svg';
import SearchIcon from '../Resources/SearchIcon.svg';
import BackgroundFigures from '../Resources/BackgroundFigures.svg';
import './HomePage.css';
import "../Core.css";
import FindYourPaperLogo from "../Resources/FYP.svg";
import { Link, useNavigate } from 'react-router-dom';
import {useContext, useEffect} from "react";
import LoginModalContext from "../Auth/LoginModalContext";
import {sendSearchRequest} from "../Common";
import UserPanel from "../UserPanel";

function HomePage() {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Homepage`;
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault()

        const searchPrompt = document.getElementById('searchPrompt').value;
        console.log('processing search request for prompt: ' + searchPrompt)
        if (!searchPrompt) {
            return;
        }

        navigate(`/search?query=${searchPrompt}`);
    };


    return (
    <app>
        <d className="background-gradient"></d>

        <div className="App">
            <header>
                <div className="HomePage-navbar">

                    <Link to="/">
                        <img src={FindYourPaperLogo} className="SearchResultsPage-FYP-logo" alt='FYP home page'/>
                    </Link>

                    <UserPanel/>
                </div>
            </header>

            <body>
                <img src={backgroundLine} className="HomePage-bg-spline"/>
                <img src={BackgroundFigures} className="HomePage-bg-figures"/>
                <p className="HomePage-site-name">Find Your Paper</p>
                <p className="HomePage-site-subtitle">The Semantic Search Engine through ArXiv</p>

                <form action="#" className="Input-search-border-wide" style={{'margin': '24px auto 0'}}>
                    <img src={SearchIcon} className="Input-search-icon"/>
                    <input className="Input-search-box-wide" type="search" placeholder="Enter query" id='searchPrompt'/>
                    <button className="Input-search-button-wide" onClick={handleSearch}>Search</button>
                </form>
            </body>

            <footer>
                <p className="HomePage-site-footer">Created by the best team from the Kyiv-Mohyla Academy - 2023</p>
            </footer>
        </div>
    </app>
  );
}

export default HomePage;
