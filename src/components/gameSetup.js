// gameSetup component for configuring players
import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import GameSetupBody from "./gameSetupBody.js";
import {connect} from "react-redux";

export default class GameSetup extends React.Component {
  constructor(props){
    super(props);
    this.onStart = this.onStart.bind(this);
  }

  onStart(){
    let player = [];
    for(var i = 0 ; i < this.state.playersCount;i++){
      var name = document.getElementById(`{player${i}}`);
      player.push({name : name.value, score: 0});
    }
    this.props.addPlayer(player);
  }

  render() {
    const gameSetupModalStyle = {"position" : "relative"}
    return (
      <Modal.Dialog style={gameSetupModalStyle}>
        <Modal.Header>
            <Modal.Title>Game Setup</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <GameSetupBody />
        </Modal.Body>
      </Modal.Dialog>
    );
  }
}