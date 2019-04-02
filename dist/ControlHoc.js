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
        errorMessage: ""
      }, _this.getErrorMessage = function () {
        if (_this.state.blurred || _this.props.submitted) {
          return _this.state.errorMessage;
        }
        return "";
      }, _this.onChange = function (e) {
        e.persist();
        if (_this.props.onChange) {
          _this.props.onChange(e);
        }
        _this.validate(e.target.value);
      }, _this.onBlur = function (e) {
        e.persist();
        if (_this.props.onBlur) {
          _this.props.onBlur(e);
        }

        _this.setState({ blurred: true }, function () {
          _this.validate(e.target.value);
        });
      }, _this.validate = function (value) {
        if (!_this.props.validationRules) {
          return;
        }
        var tempMessage = "";
        _this.props.validationRules.forEach(function (rule) {
          var message = rule(value);
          if (message) {
            tempMessage = message;
            return;
          }
        });
        _this.setState({ errorMessage: tempMessage }, function () {
          _this.props.onValidityChanged(_this.props.name, _this.state.errorMessage);
        });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    // strip down props used internally (we'll call them later if needed)

    _createClass(ControlHoc, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.validate(this.props.value || "");
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.onValidityChanged(this.props.name, true, "");
      }
    }, {
      key: "render",
      value: function render() {
        //const { forwardedRef } = this.props;
        console.log("hoc props", this.props);

        var _props = this.props,
            onChange = _props.onChange,
            submitted = _props.submitted,
            validationRules = _props.validationRules,
            onValidityChanged = _props.onValidityChanged,
            getErrorMessage = _props.getErrorMessage,
            validate = _props.validate,
            reservedProps = _props.reservedProps,
            getThinProps = _props.getThinProps,
            customValidations = _props.customValidations,
            thinProps = _objectWithoutProperties(_props, ["onChange", "submitted", "validationRules", "onValidityChanged", "getErrorMessage", "validate", "reservedProps", "getThinProps", "customValidations"]);

        console.log("hoc thinProps", this.props);
        console.log("hoc thinProps", thinProps);

        return _react2.default.createElement(WrappedControl, _extends({
          onChange: this.onChange,
          onBlur: this.onBlur,
          validate: this.validate
        }, thinProps));
      }
    }]);

    return ControlHoc;
  }(_react.Component);

  return _react2.default.forwardRef(function (props) {
    return _react2.default.createElement(ControlHoc, props);
  });
}