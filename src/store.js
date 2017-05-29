import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import logger from 'redux-logger';
import freeze from "redux-freeze";
import { reducers } from "./reducers/wordSearch";
import { loadState, saveState } from "./localStorage.js";
import throttle from "lodash/throttle";


// add the middlewares
let middlewares = [];

// add the router middleware
middlewares.push(routerMiddleware(browserHistory));
middlewares.push(logger);

// add the freeze dev middleware
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze);
}

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

const persistantState = loadState();

// create the store
let store = createStore(reducers, persistantState, middleware);

store.subscribe(throttle(() => {
  saveState(
    store.getState()
  );
}, 1000));


const history = syncHistoryWithStore(browserHistory, store);

// export
export { store, history };
