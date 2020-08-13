/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

import { UserState } from '../constants/stateTypes';
import { UserActionTypes } from '../constants/actionTypes';

// we may need to add more to this later
const initialState: UserState = {
  name: '',
  email: '',
  password: '',
};

const usersReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default usersReducer;
