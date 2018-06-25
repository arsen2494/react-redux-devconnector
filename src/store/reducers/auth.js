import { SET_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    user: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload.id
            };
        default:
            return state;
    }
};

export default reducer;