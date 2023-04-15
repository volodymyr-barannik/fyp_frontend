import backgroundLine from './BackgroundLine.svg';
import SearchIcon from './SearchIcon.svg';
import FindYourPaperLogo from './FYP.svg';
import SaveIcon from './SaveIcon.svg';
import ViewIcon from './ViewIcon.svg';
import UpArrowIcon from './UpArrowIcon.svg';
import ArrowLeftIcon from './ArrowLeftIcon.svg';
import SortIcon from './SortIcon.svg';
import './SearchResultsPage.css';
import "./Core.css";
import {useContext, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Tooltip from "./Tooltip";
import {extract_date, sendSearchRequest} from "./Common";
import GlobalAuthenticationContext from "./GlobalAuthenticationContext";
import UserPanel from "./UserPanel";
import SearchResultsGrid from "./SearchResultsGrid";


function SearchResultsPage() {

    console.log('re-rendering')

    const { state } = useLocation();
    const { initialResults, initialQuery } = state || { initialResults: [], initialQuery: [] };

    // reference to the grid that shows the results
    const searchResultsGridRef = useRef(null);

    // Show results, but only once, when we've first entered the page (from HomePage, for example)
    useEffect(() => {

        console.log('using effect to set initial state of the SearchResultsPage')

        const searchPromptElement = document.getElementById('searchPrompt');
        searchPromptElement.value = initialQuery;

        searchResultsGridRef.current.updateResultItems(initialResults.scored_papers);

    }, []);

    const handleSearch = async (event) => {
        event.preventDefault()

        const searchPrompt = document.getElementById('searchPrompt').value;
        console.log('processing search request for prompt: ' + searchPrompt)
        if (!searchPrompt) {
            return;
        }

        const results = await sendSearchRequest(searchPrompt);

        searchResultsGridRef.current.updateResultItems(results.scored_papers);
    };

    return (
        <app>
            <d className="background-gradient"></d>

            <d className="App">

                <header>

                    <div className="HomePage-navbar">

                        <d className="flex-box-align-left" style={{'height': '151px',  'gap': '10px', 'width': '300px'}}>
                            <Link to="/">
                                <img src={FindYourPaperLogo} className="SearchResultsPage-FYP-logo"/>
                            </Link>
                        </d>

                        <form action="#" className="Input-search-border-narrow">
                            <img src={SearchIcon} className="Input-search-icon"/>
                            <input className="Input-search-box-narrow" type="search" placeholder="Enter query" id="searchPrompt"/>
                            <button className="Input-search-button-narrow" onClick={handleSearch}>Search</button>
                        </form>

                        <UserPanel></UserPanel>
                    </div>
                </header>

                <body>
                    <img src={backgroundLine} className="HomePage-bg-spline" alt=''/>

                    <SearchResultsGrid ref={searchResultsGridRef}/>
                </body>

                <footer>
                    <p className="HomePage-site-footer">Created by the best team from the Kyiv-Mohyla Academy - 2023</p>
                </footer>
            </d>

        </app>
    );
}

export default SearchResultsPage;
