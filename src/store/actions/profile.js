import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from '../actions/actionTypes';

// Get current profile
export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
      .get('http://localhost:5000/api/profile')
      .then(response => dispatch({
        type: GET_PROFILE,
        payload: response.data
      }))
      .catch(() => dispatch({
        type: GET_PROFILE,
        payload: {}
      }));
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
      .post('http://localhost:5000/api/profile/experience', expData)
      .then(() => history.push('/dashboard'))
      .catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      }));
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure?')) {
    axios
        .delete(`http://localhost:5000/api/profile`)
        .then(() => dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        }))
        .catch(error => dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        }));
  }
};

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// Clear profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
      .post('http://localhost:5000/api/profile', profileData)
      .then(() => history.push('/dashboard'))
      .catch(error => dispatch({type: GET_ERRORS, payload: error.response.data}));
};

