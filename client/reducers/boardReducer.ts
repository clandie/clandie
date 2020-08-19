/**
 * https://redux.js.org/recipes/usage-with-typescript
 * ^ go to that link to check out how to type for redux actions/reducers, setting action type to be any for now
 */
import { BoardState } from '../constants/stateTypes';
import { BoardActionTypes, SET_BOARD } from '../constants/actionTypes';

const initialState: BoardState = {
  id: null,
  name: '',
};

const boardReducer = (state = initialState, action: BoardActionTypes) => {
  console.log('currBoardState', state);
  switch (action.type) {
    case SET_BOARD:
      const { id, name } = action.payload;
      return {
        ...state,
        id,
        name,
      };
    //logic to set board
    default:
      return state;
  }
};

export default boardReducer;
