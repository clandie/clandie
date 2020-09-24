import { combineReducers } from 'redux';

import jobReducer from './jobReducer';
import userReducer from './userReducer';
import boardReducer from './boardReducer';
import columnReducer from './columnReducer';

// combine reducers
const reducers: any = combineReducers({
  jobs: jobReducer,
  users: userReducer,
  boards: boardReducer,
  columns: columnReducer,
});

export default reducers;
