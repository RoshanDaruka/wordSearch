//pause dialog box 
import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import { connect } from "react-redux";

import { showGame, showGameSetup } from "../actions/display.js";
import { clearData } from "../actions/players.js";
class GameSetup extends React.Component {
  constructor(props){
    super(props);
    this.handleGameRestart = this.handleGameRestart.bind(this);
    this.handleGameResume = this.handleGameResume.bind(this);
  }

  handleGameRestart () {
    this.props.resetDefault();
    this.props.gameSetup();
  }

  handleGameResume () {
    this.props.handleResume();
  }

  render() {
      const gameSetupModalStyle = {"position" : "relative"}
    return (
      <Modal.Dialog style={gameSetupModalStyle}>
        <Modal.Header>
            <Modal.Title>Game Paused</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <Button onClick={this.handleGameRestart}>Restart Game</Button>
            <Button onClick={this.handleGameResume}>Resume</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleResume : () => dispatch(showGame()),
    resetDefault : () => dispatch(clearData()),
    gameSetup : () => dispatch(showGameSetup())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSetup);