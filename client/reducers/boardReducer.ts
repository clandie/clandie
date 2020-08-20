/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */
import { BoardState } from '../constants/stateTypes';
import {
  BoardActionTypes,
  SET_BOARD,
  GET_BOARD,
  CLEAR_BOARD,
} from '../constants/actionTypes';

const initialState: BoardState = {
  id: null,
  name: '',
  boards: [],
};

const boardReducer = (state = initialState, action: BoardActionTypes) => {
  console.log('currBoardState', state);
  switch (action.type) {
    case GET_BOARD:
      return {
        ...state,
        boards: action.payload.boards,
      };

    case SET_BOARD:
      const { id, name } = action.payload;
      return {
        ...state,
        id,
        name,
      };

    case CLEAR_BOARD:
      return {
        ...state,
        id: null,
        name: '',
        boards: [],
      };
    default:
      return state;
  }
};

export default boardReducer;
