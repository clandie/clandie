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
