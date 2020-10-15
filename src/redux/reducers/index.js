import { combineReducers } from "redux";
import userAuth from "./authReducer";
import apiStatus from './apiStatusReducer';
import stores from "./storesReducer";
import store from "./storeEditionReducer";

const rootReducer = combineReducers({
    userAuth,
    apiStatus,
    stores,
    store
});

export default rootReducer;