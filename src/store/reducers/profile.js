import {CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING} from "../actions/actionTypes";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        PROFILE_LOADING: true
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}