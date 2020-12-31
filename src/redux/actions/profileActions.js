import * as types from '../constants';

export function setProfile(value) {
  return {
    type: types.SET_PROFILE,
    payload: value
  }
}
