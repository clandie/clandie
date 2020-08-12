/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */

const initialState = {};

const jobsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default jobsReducer;
