import { combineReducers } from 'redux';

import jobsReducer from './jobsReducer';
import usersReducer from './usersReducer';

// combine reducers
const reducers = combineReducers({
  jobs: jobsReducer,
  users: usersReducer,
});

export default reducers;
