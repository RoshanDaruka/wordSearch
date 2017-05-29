import { ADD_PLAYERS, ADD_SCORE, CLEAR_DATA } from "../constants/data.js";

const initialState = [];

export const players = (state = initialState, action) => {
  switch(action.type){
    case ADD_PLAYERS:
      return [...action.players];
    case CLEAR_DATA:
      return initialState;
    case ADD_SCORE:
      let newArray = [
        ...state.slice(0, action.turnIndex),
        Object.assign({}, state[action.turnIndex], { "score" : state[action.turnIndex].score + action.incrementValue} ),
        ...state.slice(action.turnIndex + 1)
      ]
      return newArray;
    default:
      return state;
  }
};


