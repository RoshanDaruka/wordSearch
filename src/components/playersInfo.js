//players info wrapper

import React from "react";
import {connect} from "react-redux";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button.js";

import { incrementTurnIndex, incrementPassCount } from "../actions/wordSearch.js";
import { showGameOver } from "../actions/display.js";

class PlayersInfo extends React.Component {
  constructor(props){
    super(props);
    this.onPassClick = this.onPassClick.bind(this);
  }
  onPassClick(){
    const length = this.props.players.length;
    const turnIndex = (this.props.turnIndex+1)%length;
    this.props.changeTurnIndex(turnIndex);
    let passCount = this.props.passCount + 1;
    if(passCount % length == 0){
      this.props.gameOver();
    }
    else{
      this.props.increasePassCount();
    }
    
  }

  render() {
    return (
      <ListGroup>
        {
          this.props.players.map((player, index )=> {
            return( 
              <ListGroupItem className="scoreLabel" bsSize="large" key={index} header={ player.name } bsStyle={ this.props.turnIndex == index ? "success" : "" }>
                score : {player.score}
                {this.props.turnIndex == index ? <Button className="pull-right" onClick={this.onPassClick} bsStyle="warning">PASS</Button> : null}
              </ListGroupItem>
            )
          }
          )
        }
      </ListGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    players : state.players,
    turnIndex: state.game.turnIndex,
    passCount : state.game.passCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    gameOver: () => dispatch(showGameOver()),
    changeTurnIndex : (turnIndex) => dispatch(incrementTurnIndex(turnIndex)),
    increasePassCount: () => dispatch(incrementPassCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersInfo);
