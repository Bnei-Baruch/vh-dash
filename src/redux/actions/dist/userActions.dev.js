"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.setKeycloakData =
  exports.setLastName =
  exports.setFirstName =
  exports.setLoggedInUser =
    void 0;

var _reduxAct = require("redux-act");

var _constants = require("../constants");

var setLoggedInUser = (0, _reduxAct.createAction)(
  _constants.SET_LOGGEDIN_USER,
  function (user, fn, ln, email, gender) {
    return {
      user: user,
      fn: fn,
      ln: ln,
      email: email,
      gender: gender,
    };
  }
);
exports.setLoggedInUser = setLoggedInUser;
var setFirstName = (0, _reduxAct.createAction)(
  _constants.SET_FIRST_NAME,
  function (firstName) {
    return {
      firstName: firstName,
    };
  }
);
exports.setFirstName = setFirstName;
var setLastName = (0, _reduxAct.createAction)(
  _constants.SET_LAST_NAME,
  function (lastName) {
    return {
      lastName: lastName,
    };
  }
);
exports.setLastName = setLastName;
var setKeycloakData = (0, _reduxAct.createAction)(
  _constants.SET_KEYCLOAK_DATA,
  function (keycloak) {
    return {
      keycloak: keycloak,
    };
  }
);
exports.setKeycloakData = setKeycloakData;
