//wordList sidebar

import React from "react";
import { connect } from "react-redux";
import Label from "react-bootstrap/lib/Label";
import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

class WordsList extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Col className="align-center">
        <h2 className="padding0"><Label bsStyle="info">Words List</Label></h2>
        <br />
        {this.props.words.map((word, index)=> <p key={index}>{word.word} {word.wordFound ? <Glyphicon glyph="ok" /> : null }</p>)}
      </Col>
    );
  }
}


const mapStateToProps = (state) => {
  return{
    words : state.game.words
  }
}

export default connect(mapStateToProps)(WordsList);