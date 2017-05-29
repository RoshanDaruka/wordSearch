// app container

import React from "react";
import Header from "./header.js";
import GameSetup from "./gameSetup.js";
import GameWindow from "./gameWindow.js";
import PauseDialog from "./pauseDialog.js";
import GameOver from "./gameOver.js";
import { connect } from "react-redux";

class WordSearchGameApp extends React.Component {

  render() {
    return (
      <div className="page-home">
        <Header />
        { this.props.showGameSetup ? <GameSetup /> : null}
        { this.props.showGame ? <GameWindow /> : null}
        { (this.props.showGameOver || this.props.gameOver) ? <GameOver /> : null}
        { this.props.showPauseMenu ? <PauseDialog /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showGameSetup : state.display.showGameSetup,
    showGame : state.display.showGame,
    showGameOver: state.display.showGameOver,
    showPauseMenu: state.display.showPauseMenu,
    gameOver: state.game.gameOver
  }
}

export default connect(mapStateToProps)(WordSearchGameApp);