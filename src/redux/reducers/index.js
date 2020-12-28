import { combineReducers } from 'redux';

import themeReducer from './themeReducers';
import profileReducer from './profileReducers';

export default combineReducers({
  themeReducer,
  profileReducer
});
