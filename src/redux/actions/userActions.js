import { createAction } from 'redux-act';

export const setLoggedInUser = createAction(
  'SET_LOGGEDIN_USER',
  (user, fn, ln, email, gender) => ({ user, fn, ln, email, gender }),
);
export const setFirstName = createAction('SET_FIRST_NAME', firstName => ({
  firstName,
}));
export const setLastName = createAction('SET_LAST_NAME', lastName => ({
  lastName,
}));
