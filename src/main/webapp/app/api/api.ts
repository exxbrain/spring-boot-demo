import { AxiosError } from 'axios';
import { AnyAction } from 'redux';

// Action types
export const ACTION_TYPE = {
  BEGIN_API_CALL: "apiReducer/BEGIN_API_CALL",
  API_CALL_ERROR: "apiReducer/API_CALL_ERROR",
  END_API_CALL: "apiReducer/END_API_CALL"
};

export interface ApiState {
  callsInProgress: number,
  error: AxiosError | null
}

const initialState: ApiState = {
  callsInProgress: 0,
  error: null
};

// Reducer
export const apiReducer = ( state: ApiState = initialState, action: AnyAction ): ApiState => {
  switch (action.type) {
    case ACTION_TYPE.BEGIN_API_CALL:
      return {
        ...state,
        callsInProgress: state.callsInProgress + 1
      };
    case ACTION_TYPE.END_API_CALL:
      return {
        ...state,
        callsInProgress: state.callsInProgress - 1
      };
    case ACTION_TYPE.API_CALL_ERROR:
      if (action.error === undefined) {
        return {...state, error: null};
      }
      return {
        ...state,
        callsInProgress: state.callsInProgress - 1,
        error: action.error
      };
    default:
      return state;
  }
};

// Actions
export const beginApiCall = (): AnyAction => {
  return { type: ACTION_TYPE.BEGIN_API_CALL };
};

export const endApiCall = (): AnyAction => {
  return { type: ACTION_TYPE.BEGIN_API_CALL };
};

export const apiCallError = (error?: AxiosError): AnyAction => {
  return { type: ACTION_TYPE.API_CALL_ERROR, error };
};
