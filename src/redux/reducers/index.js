import { combineReducers } from 'redux';

import themeReducer from './themeReducers';
import profileReducer from './profileReducers';
import settingsReducer from './settingsReducers';
import streamReducer from './streamReducer';

export default combineReducers({
  themeReducer,
  profileReducer,
  settingsReducer,
  streamReducer
});
