//actions to change players attributes;

import { ADD_PLAYERS, ADD_SCORE, CLEAR_DATA } from '../constants/data.js';

export const addPlayers = (players) => {
  return {
    type: ADD_PLAYERS,
    players,
  }
}

export const addScore = (turnIndex, incrementValue) => {
  return {
    type: ADD_SCORE,
    turnIndex,
    incrementValue
  }
}


export const clearData = () => {
  return {
    type: CLEAR_DATA
  }
}


