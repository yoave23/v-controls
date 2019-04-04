import React, { Component } from "react";

const formHoc = WrappedComponent => {
  return class extends Component {
    state = {
      validationState: {},
      submitted: false
    };

    setSubmitted = () => {
      this.setState({ submitted: true });
    };

    onValidityChanged = (name, validationMessage) => {
      console.log("onValidityChanged called", name, validationMessage);
      let temp = { ...this.state.validationState };
      temp[name] = validationMessage;
      this.setState({ validationState: temp });
    };

    isFormValid = () => {
      const isFormValid =
        Object.keys(this.state.validationState).filter(
          item => !!this.state.validationState[item]
        ).length === 0;
      console.log("isFormValid", isFormValid);
      return isFormValid;
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          submitted={this.state.submitted}
          isFormValid={this.isFormValid}
          onValidityChanged={this.onValidityChanged}
          validationState={this.state.validationState}
          setSubmitted={this.setSubmitted}
        />
      );
    }
  };
};

export default formHoc;
