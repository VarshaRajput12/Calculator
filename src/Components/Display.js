import React, { Component } from "react";
class Display extends Component {
  render() {
    return (
      <div className="result">
        <input id="inputField"  type="text" value={this.props.result} />
      </div>
    );
  }
}

export default Display;
