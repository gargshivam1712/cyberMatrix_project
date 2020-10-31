import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/globals.scss"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import {userLoad} from "./redux/actions/auth"

// load user data 
store.dispatch(userLoad())

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store = {store}>
      <App/>
    </Provider>
  </BrowserRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
