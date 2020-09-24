/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

import { ColumnState } from '../constants/stateTypes';
import {
  ColumnActionTypes,
  UPDATE_COLUMNS,
  UPDATE_OPPORTUNITIES,
  UPDATE_APPLIED,
  UPDATE_INTERVIEWS,
  UPDATE_OFFERS,
  UPDATE_REJECTED,
  CLEAR_COLUMNS,
} from '../constants/actionTypes';
import _ from 'lodash';
import { IJobs } from '../constants/types';

//* when typed to ColumnState, I get an error when accessing state (ie: state[column]) - need to look into this
const initialState: any = {
  opportunities: [],
  applied: [],
  interviews: [],
  offers: [],
  rejected: [],
};

//* Logic in here is quite repetitive, may need to refactor to make it dynamic

const columnReducer = (state = initialState, action: ColumnActionTypes) => {
  switch (action.type) {
    case UPDATE_COLUMNS:
      const column = action.payload.status;
      const copy: IJobs[] = _.cloneDeep(state[column]);

      copy[action.payload.list_order] = action.payload.job;
      return {
        ...state,
        [column]: copy,
      };

    // case UPDATE_OPPORTUNITIES:
    //   const oppCopy: IJobs[] = _.cloneDeep(state.opportunities);

    //   oppCopy[action.payload.list_order] = action.payload.job;
    //   return {
    //     ...state,
    //     opportunities: oppCopy,
    //   };

    // case UPDATE_APPLIED:
    //   const appCopy: IJobs[] = _.cloneDeep(state.applied);

    //   appCopy[action.payload.list_order] = action.payload.job;
    //   return {
    //     ...state,
    //     applied: appCopy,
    //   };

    // case UPDATE_INTERVIEWS:
    //   const intCopy: IJobs[] = _.cloneDeep(state.interviews);

    //   intCopy[action.payload.list_order] = action.payload.job;
    //   return {
    //     ...state,
    //     interviews: intCopy,
    //   };

    // case UPDATE_OFFERS:
    //   const offCopy: IJobs[] = _.cloneDeep(state.offers);

    //   offCopy[action.payload.list_order] = action.payload.job;
    //   return {
    //     ...state,
    //     offers: offCopy,
    //   };

    // case UPDATE_REJECTED:
    //   const rejCopy: IJobs[] = _.cloneDeep(state.rejected);

    //   rejCopy[action.payload.list_order] = action.payload.job;
    //   return {
    //     ...state,
    //     rejected: rejCopy,
    //   };

    case CLEAR_COLUMNS:
      return {
        ...state,
        opportunities: [],
        applied: [],
        interviews: [],
        offers: [],
        rejected: [],
      };

    default:
      return state;
  }
};

export default columnReducer;
