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

import { IJobs } from './types';

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

// Job Action Types
export const GET_JOB = 'GET_JOB;';
export const CREATE_JOB = 'CREATE_JOB';
export const CLEAR_JOB = 'CLEAR_JOB';

// Column Action Types
export const UPDATE_OPPORTUNITIES = 'UPDATE_OPPORTUNITIES';
export const UPDATE_APPLIED = 'UPDATE_APPLIED';
export const UPDATE_INTERVIEWS = 'UPDATE_INTERVIEWS';
export const UPDATE_OFFERS = 'UPDATE_OFFERS';
export const UPDATE_REJECTED = 'UPDATE_REJECTED';

//USER ACTION TYPES

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

// BOARD ACTION TYPES

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

// interface BoardData {
//   boards: { _id: number; name: string }[];
// }

interface GetBoard {
  type: typeof GET_BOARD;
  payload: { _id: number; name: string }[];
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

//JOB ACTION TYPES

interface GetJob {
  type: typeof GET_JOB;
  payload: {
    jobs: { status: string; company: string; title: string }[];
  };
}

interface CreateJob {
  type: typeof CREATE_JOB;
  payload: {
    status: string;
    company: string;
    title: string;
    board_id: number;
  };
}

interface ClearJob {
  type: typeof CLEAR_JOB;
}

// COLUMN ACTION TYPES

interface UpdateOpportunities {
  type: typeof UPDATE_OPPORTUNITIES;
  payload: { job: IJobs; list_order: number };
}

interface UpdateApplied {
  type: typeof UPDATE_APPLIED;
  payload: { job: IJobs; list_order: number };
}

interface UpdateInterviews {
  type: typeof UPDATE_INTERVIEWS;
  payload: { job: IJobs; list_order: number };
}

interface UpdateOffers {
  type: typeof UPDATE_OFFERS;
  payload: { job: IJobs; list_order: number };
}

interface UpdateRejected {
  type: typeof UPDATE_REJECTED;
  payload: { job: IJobs; list_order: number };
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

export type JobActionTypes = GetJob | CreateJob | ClearJob;

export type ColumnActionTypes =
  | UpdateOpportunities
  | UpdateApplied
  | UpdateInterviews
  | UpdateOffers
  | UpdateRejected;
