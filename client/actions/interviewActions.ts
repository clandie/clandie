import { AppThunk } from '../store';
import { CREATE_INTERVIEW, GET_INTERVIEW, UPDATE_INTERVIEW } from '../constants/actionTypes';
import {IInterviews} from '../constants/types';

export const getInterview = (jobId: number): AppThunk => async (dispatch) => {
  const query = `query GetInterview($jobId: ID!){
    interviews(jobID: $jobId) {
      _id
      title
      date
      time
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
      // console.log('All INTERVIEWS: ', allInterviews);
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
  // console.log('args to createInterview: ', title, jobId);
  const query = `mutation CreateInterview($title: String!, $jobId: ID!) {
    createInterview (title: $title, jobsID: $jobId) {
      __typename
      ... on Interview {
        allInterviews{
          _id
          title
          date
          time
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
      dispatch({
        type: GET_INTERVIEW,
        payload: newInterview.data.createInterview.allInterviews,
      });
    })
    .catch((err) => console.log('error in create interview action', err));
};


export const updateInterview = (interviewObj: IInterviews | undefined): AppThunk => async (dispatch) => {
  console.log('args to updateInterview: ', interviewObj)
  
  let interviewID, title, date, time, notes;
  if (interviewObj){
    interviewID = interviewObj._id;
    title = interviewObj.title;
    date = interviewObj.date;
    time = interviewObj.time;
    notes = interviewObj.notes; 
  }

  const query = `mutation UpdateInterview ($title: String, $date: Date, $time: Date, $notes: String, $interviewID: ID!) {
    updateInterview (title: $title, date: $date, time: $time, notes: $notes, interviewID: $interviewID) {
      __typename
      ... on Interview {
        allInterviews{
          _id
          title
          date
          time
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
      variables: { title, date, time, notes, interviewID },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'applicaiton/json' },
  })
  .then((res) => res.json())
  .then((updatedInterviews) => {
    console.log('updates from interviewActions.ts', updatedInterviews);
    dispatch({
      type: UPDATE_INTERVIEW,
      payload: updatedInterviews.data.updateInterview.allInterviews
    });
    dispatch({
      type: GET_INTERVIEW,
      payload: updatedInterviews.data.updateInterview.allInterviews
    });
  })
  .catch((err) => console.log('error in update interview action', err));
};