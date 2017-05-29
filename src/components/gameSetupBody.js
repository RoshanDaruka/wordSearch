import React from "react";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import { connect } from "react-redux";

import { addPlayers } from '../actions/players.js';
import { showGame } from '../actions/display.js';
import { selectGameAction } from '../actions/wordSearch.js';

class GameSetupBody extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playersCount: 2
    }
    this.onPlayerChange = this.onPlayerChange.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
  }
  onPlayerChange(e) {
    this.setState({playersCount: e.target.value});
  }
  onStartClick() {
    let player = [];
    for(var i = 0 ; i < this.state.playersCount ; i++){
      var name = document.getElementById(`player${i}`);
      player.push({name : name.value, score: 0});
    }
    this.props.addNames(player);
    this.props.startGame();
    this.props.displayGame();
  }

  render() {
    let forms = [];
    for(var i = 0;i < this.state.playersCount;i++){
      forms.push(
        <FormGroup key={i} controlId="formInlineName">
          <ControlLabel>{`Player ${i}`}</ControlLabel>
           {'  '}
          <FormControl id= {`player${i}`} type="text" placeholder="Jane Doe" />
        </FormGroup>
        )
    }
    return (
      <FormGroup>
        <ControlLabel>Number of Players</ControlLabel>
        <FormControl componentClass="select" onChange={this.onPlayerChange} placeholder="select">
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </FormControl>
        <br />
        <br />
        <br />        
        <Form>
            {forms.map((form) => form)}
        </Form>
        <Modal.Footer>
          <Button onClick={this.onStartClick}>Start Game</Button>
        </Modal.Footer>
      </FormGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return{
    addNames : (players) => dispatch(addPlayers(players)),
    displayGame: () => dispatch(showGame()),
    startGame: () => dispatch(selectGameAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSetupBody);
