import { AppThunk } from '../store';
import { CREATE_INTERVIEW } from '../constants/actionTypes';
// import { GET_INTERVIEW /*ADD_INTERVIEW*/ } from '../constants/actionTypes';

// export const getInterview = (jobId: number): AppThunk => async (dispatch) => {
//   const query = `query GetInterview($jobId: ID!){
//     interviews(jobID: $jobId) {
//       _id
//       title
//       date
//       time
//       notes
//     }
//   }`;
//   fetch('/graphql', {
//     method: 'POST',
//     body: JSON.stringify({
//       query,
//       variables: { jobId },
//     }),
//     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//   })
//     .then((res) => res.json())
//     .then((allInterviews) => {
//       console.log('All INTERVIEWS: ', allInterviews);
//       dispatch({
//         type: GET_INTERVIEW,
//         payload: allInterviews.data.interviews,
//       });
//     });
// };

// export const setInterview = (interviewObj: any) => ({
//   type: CREATE_INTERVIEW,
//   payload:interviewObj
// })

export const createInterview = (
  title: string,
  jobId: number
): AppThunk => async (dispatch) => {
  const query = `query CreateInterview($title: string!, $jobsID: ID!){
    mutation {
      createInterview (title: $title, jobsID: $jobsID){
        __typename
        .... on Interview {
          title
          date
          time
          notes
        }
        ... on BadUserInput {
          message
        }
      }
    }
  })`;

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
      console.log('NEW INTERVIEW: ', newInterview);
      dispatch({
        type: CREATE_INTERVIEW,
        payload: newInterview.data.interviews,
      });
    });
};
