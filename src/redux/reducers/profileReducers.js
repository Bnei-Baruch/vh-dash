import * as types from '../constants';

const INIT_VALUER = {
  tenName: 'Hebrew 10'
};

export default function reducer(state= INIT_VALUER, actions) {
  switch (actions.type) {

    case types.SET_PROFILE:
      return {
        ...state,
        ...actions.payload
      }

    default:
      return state
  }
}
