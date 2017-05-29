import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import WordSearchGameApp from "./components/WordSearchGameApp.js";
import NotFound from "./components/NotFound";

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <Route path="/wordsearch" component={WordSearchGameApp} />
    </Route>
  </Router>
);

// export
export { router };
