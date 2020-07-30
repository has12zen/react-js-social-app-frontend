import {
  SET_SCREAMS,
  UPVOTE_SCREAM,
  DOWNVOTE_SCREAM,
  LOADING_DATA,
  DELETE_SCREME,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
} from '../types';
import NoImg from '../../images/no-image.png';
const initialState = {
  screams: [],
  scream: {},
  loading: false,
  path: window.location.pathname,
  NoImg,
};
let index;
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case LOADING_DATA:
      return { ...state, loading: true };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case UPVOTE_SCREAM:
    case DOWNVOTE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream._id === action.payload._id
      );
      state.screams[index] = action.payload;
      if (state.scream._id === action.payload._id) {
        state.scream = action.payload;
      }
      return { ...state };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    case DELETE_SCREME:
      index = state.screams.findIndex(
        (scream) => scream._id === action.payload
      );
      state.screams.splice(index, 1);
      console.log(state);
      return {
        ...state,
      };
    default:
      return state;
  }
}
