"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.controlHoc = controlHoc;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function controlHoc(WrappedControl) {
  var ControlHoc = function (_Component) {
    _inherits(ControlHoc, _Component);

    function ControlHoc() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, ControlHoc);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ControlHoc.__proto__ || Object.getPrototypeOf(ControlHoc)).call.apply(_ref, [this].concat(args))), _this), _this.controlRef = _react2.default.createRef(), _this.state = {
        blurred: "",
        validationMessage: ""
      }, _this.getValidationMessage = function () {
        return _this.state.blurred || _this.props.submitted ? _this.state.validationMessage : null;
      }, _this.onChange = function (e) {
        e.persist();
        if (_this.props.onChange) {
          _this.props.onChange(e);
        }
        _this.validate();
      }, _this.onBlur = function (e) {
        e.persist();
        if (_this.props.onBlur) {
          _this.props.onBlur(e);
        }

        _this.setState({ blurred: true }, function () {
          _this.validate();
        });
      }, _this.validate = function () {
        var validationMessage = "";
        var innerRef = null; // = this.props.innerRef.current || this.inputRef.current;
        if (_this.props.controlRef) {
          innerRef = _this.props.controlRef.current;
        } else {
          innerRef = _this.controlRef.current;
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
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ControlHoc, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.validate();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.onValidityChanged(this.props.name, true, "");
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

        return _react2.default.createElement(WrappedControl, _extends({
          getValidationMessage: this.getValidationMessage,
          onChange: this.onChange,
          onBlur: this.onBlur,
          validate: this.validate,
          ref: this.props.controlRef || this.controlRef
        }, thinProps));
      }
    }]);

    return ControlHoc;
  }(_react.Component);

  return _react2.default.forwardRef(function (props, ref) {
    return _react2.default.createElement(ControlHoc, _extends({ controlRef: ref }, props));
  });
}