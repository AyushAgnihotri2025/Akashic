import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter as Router} from "react-router-dom";
import reducers from "./redux/reducers";
import thunk from "redux-thunk";

import PageNotFound from './components/404Page';
import { Navigate } from "react-router-dom";

import { CookiesProvider } from 'react-cookie';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
