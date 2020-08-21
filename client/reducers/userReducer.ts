/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

import { UserState } from '../constants/stateTypes';
import {
  UserActionTypes,
  SET_USER_INFO,
  CLEAR_USER_INFO,
} from '../constants/actionTypes';

// we may need to add more to this later
const initialState: UserState = {
  id: null,
  name: '',
  authorized: false,
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  console.log('currUserState', state);

  switch (action.type) {
    case SET_USER_INFO:
      const { _id, name } = action.payload;
      return {
        ...state,
        id: _id,
        name,
        authorized: true,
      };

    case CLEAR_USER_INFO:
      return {
        ...state,
        id: null,
        name: '',
        authorized: false,
      };
    default:
      return state;
  }
};

export default userReducer;
