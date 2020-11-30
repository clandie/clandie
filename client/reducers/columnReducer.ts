/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

// import { ColumnState } from '../constants/stateTypes';
import {
  ColumnActionTypes,
  UPDATE_COLUMNS,
  SET_COLUMNS,
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
    // case UPDATE_COLUMNS:
    //   const column = action.payload.status;
    //   const copy: IJobs[] = _.cloneDeep(state[column]);
    //   copy[action.payload.list_order] = action.payload.job;
    //   console.log('column', column);
    //   console.log('copy', copy);
    //   return {
    //     ...state,
    //     [column]: copy,
    //   };
    case UPDATE_COLUMNS:
      return {
        ...state,
      };

    case SET_COLUMNS:
      const opportunities = [];
      const applied = [];
      const interviews = [];
      const offers = [];
      const rejected = [];

      // populate each array by status
      const allJobs: IJobs[] = _.cloneDeep(action.payload);
      for (let i = 0; i < allJobs.length; i++) {
        // make deep copy of job obj
        const obj = _.cloneDeep(allJobs[i]);
        if (allJobs[i].status === 'opportunities') {
          opportunities.push(obj);
        } else if (allJobs[i].status === 'applied') {
          applied.push(obj);
        } else if (allJobs[i].status === 'interviews') {
          interviews.push(obj);
        } else if (allJobs[i].status === 'offers') {
          offers.push(obj);
        } else if (allJobs[i].status === 'rejected') {
          rejected.push(obj);
        }
      }

      // sort by list order
      opportunities.sort((a, b) => a.list_order - b.list_order);
      applied.sort((a, b) => a.list_order - b.list_order);
      interviews.sort((a, b) => a.list_order - b.list_order);
      offers.sort((a, b) => a.list_order - b.list_order);
      rejected.sort((a, b) => a.list_order - b.list_order);

      return {
        ...state,
        opportunities,
        applied,
        interviews,
        offers,
        rejected,
      };

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
