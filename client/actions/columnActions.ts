import * as types from '../constants/types';
import { AppThunk } from '../store';
import { UPDATE_COLUMNS } from '../constants/actionTypes';

export const updateColumns = (
  source: string,
  destination: string,
  job: types.IJobs
): AppThunk => async (dispatch) => {
  // update columns for dnd
};
