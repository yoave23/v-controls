import React, { Component } from "react";

const formHoc = WrappedComponent => {
  return class extends Component {
    state = {
      validationState: {},
      submitted: false
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
          isFormValid={this.isFormValid}
          onValidityChanged={this.onValidityChanged}
          validationState={this.state.validationState}
        />
      );
    }
  };
};

export default formHoc;
