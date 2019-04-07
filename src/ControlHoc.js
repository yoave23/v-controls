import React, { Component } from "react";

export function controlHoc(WrappedControl) {
  class ControlHoc extends Component {
    controlRef = React.createRef();

    state = {
      blurred: "",
      validationMessage: ""
    };

    componentDidMount() {
      this.validate();
    }

    componentWillUnmount() {
      this.props.onValidityChanged(this.props.name, true, "");
    }

    getValidationMessage = () => {
      return this.state.blurred || this.props.submitted
        ? this.state.validationMessage
        : null;
    };

    onChange = e => {
      e.persist();
      if (this.props.onChange) {
        this.props.onChange(e);
      }
      this.validate();
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

    validate = () => {
      let validationMessage = "";
      let innerRef = null; // = this.props.innerRef.current || this.inputRef.current;
      if (this.props.controlRef) {
        innerRef = this.props.controlRef.current;
      } else {
        innerRef = this.controlRef.current;
      }

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
      console.log("validationMessage", validationMessage);
      this.setState({ validationMessage });
      this.props.onValidityChanged(this.props.name, validationMessage);
    };

    render() {
      const {
        submitted,
        customValidations,
        onValidityChanged,
        onBlur,
        onChange,
        innerRef,
        filterItems,
        ...thinProps
      } = this.props;

      return (
        <WrappedControl
          getValidationMessage={this.getValidationMessage}
          onChange={this.onChange}
          onBlur={this.onBlur}
          validate={this.validate}
          ref={this.props.controlRef || this.controlRef}
          {...thinProps}
        />
      );
    }
  }

  return React.forwardRef((props, ref) => (
    <ControlHoc controlRef={ref} {...props} />
  ));
}
