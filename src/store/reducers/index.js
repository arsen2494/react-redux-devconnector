import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./error";

const reducer = combineReducers({
    auth,
    errors
});

export default reducer;