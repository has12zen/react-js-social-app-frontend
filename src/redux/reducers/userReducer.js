import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  UPVOTE_SCREAM,
  DOWNVOTE_SCREAM,
} from '../types';
import NoImg from '../../images/no-image.png';

const initialState = {
  authenticated: false,
  credentials: [],
  loading: false,
  likes: [],
  notifications: [],
  NoImg,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return { ...initialState };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
        NoImg,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case UPVOTE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            user: state.credentials.handle,
            post: action.payload.post._id,
            vote: 'up',
          },
        ],
      };
    case DOWNVOTE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            user: state.credentials.handle,
            post: action.payload.post._id,
            vote: 'down',
          },
        ],
      };
    default:
      return state;
  }
}
