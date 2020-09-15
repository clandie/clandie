/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

import { ColumnState } from '../constants/stateTypes';
// import { JobActionTypes, GET_JOB, CLEAR_JOB } from '../constants/actionTypes';

const initialState: ColumnState = {
  opportunities: [],
  applied: [],
  interviews: [],
  offers: [],
  rejected: [],
};

const columnReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default columnReducer;
