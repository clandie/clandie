import * as types from '../constants/types';
import { AppThunk } from '../store';
import { GET_JOB, CLEAR_JOB } from '../constants/actionTypes';

/**
 * Redux thunk w/ TS - refer to AppThunk in store.ts
 * ThunkAction<void, TAppState, null, Action<string>> - general thunk action?
 * if above doesn't work, try ThunkAction<void, UserState, null, UserActionTypes>
 *
 */

export const clearJob = () => ({
  type: CLEAR_JOB,
});

export const getJob = (boardId: number): AppThunk => async (dispatch) => {
  const query = `query GetJob($boardId: ID!){
    jobs(id: $boardId) {
      _id,
      status,
      company,
      title,
      location,
      salary,
      url,
      notes,
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
   createJob(status: $status, company: $company, title: $title, id: $board_id) { 
      __typename
      ... on Job {
        status,
        company,
        title
      }
      ... on BadUserInput {
        message
      }
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
      console.log('new job created', newJob);
    })
    .then(() => {
      dispatch(getJob(board_id));
    })

    .catch((err) => {
      console.log('error in create job action', err);
    });
};

export const updateDetails = (
  detailsObj: types.IDetails,
  boardId: number
): AppThunk => async (dispatch) => {
  let {
    status,
    company,
    title,
    location,
    salary,
    url,
    notes,
    jobId,
  } = detailsObj;
  if (salary && typeof salary !== 'string') salary = salary.toString();
  if (location === null) location = '';
  if (salary === null) salary = '';
  if (url === null) url = '';
  if (notes === null) notes = '';

  const query = `mutation UpdateDetails($status: String!, $company: String!, $title: String!, $location: String!, $salary: String!, $url: String!, $notes: String!, $jobId: ID!) {
    updateJob(status: $status, company: $company, title: $title, location: $location, salary: $salary, url: $url, notes: $notes, jobID: $jobId) {
      __typename
      ... on Job {
        company,
        title,
        location,
        salary,
        url,
        notes
      }
      ... on BadUserInput {
        message
      }
    }
  }`;

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: {
        status,
        company,
        title,
        location,
        salary,
        url,
        notes,
        jobId,
      },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data);
    })
    .then(() => {
      dispatch(getJob(boardId));
    })
    .catch((err) => {
      console.log('err in update details action', err);
    });
};

export const deleteJob = (jobId: number, boardId: number): AppThunk => async (
  dispatch
) => {
  const query = `mutation DeleteJob($jobId: ID!) {
    deleteJob(id: $jobId) {
      company,
      title,
    }
  }`;

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { jobId },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('deletedJob', data);
      dispatch(getJob(boardId));
    })
    .catch((err) => {
      console.log('err in delete job action', err);
    });
};
