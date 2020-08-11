import { combineReducers } from 'redux';

import jobsReducer from './jobsReducer';

// combine reducers
const reducers = combineReducers({
  jobs: jobsReducer,
});

export default reducers;
