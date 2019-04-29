"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./AutoComplete.css");

var _AutoCompleteItem = require("./AutoCompleteItem");

var _AutoCompleteItem2 = _interopRequireDefault(_AutoCompleteItem);

var _TextInput = require("./TextInput");

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoComplete = function (_Component) {
  _inherits(AutoComplete, _Component);

  function AutoComplete() {
    var _this2 = this;

    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this));

    _this.state = {
      currentFocus: -1,
      searchTerm: "",
      matches: []
    };

    _this.onChange = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var value, matches;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.persist();
                _this.props.onChange(e);
                value = e.target.value;
                _context.next = 5;
                return _this.filterItems(value);

              case 5:
                matches = _context.sent;

                // console.group("in autoComplete onChange");
                // console.log({ value });
                // console.groupEnd();
                _this.setState({ searchTerm: value, matches: matches }, function () {});

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.filterItems = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (value) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", []);

              case 2:
                if (!_this.props.filterItems) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return _this.props.filterItems(value, _this.props.items);

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                return _context2.abrupt("return", _this.props.items.filter(function (c) {
                  return c.toUpperCase().startsWith(value.toUpperCase());
                }));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.onKeyDown = function (e) {
      e.persist();
      //40 down
      //38 up
      //13 enter
      //27 esc
      //9 tab
      console.log("onKeyDown", e.keyCode);
      var key = e.keyCode;
      var matchesLength = _this.state.matches.length;
      var currentFocus = _this.state.currentFocus;

      switch (key) {
        case 40:
          if (currentFocus < matchesLength - 1 && matchesLength > 0) {
            _this.setState({ currentFocus: currentFocus + 1 });
          }
          e.preventDefault();
          break;
        case 38:
          if (currentFocus > -1 && matchesLength > 0) {
            _this.setState({ currentFocus: currentFocus - 1 });
          }
          e.preventDefault();
          break;
        case 13:
          if (currentFocus > -1) {
            var selectedValue = _this.state.matches[currentFocus];
            _this.props.onChange({
              target: { name: _this.props.name, value: selectedValue }
            });
            _this.setState({
              searchTerm: selectedValue,
              matches: [],
              currentFocus: -1
            });
            _this.props.onChange({
              target: { name: _this.props.name, value: selectedValue }
            });
          }
          break;
        case 9:
        case 27:
          _this.setState({ matches: [] });
          break;
        default:
          break;
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    };

    _this.onItemClick = function (itemIndex) {
      var clicked = _this.state.matches[itemIndex];
      _this.setState({
        searchTerm: clicked,
        matches: [],
        currentFocus: -1
      });
      _this.props.onChange({ target: { name: _this.props.name, value: clicked } });
    };

    _this.getItem = function (val, index) {
      return _react2.default.createElement(_AutoCompleteItem2.default, {
        key: val,
        index: index,
        currentFocus: _this.state.currentFocus,
        value: val,
        onItemClick: _this.onItemClick
      });
    };

    _this.getItems = function () {
      return _this.state.matches.map(function (item, index) {
        return _this.getItem(item, index);
      });
    };

    _this.onBlur = function (e) {};

    _this.clickEvent = document.addEventListener("click", function (e) {
      //console.log("classList", e.target.classList);
      if (!e.target.classList.contains("autocomplete-item")) {
        _this.setState({ matches: [] });
      }
      // if (!e.target.parentElement) {
      //   return;
      // }
      // const parentClassList = e.target.parentElement.classList;

      // const test1 = parentClassList.contains("auto-complete-items-container");
      // const test2 = parentClassList.contains("auto-complete-wrapper");
      // if (!test1 && !test2) {
      //   this.setState({ matches: [] });
      // }
    });

    _this.keyPressEvent = document.addEventListener("keydown", function (e) {
      console.log(e.keyCode);
      if (e.keyCode === 27) {
        _this.setState({ matches: [] });
      }
    });
    return _this;
  }

  _createClass(AutoComplete, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("click", this.clickEvent);
      document.removeEventListener("keydown", this.keyPressEvent);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          onKeyDown = _props.onKeyDown,
          onChange = _props.onChange,
          thinProps = _objectWithoutProperties(_props, ["onKeyDown", "onChange"]);

      return _react2.default.createElement(
        "div",
        { className: "auto-complete-wrapper" },
        _react2.default.createElement(_TextInput2.default, _extends({
          ref: this.props.innerRef,
          className: "ac-input",
          onKeyDown: this.onKeyDown,
          onChange: this.onChange
        }, thinProps)),
        this.state.matches && this.state.matches.length > 0 ? _react2.default.createElement(
          "div",
          { className: "auto-complete-items-container" },
          this.getItems()
        ) : null
      );
    }
  }]);

  return AutoComplete;
}(_react.Component);

//export default AutoComplete;


exports.default = _react2.default.forwardRef(function (props, ref) {
  return _react2.default.createElement(AutoComplete, _extends({ innerRef: ref }, props));
});