import * as types from '../constants';

const INITIAL_STATE = {
  name: 'Lucy',
  tenName: 'Hebrew 10'
};

export default function reducer(state = INITIAL_STATE, actions) {
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
