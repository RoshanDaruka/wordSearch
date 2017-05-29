//action to decide which component to diplay on screen

import { SHOW_GAME_SETUP, SHOW_PAUSE_MENU, SHOW_GAME_OVER, SHOW_GAME } from '../constants/data.js';

export const showGameSetup = () => {
  return {
    type: SHOW_GAME_SETUP,
  }
}
export const showPauseMenu = () => {
  return {
    type: SHOW_PAUSE_MENU,
  }
}
export const showGameOver = () => {
  return {
    type: SHOW_GAME_OVER,
  }
}
export const showGame = () => {
    return {
        type: SHOW_GAME,
    }
}
