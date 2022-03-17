import * as types from "../constants";

const INITIAL_STATE = {
  language: "en",
};

export default function reducer(state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case types.SET_SETTINGS:
      return {
        ...state,
        ...actions.payload,
      };

    default:
      return state;
  }
}
