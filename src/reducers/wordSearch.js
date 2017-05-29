import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { players } from "./players.js";
import { game } from "./game.js";
import { display } from "./display.js";
// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  players,
  game,
  display,
  // your reducer here
});
