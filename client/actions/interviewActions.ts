import { AppThunk } from '../store';
import { CREATE_INTERVIEW, GET_INTERVIEW, UPDATE_INTERVIEW } from '../constants/actionTypes';
import {IInterviews} from '../constants/types';
// let dayjs = require('dayjs');

export const getInterview = (jobId: number): AppThunk => async (dispatch) => {
  const query = `query GetInterview($jobId: ID!){
    interviews(jobID: $jobId) {
      _id
      title
      date
      time
      timezone
      notes
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
    .then((allInterviews) => {
      dispatch({
        type: GET_INTERVIEW,
        payload: allInterviews.data.interviews,
      });
    });
};

export const setInterview = (interviewObj: any) => ({
  type: CREATE_INTERVIEW,
  payload: interviewObj
})

export const createInterview = (
  title: string,
  jobId: number
): AppThunk => async (dispatch) => {
  const query = `mutation CreateInterview($title: String!, $jobId: ID!) {
    createInterview (title: $title, jobsID: $jobId) {
      __typename
      ... on Interview {
        allInterviews{
          _id
          title
          date
          time
          timezone
          notes
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
      variables: { title, jobId },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'applicaiton/json' },
  })
    .then((res) => res.json())
    .then((newInterview) => {
      dispatch({
        type: CREATE_INTERVIEW,
        payload: newInterview.data.createInterview.allInterviews,
      });
    })
    .catch((err) => console.log('error in create interview action', err));
};


export const updateInterview = (interviewObj: IInterviews | undefined): AppThunk => async (dispatch) => { 
  let interviewID, title, date, time, timezone, notes;
  if (interviewObj){
    interviewID = interviewObj._id;
    title = interviewObj.title;
    date = interviewObj.date;
    time = interviewObj.time;
    timezone = interviewObj.timezone;
    notes = interviewObj.notes; 
  }

  // console.log('time from updateInterview: ', time)
  // console.log(dayjs(time).format())
  // if(typeof time === 'string') time = new Date(time);
  
  const query = `mutation UpdateInterview ($title: String, $date: Date, $time: Date, $timezone: String, $notes: String, $interviewID: ID!) {
    updateInterview (title: $title, date: $date, time: $time, timezone: $timezone, notes: $notes, interviewID: $interviewID) {
      __typename
      ... on Interview {
        allInterviews{
          _id
          title
          date
          time
          timezone
          notes
        }
      }
      ... on BadUserInput {
        message
      }
    }
  }`

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { title, date, time, timezone, notes, interviewID },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'applicaiton/json' },
  })
  .then((res) => res.json())
  .then((updatedInterviews) => {
    dispatch({
      type: UPDATE_INTERVIEW,
      payload: updatedInterviews.data.updateInterview.allInterviews
    });
  })
  .catch((err) => console.log('error in update interview action', err));
};

export const deleteInterview = (interviewID: number) : AppThunk => async (dispatch) => {
  const query = `mutation DeleteInterview($interviewID: ID!){
    deleteInterview(interviewID: $interviewID){
      allInterviews{
        _id
        title
        date
        time
        timezone
        notes
      }
    }
  }`;

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { interviewID },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((allInterviews) => {
      dispatch({
        type: GET_INTERVIEW,
        payload: allInterviews.data.deleteInterview.allInterviews
      });
    })
}