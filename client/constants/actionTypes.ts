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

import { IJobs, IInterviews } from './types';

// User Action Types
export const ADD_USER = 'ADD_USER';
export const VERIFY_USER = 'VERIFY_USER';
export const SET_USER_INFO = 'SET_USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';
export const INVALID_USER_INFO = 'INVALID_USER_INFO';
export const INCOMPLETE_USER_INFO = 'INCOMPLETE_USER_INFO';
// Board Action Types
export const CREATE_BOARD = 'CREATE_BOARD';
export const SET_BOARD = 'SET_BOARD';
export const GET_BOARD = 'GET_BOARD';
export const SELECT_BOARD = 'SELECT_BOARD';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';

// Job Action Types
export const GET_JOB = 'GET_JOB;';
export const CREATE_JOB = 'CREATE_JOB';
export const CLEAR_JOB = 'CLEAR_JOB';

// Interview Action Types
export const GET_INTERVIEW = 'GET_INTERVIEW';
export const CREATE_INTERVIEW = 'CREATE_INTERVIEW';
export const UPDATE_INTERVIEW = 'UPDATE_INTERVIEW';

// Contact Action Types
export const GET_CONTACT = 'GET_CONTACT';
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

// Column Action Types
export const UPDATE_OPPORTUNITIES = 'UPDATE_OPPORTUNITIES';
export const UPDATE_APPLIED = 'UPDATE_APPLIED';
export const UPDATE_INTERVIEWS = 'UPDATE_INTERVIEWS';
export const UPDATE_OFFERS = 'UPDATE_OFFERS';
export const UPDATE_REJECTED = 'UPDATE_REJECTED';
export const CLEAR_COLUMNS = 'CLEAR_COLUMNS';
export const UPDATE_COLUMNS = 'UPDATE_COLUMNS';
export const SET_COLUMNS = 'SET_COLUMNS';

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

interface InvalidUserInfo {
  type: typeof INVALID_USER_INFO;
}

interface IncompleteUserInfo {
  type: typeof INCOMPLETE_USER_INFO;
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

interface DeleteBoard {
  type: typeof DELETE_BOARD;
  payload: {
    id: number;
    name: string;
  }
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

// INTERVIEW ACTION TYPES
interface GetInterview {
  type: typeof GET_INTERVIEW;
  payload: {
    allInterviews: {
      title: string;
      date: Date;
      time: Date;
      timezone: string;
      notes: string;
      job_id: number;
    };
  };
}

interface CreateInterview {
  type: typeof CREATE_INTERVIEW;
  payload: {
    title: string;
    job_id: number;
  };
}

interface UpdateInterview {
  type: typeof UPDATE_INTERVIEW;
  payload: IInterviews | undefined
}

interface GetContact {
  type: typeof GET_CONTACT;
  payload: number;
}

interface CreateContact {
  type: typeof CREATE_CONTACT;
  payload: {
    name: string;
  }
}

interface UpdateContact {
  type: typeof UPDATE_CONTACT;
  payload: {
    name: string;
    title: string;
    phone: string;
    email: string;
    notes: string;
  }
}

// COLUMN ACTION TYPES
interface UpdateColumns {
  type: typeof UPDATE_COLUMNS;
  payload: IJobs[];
}

interface ClearColumns {
  type: typeof CLEAR_COLUMNS;
}

interface SetColumns {
  type: typeof SET_COLUMNS;
  payload: IJobs[];
}

export type UserActionTypes =
  | AddUser
  | VerifyUser
  | SetUserInfo
  | ClearUserInfo
  | InvalidUserInfo
  | IncompleteUserInfo;

export type BoardActionTypes =
  | CreateBoard
  | SetBoard
  | GetBoard
  | SelectBoard
  | ClearBoard
  | DeleteBoard;

export type JobActionTypes = GetJob | CreateJob | ClearJob;

export type InterviewActionTypes = GetInterview | CreateInterview | UpdateInterview;

export type ContactActionTypes = GetContact | CreateContact | UpdateContact;

export type ColumnActionTypes =
  // | UpdateOpportunities
  // | UpdateApplied
  // | UpdateInterviews
  // | UpdateOffers
  // | UpdateRejected
  ClearColumns | UpdateColumns | SetColumns;
