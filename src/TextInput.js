import React, { Component } from "react";
import "./TextInput.css";

class TextInput extends Component {
  state = {
    blurred: false,
    validationMessage: ""
  };

  getId = () => {
    return this.props.id || this.props.name;
  };

  getLabel = () => {
    const labelClassName = this.props.labelClassName || "text-input-label";
    if (this.props.label) {
      return (
        <label htmlFor={this.getId()} className={labelClassName}>
          {this.props.label}
        </label>
      );
    }
    return null;
  };

  onBlur = e => {
    e.persist();
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.setState({ blurred: true }, () => {
      this.validate();
    });
  };

  onChange = e => {
    e.persist();
    if (this.props.onChange) {
      this.props.onChange(e);
    }

    this.validate();
  };

  validate = () => {
    let validationMessage = "";
    const innerRef = this.props.innerRef.current;
    if (!innerRef.validity.valid) {
      if (innerRef.validity.valueMissing) {
        validationMessage = "this field is required";
      }
    }

    if (!validationMessage && this.props.customValidations) {
      this.props.customValidations.forEach(val => {
        validationMessage = val(innerRef.value, this.props.name);
      });
    }

    this.validationMessage = validationMessage;
    console.log(
      "calling onValidityChanged",
      this.props.name,
      validationMessage
    );
    if (this.state.blurred || this.props.submitted)
      this.props.onValidityChanged(this.props.name, validationMessage);
  };

  getValidationMessage = () => {
    if (this.state.blurred) {
      return this.state.validationMessage;
    }
    return null;
  };

  inputRef = this.props.innerRef || React.createRef();
  render() {
    const {
      submitted,
      customValidations,
      onValidityChanged,
      onBlur,
      onChange,
      innerRef,
      ...thinProps
    } = this.props;

    return (
      <React.Fragment>
        {this.getLabel()}
        <input
          ref={this.inputRef}
          id={this.getId()}
          onBlur={this.onBlur}
          onChange={this.onChange}
          {...thinProps}
        />
      </React.Fragment>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <TextInput innerRef={ref} {...props} />
));
