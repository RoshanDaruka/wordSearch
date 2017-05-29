//container for game window

import React from "react";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import PlayersInfo from './playersInfo.js';
import Matrix from './matrix.js';
import PlayPauseButton from './playPauseButton.js';
import GameStats from './gameStats.js';
import WordsList from './wordsList.js';

export default class GameWindow extends React.Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid inline">
          <Col xs={4}>
            <PlayersInfo />
          </Col>
          <Col xs={5}>
            <Matrix />
          </Col>
          <Col className="pull-right" xs={2}>
            <WordsList />
          </Col>
        </Row>
        
        <Row className="show-grid inline">
          <Col xs={4} className="align-center">
            <PlayPauseButton />
          </Col>
          <Col xs={8}>
            <GameStats />
          </Col>
        </Row>
      </Grid>
    );
  }
}

