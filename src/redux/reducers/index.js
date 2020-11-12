import { combineReducers } from "redux";
import userAuth from "./authReducer";
import apiStatus from './apiStatusReducer';
import stores from "./storesReducer";
import store from "./storeEditionReducer";
import dictionaries from "./dictionariesReducer";

const rootReducer = combineReducers({
    userAuth,
    apiStatus,
    stores,
    store,
    dictionaries
});

export default rootReducer;