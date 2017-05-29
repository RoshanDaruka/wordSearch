//gameOver dialog compponent

import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import Label from "react-bootstrap/lib/Label";
import Button from "react-bootstrap/lib/Button";
import { connect } from "react-redux";

import { clearData } from "../actions/players.js";
import { showGameSetup } from "../actions/display.js";
class GameOver extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleGameRestart = this.handleGameRestart.bind(this);
  }  
  handleGameRestart () {
    this.props.resetDefault();
    this.props.gameSetup();
  }

  render() {
      const gameSetupModalStyle = {"position" : "relative"}
      var max = 0;
      var winnerIndex = 0;
      this.props.players.map((player, index) => {
        if(player.score > max){
          max = player.score;
          winnerIndex = index; 
        }
      })
      const winner = this.props.players[winnerIndex].name;
    return (
      <Modal.Dialog style={gameSetupModalStyle}>
        <Modal.Header>
            <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <h2>Winner is <Label className="vertical-align-top" bsStyle="info">{winner}</Label></h2>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={this.handleGameRestart}>Restart Game</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    players : state.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetDefault : () => dispatch(clearData()),
    gameSetup : () => dispatch(showGameSetup())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
