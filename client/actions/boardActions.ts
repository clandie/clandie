import * as types from '../constants/types';
import { SET_BOARD, GET_BOARD, CLEAR_BOARD } from '../constants/actionTypes';
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

export const clearBoard = () => ({
  type: CLEAR_BOARD,
});

export const getBoard = (userId: number): AppThunk => async (dispatch) => {
  // logic for getting boards once user is logged in
  console.log('in getBoard action!!');
  const query = `
  query GetBoard($userId: ID!) {
    boards(id: $userId) {
      _id
      name
    }
  }
  `;

  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables: { userId } }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((allBoards) => {
      dispatch({
        type: GET_BOARD,
        payload: allBoards.data,
      });
    })
    .catch((err) => {
      console.log('getBoard action fetch error', err);
    });
};
