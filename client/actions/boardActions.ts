import * as types from '../constants/types';
import { SET_BOARD, GET_BOARD, CLEAR_BOARD } from '../constants/actionTypes';
import { AppThunk } from '../store';
import { getJob } from './jobActions';

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

export const createBoard = (boardObj: types.IBoardInput): AppThunk => async (
  dispatch
) => {
  const userId = boardObj.user_id;
  const boardName = boardObj.name;
  const query = `mutation CreateBoard($boardName: String!, $userId: ID!) {
    createBoard(name: $boardName, userID: $userId) {
      __typename
      ... on Board {
        _id,
        name,
      }
      ... on BadUserInput {
        message
      }
    }
  }`;
  fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables: { userId, boardName } }),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
    .then((res) => res.json())
    .then((boardData) => {
      console.log('data', boardData);
      const { createBoard } = boardData.data;
      const newBoard = {
        id: createBoard._id,
        name: createBoard.name,
      };
      dispatch(setBoard(newBoard));
      // dispatch getBoard after creating a new board to update state
      dispatch(getBoard(userId));
      // dispatch getJob so that the new board renders it's own jobs aka no jobs
      dispatch(getJob(createBoard._id));
    })
    .catch((err) => {
      console.log('addBoard fetch action error', err);
    });
};

export const getBoard = (userId: number): AppThunk => async (dispatch) => {
  const query = `
  query GetBoard($userId: ID!) {
    boards(userID: $userId) {
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
