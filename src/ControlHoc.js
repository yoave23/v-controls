import React, { Component } from "react";

export function controlHoc(WrappedControl) {
  class ControlHoc extends Component {
    controlRef = React.createRef();
    // strip down props used internally (we'll call them later if needed)

    state = {
      blurred: "",
      errorMessage: ""
    };

    componentDidMount() {
      this.validate(this.props.value || "");
    }

    componentWillUnmount() {
      this.props.onValidityChanged(this.props.name, true, "");
    }

    getErrorMessage = () => {
      if (this.state.blurred || this.props.submitted) {
        return this.state.errorMessage;
      }
      return "";
    };

    onChange = e => {
      e.persist();
      if (this.props.onChange) {
        this.props.onChange(e);
      }
      this.validate(e.target.value);
    };

    onBlur = e => {
      e.persist();
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }

      this.setState({ blurred: true }, () => {
        this.validate(e.target.value);
      });
    };

    validate = value => {
      if (!this.props.validationRules) {
        return;
      }
      let tempMessage = "";
      this.props.validationRules.forEach(rule => {
        let message = rule(value);
        if (message) {
          tempMessage = message;
          return;
        }
      });
      this.setState({ errorMessage: tempMessage }, () => {
        this.props.onValidityChanged(this.props.name, this.state.errorMessage);
      });
    };

    render() {
      //const { forwardedRef } = this.props;
      console.log("hoc props", this.props);
      const {
        //forwardedRef,
        onChange,
        submitted,
        validationRules,
        onValidityChanged,
        //innerRef,
        getErrorMessage,
        validate,
        reservedProps,
        getThinProps,
        customValidations,
        ...thinProps
      } = this.props;
      console.log("hoc thinProps", this.props);
      console.log("hoc thinProps", thinProps);

      return (
        <WrappedControl
          onChange={this.onChange}
          onBlur={this.onBlur}
          validate={this.validate}
          {...thinProps}
        />
      );
    }
  }
  return React.forwardRef(props => {
    return <ControlHoc {...props} />;
  });
}
