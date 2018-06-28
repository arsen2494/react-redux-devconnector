import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from '../actions/actionTypes';

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

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// Clear profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

