"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./AutoCompleteItem.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoCompleteItem = function (_Component) {
  _inherits(AutoCompleteItem, _Component);

  function AutoCompleteItem(props) {
    _classCallCheck(this, AutoCompleteItem);

    var _this = _possibleConstructorReturn(this, (AutoCompleteItem.__proto__ || Object.getPrototypeOf(AutoCompleteItem)).call(this, props));

    _this.getClassName = function () {
      var className = "autocomplete-item";
      if (_this.props.index === _this.props.currentFocus) {
        className += " selected";
      }
      return className;
    };

    _this.onClick = function (e) {
      //console.log(`item '${this.props.value}' was clicked`);
      _this.props.onItemClick(_this.props.index);
    };

    _this.state = {};
    return _this;
  }

  _createClass(AutoCompleteItem, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: this.getClassName(), onClick: this.onClick },
        this.props.value
      );
    }
  }]);

  return AutoCompleteItem;
}(_react.Component);

exports.default = AutoCompleteItem;