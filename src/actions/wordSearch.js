//actions for game actions
import { GAME_SELECT, CLEAR_DATA, GAME_START, CELL_CLICK, LAST_LETTER_FOUND, TURN_INDEX_INCREMENT, PASS_COUNT_INCREMENT } from "../constants/data.js";



export const selectGameAction = (players) => {
  return {
    type: GAME_SELECT,
  }
}

export const cellClickAction = (rowPos, columnPos, playersLength) => {
  return {
    type: CELL_CLICK,
    rowPos,
    columnPos,
    playersLength
  }
}

export const lastLetterFoundAction = () => {
  return {
    type: LAST_LETTER_FOUND
  }
}

export const incrementTurnIndex = (turnIndex) => {
  return {
    type: TURN_INDEX_INCREMENT,
    turnIndex
  }
}

export const incrementPassCount = (currentPassCount, numberOfPlayers) => {
  if(((currentPassCount +1) % numberOfPlayers) == 0){
    return (dispatch(showGameOver));
  }
  else
    return{
      type: PASS_COUNT_INCREMENT,
    }
}

export const clearData = () => {
  return {
    type: CLEAR_DATA
  }
}
