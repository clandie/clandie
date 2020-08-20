import { combineReducers } from 'redux';

import jobReducer from './jobReducer';
import userReducer from './userReducer';
import boardReducer from './boardReducer';

// combine reducers
const reducers: any = combineReducers({
  jobs: jobReducer,
  users: userReducer,
  boards: boardReducer,
});

export default reducers;
