import {combineReducers} from "redux";
import auth from "./auth";
import errors from "./error";
import profile from "./profile";

const reducer = combineReducers({
    auth,
    errors,
    profile
});

export default reducer;