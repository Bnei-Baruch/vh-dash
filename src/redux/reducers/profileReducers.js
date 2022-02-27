import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  TOGGLE_PROFILE_WINDOW,
} from "../constants";

const INITIAL_STATE = {
  info: {},
  modalContent: {
    isModalOpen: false,
    description: "",
  },
  isProfileExist: false,
  error: "",
};

export default function reducer(state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        info: actions.payload,
        isProfileExist: true,
      };

    case FETCH_PROFILE_FAILED:
      return {
        ...state,
        error: actions.payload,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        modalContent: {
          ...state.modalContent,
          description: actions.payload,
        },
      };

    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        modalContent: {
          ...state.modalContent,
          description: actions.payload,
        },
      };

    case TOGGLE_PROFILE_WINDOW:
      return {
        ...state,
        modalContent: {
          ...state.modalContent,
          isModalOpen: actions.payload,
        },
      };

    default:
      return state;
  }
}
