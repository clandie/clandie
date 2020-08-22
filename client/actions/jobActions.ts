import * as types from '../constants/types';
import { AppThunk } from '../store';
import { GET_JOB } from '../constants/actionTypes';

export const getJob = (boardId: number): AppThunk => async (dispatch) => {
  const query = `query GetJob($boardId: ID!){
    jobs(id: $boardId) {
      status,
      company,
      title,
    }
  }`;
  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { boardId },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((allJobs) => {
      console.log(allJobs);
      dispatch({
        type: GET_JOB,
        payload: allJobs.data.jobs,
      });
    });
};

export const createJob = (jobObj: types.IJobInput): AppThunk => async (
  dispatch
) => {
  const { status, company, title, board_id } = jobObj;
  const query = `mutation CreateJob($status: String!, $company: String!, $title: String!, $board_id: ID!) {
   createJob(status: $status, company: $company, title: $title, id: $board_id) { status,
      company,
      title
    }
  }`;
  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { status, company, title, board_id },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((newJob) => {
      console.log(newJob);
    })
    .catch((err) => {
      console.log('error in create job action', err);
    });
};
