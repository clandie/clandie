import { combineReducers } from 'redux';

import jobReducer from './jobReducer';
import userReducer from './userReducer';
import boardReducer from './boardReducer';
import columnReducer from './columnReducer';
import interviewReducer from './interviewReducer';
import contactReducer from './contactReducer';

// combine reducers
const reducers: any = combineReducers({
  jobs: jobReducer,
  users: userReducer,
  boards: boardReducer,
  columns: columnReducer,
  interviews: interviewReducer,
  contacts: contactReducer,
});

export default reducers;
