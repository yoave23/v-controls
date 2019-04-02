import React, { Component } from "react";

class Wrapper extends Component {
  testFunc = () => {
    console.log("in testFunc");
  };

  render() {
    return this.props.render({ testFunc });
  }
}

export default Wrapper;
