import { combineReducers } from 'redux';
import languageReducer from './language';
import authReducer from './auth';
import sidebarReducer from './sidebar';
import themeReducer from './theme';

const rootReducer = combineReducers({
  language: languageReducer,
  auth: authReducer,
  sidebar: sidebarReducer,
  theme: themeReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
