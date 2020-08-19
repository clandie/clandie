/**
 * ************************************
 *
 * @module  actionTypes.ts
 * @author
 * @date
 * @description Action Type Constants
 *
 * ************************************
 */

// User Action Types
export const ADD_USER = 'ADD_USER';
export const VERIFY_USER = 'VERIFY_USER';
export const SET_USER_INFO = 'SET_USER_INFO';
// export const ADD_BOARD = 'ADD_BOARD';
export const SET_BOARD = 'SET_BOARD';

interface AddUser {
  type: typeof ADD_USER;
  payload: {
    name: string;
    email: string;
    password: string;
  };
}

interface VerifyUser {
  type: typeof VERIFY_USER;
  payload: {
    email: string;
    password: string;
  };
}

interface SetUserInfo {
  type: typeof SET_USER_INFO;
  payload: {
    _id: number;
    name: string;
  };
}

interface SetBoard {
  type: typeof SET_BOARD;
  payload: {
    id: number;
    name: string;
  };
}

export type UserActionTypes = AddUser | VerifyUser | SetUserInfo;
export type BoardActionTypes = SetBoard;
