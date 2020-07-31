import {
  CLEAR_ERRORS,
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  FORGOT_PASSWORD,
  STOP_LOADING_UI,
  SIGNUP_EMAIL,
} from '../types';
import axios from '../../axios-instance';
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/users/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/users/signup', userData)
    .then((res) => {
      // setAuthorizationHeader(res.data.token);
      // dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SIGNUP_EMAIL });
      // history.push('/');
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.error.errors,
      });
    });
};
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};
export const forgotPassword = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/users/forgotPassword', userData)
    .then((res) => {
      dispatch({ type: FORGOT_PASSWORD });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const resetPassword = (userData, token, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .patch(`/users/resetPassword/${token}`, userData)
    .then((res) => {
      alert('Password Reset successful continue to login');
      dispatch({ type: STOP_LOADING_UI });
      history.push('/login');
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};
export const userActivation = (token, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .patch(`/users/signup/${token}`)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`/users/me`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/users/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};
export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/users', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};
export const changePassword = (passDetails, history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .patch('/users/updateMyPassword', passDetails)
    .then(() => {
      localStorage.removeItem('FBIdToken');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: SET_UNAUTHENTICATED });
      alert('Success now Login again');

      history.push('/login');
    })
    .catch((err) => console.log(err));
};
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
