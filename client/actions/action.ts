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

import { UserState } from '../constants/stateTypes';
import { UserActionTypes, ADD_USER } from '../constants/actionTypes';

export const addUser = (userObj: UserState): UserActionTypes => ({
  type: ADD_USER,
  payload: userObj,
});
