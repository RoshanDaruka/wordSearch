import React from "react";
import Image from "react-bootstrap/lib/Image";
import { connect } from "react-redux";


import { showPauseMenu } from "../actions/display.js";
class PlayPauseButton extends React.Component {
  constructor(props){
    super(props);
    this.handleGamePause = this.handleGamePause.bind(this);
  }
  handleGamePause(){
    this.props.pauseGame();
  }
  render() {
    return (
      <Image className="pointer" onClick={this.handleGamePause} src="./public/media/playPauseButton.jpg" className="playPauseButton" rounded />
    );
  }
}
const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return{
    pauseGame : () => dispatch(showPauseMenu())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayPauseButton);