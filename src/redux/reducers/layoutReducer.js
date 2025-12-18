import { createReducer } from "redux-act";
import { setPageTitle } from "../actions/layoutActions";

const initialState = {
  pageTitle: "",
};

export default createReducer(
  {
    [setPageTitle]: (state, action) => {
      return { ...state, pageTitle: action.title };
    },
  },
  initialState
);

