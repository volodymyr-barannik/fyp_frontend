import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './Pages/HomePage';
import reportWebVitals from './reportWebVitals';
import SearchResultsPage from "./Pages/SearchResultsPage";
import { BrowserRouter, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginModal from "./Auth/LoginModal";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
