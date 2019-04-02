"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./AutoComplete.css");

var _AutoCompleteItem = require("./AutoCompleteItem");

var _AutoCompleteItem2 = _interopRequireDefault(_AutoCompleteItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

var AutoComplete = function (_Component) {
  _inherits(AutoComplete, _Component);

  function AutoComplete() {
    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this));

    _this.state = {
      currentFocus: -1,
      searchTerm: "",
      matches: []
    };

    _this.onAcChange = function (e) {
      var value = e.target.value;
      var matches = [];
      if (value.length > 0) {
        matches = countries.filter(function (c) {
          return c.toUpperCase().startsWith(value.toUpperCase());
        });
      } else {
        matches = [];
      }
      _this.setState({ searchTerm: value, matches: matches });
    };

    _this.onKeyDown = function (e) {
      //40 down
      //38 up
      //13 enter
      //27 esc
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
            _this.setState({
              searchTerm: selectedValue,
              matches: [],
              currentFocus: -1
            });
          }
          break;
        case 27:
          _this.setState({ matches: [] });
          break;
        default:
          break;
      }
    };

    _this.onItemClick = function (itemIndex) {
      var clicked = _this.state.matches[itemIndex];
      _this.setState({
        searchTerm: clicked,
        matches: [],
        currentFocus: -1
      });
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

    _this.clickEvent = document.addEventListener("click", function (e) {
      if (!e.target.parentElement) {
        return;
      }
      var parentClassList = e.target.parentElement.classList;
      var test1 = parentClassList.contains("auto-complete-items-container");
      var test2 = parentClassList.contains("auto-complete-wrapper");
      if (!test1 && !test2) {
        _this.setState({ matches: [] });
      }
    });
    return _this;
  }

  _createClass(AutoComplete, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("click", this.clickEvent);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "auto-complete-wrapper" },
        _react2.default.createElement(
          "div",
          null,
          "currentFocus: ",
          this.state.currentFocus
        ),
        _react2.default.createElement(
          "div",
          null,
          "matches.length: ",
          this.state.matches.length
        ),
        _react2.default.createElement("input", {
          type: "text",
          onChange: this.onAcChange,
          onKeyDown: this.onKeyDown,
          value: this.state.searchTerm
        }),
        _react2.default.createElement(
          "div",
          {
            className: "auto-complete-items-container",
            id: (this.props.id || this.props.name) + "auto-complete-items-container"
          },
          this.getItems()
        )
      );
    }
  }]);

  return AutoComplete;
}(_react.Component);

exports.default = AutoComplete;