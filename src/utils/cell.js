export default class Cell {
  constructor(value, rowPos, columnPos, selected, partOfWordFound = false, lastLetterToBeFound = false) {
    this.value = value;
    this.rowPos = rowPos;
    this.columnPos = columnPos;
    this.selected = selected;
    this.partOfWordFound = partOfWordFound;
    this.lastLetterToBeFound = lastLetterToBeFound
  }
}
