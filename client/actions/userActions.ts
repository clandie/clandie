/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import { ThunkAction } from 'redux-thunk';
// import { UserState } from '../constants/stateTypes';
// import { UserActionTypes, ADD_USER } from '../constants/actionTypes';
import * as types from '../constants/types';
import { AppThunk } from '../store';

/**
 * Redux thunk w/ TS - refer to AppThunk in store.ts
 * ThunkAction<void, TAppState, null, Action<string>> - general thunk action?
 * if above doesn't work, try ThunkAction<void, UserState, null, UserActionTypes>
 *
 */
// Thunk middleware will turn async actions into actions
export const addUser = (userObj: types.ISignupState): AppThunk => async (
  dispatch
) => {
  console.log('adduser thunk', userObj);
  // fetch request to create user in db
};

export const verifyUser = (userObj: types.ILoginState): AppThunk => async (
  dispatch
) => {
  console.log('verify user thunk', userObj);
  const userEmail = `${userObj.email}`;
  console.log(userEmail);
  const query = `query VerifyUser($userEmail: String!) { 
    user(email: $userEmail) {
      name
    }
  }`;
  console.log('query', query);

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables: { userEmail } }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((userAuthed) => {
      console.log(userAuthed);
      if (userAuthed.data !== null) {
        console.log('success!');
      }
    })
    .catch((err) => {
      console.log('verifyuser action fetch error', err);
    });
};
