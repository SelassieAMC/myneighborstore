import { combineReducers } from "redux";
import userAuth from "./authReducer";
import apiStatus from './apiStatusReducer';
import stores from "./storeReducer";

const rootReducer = combineReducers({
    userAuth,
    apiStatus,
    stores
});

export default rootReducer;