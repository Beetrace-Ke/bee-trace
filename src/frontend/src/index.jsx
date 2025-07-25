import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { Contract } from "./utils/icp";
import { Provider } from 'react-redux';
import store from './Redux/store/store.js';


import App from "./App";
import "./index.css";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 

window.renderICPromise = Contract()
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <Provider store={store}> 
          <App />
          <ToastContainer hideProgressBar />
        </Provider>
      </React.StrictMode>
    );
  })
  .catch(console.error);