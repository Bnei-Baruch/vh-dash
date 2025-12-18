import { createAction } from "redux-act";
import { SET_PAGE_TITLE } from "../constants";

export const setPageTitle = createAction(SET_PAGE_TITLE, (title) => ({
  title,
}));

