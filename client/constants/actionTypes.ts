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
// export const ADD_BOARD = 'ADD_BOARD';

interface AddUser {
  type: typeof ADD_USER;
  payload: {
    name: string;
    email: string;
    password: string;
  };
}

export type UserActionTypes = AddUser;
