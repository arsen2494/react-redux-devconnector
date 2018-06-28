import { GET_ERRORS } from "./actionTypes";
import axios from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actionTypes";

// Register
export const register = (userData, history) => dispatch => {
    axios
        .post('http://localhost:5000/api/users/register', userData)
        .then(() => history.push('/login'))
        .catch(error => dispatch({ type: GET_ERRORS, payload: error.response.data }));
};

// Login
export const login = userData => dispatch => {
    axios
        .post('http://localhost:5000/api/users/login', userData)
        .then(response => {
            // Save to localStorage
            const { token } = response.data;
            // Set token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(error => dispatch({ type: GET_ERRORS, payload: error.response.data }));
};

// Set logged in user
export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded
});

// Log user out
export const logout = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header
    setAuthToken(false);
    // Set current user to {}
    dispatch(setCurrentUser({}));
};