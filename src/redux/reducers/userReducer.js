import { createReducer } from "redux-act";
import {
  setLoggedInUser,
  setFirstName,
  setLastName,
  setKeycloakData,
  setMembershipDataV2,
} from "../actions/userActions";

const initialState = {
  info: {},
  membership: {},
  membershipV2: {},
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
    [setMembershipDataV2]: (state, action) => {
      return { ...state, membershipV2: action.data };
    },
  },
  initialState
);
