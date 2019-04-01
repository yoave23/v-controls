import React, { Component } from "react";
import { observable } from "mobx";

class ControlWrapper extends Component {
  validate = () => {
    let validationMessage = "";
    if (!this.inputRef.current.validity.valid) {
      if (this.inputRef.current.validity.valueMissing) {
        validationMessage = "this field is required";
      }
    }

    if (!validationMessage && this.props.customValidations) {
      this.props.customValidations.forEach(val => {
        validationMessage = val();
      });
    }

    this.validationMessage = validationMessage;
    this.props.onValidityChanged(this.props.name, validationMessage);
  };
  render() {
    return this.props.render({ validate: this.validate });
  }
}

export default ControlWrapper;
