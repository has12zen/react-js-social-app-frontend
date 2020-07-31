import {
  SET_SCREAMS,
  LOADING_DATA,
  UPVOTE_SCREAM,
  DOWNVOTE_SCREAM,
  DELETE_SCREME,
  LOADING_UI,
  POST_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  STOP_LOADING_UI,
  SET_SCREAM,
  UPDATE_POST,
} from '../types';
import axios from '../../axios-instance';

//Get All Screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/posts')
    .then((res) => {
      console.log('[data]', res.data);
      dispatch({ type: SET_SCREAMS, payload: res.data.data.data });
    })
    .catch((err) => {
      dispatch({ type: SET_SCREAMS, payload: [] });
    });
};
//UpVote
export const upVote = (screamId) => (dispatch) => {
  axios
    .get(`/posts/${screamId}/up`)
    .then((res) => {
      console.log('[up]', res.data);
      dispatch({ type: UPVOTE_SCREAM, payload: res.data.post });
    })
    .catch((err) => console.log(err));
};
//DownVote
export const downVote = (screamId) => (dispatch) => {
  axios
    .get(`/posts/${screamId}/down`)
    .then((res) => {
      console.log('[up]', res.data);
      dispatch({ type: DOWNVOTE_SCREAM, payload: res.data.post });
    })
    .catch((err) => console.log(err));
};
//POst
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/posts`, newScream)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: POST_SCREAM, payload: res.data.data.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.error.errors,
      });
    });
};
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/posts/${screamId}`)
    .then((res) => {
      dispatch({ type: SET_SCREAM, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  console.log('[dA]', userHandle);
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data.screams });
    })
    .catch(() => {
      dispatch({ type: SET_SCREAMS, payload: null });
    });
};

export const deleteScream = (screamId) => (dispatch) => {
  axios.delete(`/posts/${screamId}`).then(() => {
    dispatch({ type: DELETE_SCREME, payload: screamId });
  });
};
export const updatePost = (postId, post) => (dispatch) => {
  console.log(postId);
  axios
    .patch(`/posts/${postId}`, post)
    .then((res) => {
      dispatch({ type: UPDATE_POST, payload: res.data.doc });
    })
    .catch((err) => console.log(err));
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
