import React, { Component } from "react";

class TestF extends Component {
  render() {
    return <input ref={this.props.innerRef} />;
  }
}
export default React.forwardRef((props, ref) => (
  <TestF innerRef={ref} {...props} />
));
