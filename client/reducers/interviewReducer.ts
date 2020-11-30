
import {InterviewState} from '../constants/stateTypes';
import {InterviewActionTypes, GET_INTERVIEW, CREATE_INTERVIEW} from '../constants/actionTypes';

const initialState: InterviewState = {
  interviews: []
}

const interviewReducer = (state = initialState, action: InterviewActionTypes) => {
  switch(action.type){
    case GET_INTERVIEW:
      return {
        ...state,
        interviews: action.payload
      }

    case CREATE_INTERVIEW:
      return {
        ...state,
        interviews: action.payload
      }

    default:
      return state;
  }
}

export default interviewReducer;