import * as types from '../constants/types';
import { SET_BOARD } from '../constants/actionTypes';
import { AppThunk } from '../store';

/**
 * Redux thunk w/ TS - refer to AppThunk in store.ts
 * ThunkAction<void, TAppState, null, Action<string>> - general thunk action?
 * if above doesn't work, try ThunkAction<void, UserState, null, UserActionTypes>
 *
 */

export const setBoard = (boardObj: types.IBoardInfo) => ({
  type: SET_BOARD,
  payload: boardObj,
});

export const getBoard = (userId: number): AppThunk => async (dispatch) => {
  // logic for getting boards once user is logged in
};
