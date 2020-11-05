import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navigation from "./navigation";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "./store";

import { QueryCache, ReactQueryCacheProvider } from "react-query";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      // staleTime: 60000,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Router>
          <Navigation />
        </Router>
      </ReactQueryCacheProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
