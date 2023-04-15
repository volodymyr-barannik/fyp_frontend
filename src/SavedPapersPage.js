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
import {Link, useLocation, useNavigate} from "react-router-dom";
import Tooltip from "./Tooltip";
import {extract_date, sendSearchRequest} from "./Common";
import UserPanel from "./UserPanel";
import SearchResultsGrid from "./SearchResultsGrid";
import axios from "axios";


function SavedPapersPage() {

    console.log('re-rendering SavedPapersPage')

    const [savedPapersExist, setSavedPapersExist] = useState(true);
    const navigate = useNavigate();

    // reference to the grid that shows the results
    const searchResultsGridRef = useRef(null);

    function sendSavedPapersSearchRequest() {

        //console.log('sending saved papers search request for prompt: ' + query + `. sessionId=${localStorage.getItem("sessionId")}`)
        console.log(`sending saved papers search request. sessionId=${localStorage.getItem("sessionId")}`)

        // Send a GET request to the server
        return axios.get('http://localhost:8080/savedpapers',{
            headers: {
                Authorization: localStorage.getItem("sessionId"),
            }
        })
            .then((res) => res.data)
            .catch((error) => console.error(error));
    }

    const setInitialState = async (searchResultsGridRef) => {
        console.log('using effect to set initial state of the SavedPapersPage');
        const savedPapersResponse = await sendSavedPapersSearchRequest();
        console.log("searchResultsGridRef = " + searchResultsGridRef);
        console.log("savedPapersResponse = " + savedPapersResponse);
        console.log(savedPapersResponse);

        const savedPapersResponseModified = savedPapersResponse.map(obj => ({paper: { ...obj, saved: true }, score: null }));

        if (savedPapersResponseModified)
        {
            setSavedPapersExist(true);
            searchResultsGridRef.current.updateResultItems(savedPapersResponseModified);
        }
        else
        {
            setSavedPapersExist(false);
        }
    }

    // Show results, but only once, when we've first entered the page (from SearchResultsPage, for example)
    useEffect(() => {
        setInitialState(searchResultsGridRef).then(() => {
            console.log('setInitialState is complete');

        });
    }, []);


    const handleSavedPapersSearch = async (event) => {
        event.preventDefault()

        const searchPrompt = document.getElementById('searchPrompt').value;
        console.log('processing search request for prompt: ' + searchPrompt)
        if (!searchPrompt) {
            return;
        }

        const results = await sendSearchRequest(searchPrompt);

        searchResultsGridRef.current.updateResultItems(results);
    };


    return (
        <div className="app">
            <d className="background-gradient"></d>

            <d className="App">
                <header>

                    <div className="HomePage-navbar">

                        <Link to="/">
                            <img src={FindYourPaperLogo} className="SearchResultsPage-FYP-logo"/>
                        </Link>

                        <d className="flex-box-align-right" style={{'height': '151px', 'gap': '25px', 'width': '500px'}}>

                            <button className="sort-button" title='Sort'>
                                <img src={SortIcon} className="in-button-image"></img>
                                <div></div>
                            </button>

                            <UserPanel></UserPanel>
                        </d>
                    </div>
                </header>

                <body>
                    <img src={backgroundLine} className="HomePage-bg-spline" alt=''/>

                    {savedPapersExist && <SearchResultsGrid ref={searchResultsGridRef}/>}
                    {!savedPapersExist && <div>You have no saved papers.</div>}
                </body>

                <footer>
                    <p className="HomePage-site-footer">Created by the best team from the Kyiv-Mohyla Academy - 2023</p>
                </footer>
            </d>

        </div>
    );
}

export default SavedPapersPage;
