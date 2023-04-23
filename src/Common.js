import axios from "axios";

export function sendSearchRequest(query) {

    console.log('sending search request for query: ' + query + `. sessionId=${localStorage.getItem("sessionId")}`)

    // Send a GET request to the server
    return axios.get('http://localhost:8080/search',{
        headers: {
            Authorization: localStorage.getItem("sessionId"),
        },
        params: {
            query: query,
            category: '',
            year: '',
        },
    })
        .then((res) => res.data)
        .catch((error) => console.error(error));
}

export function extract_date(date_str) {
    const dateObject = new Date(date_str);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = monthNames[dateObject.getMonth()].slice(0, 3);
    const year = dateObject.getFullYear();

    return `${month}. ${year}`;
}

export const isLoggedIn = () => {
    console.log(`is logged in = ${localStorage.getItem("sessionId") !== null}`)
    return localStorage.getItem("sessionId") !== null;
};