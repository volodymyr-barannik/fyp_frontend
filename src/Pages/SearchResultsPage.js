import backgroundLine from '../Resources/BackgroundLine.svg';
import SearchIcon from '../Resources/SearchIcon.svg';
import FindYourPaperLogo from '../Resources/FYP.svg';
import './SearchResultsPage.css';
import "../Core.css";
import {useEffect, useRef} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {sendSearchRequest} from "../Common";
import UserPanel from "./Reusables/UserPanel";
import SearchResultsGrid from "../SearchResults/SearchResultsGrid";


function SearchResultsPage() {

    console.log('re-rendering')

    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        document.title = query;
    }, []);

    // reference to the grid that shows the results
    const searchResultsGridRef = useRef(null);

    useEffect(() => {
        async function fetchResults() {
            console.log(`SearchResultsPage fetchResults got query=${query}`)

            if (query) {
                return await sendSearchRequest(query);
            }
        }
        fetchResults().then(r => {
            console.log('r')
            console.log(r)

            const searchPromptElement = document.getElementById('searchPrompt');
            searchPromptElement.value = query;

            searchResultsGridRef.current.updateResultItems(r.scored_papers);
        });
    }, [query]);

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

            <d className="App">

                <header>

                    <div className="HomePage-navbar">

                        <d className="flex-box-align-left" style={{'height': '151px', 'gap': '10px', 'width': '300px'}}>
                            <Link to="/">
                                <img src={FindYourPaperLogo} className="SearchResultsPage-FYP-logo"/>
                            </Link>
                        </d>

                        <form action="#" className="Input-search-border-narrow">
                            <img src={SearchIcon} className="Input-search-icon"/>
                            <input className="Input-search-box-narrow" type="search" placeholder="Enter query"
                                   id="searchPrompt"/>
                            <button className="Input-search-button-narrow" onClick={handleSearch}>Search</button>
                        </form>

                        <UserPanel></UserPanel>
                    </div>
                </header>

                <body>
                <img src={backgroundLine} className="HomePage-bg-spline" alt=''/>

                <SearchResultsGrid removeWhenUnsaved={false} ref={searchResultsGridRef}/>
                </body>

                <footer>
                    <p className="HomePage-site-footer">Created by the best team from the Kyiv-Mohyla Academy - 2023</p>
                </footer>
            </d>

        </app>
    );
}

export default SearchResultsPage;
