"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./TextInput.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_PureComponent) {
  _inherits(TextInput, _PureComponent);

  function TextInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call.apply(_ref, [this].concat(args))), _this), _this.inputRef = _this.props.innerRef || _react2.default.createRef(), _this.state = {
      blurred: false,
      validationMessage: ""
    }, _this.getId = function () {
      return _this.props.id || _this.props.name;
    }, _this.onBlur = function (e) {
      e.persist();
      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }

      if (!_this.state.blurred) {
        _this.setState({ blurred: true }, function () {
          _this.validate();
        });
      }
    }, _this.onChange = function (e) {
      e.persist();
      if (_this.props.onChange) {
        _this.props.onChange(e);
      }

      _this.validate();
    }, _this.validate = function () {
      var validationMessage = "";
      var innerRef = null; // = this.props.innerRef.current || this.inputRef.current;
      if (_this.props.innerRef) {
        innerRef = _this.props.innerRef.current;
      } else {
        innerRef = _this.inputRef.current;
      }
      if (!innerRef.validity.valid) {
        if (innerRef.validity.valueMissing) {
          validationMessage = "this field is required";
        }
      }

      if (!validationMessage && _this.props.customValidations) {
        _this.props.customValidations.forEach(function (val) {
          validationMessage = val(innerRef.value, _this.props.name);
        });
      }

      _this.validationMessage = validationMessage;
      console.log("validationMessage", validationMessage);
      _this.setState({ validationMessage: validationMessage });
      _this.props.onValidityChanged(_this.props.name, validationMessage);
    }, _this.getValidationMessage = function () {
      return _this.state.blurred || _this.props.submitted ? _this.state.validationMessage : null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.validate();
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          submitted = _props.submitted,
          customValidations = _props.customValidations,
          onValidityChanged = _props.onValidityChanged,
          onBlur = _props.onBlur,
          onChange = _props.onChange,
          innerRef = _props.innerRef,
          filterItems = _props.filterItems,
          thinProps = _objectWithoutProperties(_props, ["submitted", "customValidations", "onValidityChanged", "onBlur", "onChange", "innerRef", "filterItems"]);

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement("input", _extends({
          ref: this.props.innerRef || this.inputRef,
          id: this.getId(),
          onBlur: this.onBlur,
          onChange: this.onChange
        }, thinProps)),
        _react2.default.createElement(
          "div",
          { className: "validation-message" },
          this.getValidationMessage()
        )
      );
    }
  }]);

  return TextInput;
}(_react.PureComponent);

exports.default = _react2.default.forwardRef(function (props, ref) {
  return _react2.default.createElement(TextInput, _extends({ innerRef: ref }, props));
});