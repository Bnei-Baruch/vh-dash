import { createReducer } from "redux-act";
import {
  setLoggedInUser,
  setFirstName,
  setLastName,
  setKeycloakData,
  setMembershipData
} from "../actions/userActions";

const initialState = {
  info: {},
  membership: {},
};

export default createReducer(
  {
    [setLoggedInUser]: (state, action) => {
      return { ...state, info: action.user };
    },
    [setFirstName]: (state, action) => {
      return { ...state, info: action.user };
    },
    [setLastName]: (state, action) => {
      return { ...state, info: action.user };
    },
    [setKeycloakData]: (state, action) => {
      return { ...state, keycloak: action.keycloak };
    },
    [setMembershipData]: (state, action) => {
      return { ...state, membership: action.data };
    }
  },
  initialState
);
