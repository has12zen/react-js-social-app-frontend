import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  FORGOT_PASSWORD,
  SIGNUP_EMAIL,
} from '../types';

const initialState = {
  loading: false,
  errors: null,
  passwordReset: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case SIGNUP_EMAIL:
      return {
        ...state,
        passwordReset: true,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        passwordReset: true,
      };
    default:
      return state;
  }
}
