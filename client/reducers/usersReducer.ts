/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

import { UserState } from '../constants/stateTypes';
import { UserActionTypes, SET_USER_INFO } from '../constants/actionTypes';

// we may need to add more to this later
const initialState: UserState = {
  id: null,
  name: '',
  // email: '',
  // password: '',
  authorized: false,
};

const usersReducer = (state = initialState, action: UserActionTypes) => {
  console.log('currState', state);

  switch (action.type) {
    case SET_USER_INFO:
      console.log('set user info test');
      console.log('ap', action.payload);
      const { _id, name } = action.payload;
      return {
        ...state,
        id: _id,
        name,
        authorized: true,
      };
    default:
      return state;
  }
};

export default usersReducer;
