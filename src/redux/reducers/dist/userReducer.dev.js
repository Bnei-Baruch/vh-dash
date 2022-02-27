"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _reduxAct = require("redux-act");

var _userActions = require("../actions/userActions");

var _createReducer;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var initialState = {
  info: {},
};

var _default = (0, _reduxAct.createReducer)(
  ((_createReducer = {}),
  _defineProperty(
    _createReducer,
    _userActions.setLoggedInUser,
    function (state, action) {
      return _objectSpread({}, state, {
        info: action.user,
      });
    }
  ),
  _defineProperty(
    _createReducer,
    _userActions.setFirstName,
    function (state, action) {
      return _objectSpread({}, state, {
        info: action.user,
      });
    }
  ),
  _defineProperty(
    _createReducer,
    _userActions.setLastName,
    function (state, action) {
      return _objectSpread({}, state, {
        info: action.user,
      });
    }
  ),
  _defineProperty(
    _createReducer,
    _userActions.setKeycloakData,
    function (state, action) {
      console.log(action);
      return _objectSpread({}, state, {
        keycloak: action.keycloak,
      });
    }
  ),
  _createReducer),
  initialState
);

exports["default"] = _default;
