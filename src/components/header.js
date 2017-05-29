//title for game app

import React from "react";
import Jumbotron from "react-bootstrap/lib/Jumbotron";

export default class Header extends React.Component {
  render() {
    return (      
      <div className="container align-center">
          <h1>Word Search</h1>
          <br />
          <br />
      </div>
    );
  }
}
