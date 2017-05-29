//grid of game

import React from "react";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { connect } from "react-redux";


import { cellClickAction } from "../actions/wordSearch.js";
import { addScore } from "../actions/players.js";
import { showGameOver } from "../actions/display.js";
// Home page component
class Matrix extends React.Component {
  // render
  constructor(props){
      super(props);
      this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick (rowPos, columnPos, playersLength) {
      let word = this.props.lastWordFound;
      let turnIndex = this.props.turnIndex;
      this.props.cellClicked(rowPos, columnPos, playersLength).then(() => {
        if(word != this.props.lastWordFound){
            this.props.scoreUpdate(turnIndex, this.props.lastWordFound.length);
            if(this.props.gameOver){
                this.props.gameOverScreen();
            }
        }
      });
  }

  render() {
    return (
        <div className="lettersMatrix">
        {
            this.props.grid.rows.map((row, index) => {
                return (
                    <div key={index} className="rowContainer" >
                    {
                        row.cols.map((col, index) => 
                            <div key={col.rowPos + '' + col.columnPos } className={col.selected ? "cellSelected" : col.partOfWordFound ? "cellFound" : 'cell'} onClick={() => this.handleCellClick(col.rowPos, col.columnPos, (this.props.players).length)}>
                                {col.value}
                            </div>
                        )
                    }
                    </div>
                )
            })
        }
        </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        grid : state.game.grid,
        players : state.players,
        lastWordFound: state.game.lastWordFound,
        turnIndex: state.game.turnIndex,
        gameOver:  state.game.gameOver
    }
}

const mapDispatchToProps = (dispatch) => ({
    cellClicked: (rowPos, columnPos, playersLength) => {
        const differed = new Promise((resolve) => {
        resolve(dispatch(cellClickAction(rowPos, columnPos, playersLength)));
        });
        return differed;
    },
    scoreUpdate: (turnIndex, score) => dispatch(addScore(turnIndex, score)),
    gameOverScreen: () => dispatch(showGameOver())
});

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);