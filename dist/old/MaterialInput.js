'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ControlHoc = require('./ControlHoc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import M from 'materialize-css';
// import M from '../node_modules/materialize-css/dist/js/materialize.min.js';
// import '../node_modules/materialize-css/dist/css/materialize.min.css';

var MaterialInput = function (_Component) {
    _inherits(MaterialInput, _Component);

    function MaterialInput(props) {
        _classCallCheck(this, MaterialInput);

        var _this = _possibleConstructorReturn(this, (MaterialInput.__proto__ || Object.getPrototypeOf(MaterialInput)).call(this, props));

        _this.state = {
            errorMessage: '',
            blurred: false
        };

        // if a ref was passed use it, else create a new one
        _this.innerRef = _this.props.innerRef || _react2.default.createRef();
        return _this;
    }

    _createClass(MaterialInput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //M.AutoInit(this.innerRef.current);
            M.AutoInit(this.innerRef.current);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            M.AutoInit(this.innerRef.current);
        }
    }, {
        key: 'render',
        value: function render() {
            var inputProps = _extends({}, this.props.getThinProps(this.props, this.props.reservedProps));
            if (!inputProps.id) {
                inputProps.id = inputProps.name;
            }

            console.log(inputProps);
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement('input', _extends({ ref: this.innerRef, onChange: this.props.onChange
                }, inputProps, { type: 'text' })),
                _react2.default.createElement(
                    'label',
                    { htmlFor: inputProps.id },
                    this.props.label
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'error-msg' },
                    this.props.getErrorMessage()
                )
            );
        }
    }]);

    return MaterialInput;
}(_react.Component);

MaterialInput.propTypes = {
    label: _propTypes2.default.string.isRequired,
    submitted: _propTypes2.default.bool.isRequired,
    validationRules: _propTypes2.default.array,
    onValidityChanged: _propTypes2.default.func.isRequired
};

exports.default = (0, _ControlHoc.controlHoc)(_react2.default.forwardRef(function (props, ref) {
    return _react2.default.createElement(MaterialInput, _extends({ innerRef: ref }, props));
}));

/*
            // <div className="validatable-material">
            //     <input ref={this.innerRef}
            //         onChange={this.props.onChange}
            //         onBlur={this.props.onBlur}
            //         {...inputProps}
            //     />
            //     <span className="highlight" />
            //     <span className="bar" />
            //     <label className="floating-label">{this.props.label}</label>
            //     <div className="error-msg">
            //         {this.props.getErrorMessage()}
            //     </div>
            // </div>
*/