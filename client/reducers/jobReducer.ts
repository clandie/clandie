/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

import { JobState } from '../constants/stateTypes';
import { JobActionTypes, GET_JOB, CLEAR_JOB } from '../constants/actionTypes';

const initialState: JobState = {
  jobs: [],
};

const jobReducer = (state = initialState, action: JobActionTypes) => {
  switch (action.type) {
    case GET_JOB:
      return {
        ...state,
        jobs: action.payload,
      };

    case CLEAR_JOB:
      return {
        ...state,
        jobs: [],
      };
    default:
      return state;
  }
};

export default jobReducer;
