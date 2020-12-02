/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

import { ContactState } from '../constants/stateTypes';
import { ContactActionTypes, CREATE_CONTACT, UPDATE_CONTACT, GET_CONTACT } from '../constants/actionTypes';

const initialState: ContactState = {
  contacts: [],
};

const contactReducer = (state = initialState, action: ContactActionTypes) => {
  console.log('currContactState', state)
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload
      }

    case CREATE_CONTACT:
      return {
        ...state,
        contacts: action.payload,
      };

    case UPDATE_CONTACT:
      return {
        ...state,
      }

    default:
      return state;
  }
};

export default contactReducer;
