import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import jwtDecode from 'jwt-decode';
import persistLocalStorage from './strategies/localStorage';
var CONTEXT = {
  token: null,
  authenticating: false,
  user: null
};

var _React$createContext = React.createContext(CONTEXT),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

var TOKEN_KEY = 'token';
var provider = null;
export var getProvider = function getProvider() {
  return provider;
};

var AuthenticationProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AuthenticationProvider, _React$Component);

  function AuthenticationProvider(props) {
    var _this;

    _classCallCheck(this, AuthenticationProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthenticationProvider).call(this, props));

    _this.mapGetters = function () {
      return Object.entries(_this.props.getters).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            getter = _ref2[1];

        return _objectSpread(_defineProperty({}, key, function () {
          for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
          }

          return getter.apply(void 0, [_this.getProviderState()].concat(params));
        }), acc);
      }, {});
    };

    _this.updateToken =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(token) {
        var _ref4, authenticated;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.storeToken(token);

              case 2:
                _ref4 = _context.sent;
                authenticated = _ref4.authenticated;

                if (authenticated) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", _this.fetchUser());

              case 6:
                return _context.abrupt("return", Promise.resolve());

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.storeToken = function (token) {
      return new Promise(function (resolve) {
        _this.props.persistStrategy.persist(token);

        _this.setState({
          token: token
        }, function () {
          return resolve(_this.getProviderState());
        });
      });
    };

    _this.fetchUser =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2() {
      var payload, decoded;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _this.props.fetchUser();

            case 3:
              payload = _context2.sent;
              decoded = _this.props.decodeToken(_this.state.token);

              _this.handleSuccess(decoded);

              return _context2.abrupt("return", payload);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);

              _this.handleFailure();

              return _context2.abrupt("return", _context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    _this.logout = function () {
      _this.handleFailure(_this.props.onLogout);
    };

    _this.state = {
      token: props.persistStrategy.get() || null,
      authenticating: true,
      userId: null
    };
    provider = _assertThisInitialized(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AuthenticationProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.state.token) {
        this.fetchUser();
      }
    }
  }, {
    key: "getProviderState",
    value: function getProviderState() {
      return _objectSpread({
        token: this.state.token,
        authenticating: this.authenticating,
        authenticated: this.authenticated,
        userId: this.state.userId,
        updateToken: this.updateToken,
        logout: this.logout
      }, this.mapGetters());
    }
  }, {
    key: "handleSuccess",
    value: function handleSuccess(decoded) {
      this.setState({
        userId: this.props.getDecodedUserId(decoded),
        authenticating: false
      });
    }
  }, {
    key: "handleFailure",
    value: function handleFailure() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.props.persistStrategy.clear();
      this.setState({
        userId: null,
        authenticating: false,
        token: null
      }, callback);
    }
  }, {
    key: "renderBody",
    value: function renderBody() {
      return this.props.children(this.getProviderState());
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Provider, {
        value: this.getProviderState()
      }, this.renderBody());
    }
  }, {
    key: "authenticating",
    get: function get() {
      return !!this.state.token && this.state.authenticating;
    }
  }, {
    key: "authenticated",
    get: function get() {
      return !!this.state.token && !!this.state.userId && !this.authenticating;
    }
  }]);

  return AuthenticationProvider;
}(React.Component);

AuthenticationProvider.defaultProps = {
  getters: {},
  decodeToken: function decodeToken(token) {
    return jwtDecode(token);
  },
  getDecodedUserId: function getDecodedUserId(_ref6) {
    var sub = _ref6.sub;
    return sub;
  },
  persistStrategy: persistLocalStorage(TOKEN_KEY),
  onLogout: function onLogout() {}
};
export default AuthenticationProvider;
export { Consumer };