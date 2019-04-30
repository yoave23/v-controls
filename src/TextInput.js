import React, { PureComponent } from "react";
import "./TextInput.css";

class TextInput extends PureComponent {
  inputRef = this.props.innerRef || React.createRef();

  state = {
    blurred: false,
    validationMessage: ""
  };

  componentDidMount() {
    if (!this.props.noValidate) {
      this.validate();
    }
  }

  getId = () => {
    return this.props.id || this.props.name;
  };

  onBlur = e => {
    e.persist();
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    if (!this.props.noValidate) {
      if (!this.state.blurred) {
        this.setState({ blurred: true }, () => {
          this.validate();
        });
      }
    }
  };

  onChange = e => {
    e.persist();
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    if (!this.props.noValidate) {
      this.validate();
    }
  };

  validate = () => {
    let validationMessage = "";
    let innerRef = null; // = this.props.innerRef.current || this.inputRef.current;
    if (this.props.innerRef) {
      innerRef = this.props.innerRef.current;
    } else {
      innerRef = this.inputRef.current;
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
    //console.log("validationMessage", validationMessage);
    this.setState({ validationMessage });
    if (!this.props.noValidate)
      this.props.onValidityChanged(this.props.name, validationMessage);
  };

  getValidationMessage = () => {
    if (!this.props.noValidate)
      return this.state.blurred || this.props.submitted
        ? this.state.validationMessage
        : null;
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
      <React.Fragment>
        <input
          ref={this.props.innerRef || this.inputRef}
          id={this.getId()}
          onBlur={this.onBlur}
          onChange={this.onChange}
          {...thinProps}
        />
        {this.props.noValidate ? null : (
          <div className="validation-message">
            {this.getValidationMessage()}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <TextInput innerRef={ref} {...props} />
));
