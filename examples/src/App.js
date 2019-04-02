import React, { Component } from "react";
import { TextInput, AutoComplete } from "../../src/index";

export default class App extends Component {
  testTextInputRef = React.createRef();
  state = {
    testTextInput: "",
    validityState: {},
    toggleDisplay: true
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onValidityChanged = (name, validationMessage) => {
    let temp = { ...this.state.validityState };
    temp[name] = validationMessage;
    this.setState({ validityState: temp });
  };

  testClick = () => {
    this.setState({ toggleDisplay: !this.state.toggleDisplay });
    //console.log(this.testTextInputRef.current.getValidationMessage);
  };

  mustBeEven = (val, name) => {
    console.log("in mustBeEven. val:", val);
    if (!val) {
      return null;
    }
    return val.length % 2 === 0 ? null : `value must be even in field ${name}`;
  };

  render() {
    return (
      <div>
        <h2>Hello!</h2>
        <button onClick={this.testClick}>test click</button>
        <br />
        <div>
          <TextInput
            name="testTextInput"
            label="label test"
            value={this.state.testTextInput}
            onChange={this.onChange}
            required
            onValidityChanged={this.onValidityChanged}
            ref={this.testTextInputRef}
            customValidations={[this.mustBeEven]}
          />
          <div>
            validation message:
            {JSON.stringify(this.state.validityState)}
          </div>
          <div>current value: {this.state.testTextInput}</div>
        </div>
        <br />
        <hr />
        {this.state.toggleDisplay ? <AutoComplete /> : null}
      </div>
    );
  }
}
