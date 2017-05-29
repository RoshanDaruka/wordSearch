
import {WORDS, START_SET, LEFT_TO_RIGHT, TOP_TO_BOTTOM, CHAR_SET, GRID_WIDTH, GRID_HEIGHT} from '../constants/data'
import Cell from '../utils/cell.js'

export const fillDefaultGrid = (grid, gridSet, gridWidth = GRID_WIDTH, gridHeight = GRID_HEIGHT) => {
    var rows = [];
    for (var rowPos = 0; rowPos < gridHeight; rowPos++) {
        var cols = [];
        rows.push({cols});
        for (var columnPos = 0; columnPos < gridWidth; columnPos++) {
            var cell = new Cell(gridSet.charAt(Math.floor(Math.random() * gridSet.length)), rowPos, columnPos, false);
            cols.push(cell);
        }
    }
    grid = {rows};
    return grid;
}

const buildWords = (donorWordsArray, gridWidth, gridHeight) => {
    let wordsToBeFound = [];
    donorWordsArray.map(wordStr=> {
            let wordsObj = {};
            wordsObj.possiblePositions = possisblePositions(gridHeight, gridWidth);
            wordsObj.word = wordStr;
            wordsObj.wordFound = false;
            wordsToBeFound.push(wordsObj);
        }
    );
    return wordsToBeFound;
}

const possisblePositions = (gridHeight, gridWidth) => {
    let words = [];
    for (var rowPos = 0; rowPos < gridHeight; rowPos++) {
        for (var columnPos = 0; columnPos < gridWidth; columnPos++) {
            words.push({columnPos, rowPos, direction: LEFT_TO_RIGHT, columnAddition: 1, rowAddition: 0});
            words.push({columnPos, rowPos, direction: TOP_TO_BOTTOM, columnAddition: 0, rowAddition: 1});
        }
    }
    return words;
}

const fillRemainingSpaces = (newState, gridSet, gridWidth, gridHeight) => {
    for (var rowPos = 0; rowPos < gridHeight; rowPos++) {
        for (var columnPos = 0; columnPos < gridWidth; columnPos++) {
            if (newState.grid.rows[rowPos].cols[columnPos].value === 'x') {
                newState.grid.rows[rowPos].cols[columnPos] = new Cell(gridSet.charAt(Math.floor(Math.random() * gridSet.length)), rowPos, columnPos, false);
            }
        }
    }
}

const getStartingPoint = (word) => {
    let cellChoice;
    let arrayLen = word.possiblePositions.length;
    if (arrayLen !== 0) {
        let cellChoiceNumber = Math.floor(Math.random() * arrayLen);
        cellChoice = word.possiblePositions.splice(cellChoiceNumber, 1)[0];
        return cellChoice
    }
    return cellChoice;
}

const rebuildGridSoFar = (counter, newState) => {
    let tempCounter = 0;
    while (tempCounter < counter) {
        newState.words[tempCounter++].positionInGrid.map(characterPosition=>
            newState.grid.rows[characterPosition.rowPosition].cols[characterPosition.colPosition].value = characterPosition.letter
        );
    }
}

const addWordToGrid = (newState, word, gridWidth, gridHeight) => {
    let result = true;
    let wordPositions = [];
    let wordComplete = 0;
    while (wordPositions.length !== word.word.length && word.possiblePositions.length !== 0) {
        let startingPoint = getStartingPoint(word);

        //reset words found in grid
        wordPositions = [];
        // cycle through word, character by character
        word.word.split('').map(character=> {
            // if location is untaken, or matches exact letter, then continue
            if (startingPoint.columnPos < gridWidth && startingPoint.rowPos < gridHeight &&
                (newState.grid.rows[startingPoint.rowPos].cols[startingPoint.columnPos].value === 'x' ||
                (newState.grid.rows[startingPoint.rowPos].cols[startingPoint.columnPos].value === character))) {
                wordPositions.push({'letter': character, 'colPosition': startingPoint.columnPos, 'rowPosition': startingPoint.rowPos});
                startingPoint.columnPos = startingPoint.columnPos + startingPoint.columnAddition;
                startingPoint.rowPos = startingPoint.rowPos + startingPoint.rowAddition;
            }
        });
    }
    // now that word mapped, mark the grid.
    if (wordPositions.length === word.word.length) {
        word.positionInGrid = wordPositions;
    } else {
        result = false;
    }

    return result;
}


const repositionPrevious = (counter, newState) => {
    if (counter !== -1) {
        newState.words[counter].wordFound = false;
        newState.words[counter].positionInGrid = [];
    }
}

export const createBoard = (newState, action) => {
    newState.grid = fillDefaultGrid([], START_SET, GRID_WIDTH, GRID_HEIGHT);
    newState.words = [];

    let words = buildWords(WORDS, GRID_WIDTH, GRID_HEIGHT);
    let counter = 0;
    while (counter !== -1 && counter < words.length) {
        let word = words[counter];
        let result = addWordToGrid(newState, word, GRID_WIDTH, GRID_HEIGHT);
        if (result) {
            if (newState.words.indexOf(word) === -1) {
                newState.words.push(word);
            }
            newState.words.map(wordObj=> {
                wordObj.positionInGrid.map(characterPosition=>
                    newState.grid.rows[characterPosition.rowPosition].cols[characterPosition.colPosition].value = characterPosition.letter
                );
            });
            counter++
        } else {
            // there was no match, so reset data, and go back and reposition previous word.
            word.possiblePositions = possisblePositions(GRID_HEIGHT, GRID_WIDTH);
            counter--;
            repositionPrevious(counter, newState);

            //wipe the grid now, then build up to the previous count words and start again!
            newState.grid = fillDefaultGrid([], START_SET, GRID_WIDTH, GRID_HEIGHT);
            rebuildGridSoFar(counter, newState);
        }
    }

    fillRemainingSpaces(newState, CHAR_SET, GRID_WIDTH, GRID_HEIGHT);
    return words;
}
