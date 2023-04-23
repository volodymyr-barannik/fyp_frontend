import SaveIcon from '../resources/SaveIcon.svg';
import ViewIcon from '../resources/ViewIcon.svg';
import UpArrowIcon from '../resources/UpArrowIcon.svg';
import './SearchResultsGrid.css';
import "../Core.css";
import {forwardRef, useContext, useEffect, useImperativeHandle, useState} from "react";
import Tooltip from "../Misc/Tooltip";
import {extract_date} from "../Common";
import axios from "axios";
import SearchResultItem from "./SearchResultItem";


const SearchResultsGrid = forwardRef((props, ref) => {

    const {removeWhenUnsaved} = props;

    console.log('re-rendering search results grid')

    const [items, setItems] = useState([]);

    function updateResultItems(jsonPapers) {

        if (jsonPapers)
        {
            console.log('processing response = ' + jsonPapers)
            console.log(jsonPapers)

            const newArray = jsonPapers.map(item => ({
                title: item.paper.title,
                score: item.score? Math.floor(item.score.toFixed(3)*100) : '',
                author: item.paper.authors.join(", "),
                date: extract_date(item.paper.publication_date),
                abstract: item.paper.abstract,
                arxiv_url: item.paper.arxiv_id,
                saved: item.paper.saved,
            }));

            console.log("updateResultItems updating items to: ")
            console.log(newArray)

            setItems(newArray);
        }
        else
        {
            console.log('SearchResultsGrid::updateResultItems jsonPapers is empty')
        }
    }

    // in order to be able to call "updateResultItems" function from other places
    useImperativeHandle(ref, () => ({
        updateResultItems: updateResultItems
    }));

    function onItemUnsaved(propsForItemToBeRemoved) {

        console.log('onItemUnsaved called')

        if (removeWhenUnsaved) {
            const updatedItems = items.filter(item => item.arxiv_url !== propsForItemToBeRemoved.arxiv_url);

            // Set the state to the updated array
            setItems(updatedItems);
        }
    }

    return (
        <div className="SearchResultsPage-results-container" ref={ref}>
            {items.map((item, index) => (
                <SearchResultItem {...item} onItemUnsaved={onItemUnsaved}/>
            ))}
        </div>

    );
});

export default SearchResultsGrid;
