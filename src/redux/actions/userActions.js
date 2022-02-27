import { createAction } from "redux-act";
import {
  SET_FIRST_NAME,
  SET_KEYCLOAK_DATA,
  SET_LAST_NAME,
  SET_LOGGEDIN_USER,
} from "../constants";

export const setLoggedInUser = createAction(
  SET_LOGGEDIN_USER,
  (user, fn, ln, email, gender) => ({ user, fn, ln, email, gender })
);
export const setFirstName = createAction(SET_FIRST_NAME, (firstName) => ({
  firstName,
}));
export const setLastName = createAction(SET_LAST_NAME, (lastName) => ({
  lastName,
}));

export const setKeycloakData = createAction(SET_KEYCLOAK_DATA, (keycloak) => ({
  keycloak,
}));
