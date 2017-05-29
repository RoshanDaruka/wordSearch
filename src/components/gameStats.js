//live game statistics
import React from "react";
import Label from "react-bootstrap/lib/Label";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { connect } from "react-redux";


class GameStats extends React.Component {
  
  render() {
    const currentPlayer = this.props.players[this.props.turnIndex].name;
    let max = 0;
    let winnerIndex  = 0;
    this.props.players.map((player, index) => {
      if(player.score > max){
        max = player.score;
        winnerIndex = index; 
      }
    })
    const winner = this.props.players[winnerIndex].name;
    return (
      <Row>
        <Col xs={6}>
          <h3>Current Winner  <Label bsStyle="success">{winner}</Label></h3>
        </Col>
        <Col xs={6}>
          <h3><Label bsStyle="info">{`${currentPlayer}'s Turn`}</Label></h3>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    turnIndex : state.game.turnIndex,
    players : state.players
  }
}

export default connect(mapStateToProps)(GameStats);