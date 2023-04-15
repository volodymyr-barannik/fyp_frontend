import SaveIcon from './SaveIcon.svg';
import CrossIcon from './CrossIcon.svg';
import ViewIcon from './ViewIcon.svg';
import UpArrowIcon from './UpArrowIcon.svg';
import './SearchResultsGrid.css';
import "./Core.css";
import {forwardRef, useContext, useEffect, useImperativeHandle, useState} from "react";
import Tooltip from "./Tooltip";
import {extract_date} from "./Common";
import axios from "axios";


const SearchResultsItem = forwardRef((props, ref) => {

    console.log(`props.saved=${props.saved}`)

    function handleSave() {

        return axios.post(`http://localhost:8080/save?paper_id=${props.arxiv_url}`, null,
            {
                headers: { Authorization: localStorage.getItem("sessionId") }})
            .then((res) => {
                console.log(`response for save request: ${res}`)
                return res.data;
            })
            .catch((error) => console.error(error));

    }

    function handleUnsave() {
        return axios.delete(`http://localhost:8080/unsave?paper_id=${props.arxiv_url}`,
            { headers: { Authorization: localStorage.getItem("sessionId") } })
            .then((res) => {
                console.log(`response for delete request: ${res}`)
                props.onItemDeleted(props);
                return res.data;
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="result-item-container">
            <div className="flex-box-align-around" style={{'margin': '25px 25px 0px 25px', 'width': 'calc(100% - 50px)'}}>
                <div className="result-item-title">{props.title}</div>

                {props.score &&
                <div style={{'margin': '0 0 30px 0'}}>
                    <img src={UpArrowIcon} className="in-button-image" alt=''></img>
                    <div className="result-item-title">{props.score}</div>
                </div>}

            </div>

            <div className="flex-box-align-around" style={{'margin': '13px 25px 0px 25px', 'width': 'calc(100% - 50px)'}}>
                <Tooltip text="This is the tooltip text." id='authorNameTooltip'>
                    <div className="result-item-author-name" id='authorName'>{props.author}</div>
                </Tooltip>
                <div className="result-item-date">{props.date}</div>
            </div>

            <div className="result-item-abstract" style={{'margin': '27px 28px 0px'}}>{props.abstract}</div>

            <div className="flex-box-align-around" style={{'margin': 'auto 25px 30px 25px', 'width': 'calc(100% - 50px)'}}>
                {!props.saved && <button className="result-item-button" style={{'background': '#EDF2F7', 'width': '110px', 'height': '40px'}}
                        onClick={handleSave}>
                    <div style={{'margin': '0 0 0 7px'}}>Save</div>
                    <img src={SaveIcon} className="in-button-image" style={{'margin': '0 7px 0'}} alt=''></img>
                </button>}

                {props.saved && <button className="result-item-button" style={{'background': '#EDF2F7', 'width': '110px', 'height': '40px'}}
                        onClick={handleUnsave}>
                    <div style={{'margin': '0 0 0 7px'}}>Unsave</div>
                    <img src={CrossIcon} className="in-button-image" style={{'margin': '0 1px 0'}} alt=''></img>
                </button>}

                <a href={props.arxiv_url} target="_blank" rel="noreferrer" id='viewLink'>
                    <button className="result-item-button" style={{'background': '#E8E8FF', 'width': '110px', 'height': '40px'}}>
                        <div style={{'margin': '0 0 0 7px'}} >View</div>
                        <img src={ViewIcon} className="in-button-image" style={{'margin': '0 7px 0'}} alt=''></img>
                    </button>
                </a>
            </div>
        </div>

    );
});

export default SearchResultsItem;
