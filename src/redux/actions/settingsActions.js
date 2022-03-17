import * as types from "../constants";

export function setSettings(value) {
  return {
    type: types.SET_SETTINGS,
    payload: value,
  };
}
