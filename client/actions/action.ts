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

// import { UserState } from '../constants/stateTypes';
import { UserActionTypes, ADD_USER } from '../constants/actionTypes';
import * as types from '../constants/types';

export const addUser = (userObj: types.ISignupState): UserActionTypes => ({
  type: ADD_USER,
  payload: userObj,
});
