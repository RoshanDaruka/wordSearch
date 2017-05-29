import { START_SET, GRID_WIDTH, GRID_HEIGHT } from "../constants/data.js";
import { createBoard, fillDefaultGrid} from './boardCreator.js'
import { CLEAR_DATA, LAST_LETTER_FOUND , CELL_CLICK, GAME_SELECT, TURN_INDEX_INCREMENT, PASS_COUNT_INCREMENT } from '../constants/data.js';
import Cell from '../utils/cell.js';
const initialWords = () => {
  let words = [];
  while (words.length < 10) {
    let word = {};
    word.word = 'x';
    word.wordFound = false;
    words.push(word)
  }
  return words;
}


const initialState = {
  grid: fillDefaultGrid({}, START_SET, GRID_WIDTH, GRID_HEIGHT),
  words: initialWords(),
  lettersFound: [],
  gameOver: false,
  turnIndex: 0,
  passCount: 0
};

export const game = (state = initialState, action) => {
  let newState = {'grid': {}, lastWordFound : "", gameOver: false, turnIndex: state.turnIndex, passCount: 0};
  switch (action.type) {
    case TURN_INDEX_INCREMENT:
      return Object.assign({}, state, {"turnIndex" : action.turnIndex});
    case CLEAR_DATA:
      return Object.assign({}, initialState);
    case LAST_LETTER_FOUND:
      newState.grid = state.grid;
      newState.words = state.words;
      newState.gameOver = true;
      return newState;

    case PASS_COUNT_INCREMENT: 
      return Object.assign({}, state, { passCount : state.passCount + 1});
      
    case CELL_CLICK:
      if (isLegalCellClick(state, action)) {

        // cell update
        cellSelectedUpdate(newState, state, action);

        //lettersFound update
        lettersFoundUpdate(newState, state, action);

        //wordsFound update
        wordsFoundUpdate(newState, state, action);

        //update game over
        newState.gameOver = isGameOver(newState, action);

        return newState;
      } else {
        newState.grid = state.grid;
        newState.lettersFound = state.lettersFound;
        newState.words = state.words;
        newState.turnIndex = state.turnIndex;
        return newState;
      }

    case GAME_SELECT:
      createBoard(newState, action);
      newState.lettersFound = [];
      return newState;

    case CLEAR_DATA:
      return Object.assign({}, initalState);

    default:
      return state
  }
}

const cloneCell = (cell) => {
  return new Cell(cell.value, cell.rowPos, cell.columnPos, cell.selected, cell.partOfWordFound)
}

const cloneRow = (row) => {
  let cols = row.cols.map(cell=> cloneCell(cell));
  return {cols};
}

const cloneWord = (word) => {
  let posInGrid = word.positionInGrid.map(data => Object.assign({}, data))
  return {
    positionInGrid: posInGrid,
    word: word.word,
    wordFound: word.wordFound
  }
}

const cellSelectedUpdate = (newState, state, action) => {
  let newRow = cloneRow(state.grid.rows[action.rowPos]);
  newState.grid.rows = [
    ...state.grid.rows.slice(0, action.rowPos),
    newRow,
    ...state.grid.rows.slice(action.rowPos + 1)
  ];
  newState.grid.rows[action.rowPos].cols[action.columnPos].selected = !state.grid.rows[action.rowPos].cols[action.columnPos].selected;
}


const lettersFoundUpdate = (newState, state, action) => {
  let cell = newState.grid.rows[action.rowPos].cols[action.columnPos];
  if (cell.selected) {
    // cell is now selected so should be added to the letters found array
    newState.lettersFound = state.lettersFound.map(cell=>cell);
    newState.lettersFound.push(cell);
  } else {
    // the cell was selected, so now unselect it!
    newState.lettersFound = state.lettersFound.filter(letterCell=> !( letterCell.columnPos === cell.columnPos && letterCell.rowPos === cell.rowPos));
  }
}

const allWordsFound = (newState) => {
  return newState.words.reduce((prev, curr) => prev + curr.wordFound, 0) === newState.words.length
}

const wordsFoundUpdate = (newState, state, action) => {
  newState.words = state.words;
  if (newState.lettersFound.length >= 1) {
    let wordMatch = false;
    let posOfMatchedWord = 0;
    newState.words.map((word, index) => {
        if (word.word.length === newState.lettersFound.length && newState.lettersFound.length <= GRID_HEIGHT && !wordMatch) {
          let lettersMatched = 0;
          newState.lettersFound.map(letterCell=> {
            if (word.positionInGrid.find(letterPosInWord => {
                  return (letterPosInWord.colPosition === letterCell.columnPos &&
                  letterPosInWord.rowPosition === letterCell.rowPos &&
                  letterPosInWord.letter === letterCell.value)
                }
              )) {
              lettersMatched++;
            }
          });
          if (lettersMatched === word.word.length && !word.wordFound) {
            newState.lastWordFound = word.word;
            newState.turnIndex =( state.turnIndex + 1) % action.playersLength;
            wordMatch = true;
            posOfMatchedWord = index;
            newState.words = [
              ...state.words.slice(0, posOfMatchedWord),
              Object.assign({}, cloneWord(state.words[posOfMatchedWord]), {wordFound: true}),
              ...state.words.slice(posOfMatchedWord + 1)
            ];
            newState.lettersFound.map(letterCell=> {
              let newCell = cloneCell(newState.grid.rows[letterCell.rowPos].cols[letterCell.columnPos]);
              newCell.partOfWordFound = true;
              newCell.selected = false;
              newState.grid.rows[letterCell.rowPos] = {
                ...newState.grid.rows[letterCell.rowPos],
                cols: [...newState.grid.rows[letterCell.rowPos].cols],
              };
              newState.grid.rows[letterCell.rowPos].cols[letterCell.columnPos] = newCell;
            });
            newState.lettersFound = [];
          }
        }
      }
    );
  }
}

const isLegalCellClick = (state, action) => {
  if (state.lettersFound.length === 0) {
    return true;
  }

  if (state.lettersFound.length === 1) {
    //same cell click
    if (state.lettersFound[0].columnPos === action.columnPos && state.lettersFound[0].rowPos === action.rowPos) {
      return true;
    }
    // click on same vertical axis, but different cell
    if (state.lettersFound[0].columnPos === action.columnPos && state.lettersFound[0].rowPos !== action.rowPos) {
      return true;
    }
    // click on same horizontal axis, but different cell
    if (state.lettersFound[0].columnPos !== action.columnPos && state.lettersFound[0].rowPos === action.rowPos) {
      return true;
    }
  }

  if (state.lettersFound.length > 1) {
    //if previous letters in horizontal axis, then so must the rest be
    if (state.lettersFound[0].columnPos === state.lettersFound[1].columnPos && state.lettersFound[0].columnPos === action.columnPos) {
      return true;
    }
    //if previous letters in vertical axis, then so must the rest be
    if (state.lettersFound[0].rowPos === state.lettersFound[1].rowPos && state.lettersFound[0].rowPos === action.rowPos) {
      return true;
    }
  }

  return false;
}
const isGameOver = (newState, action) => {
  if (allWordsFound(newState)) {
    newState.grid.rows[action.rowPos].cols[action.columnPos].lastLetterToBeFound = true;
  }
  return newState.grid.rows[action.rowPos].cols[action.columnPos].lastLetterToBeFound
}


