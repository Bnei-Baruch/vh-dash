import { combineReducers } from 'redux';

import themeReducer from './themeReducers';
import profileReducer from './profileReducers';
import settingsReducer from './settingsReducers';

export default combineReducers({
  themeReducer,
  profileReducer,
  settingsReducer
});
