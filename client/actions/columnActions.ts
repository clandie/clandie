import * as types from '../constants/types';
import { AppThunk } from '../store';
import _ from 'lodash';
import { GET_JOB, SET_COLUMNS } from '../constants/actionTypes';

export const updateListOrder = (jobs: types.IJobs[]): AppThunk => async (dispatch) => {
  const query = `mutation UpdateListOrder($jobs: [JobInput]) {
    updateListOrder(jobs: $jobs) {
      allJobs {
        _id
        status
        company
        title
        location
        salary
        url
        notes
        list_order
      }
    }
  }`;

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { jobs },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      const { allJobs } = data.data.updateListOrder[0];
      dispatch({
        type: SET_COLUMNS,
        payload: allJobs,
      });
      dispatch({
        type: GET_JOB,
        payload: allJobs,
      })
    })
    .catch((err) => {
      console.log('err in update list order action', err);
    });
};
