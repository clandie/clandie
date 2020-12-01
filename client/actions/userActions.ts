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

import * as types from '../constants/types';
import {
  SET_USER_INFO,
  CLEAR_USER_INFO,
  GET_BOARD,
  INVALID_USER_INFO,
  INCOMPLETE_USER_INFO,
} from '../constants/actionTypes';
import { AppThunk } from '../store';

/**
 * Redux thunk w/ TS - refer to AppThunk in store.ts
 * ThunkAction<void, TAppState, null, Action<string>> - general thunk action?
 * if above doesn't work, try ThunkAction<void, UserState, null, UserActionTypes>
 *
 */

export const setUserInfo = (userObj: types.IUserInfo) => ({
  type: SET_USER_INFO,
  payload: userObj,
});

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO,
});

// Thunk middleware will turn async actions into actions
export const addUser = (userObj: types.ISignupState): AppThunk => async (
  dispatch
) => {
  // fetch request to create user in db
  const userName = `${userObj.name}`;
  const userEmail = `${userObj.email}`;
  const userPassword = `${userObj.password}`;
  const query = `mutation AddUser($userName: String!, $userEmail: String!, $userPassword: String!) {
    createUser(name: $userName, email: $userEmail, password: $userPassword) {
      _id
      name
    }
  }`;
  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: { userName, userEmail, userPassword },
    }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((newUser) => {
      dispatch(setUserInfo(newUser.data.createUser));
    })
    .catch((err) => {
      console.log('addUser action fetch error', err);
    });
};

export const verifyUser = (userObj: types.ILoginState): AppThunk => async (
  dispatch
) => {
  // let userId: number;
  // if (userObj.email === '' || userObj.password === '') {
  //   console.log('here')
  //   dispatch({
  //     type: INCOMPLETE_USER_INFO,
  //   });
  //   return;
  // }
  const userEmail = `${userObj.email}`;
  const userPassword = `${userObj.password}`;
  const query = `query VerifyUser($userEmail: String!, $userPassword: String!) { 
    user(email: $userEmail, password: $userPassword) {
      __typename
      ...on User {
        _id
        name
        boards {
          _id
          name
        }
      }
      ... on Unauthenticated {
        message
      }
    }
  }`;

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables: { userEmail, userPassword } }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((userAuthed) => {
      const { user } = userAuthed.data;
      if (user._id) {
        dispatch(setUserInfo(user));
        dispatch({
          type: GET_BOARD,
          payload: user.boards,
        });
      } else if (user.message) {
        dispatch({
          type: INVALID_USER_INFO
        })
        // return alert(user.message)
      };
    })
    .catch((err) => {
      console.log('verifyUser action fetch error', err);
    });
};
