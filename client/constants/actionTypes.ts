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
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

// Board Action Types
export const CREATE_BOARD = 'CREATE_BOARD';
export const SET_BOARD = 'SET_BOARD';
export const GET_BOARD = 'GET_BOARD';
export const SELECT_BOARD = 'SELECT_BOARD';
export const CLEAR_BOARD = 'CLEAR_BOARD';

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

interface ClearUserInfo {
  type: typeof CLEAR_USER_INFO;
}

interface CreateBoard {
  type: typeof CREATE_BOARD;
  payload: {
    name: string;
    user_id: number;
  };
}
interface SetBoard {
  type: typeof SET_BOARD;
  payload: {
    id: number;
    name: string;
  };
}

interface BoardData {
  boards: { _id: number; name: string }[];
}

interface GetBoard {
  type: typeof GET_BOARD;
  payload: BoardData;
}

interface SelectBoard {
  type: typeof SELECT_BOARD;
  payload: {
    id: number;
    name: string;
  };
}

interface ClearBoard {
  type: typeof CLEAR_BOARD;
}

export type UserActionTypes =
  | AddUser
  | VerifyUser
  | SetUserInfo
  | ClearUserInfo;
export type BoardActionTypes =
  | CreateBoard
  | SetBoard
  | GetBoard
  | SelectBoard
  | ClearBoard;
