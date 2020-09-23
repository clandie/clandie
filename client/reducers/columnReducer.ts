/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

import { ColumnState } from '../constants/stateTypes';
import {
  ColumnActionTypes,
  UPDATE_OPPORTUNITIES,
  UPDATE_APPLIED,
  UPDATE_INTERVIEWS,
  UPDATE_OFFERS,
  UPDATE_REJECTED,
} from '../constants/actionTypes';

const initialState: ColumnState = {
  opportunities: [],
  applied: [],
  interviews: [],
  offers: [],
  rejected: [],
};

const columnReducer = (state = initialState, action: ColumnActionTypes) => {
  switch (action.type) {
    case UPDATE_OPPORTUNITIES:
      return {
        ...state,
        opportunities: action.payload,
      };

    case UPDATE_APPLIED:
      return {
        ...state,
        applied: action.payload,
      };

    case UPDATE_INTERVIEWS:
      return {
        ...state,
        interviews: action.payload,
      };

    case UPDATE_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };

    case UPDATE_REJECTED:
      return {
        ...state,
        rejected: action.payload,
      };

    default:
      return state;
  }
};

export default columnReducer;
