import React, { Component } from "react";
import "./AutoCompleteItem.css";

class AutoCompleteItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getClassName = () => {
    let className = "autocomplete-item";
    if (this.props.index === this.props.currentFocus) {
      className += " selected";
    }
    return className;
  };

  onClick = e => {
    console.log(`item '${this.props.value}' was clicked`);
    this.props.onItemClick(this.props.index);
  };

  render() {
    return (
      <div className={this.getClassName()} onClick={this.onClick}>
        {this.props.value}
      </div>
    );
  }
}

export default AutoCompleteItem;
