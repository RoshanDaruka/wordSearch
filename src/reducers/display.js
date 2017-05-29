import { SHOW_GAME_SETUP, SHOW_PAUSE_MENU, SHOW_GAME_OVER, SHOW_GAME } from "../constants/data.js";

const initialState = {
        showGameSetup: true,
        showPauseMenu: false,
        showGameOver: false,
        showGame: false,
};

export const display = (state = initialState, action) => {
  switch(action.type){
    case SHOW_GAME_SETUP:
      return Object.assign({}, state, {
        showGameSetup: true,
        showPauseMenu: false,
        showGameOver: false,
        showGame: false
      });
    case SHOW_PAUSE_MENU:
      return Object.assign({}, state, {
        showGameSetup: false,
        showPauseMenu: true,
        showGameOver: false,
        showGame: false
      });
    case SHOW_GAME_OVER:
      return Object.assign({}, state, {
        showGameSetup: false,
        showPauseMenu: false,
        showGameOver: true,
        showGame: false
      });
    case SHOW_GAME:
      return Object.assign({}, state, {
        showGameSetup: false,
        showPauseMenu: false,
        showGameOver: false,
        showGame: true
      });
    default:
      return state;
  }
};


