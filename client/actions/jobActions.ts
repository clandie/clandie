import * as types from '../constants/types';
import { AppThunk } from '../store';
import { GET_JOB, CLEAR_JOB, SET_COLUMNS } from '../constants/actionTypes';
import _ from 'lodash';
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
    jobs(boardID: $boardId) {
      _id,
      status,
      company,
      title,
      location,
      salary,
      url,
      notes,
      list_order,
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
      console.log('ALL JOBS: ', allJobs);
      dispatch({
        type: GET_JOB,
        payload: allJobs.data.jobs,
      });
      dispatch({
        type: SET_COLUMNS,
        payload: allJobs.data.jobs,
      });
    });
};

export const createJob = (jobObj: types.IJobInput): AppThunk => async (
  dispatch
) => {
  const { status, company, title, board_id, list_order } = jobObj;
  const query = `mutation CreateJob($status: String!, $company: String!, $title: String!, $board_id: ID!, $list_order: Int!) {
   createJob(status: $status, company: $company, title: $title, boardID: $board_id, list_order: $list_order) { 
      __typename
      ... on Job {
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
      ... on BadUserInput {
        message
      }
    }
  }`;

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { status, company, title, board_id, list_order },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((newJob) => {
      const { allJobs } = newJob.data.createJob;
      console.log('new job created', newJob);
      dispatch({
        type: SET_COLUMNS,
        payload: allJobs,
      });
      dispatch({
        type: GET_JOB,
        payload: allJobs,
      });
    })

    .catch((err) => {
      console.log('error in create job action', err);
    });
};

export const updateDetails = (detailsObj: types.IDetails): AppThunk => async (
  dispatch
) => {
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
  if (salary === null || salary === 0) salary = '';
  if (url === null) url = '';
  if (notes === null) notes = '';

  const query = `mutation UpdateDetails($status: String!, $company: String!, $title: String!, $location: String!, $salary: String!, $url: String!, $notes: String!, $jobId: ID!) {
    updateJob(status: $status, company: $company, title: $title, location: $location, salary: $salary, url: $url, notes: $notes, jobID: $jobId) {
      __typename
      ... on Job {
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
      dispatch({
        type: GET_JOB,
        payload: data.data.updateJob.allJobs,
      });
    })
    .catch((err) => {
      console.log('err in update details action', err);
    });
};

export const deleteJob = (jobId: number, boardId: number): AppThunk => async (
  dispatch
) => {
  const query = `mutation DeleteJob($jobId: ID!) {
    deleteJob(jobID: $jobId) {
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
      variables: { jobId },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('deletedJob', data);
      dispatch({
        type: SET_COLUMNS,
        payload: data.data.deleteJob.allJobs,
      });
      dispatch({
        type: GET_JOB,
        payload: data.data.deleteJob.allJobs,
      });
    })
    .catch((err) => {
      console.log('err in delete job action', err);
    });
};

// drag and drop action - update status
export const updateStatus = (jobId: number, status: string): AppThunk => async (
  dispatch
) => {
  const query = `mutation UpdateStatus($jobId: ID!, $status: String!) {
    updateStatus(jobID: $jobId, status: $status) {
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
      variables: { jobId, status },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('updatedStatus', data);
      dispatch({
        type: GET_JOB,
        payload: data.data.updateStatus.allJobs,
      });
    })
    .catch((err) => {
      console.log('err in update status action', err);
    });
};

// drag and drop action - updating list order
//! need to reorder all affected jobs
export const updateOrder = (
  jobId: number,
  list_order: number
): AppThunk => async (dispatch) => {
  const query = `mutation UpdateOrder($jobId: ID!, $list_order: Int!) {
    updateOrder(jobID: $jobId, list_order: $list_order) {
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
      variables: { jobId, list_order },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('updatedOrder', data);
      dispatch({
        type: GET_JOB,
        payload: data.data.updateOrder.allJobs,
      });
    })
    .catch((err) => {
      console.log('err in update order action', err);
    });
};
