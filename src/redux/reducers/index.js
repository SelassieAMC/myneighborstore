import { combineReducers } from "redux";
import userAuth from "./authReducer";

const rootReducer = combineReducers({
    userAuth
});

export default rootReducer;