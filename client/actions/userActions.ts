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
import {
  SET_USER_INFO,
  CLEAR_USER_INFO,
  GET_BOARD,
} from '../constants/actionTypes';
import { AppThunk } from '../store';
// import { getBoard } from './boardActions';

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
  console.log('adduser thunk', userObj);
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
      console.log('user added', newUser);
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
        console.log('success!', user.boards);
        dispatch(setUserInfo(user));
        dispatch({
          type: GET_BOARD,
          payload: user.boards,
        });
      } else if (user.message) return alert(user.message);
    })
    .catch((err) => {
      console.log('verifyUser action fetch error', err);
    });
};
