import { AppThunk } from '../store';
import { GET_INTERVIEW /*ADD_INTERVIEW*/ } from '../constants/actionTypes';

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
      console.log('All INTERVIEWS: ', allInterviews);
      dispatch({
        type: GET_INTERVIEW,
        payload: allInterviews.data.interviews,
      });
    });
};
